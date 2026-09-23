import type { VercelRequest, VercelResponse } from '@vercel/node'
import { validateLeadFields } from '../server/chatHandlers'
import { createMemoryRateLimiter } from '../server/rateLimit'
import { DEFAULT_ALLOWED_ORIGINS, isAllowedOrigin } from '../server/requestGuard'

const leadLimiter = createMemoryRateLimiter({ windowMs: 60_000, max: 10 })

function parseAllowedOrigins(): string[] {
  const extra = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ''
  return [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...extra, vercelUrl].filter(Boolean))]
}

function clientKey(req: VercelRequest): string {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim()
  if (Array.isArray(xf) && xf[0]) return xf[0]
  return req.socket?.remoteAddress || 'unknown'
}

/** Persistencia en Vercel: reenvío a Formspree (sin PII en logs). */
async function persistLeadToFormspree(lead: {
  name: string
  phone: string
  email: string
  lang: string
  note?: string
}): Promise<boolean> {
  const endpoint =
    process.env.FORMSPREE_ENDPOINT || process.env.VITE_FORMSPREE_ENDPOINT || ''
  if (!endpoint.startsWith('https://formspree.io/f/')) return false

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.note || '(lead desde chatbot)',
      _subject: lead.lang === 'en' ? 'RoadBuilder chat lead' : 'Lead chat RoadBuilder',
      source: 'chatbot',
      lang: lead.lang,
    }),
  })
  return res.ok
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined
  const referer = typeof req.headers.referer === 'string' ? req.headers.referer : undefined
  if (!isAllowedOrigin(origin, referer, parseAllowedOrigins())) {
    res.status(403).json({ error: 'Forbidden origin' })
    return
  }
  if (!leadLimiter.check(clientKey(req))) {
    res.status(429).json({ error: 'Too many requests' })
    return
  }

  const body = (req.body || {}) as Record<string, unknown>
  const validated = validateLeadFields(body)
  if (!validated.ok) {
    res.status(validated.status).json({ error: validated.error })
    return
  }

  try {
    const saved = await persistLeadToFormspree(validated.lead)
    if (!saved) {
      res.status(503).json({ error: 'Lead persistence not configured' })
      return
    }
    res.status(200).json({ ok: true, message: validated.lead.message })
  } catch {
    res.status(500).json({ error: 'Lead handler failure' })
  }
}
