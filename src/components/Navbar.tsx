import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n'

function LangFlags({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage()
  const isEn = lang === 'en'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => setLang('es')}
        className={`inline-flex h-7 w-10 items-center justify-center ${
          !isEn ? 'opacity-100' : 'opacity-60 hover:opacity-100'
        } transition-opacity duration-200`}
        aria-label="Español"
        aria-pressed={!isEn}
      >
        <img src="/flag-mx.png" alt="" className="h-6 w-auto" />
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`inline-flex h-7 w-10 items-center justify-center ${
          isEn ? 'opacity-100' : 'opacity-60 hover:opacity-100'
        } transition-opacity duration-200`}
        aria-label="English"
        aria-pressed={isEn}
      >
        <img src="/flag-us.png" alt="" className="h-6 w-auto" />
      </button>
    </div>
  )
}

const NAV_LINKS = [
  { href: '/', labelEs: 'Inicio', labelEn: 'Home' },
  { href: '/#beneficios', labelEs: 'Beneficios', labelEn: 'Benefits' },
  { href: '/#productos', labelEs: 'Productos', labelEn: 'Products' },
  { href: '/#videos', labelEs: 'Videos', labelEn: 'Videos' },
] as const

export default function Navbar() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-bg/80 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 font-sans shrink-0" onClick={close}>
          <div className="relative w-9 h-9 rounded-md bg-primary/90 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src="/raod_builder_logo-removebg-preview.png"
              alt="RoadBuilder"
              className="h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            />
          </div>
          <span className="font-extrabold tracking-wide text-white text-sm lg:text-base truncate max-w-[42vw] lg:max-w-none">
            RoadBuilder
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-sans" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-slate-200 hover:text-primary transition-colors duration-200"
            >
              {isEn ? item.labelEn : item.labelEs}
            </a>
          ))}
          <a
            href="/#contacto"
            className="rounded-lg border border-primary px-3 py-1.5 font-bold text-black bg-primary shadow-sm hover:brightness-110 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            {isEn ? 'Contact' : 'Contacto'}
          </a>
          <LangFlags className="ml-2" />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LangFlags />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white hover:border-primary/50 hover:text-primary transition-colors"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? (isEn ? 'Close menu' : 'Cerrar menú') : isEn ? 'Open menu' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? (isEn ? 'Close' : 'Cerrar') : isEn ? 'Menu' : 'Menú'}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id={menuId}
          className="lg:hidden border-t border-white/10 bg-bg/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1 font-sans text-sm"
          aria-label={isEn ? 'Mobile' : 'Móvil'}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-lg px-3 py-2.5 text-slate-200 hover:bg-white/5 hover:text-primary transition-colors"
            >
              {isEn ? item.labelEn : item.labelEs}
            </a>
          ))}
          <a
            href="/#contacto"
            onClick={close}
            className="mt-1 rounded-lg bg-primary px-3 py-2.5 text-center font-bold text-black"
          >
            {isEn ? 'Contact' : 'Contacto'}
          </a>
        </nav>
      )}
    </header>
  )
}
