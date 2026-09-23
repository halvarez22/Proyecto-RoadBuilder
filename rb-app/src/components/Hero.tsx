import { useLanguage } from '../i18n'

export default function Hero() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'

  return (
    <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden py-8 sm:py-10">
      {/* Misma foto original (roadbuilder_7), solo optimizada WebP/JPEG */}
      <picture className="absolute inset-0">
        <source media="(max-width: 768px)" srcSet="/media/hero-768.webp" type="image/webp" />
        <source media="(max-width: 768px)" srcSet="/media/hero-768.jpg" type="image/jpeg" />
        <source srcSet="/media/hero.webp" type="image/webp" />
        <img
          src="/media/hero.jpg"
          alt=""
          width={1920}
          height={968}
          decoding="async"
          {...{ fetchpriority: 'high' }}
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div className="relative z-10 mx-auto max-w-[920px] w-full px-4 flex flex-col items-center text-center gap-3 sm:gap-4">
        <div className="w-full max-w-[min(100%,280px)] sm:max-w-[340px] md:max-w-[420px] flex items-center justify-center">
          <img
            src="/raod_builder_logo-removebg-preview.png"
            alt="RoadBuilder"
            className="block w-full h-auto max-h-[140px] sm:max-h-[180px] md:max-h-[220px] object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          />
        </div>
        <div className="relative w-full max-w-[720px] rounded-2xl bg-white/20 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.24)]">
          <h1 className="mt-1 sm:mt-2 font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900">
            {isEn
              ? 'Innovative solutions for roads and pavements'
              : 'Soluciones innovadoras para caminos y pavimentos'}
          </h1>
          <p className="mt-2 sm:mt-3 font-sans text-sm sm:text-base md:text-lg font-bold leading-relaxed text-slate-900">
            {isEn
              ? "Improving the World's Roads with eco-friendly, cost-effective and high-performance products."
              : 'Mejorando los Caminos del Mundo con productos ecológicos, costo-efectivos y de alto desempeño.'}
          </p>
        </div>
        <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-md sm:max-w-none">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary bg-black/70 px-5 py-3 font-extrabold text-primary hover:bg-primary hover:text-black transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
          >
            {isEn ? 'Request a Quote' : 'Solicite una Cotización'}
          </a>
          <a
            href="#productos"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary bg-black/70 px-5 py-3 font-extrabold text-primary hover:bg-primary hover:text-black transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
          >
            {isEn ? 'View Products' : 'Conozca los Productos'}
          </a>
        </div>
      </div>
    </section>
  )
}
