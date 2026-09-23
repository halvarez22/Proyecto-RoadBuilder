/**
 * Handlers puros de chat/lead — agnósticos al entorno (Vite / Vercel).
 * ASC forense: NUNCA leer process.env aquí; inyectar secretos y deps desde el adaptador.
 */

import { buildSystemPrompt } from '../src/lib/buildProductKnowledge'

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

export type ChatInput = {
  messages: ChatMessage[]
  lang: 'es' | 'en'
  apiKey: string
  model: string
  /** fetch inyectable (tests / runtimes) */
  fetchImpl?: typeof fetch
}

export type ChatResult =
  | { ok: true; reply: string }
  | { ok: false; status: number; error: string; detail?: string }

export type LeadInput = {
  name: string
  phone: string
  email: string
  lang: 'es' | 'en'
  note?: string
}

export type LeadValidated = {
  name: string
  phone: string
  email: string
  lang: 'es' | 'en'
  note?: string
  message: string
}

export type LeadValidateResult =
  | { ok: true; lead: LeadValidated }
  | { ok: false; status: number; error: string }

export function validateLeadFields(raw: {
  name?: unknown
  phone?: unknown
  email?: unknown
  lang?: unknown
  note?: unknown
}): LeadValidateResult {
  const name = String(raw.name || '').trim().slice(0, 120)
  const phone = String(raw.phone || '').trim().slice(0, 40)
  const email = String(raw.email || '').trim().slice(0, 120)
  const lang = raw.lang === 'en' ? 'en' : 'es'
  const note = String(raw.note || '').trim().slice(0, 500)

  if (name.length < 2 || phone.length < 7 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, status: 400, error: 'Invalid lead fields' }
  }

  const message =
    lang === 'en'
      ? 'Thanks. Our sales team will contact you shortly.'
      : 'Gracias. Nuestro equipo de ventas lo contactará en breve.'

  return {
    ok: true,
    lead: { name, phone, email, lang, note: note || undefined, message },
  }
}

export function sanitizeChatMessages(
  incoming: unknown,
): { ok: true; messages: ChatMessage[] } | { ok: false; status: number; error: string } {
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return { ok: false, status: 400, error: 'messages required' }
  }
  const messages = incoming
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === 'object' &&
        ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'assistant') &&
        typeof (m as ChatMessage).content === 'string',
    )
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 4000) }))
    .slice(-12)

  if (messages.length === 0) {
    return { ok: false, status: 400, error: 'messages required' }
  }
  return { ok: true, messages }
}

/** Llama al modelo upstream con key inyectada (sin process.env). */
export async function runChat(input: ChatInput): Promise<ChatResult> {
  if (!input.apiKey) {
    return { ok: false, status: 503, error: 'Chat API key not configured on server' }
  }

  const sanitized = sanitizeChatMessages(input.messages)
  if (!sanitized.ok) return sanitized

  const fetchImpl = input.fetchImpl ?? fetch
  const payload = {
    model: input.model || 'openai/gpt-oss-120b',
    temperature: 0.2,
    max_tokens: 700,
    messages: [
      { role: 'system', content: buildSystemPrompt(input.lang) },
      ...sanitized.messages,
    ],
  }

  try {
    const upstream = await fetchImpl('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!upstream.ok) {
      const errText = await upstream.text()
      return {
        ok: false,
        status: 502,
        error: 'Upstream model error',
        detail: errText.slice(0, 300),
      }
    }

    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[]
    }
    const reply = data.choices?.[0]?.message?.content?.trim() || ''
    if (!reply) {
      return { ok: false, status: 502, error: 'Empty model reply' }
    }
    return { ok: true, reply }
  } catch {
    return { ok: false, status: 500, error: 'Chat handler failure' }
  }
}
