import type { Plugin, Connect } from 'vite'
import { loadEnv } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { runChat, validateLeadFields } from './chatHandlers'
import { createMemoryRateLimiter } from './rateLimit'
import { DEFAULT_ALLOWED_ORIGINS, isAllowedOrigin } from './requestGuard'

type ChatBody = {
  messages?: { role: 'user' | 'assistant'; content: string }[]
  lang?: 'es' | 'en'
}

type LeadBody = {
  name?: string
  phone?: string
  email?: string
  lang?: 'es' | 'en'
  note?: string
}

function readJsonBody(req: Connect.IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(Buffer.from(c)))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

function sendJson(res: Connect.ServerResponse, status: number, data: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

function clientKey(req: Connect.IncomingMessage): string {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim()
  return req.socket.remoteAddress || 'unknown'
}

function parseAllowedOrigins(raw: string | undefined): string[] {
  const extra = (raw || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...extra])]
}

const chatLimiter = createMemoryRateLimiter({ windowMs: 60_000, max: 20 })
const leadLimiter = createMemoryRateLimiter({ windowMs: 60_000, max: 10 })

function getDeps() {
  return {
    apiKey: process.env.GROQ_API_KEY || '',
    model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
    allowedOrigins: parseAllowedOrigins(process.env.ALLOWED_ORIGINS),
  }
}

async function handleChat(req: Connect.IncomingMessage, res: Connect.ServerResponse) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  const deps = getDeps()
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined
  const referer = typeof req.headers.referer === 'string' ? req.headers.referer : undefined
  const host = typeof req.headers.host === 'string' ? req.headers.host : ''
  const isLoopbackHost = /^(127\.0\.0\.1|localhost)(:\d+)?$/i.test(host)
  // Prod/Vercel: Origin/Referer obligatorio. Loopback: permite smoke sin Origin (Host local).
  if (!isAllowedOrigin(origin, referer, deps.allowedOrigins) && !(isLoopbackHost && !origin && !referer)) {
    sendJson(res, 403, { error: 'Forbidden origin' })
    return
  }

  if (!chatLimiter.check(clientKey(req))) {
    sendJson(res, 429, { error: 'Too many requests' })
    return
  }

  try {
    const body = (await readJsonBody(req)) as ChatBody
    const result = await runChat({
      messages: Array.isArray(body.messages) ? body.messages : [],
      lang: body.lang === 'en' ? 'en' : 'es',
      apiKey: deps.apiKey,
      model: deps.model,
    })
    if (!result.ok) {
      sendJson(res, result.status, {
        error: result.error,
        detail: 'detail' in result ? result.detail : undefined,
      })
      return
    }
    sendJson(res, 200, { reply: result.reply })
  } catch {
    sendJson(res, 500, { error: 'Chat handler failure' })
  }
}

async function handleLead(req: Connect.IncomingMessage, res: Connect.ServerResponse) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  const deps = getDeps()
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined
  const referer = typeof req.headers.referer === 'string' ? req.headers.referer : undefined
  const host = typeof req.headers.host === 'string' ? req.headers.host : ''
  const isLoopbackHost = /^(127\.0\.0\.1|localhost)(:\d+)?$/i.test(host)
  if (!isAllowedOrigin(origin, referer, deps.allowedOrigins) && !(isLoopbackHost && !origin && !referer)) {
    sendJson(res, 403, { error: 'Forbidden origin' })
    return
  }
  if (!leadLimiter.check(clientKey(req))) {
    sendJson(res, 429, { error: 'Too many requests' })
    return
  }

  try {
    const body = (await readJsonBody(req)) as LeadBody
    const validated = validateLeadFields(body)
    if (!validated.ok) {
      sendJson(res, validated.status, { error: validated.error })
      return
    }

    const dir = path.resolve(process.cwd(), '.data')
    fs.mkdirSync(dir, { recursive: true })
    const file = path.join(dir, 'leads.jsonl')
    const row = JSON.stringify({
      ts: new Date().toISOString(),
      name: validated.lead.name,
      phone: validated.lead.phone,
      email: validated.lead.email,
      lang: validated.lead.lang,
      note: validated.lead.note,
    })
    fs.appendFileSync(file, row + '\n', 'utf8')

    sendJson(res, 200, { ok: true, message: validated.lead.message })
  } catch {
    sendJson(res, 500, { error: 'Lead handler failure' })
  }
}

function attach(middlewares: Connect.Server) {
  middlewares.use((req, res, next) => {
    if (req.url?.startsWith('/api/chat')) {
      void handleChat(req, res)
      return
    }
    if (req.url?.startsWith('/api/lead')) {
      void handleLead(req, res)
      return
    }
    next()
  })
}

/** Adaptador Vite: inyecta env → handlers puros. */
export function chatProxyPlugin(): Plugin {
  return {
    name: 'roadbuilder-chat-proxy',
    configResolved(config) {
      const env = loadEnv(config.mode, config.envDir || process.cwd(), '')
      if (env.GROQ_API_KEY) process.env.GROQ_API_KEY = env.GROQ_API_KEY
      if (env.GROQ_MODEL) process.env.GROQ_MODEL = env.GROQ_MODEL
      if (env.ALLOWED_ORIGINS) process.env.ALLOWED_ORIGINS = env.ALLOWED_ORIGINS
    },
    configureServer(server) {
      attach(server.middlewares)
    },
    configurePreviewServer(server) {
      attach(server.middlewares)
    },
  }
}
