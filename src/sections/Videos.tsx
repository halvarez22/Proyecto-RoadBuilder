import { motion } from 'framer-motion'

const videos = [
  {
    src: '/videos/video_1_escarcificado.mp4',
    title: 'Video 1 – Escarificado de la superficie',
  },
  {
    src: '/videos/video_2_aplanado.mp4',
    title: 'Video 2 – Aplanado / conformación',
  },
  {
    src: '/videos/video_3_aplicacion_TSW.mp4',
    title: 'Video 3 – Aplicación de TSW',
  },
  {
    src: '/videos/video_4_aplicacion TSB.mp4',
    title: 'Video 4 – Aplicación de TSB',
  },
  {
    src: '/videos/video_5_prueba final.mp4',
    title: 'Video 5 – Prueba final de camino',
  },
]

export default function Videos() {
  return (
    <section
      id="videos"
      className="py-16 md:py-24 bg-white/5 min-h-[calc(100vh-64px)] flex items-center scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-4 w-full">
        <div className="text-center mb-10">
          <h2 className="font-sans text-3xl font-extrabold text-white">Videos de Aplicación</h2>
          <p className="mt-2 font-sans text-slate-300">
            Conozca cómo se aplican los productos RoadBuilder en obra real.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((v, i) => (
            <motion.div
              key={v.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="h-full"
            >
              <article className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                <div className="relative w-full aspect-video">
                  <video
                    src={v.src}
                    controls
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 text-center border-t border-white/10">
                  <h3 className="font-sans text-sm font-semibold text-slate-100">{v.title}</h3>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

