import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runChat } from '../server/chatHandlers'
import { createMemoryRateLimiter } from '../server/rateLimit'
import { DEFAULT_ALLOWED_ORIGINS, isAllowedOrigin } from '../server/requestGuard'

const chatLimiter = createMemoryRateLimiter({ windowMs: 60_000, max: 20 })

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }
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
  if (!chatLimiter.check(clientKey(req))) {
    res.status(429).json({ error: 'Too many requests' })
    return
  }

  const body = (req.body || {}) as {
    messages?: { role: 'user' | 'assistant'; content: string }[]
    lang?: 'es' | 'en'
  }

  const result = await runChat({
    messages: Array.isArray(body.messages) ? body.messages : [],
    lang: body.lang === 'en' ? 'en' : 'es',
    apiKey: process.env.GROQ_API_KEY || '',
    model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
  })

  if (!result.ok) {
    res.status(result.status).json({
      error: result.error,
      detail: 'detail' in result ? result.detail : undefined,
    })
    return
  }
  res.status(200).json({ reply: result.reply })
}
