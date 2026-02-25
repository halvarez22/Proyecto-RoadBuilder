import { motion } from 'framer-motion'

const cards = [
  {
    title: 'Mayor durabilidad',
    main: 'Top-Seal White (TSW) y SX Prime (TP) incrementan la resistencia estructural de la base y subrasante, reducen la formación de baches y deformaciones, y alargan la vida útil del pavimento antes de requerir rehabilitaciones mayores.',
    sub: 'TSW estabiliza el suelo y controla el polvo en la estructura del camino; SX Prime mejora la adherencia entre base y carpeta, evitando desprendimientos prematuros.',
  },
  {
    title: 'Eficiencia en costos',
    main: 'Top-Seal Black (TSB) y SX Fog (TF) permiten recubrir y preservar caminos existentes con menor consumo de materiales, menos equipo especializado y menores tiempos de cierre al tránsito frente a soluciones tradicionales.',
    sub: 'TSB genera una superficie negra tipo asfalto sobre bases tratadas, ideal para reciclado en frío en sitio; SX Fog actúa como sellador de microfisuras que retrasa intervenciones costosas y extiende la vida del pavimento.',
  },
  {
    title: 'Enfoque ecológico',
    main: 'Toda la línea RoadBuilder (TSW, TSB, SX Prime y SX Fog) está formulada con tecnologías no petroleras o de muy bajas emisiones, reduciendo el uso de solventes y VOCs frente a estabilizaciones e imprimaciones convencionales.',
    sub: 'Esto se traduce en menos impacto ambiental en obra, mejores condiciones para el personal y una solución alineada con políticas de sustentabilidad y responsabilidad social.',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="py-16 md:py-24 bg-white/5 min-h-[calc(100vh-64px)] flex items-center scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 w-full">
        <div className="md:col-span-3 text-center mb-10">
          <h2 className="font-sans text-3xl font-extrabold text-white">Beneficios de RoadBuilder</h2>
          <p className="mt-2 font-sans text-slate-300 max-w-2xl mx-auto">
            Soluciones sostenibles, costo-efectivas y de alto desempeño para la construcción y mantenimiento de caminos.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 mt-10">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="font-sans font-bold text-primary text-lg">{card.title}</h3>
              <p className="mt-3 font-sans text-slate-300 text-sm leading-relaxed">{card.main}</p>
              <p className="mt-2 font-sans text-slate-400 text-xs leading-relaxed">{card.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

