import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n'

export default function Navbar() {
  const { lang, setLang } = useLanguage()
  const isEn = lang === 'en'
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-bg/80 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-sans" onClick={closeMobile}>
          <div className="relative w-9 h-9 rounded-md bg-primary/90 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src="/raod_builder_logo-removebg-preview.png"
              alt="RoadBuilder"
              className="h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            />
          </div>
          <span className="font-extrabold tracking-wide text-white">RoadBuilder</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-sans">
          <a href="/" className="text-slate-200 hover:text-primary transition-colors duration-200">
            {isEn ? 'Home' : 'Inicio'}
          </a>
          <a
            href="/#beneficios"
            className="text-slate-200 hover:text-primary transition-colors duration-200"
          >
            {isEn ? 'Benefits' : 'Beneficios'}
          </a>
          <a
            href="/#productos"
            className="text-slate-200 hover:text-primary transition-colors duration-200"
          >
            {isEn ? 'Products' : 'Productos'}
          </a>
          <a
            href="/#videos"
            className="text-slate-200 hover:text-primary transition-colors duration-200"
          >
            {isEn ? 'Application Videos' : 'Videos'}
          </a>
          <a
            href="/#contacto"
            className="rounded-lg border border-primary px-3 py-1.5 font-bold text-black bg-primary shadow-sm hover:brightness-110 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            {isEn ? 'Contact' : 'Contacto'}
          </a>
          <div className="ml-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang('es')}
              className={`inline-flex h-7 w-10 items-center justify-center ${
                !isEn ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              } transition-opacity duration-200`}
              aria-label="Español"
            >
              <img src="/flag-mx.png" alt="Español" className="h-6 w-auto" />
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`inline-flex h-7 w-10 items-center justify-center ${
                isEn ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              } transition-opacity duration-200`}
              aria-label="English"
            >
              <img src="/flag-us.png" alt="English" className="h-6 w-auto" />
            </button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="sm:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-white/20 text-slate-200 hover:border-primary hover:text-primary transition-colors duration-200"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={isEn ? 'Toggle navigation' : 'Abrir menú'}
        >
          <span className="sr-only">Menu</span>
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-white/10 bg-bg/95 backdrop-blur-md">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 text-sm font-sans">
            <a
              href="/"
              className="text-slate-200 hover:text-primary transition-colors duration-200"
              onClick={closeMobile}
            >
              {isEn ? 'Home' : 'Inicio'}
            </a>
            <a
              href="/#beneficios"
              className="text-slate-200 hover:text-primary transition-colors duration-200"
              onClick={closeMobile}
            >
              {isEn ? 'Benefits' : 'Beneficios'}
            </a>
            <a
              href="/#productos"
              className="text-slate-200 hover:text-primary transition-colors duration-200"
              onClick={closeMobile}
            >
              {isEn ? 'Products' : 'Productos'}
            </a>
            <a
              href="/#videos"
              className="text-slate-200 hover:text-primary transition-colors duration-200"
              onClick={closeMobile}
            >
              {isEn ? 'Application Videos' : 'Videos'}
            </a>
            <a
              href="/#contacto"
              className="mt-1 rounded-lg border border-primary px-3 py-1.5 font-bold text-black bg-primary shadow-sm hover:brightness-110 hover:shadow-md transition-all duration-200"
              onClick={closeMobile}
            >
              {isEn ? 'Contact' : 'Contacto'}
            </a>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xs text-slate-400">
                {isEn ? 'Language' : 'Idioma'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLang('es')}
                  className={`inline-flex h-7 w-10 items-center justify-center ${
                    !isEn ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  } transition-opacity duration-200`}
                  aria-label="Español"
                >
                  <img src="/flag-mx.png" alt="Español" className="h-6 w-auto" />
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`inline-flex h-7 w-10 items-center justify-center ${
                    isEn ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  } transition-opacity duration-200`}
                  aria-label="English"
                >
                  <img src="/flag-us.png" alt="English" className="h-6 w-auto" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
