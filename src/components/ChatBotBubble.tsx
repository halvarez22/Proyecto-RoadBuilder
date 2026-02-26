import { useEffect, useRef, useState } from 'react'
import { useLanguage, type Lang } from '../i18n'

type ChatMessage = {
  from: 'bot' | 'user'
  text: string
  lang: Lang
}

export default function ChatBotBubble() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open || messages.length > 0) return
    const greeting =
      lang === 'en'
        ? 'Hi! I am RoadBuilder, your technical advisor. How can I help you with our products?'
        : '¡Hola! Soy RoadBuilder, tu asesor técnico. ¿En qué puedo ayudarte con nuestros productos?'
    setMessages([{ from: 'bot', text: greeting, lang }])
  }, [open, lang, messages.length])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const detectedLang = detectLanguage(trimmed, lang)
    const userMsg: ChatMessage = { from: 'user', text: trimmed, lang: detectedLang }
    const replyText = getBotReply(trimmed, detectedLang)
    const botMsg: ChatMessage = { from: 'bot', text: replyText, lang: detectedLang }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <>
      {/* Bubble button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        aria-label={lang === 'en' ? 'Open chat with RoadBuilder' : 'Abrir chat con RoadBuilder'}
      >
        <span className="text-black text-2xl font-bold">RB</span>
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-30 w-[320px] max-w-[90vw] rounded-2xl bg-bg/95 border border-white/10 shadow-2xl backdrop-blur-md flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 bg-primary/10 px-4 py-3 border-b border-primary/30">
            <div className="relative w-9 h-9 rounded-md bg-primary/90 flex items-center justify-center overflow-hidden shadow-sm">
              <img
                src="/raod_builder_logo-removebg-preview.png"
                alt="RoadBuilder"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="font-sans text-sm font-semibold text-white">
                {lang === 'en' ? 'RoadBuilder Technical Advisor' : 'RoadBuilder Asesor Técnico'}
              </p>
              <p className="font-sans text-xs text-slate-300">
                {lang === 'en' ? 'Ask me about our products' : 'Pregúntame sobre nuestros productos'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white text-xs"
              aria-label={lang === 'en' ? 'Close chat' : 'Cerrar chat'}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 px-3 py-2 overflow-y-auto space-y-2 max-h-[280px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs font-sans ${
                    m.from === 'bot'
                      ? 'bg-white/10 text-slate-100'
                      : 'bg-primary text-black font-semibold'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="border-t border-white/10 px-3 py-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === 'en' ? 'Type your question…' : 'Escribe tu pregunta…'
              }
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-sans text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            />
            <button
              type="submit"
              className="text-xs font-sans font-bold text-black bg-primary rounded-xl px-3 py-1.5 hover:brightness-110"
            >
              {lang === 'en' ? 'Send' : 'Enviar'}
            </button>
          </form>
        </div>
      )}
    </>
  )
}

function detectLanguage(text: string, uiLang: Lang): Lang {
  const t = text.toLowerCase()
  const hasSpanishChars = /[ñáéíóú¿¡]/.test(t)
  const spanishWords = ['producto', 'productos', 'precio', 'costos', 'tsw', 'tsb', 'sx', 'fog', 'prime']
  const englishWords = ['product', 'products', 'price', 'cost', 'tsw', 'tsb', 'sx', 'fog', 'prime']

  let scoreEs = 0
  let scoreEn = 0
  if (hasSpanishChars) scoreEs += 2
  spanishWords.forEach((w) => {
    if (t.includes(w)) scoreEs += 1
  })
  englishWords.forEach((w) => {
    if (t.includes(w)) scoreEn += 1
  })

  if (scoreEs === scoreEn) {
    return uiLang
  }
  return scoreEs > scoreEn ? 'es' : 'en'
}

function getBotReply(text: string, lang: Lang): string {
  const t = text.toLowerCase()
  const isEn = lang === 'en'

  const aboutProducts = ['product', 'products', 'producto', 'productos']
  if (aboutProducts.some((w) => t.includes(w))) {
    return isEn
      ? 'We have four main products: Top-Seal White (TSW) for soil stabilization and dust control, Top-Seal Black (TSB) for non-petroleum black surfacing and cold recycling, SX Prime (TP) as a non-petroleum prime coat, and SX Fog (TF) for pavement preservation and rejuvenation.'
      : 'Tenemos cuatro productos principales: Top-Seal White (TSW) para estabilización de suelos y control de polvo, Top-Seal Black (TSB) para recubrimiento negro no petrolero y reciclado en frío, SX Prime (TP) como imprimación no petrolera y SX Fog (TF) para preservación y rejuvenecimiento de pavimentos.'
  }

  if (t.includes('tsw') || t.includes('top-seal white')) {
    return isEn
      ? 'Top-Seal White (TSW) is a non-petroleum liquid soil stabilizer and dust control product. It is mixed with water and applied with conventional equipment to transform loose soils into strong, low-permeability layers. It is ideal for rural roads, platforms, parking lots and erosion control.'
      : 'Top-Seal White (TSW) es un estabilizador de suelos líquido, no petrolero, para control de polvo y erosión. Se mezcla con agua y se aplica con equipo convencional para transformar suelos sueltos en capas sólidas y de baja permeabilidad. Es ideal para caminos rurales, plataformas, estacionamientos y control de erosión.'
  }

  if (t.includes('tsb') || t.includes('top-seal black')) {
    return isEn
      ? 'Top-Seal Black (TSB) is a non-petroleum black coating that creates an asphalt-like wearing surface over treated bases. It seals the base, increases structural capacity and is ideal for cold in-place recycling and low- to medium-volume roads.'
      : 'Top-Seal Black (TSB) es un recubrimiento negro no petrolero que genera una superficie de rodadura tipo asfalto sobre bases tratadas. Sella la base, incrementa la capacidad estructural y es ideal para reciclado en frío en sitio y caminos de bajo y medio volumen.'
  }

  if (t.includes('sx prime') || t.includes('sx-prime') || t.includes('prime')) {
    return isEn
      ? 'SX Prime (TP) is a non-petroleum prime coat designed to replace MC-30. It offers deep penetration in granular bases and excellent adhesion before placing the wearing course, with much lower emissions than traditional cutback asphalts.'
      : 'SX Prime (TP) es una imprimación no petrolera diseñada para reemplazar productos como MC-30. Ofrece alta penetración en bases granulares y excelente adherencia antes de colocar la carpeta de rodadura, con emisiones mucho menores que los asfaltenos cortados tradicionales.'
  }

  if (t.includes('sx fog') || t.includes('sx-fog') || t.includes('fog')) {
    return isEn
      ? 'SX Fog (TF) is a fog seal for pavement preservation and rejuvenation. It seals microcracks, slows oxidation and extends pavement life at a low cost, ideal as preventive maintenance on aged asphalt and existing chip seals.'
      : 'SX Fog (TF) es un tratamiento tipo fog seal para preservación y rejuvenecimiento de pavimentos. Sella microfisuras, reduce la oxidación y extiende la vida útil del pavimento a bajo costo, ideal como mantenimiento preventivo sobre asfaltos envejecidos y sellos existentes.'
  }

  if (t.includes('price') || t.includes('cost') || t.includes('precio') || t.includes('costo')) {
    return isEn
      ? 'Pricing depends on volumes, application method and project conditions. For a specific quotation, please use the contact form or the WhatsApp bubble so our team can review your project details.'
      : 'El precio depende de los volúmenes, método de aplicación y condiciones de su proyecto. Para una cotización específica, utilice el formulario de contacto o la burbuja de WhatsApp y nuestro equipo revisará los detalles de su proyecto.'
  }

  if (t.includes('contact') || t.includes('cotizacion') || t.includes('cotización')) {
    return isEn
      ? 'You can request a quote or more information through the Contact section of the site or by using the WhatsApp bubble at the bottom right. We will be glad to review your project and recommend the best RoadBuilder solution.'
      : 'Puede solicitar una cotización o más información desde la sección de Contacto del sitio o usando la burbuja de WhatsApp en la esquina inferior derecha. Con gusto revisaremos su proyecto y le recomendaremos la mejor solución RoadBuilder.'
  }

  return isEn
    ? "I can help you with information about RoadBuilder's products (TSW, TSB, SX Prime, SX Fog), their applications and benefits. Could you please rephrase your question with the product or topic you are interested in?"
    : 'Puedo ayudarte con información sobre los productos RoadBuilder (TSW, TSB, SX Prime, SX Fog), sus aplicaciones y beneficios. ¿Podrías reformular tu pregunta indicando el producto o tema que te interesa?'
}

