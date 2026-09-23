export type ContactPayload = {
  name: string
  email: string
  phone?: string
  message: string
  lang: 'es' | 'en'
}

export type ContactResult =
  | { ok: true }
  | { ok: false; error: 'config' | 'validation' | 'network' | 'upstream' }

/**
 * Tool MCP: envío de contacto a Formspree.
 * ASC: no loguea PII; el endpoint es público por diseño de Formspree (solo ID de form).
 */
export async function submitContact(input: ContactPayload): Promise<ContactResult> {
  const endpoint = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim()
  if (!endpoint || !endpoint.startsWith('https://formspree.io/f/')) {
    return { ok: false, error: 'config' }
  }

  const name = input.name.trim().slice(0, 120)
  const email = input.email.trim().slice(0, 120)
  const phone = (input.phone || '').trim().slice(0, 40)
  const message = input.message.trim().slice(0, 4000)

  if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'validation' }
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || undefined,
        message,
        _subject: input.lang === 'en' ? 'RoadBuilder website contact' : 'Contacto web RoadBuilder',
        lang: input.lang,
      }),
    })

    if (!res.ok) return { ok: false, error: 'upstream' }
    return { ok: true }
  } catch {
    return { ok: false, error: 'network' }
  }
}
