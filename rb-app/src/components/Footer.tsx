import { useLanguage } from '../i18n'

export default function Footer() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'

  return (
    <footer className="mt-16 border-t border-white/10 py-10 pb-28 sm:pb-10">
      <div className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-400 space-y-2">
        <p>
          <a href="tel:+524747421030" className="text-slate-300 hover:text-primary transition-colors">
            (52) 474 742 1030
          </a>
          {' · '}
          <a href="tel:+524747421031" className="text-slate-300 hover:text-primary transition-colors">
            (52) 474 742 1031
          </a>
        </p>
        <p>
          {isEn
            ? '© 2014 RoadBuilder. All rights reserved.'
            : '© 2014 RoadBuilder. Todos los derechos reservados.'}
        </p>
      </div>
    </footer>
  )
}
