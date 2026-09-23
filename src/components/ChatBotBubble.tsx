import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLanguage } from '../i18n'
import { submitChat, submitLead, type ChatTurn } from '../lib/chatTools'

type UiMessage = { from: 'bot' | 'user'; text: string }

const LEAD_TOKEN = '[[COLLECT_LEAD]]'

function stripLeadToken(text: string): { clean: string; collectLead: boolean } {
  const collectLead = text.includes(LEAD_TOKEN)
  return {
    collectLead,
    clean: text.split(LEAD_TOKEN).join('').trim(),
  }
}

export default function ChatBotBubble() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<UiMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [showLead, setShowLead] = useState(false)
  const [leadSent, setLeadSent] = useState(false)
  const [leadBusy, setLeadBusy] = useState(false)
  const [leadError, setLeadError] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const sendingRef = useRef(false)

  useEffect(() => {
    if (!open || messages.length > 0) return
    setMessages([
      {
        from: 'bot',
        text: isEn
          ? 'Hi! I am RoadBuilder Technical Advisor. Ask me anything about TSW, TSB, SX Prime or SX Fog — I answer from our product catalog only.'
          : '¡Hola! Soy el Asesor Técnico RoadBuilder. Pregúntame sobre TSW, TSB, SX Prime o SX Fog — respondo solo con datos de nuestro catálogo.',
      },
    ])
  }, [open, isEn, messages.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, showLead, busy])

  const handleSend = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || busy || sendingRef.current) return

    sendingRef.current = true
    setBusy(true)
    setInput('')

    const nextUser: UiMessage = { from: 'user', text: trimmed }
    const historyForApi: ChatTurn[] = [...messages, nextUser]
      .filter((m) => m.text.trim())
      .map((m) => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text,
      }))

    setMessages((prev) => [...prev, nextUser])

    const result = await submitChat({ messages: historyForApi, lang })
    if (result.ok) {
      const { clean, collectLead } = stripLeadToken(result.reply)
      setMessages((prev) => [...prev, { from: 'bot', text: clean || result.reply }])
      if (collectLead && !leadSent) setShowLead(true)
    } else {
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: isEn
            ? 'I could not reach the assistant right now. Please try again or use WhatsApp / Contact.'
            : 'No pude conectar con el asistente ahora. Intenta de nuevo o usa WhatsApp / Contacto.',
        },
      ])
    }

    setBusy(false)
    sendingRef.current = false
  }

  const handleLead = async (e: FormEvent) => {
    e.preventDefault()
    if (leadBusy || leadSent) return
    setLeadError('')
    setLeadBusy(true)

    const note = messages
      .filter((m) => m.from === 'user')
      .slice(-3)
      .map((m) => m.text)
      .join(' | ')
      .slice(0, 500)

    const result = await submitLead({ name, phone, email, lang, note })
    if (result.ok) {
      setLeadSent(true)
      setShowLead(false)
      setMessages((prev) => [...prev, { from: 'bot', text: result.message }])
      setName('')
      setPhone('')
      setEmail('')
    } else {
      setLeadError(
        isEn
          ? 'Please check name, phone and email, then try again.'
          : 'Revisa nombre, teléfono y correo e intenta de nuevo.',
      )
    }
    setLeadBusy(false)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        aria-label={isEn ? 'Open RoadBuilder chat' : 'Abrir chat RoadBuilder'}
      >
        <span className="text-black text-xl sm:text-2xl font-bold">RB</span>
      </button>

      {open && (
        <div className="fixed z-40 left-3 right-3 bottom-[4.75rem] sm:left-auto sm:right-6 sm:bottom-24 sm:w-[340px] max-h-[min(70svh,520px)] rounded-2xl bg-bg/95 border border-white/10 shadow-2xl backdrop-blur-md flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 bg-primary/10 px-4 py-3 border-b border-primary/30">
            <div className="relative w-9 h-9 rounded-md bg-primary/90 flex items-center justify-center overflow-hidden shadow-sm">
              <img
                src="/raod_builder_logo-removebg-preview.png"
                alt="RoadBuilder"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm font-semibold text-white truncate">
                {isEn ? 'Technical Advisor' : 'Asesor Técnico'}
              </p>
              <p className="font-sans text-xs text-slate-300 truncate">
                {isEn ? 'Catalog-grounded answers' : 'Respuestas basadas en catálogo'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white text-xs"
              aria-label={isEn ? 'Close chat' : 'Cerrar chat'}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 px-3 py-2 overflow-y-auto space-y-2 min-h-0 max-h-[40svh] sm:max-h-[300px]">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs font-sans whitespace-pre-wrap ${
                    m.from === 'bot'
                      ? 'bg-white/10 text-slate-100'
                      : 'bg-primary text-black font-semibold'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {busy && (
              <p className="text-[11px] text-slate-400 font-sans px-1">
                {isEn ? 'Thinking…' : 'Pensando…'}
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {showLead && !leadSent && (
            <form
              onSubmit={handleLead}
              className="border-t border-white/10 px-3 py-2 space-y-2 bg-black/20"
            >
              <p className="text-[11px] text-slate-200 font-sans">
                {isEn
                  ? 'Sales handoff — name, phone and email:'
                  : 'Pase a ventas — nombre, teléfono y correo:'}
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder={isEn ? 'Full name' : 'Nombre completo'}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 text-xs text-white placeholder:text-slate-500"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoComplete="tel"
                placeholder={isEn ? 'Phone' : 'Teléfono'}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 text-xs text-white placeholder:text-slate-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder={isEn ? 'Email' : 'Correo'}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 text-xs text-white placeholder:text-slate-500"
              />
              {leadError && <p className="text-[11px] text-red-300">{leadError}</p>}
              <button
                type="submit"
                disabled={leadBusy}
                className="w-full rounded-lg bg-primary text-black text-xs font-semibold py-2 disabled:opacity-60"
              >
                {leadBusy
                  ? isEn
                    ? 'Sending…'
                    : 'Enviando…'
                  : isEn
                    ? 'Connect me with sales'
                    : 'Conectarme con ventas'}
              </button>
            </form>
          )}

          <form onSubmit={handleSend} className="border-t border-white/10 px-3 py-2 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              placeholder={isEn ? 'Ask about a product…' : 'Pregunta sobre un producto…'}
              className="flex-1 rounded-lg bg-white/5 border border-white/10 px-2 py-2 text-xs text-white placeholder:text-slate-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-lg bg-primary text-black text-xs font-semibold px-3 disabled:opacity-50"
            >
              {isEn ? 'Send' : 'Enviar'}
            </button>
          </form>
        </div>
      )}
    </>
  )
}
