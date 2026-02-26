import { useLanguage } from '../i18n'

export default function Footer() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'

  return (
    <footer className="mt-16 border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-400">
        <p>
          © 2014 RoadBuilder.{' '}
          {isEn ? 'All rights reserved.' : 'Todos los derechos reservados.'}
        </p>
      </div>
    </footer>
  )
}
