export type ChatTurn = { role: 'user' | 'assistant'; content: string }

export type ChatResult =
  | { ok: true; reply: string }
  | { ok: false; error: string }

/** Tool MCP: envía historial de chat al proxy servidor (Groq). Sin API key en cliente. */
export async function submitChat(input: {
  messages: ChatTurn[]
  lang: 'es' | 'en'
}): Promise<ChatResult> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lang: input.lang,
        messages: input.messages.map((m) => ({
          role: m.role,
          content: m.content.slice(0, 4000),
        })),
      }),
    })
    const data = (await res.json()) as { reply?: string; error?: string }
    if (!res.ok || !data.reply) {
      return { ok: false, error: data.error || 'Chat unavailable' }
    }
    return { ok: true, reply: data.reply }
  } catch {
    return { ok: false, error: 'Network error' }
  }
}

export type LeadInput = {
  name: string
  phone: string
  email: string
  lang: 'es' | 'en'
  note?: string
}

export type LeadResult = { ok: true; message: string } | { ok: false; error: string }

/** Tool MCP: registra lead calificado (servidor). No loguea PII en el cliente. */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: input.name.trim(),
        phone: input.phone.trim(),
        email: input.email.trim(),
        lang: input.lang,
        note: input.note?.trim(),
      }),
    })
    const data = (await res.json()) as { ok?: boolean; message?: string; error?: string }
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error || 'Lead failed' }
    }
    return {
      ok: true,
      message:
        data.message ||
        (input.lang === 'en'
          ? 'Thanks. Our sales team will contact you shortly.'
          : 'Gracias. Nuestro equipo de ventas lo contactará en breve.'),
    }
  } catch {
    return { ok: false, error: 'Network error' }
  }
}
