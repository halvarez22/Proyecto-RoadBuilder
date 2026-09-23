import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLocalizedProduct, listProducts } from '../data/products'
import { useLanguage } from '../i18n'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useLanguage()
  const isEn = lang === 'en'
  const p = getLocalizedProduct(slug, lang)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug, lang])

  if (!p) {
    return (
      <section className="py-16 min-h-[50vh] flex items-center">
        <div className="mx-auto max-w-lg px-4 text-center space-y-4">
          <p className="font-sans text-sm font-semibold text-primary uppercase tracking-wide">404</p>
          <h1 className="font-sans text-3xl font-extrabold text-white">
            {isEn ? 'Product not found' : 'Producto no encontrado'}
          </h1>
          <p className="font-sans text-slate-300">
            {isEn ? 'There is no product with id' : 'No existe un producto con el identificador'}{' '}
            <span className="text-white font-semibold">{slug || '(empty)'}</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/#productos"
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-extrabold text-black shadow-md hover:brightness-110 transition-all"
            >
              {isEn ? 'View products' : 'Ver productos'}
            </Link>
            <Link
              to="/"
              className="inline-flex items-center rounded-xl border-2 border-primary px-6 py-3 font-extrabold text-primary hover:bg-primary hover:text-black transition-all"
            >
              {isEn ? 'Go home' : 'Ir al inicio'}
            </Link>
          </div>
          <ul className="font-sans text-sm text-slate-400 pt-4 space-y-1">
            {listProducts().map((item) => (
              <li key={item.slug}>
                <Link to={`/product/${item.slug}`} className="text-primary hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 sm:py-16 pb-24 sm:pb-16">
      <div className="mx-auto max-w-5xl px-4 space-y-6 sm:space-y-8">
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <img
            src={p.img}
            alt={p.title}
            className="w-full aspect-video sm:aspect-[16/6] object-cover"
          />
        </div>

        <header>
          <p className="font-sans text-sm font-semibold text-primary uppercase tracking-wide mb-1">
            {isEn ? 'RoadBuilder Solution' : 'Solución RoadBuilder'}
          </p>
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 text-white">
            {p.title}
          </h1>
          <h2 className="font-sans text-base sm:text-lg text-slate-200 mb-3">{p.subtitle}</h2>
          <p className="font-sans text-slate-300 mb-4 leading-relaxed">{p.desc}</p>
          <ul className="font-sans list-disc pl-6 grid gap-1 text-slate-200">
            {p.bullets.map((b) => (
              <li key={b} className="mb-0.5">
                {b}
              </li>
            ))}
          </ul>
        </header>

        <div className="space-y-8">
          {p.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg"
            >
              <h3 className="font-sans text-xl font-bold mb-2 text-primary">{section.title}</h3>
              <p className="font-sans text-slate-300 mb-2 leading-relaxed">{section.body}</p>
              {section.items && (
                <ul className="font-sans list-disc pl-5 text-slate-200 space-y-1">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <Link
            to="/#contacto"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-extrabold text-black shadow-md hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {isEn ? 'Request a Quote' : 'Solicitar Cotización'}
          </Link>
          <Link
            to="/#productos"
            className="inline-flex items-center rounded-xl border-2 border-primary px-6 py-3 font-extrabold text-primary hover:bg-primary hover:text-black shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {isEn ? 'Back to Products' : 'Volver a Productos'}
          </Link>
        </div>
      </div>
    </section>
  )
}
