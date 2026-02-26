import { motion } from 'framer-motion'
import { useLanguage } from '../i18n'

export default function Hero() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'

  return (
    <section
      className="relative min-h-[calc(100vh-64px)] flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/roadbuilder_7.png')" }}
    >
      <div className="relative mx-auto max-w-[920px] w-full px-4 flex flex-col items-center text-center gap-4">
        <motion.div
          className="w-full flex items-center justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/raod_builder_logo-removebg-preview.png"
            alt="RoadBuilder"
            className="block w-auto max-h-[220px] sm:max-h-[260px] md:max-h-[320px] lg:max-h-[380px] scale-[1.8] md:scale-[2] drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          />
        </motion.div>
        <motion.div
          className="relative max-w-[720px] rounded-2xl bg-white/20 backdrop-blur-sm px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.24)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h1 className="mt-2 font-sans text-4xl md:text-6xl font-black leading-tight tracking-tight text-slate-900">
            {isEn
              ? 'Innovative solutions for roads and pavements'
              : 'Soluciones innovadoras para caminos y pavimentos'}
          </h1>
          <p className="mt-3 font-sans text-lg font-bold leading-relaxed text-slate-900">
            {isEn
              ? 'Improving the World’s Roads with eco-friendly, cost-effective and high-performance products.'
              : 'Mejorando los Caminos del Mundo con productos ecológicos, costo-efectivos y de alto desempeño.'}
          </p>
        </motion.div>
        <motion.div
          className="mt-4 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a
            href="#contacto"
            className="inline-flex items-center rounded-xl border-2 border-primary bg-black/70 px-6 py-3 font-extrabold text-primary hover:bg-primary hover:text-black transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            {isEn ? 'Request a Quote' : 'Solicite una Cotización'}
          </a>
          <a
            href="#productos"
            className="inline-flex items-center rounded-xl border-2 border-primary bg-black/70 px-6 py-3 font-extrabold text-primary hover:bg-primary hover:text-black transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            {isEn ? 'View Products' : 'Conozca los Productos'}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
