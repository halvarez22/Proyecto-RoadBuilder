import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n'

export default function Products() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'

  const cards = isEn
    ? [
        {
          slug: 'tsw',
          title: 'Top-Seal White (TSW)',
          desc: 'Liquid soil stabilizer for dust and erosion control that improves strength and reduces permeability.',
          img: '/Top-Seal White (TSW).png',
        },
        {
          slug: 'tsb',
          title: 'Top-Seal Black (TSB)',
          desc: 'Non-petroleum black surface treatment for roads and in-place cold recycling.',
          img: '/Top-Seal Black (TSB).jpg',
        },
        {
          slug: 'sx-prime',
          title: 'SX Prime (TP)',
          desc: 'Non-petroleum prime coat that replaces MC-30 with high penetration and low emissions.',
          img: '/SX Prime (TP).png',
        },
        {
          slug: 'sx-fog',
          title: 'SX Fog (TF)',
          desc: 'Fog seal for pavement preservation and rejuvenation that seals microcracks.',
          img: '/SX Fog (TF).png',
        },
      ]
    : [
        {
          slug: 'tsw',
          title: 'Top-Seal White (TSW)',
          desc: 'Estabilización de suelos, control de polvo y erosión; mejora resistencia e impermeabilidad.',
          img: '/Top-Seal White (TSW).png',
        },
        {
          slug: 'tsb',
          title: 'Top-Seal Black (TSB)',
          desc: 'Recubrimiento para caminos y reciclado en frío; no petrolero.',
          img: '/Top-Seal Black (TSB).jpg',
        },
        {
          slug: 'sx-prime',
          title: 'SX Prime (TP)',
          desc: 'Imprimación no petrolera; supera MC-30; sin VOCs.',
          img: '/SX Prime (TP).png',
        },
        {
          slug: 'sx-fog',
          title: 'SX Fog (TF)',
          desc: 'Preservación y rejuvenecimiento; sella microfisuras.',
          img: '/SX Fog (TF).png',
        },
      ]

  return (
    <section id="productos" className="py-16 md:py-24 min-h-[calc(100vh-64px)] flex items-center scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 w-full">
        <div className="text-center mb-10">
          <h2 className="font-sans text-3xl font-extrabold text-white">
            {isEn ? 'Our Products' : 'Nuestros Productos'}
          </h2>
          <p className="mt-2 font-sans text-slate-300">
            {isEn
              ? 'Solutions for soil stabilization, surfacing, prime coat and pavement preservation.'
              : 'Soluciones para estabilización, recubrimiento, imprimación y preservación.'}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="h-full"
            >
              <article className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur flex flex-col h-full shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                <img src={c.img} alt={c.title} className="aspect-video w-full object-cover" />
                <div className="p-6 flex flex-col gap-2 items-center text-center flex-1">
                  <h3 className="font-sans text-primary font-bold">{c.title}</h3>
                  <p className="font-sans text-sm text-slate-300 leading-relaxed">{c.desc}</p>
                  <Link
                    to={`/product/${c.slug}`}
                    className="mt-auto inline-flex justify-center rounded-xl border-2 border-primary px-4 py-2 font-extrabold text-primary hover:bg-primary hover:text-black mx-auto transition-colors duration-200"
                  >
                    {isEn ? 'Learn more' : 'Saber más'}
                  </Link>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
