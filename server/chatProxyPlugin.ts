import type { Plugin, Connect } from 'vite'
import { loadEnv } from 'vite'
import { buildSystemPrompt } from '../src/lib/buildProductKnowledge'
import fs from 'node:fs'
import path from 'node:path'

type ChatBody = {
  messages?: { role: 'user' | 'assistant' | 'system'; content: string }[]
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

function getApiKey(): string | undefined {
  return process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY
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

  const apiKey = getApiKey()
  if (!apiKey) {
    sendJson(res, 503, { error: 'Chat API key not configured on server' })
    return
  }

  try {
    const body = (await readJsonBody(req)) as ChatBody
    const lang = body.lang === 'en' ? 'en' : 'es'
    const incoming = Array.isArray(body.messages) ? body.messages : []
    const safeMessages = incoming
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }))
      .slice(-12)

    if (safeMessages.length === 0) {
      sendJson(res, 400, { error: 'messages required' })
      return
    }

    const payload = {
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      temperature: 0.2,
      max_tokens: 700,
      messages: [{ role: 'system', content: buildSystemPrompt(lang) }, ...safeMessages],
    }

    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!upstream.ok) {
      const errText = await upstream.text()
      sendJson(res, 502, { error: 'Upstream model error', detail: errText.slice(0, 300) })
      return
    }

    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const reply = data.choices?.[0]?.message?.content?.trim() || ''
    if (!reply) {
      sendJson(res, 502, { error: 'Empty model reply' })
      return
    }

    sendJson(res, 200, { reply })
  } catch {
    sendJson(res, 500, { error: 'Chat handler failure' })
  }
}

async function handleLead(req: Connect.IncomingMessage, res: Connect.ServerResponse) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }

  try {
    const body = (await readJsonBody(req)) as LeadBody
    const name = String(body.name || '').trim().slice(0, 120)
    const phone = String(body.phone || '').trim().slice(0, 40)
    const email = String(body.email || '').trim().slice(0, 120)
    const lang = body.lang === 'en' ? 'en' : 'es'
    const note = String(body.note || '').trim().slice(0, 500)

    if (name.length < 2 || phone.length < 7 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sendJson(res, 400, { error: 'Invalid lead fields' })
      return
    }

    const dir = path.resolve(process.cwd(), '.data')
    fs.mkdirSync(dir, { recursive: true })
    const file = path.join(dir, 'leads.jsonl')
    const row = JSON.stringify({
      ts: new Date().toISOString(),
      name,
      phone,
      email,
      lang,
      note: note || undefined,
    })
    fs.appendFileSync(file, row + '\n', 'utf8')

    sendJson(res, 200, {
      ok: true,
      message:
        lang === 'en'
          ? 'Thanks. Our sales team will contact you shortly.'
          : 'Gracias. Nuestro equipo de ventas lo contactará en breve.',
    })
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

/**
 * Plugin Vite: Tools submitChat / submitLead (MCP-style) sin exponer la API key al bundle.
 * Nombre del archivo evita patrones *groq* del .gitignore.
 */
export function chatProxyPlugin(): Plugin {
  return {
    name: 'roadbuilder-chat-proxy',
    configResolved(config) {
      const env = loadEnv(config.mode, config.envDir || process.cwd(), '')
      if (env.GROQ_API_KEY) process.env.GROQ_API_KEY = env.GROQ_API_KEY
      if (env.GROQ_MODEL) process.env.GROQ_MODEL = env.GROQ_MODEL
    },
    configureServer(server) {
      attach(server.middlewares)
    },
    configurePreviewServer(server) {
      attach(server.middlewares)
    },
  }
}
