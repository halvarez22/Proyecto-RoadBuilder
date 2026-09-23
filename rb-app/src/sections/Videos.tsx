import { motion } from 'framer-motion'
import { useLanguage } from '../i18n'

type VideoItem = {
  src: string
  poster: string
  titleEs: string
  titleEn: string
}

const videos: VideoItem[] = [
  {
    src: '/videos/video_1_escarcificado.mp4',
    poster: '/media/video-posters/video_1_escarcificado.jpg',
    titleEs: 'Video 1 – Escarificado de la superficie',
    titleEn: 'Video 1 – Surface scarification',
  },
  {
    src: '/videos/video_2_aplanado.mp4',
    poster: '/media/video-posters/video_2_aplanado.jpg',
    titleEs: 'Video 2 – Aplanado / conformación',
    titleEn: 'Video 2 – Grading / shaping',
  },
  {
    src: '/videos/video_3_aplicacion_TSW.mp4',
    poster: '/media/video-posters/video_3_aplicacion_tsw.jpg',
    titleEs: 'Video 3 – Aplicación de TSW',
    titleEn: 'Video 3 – TSW application',
  },
  {
    src: '/videos/video_4_aplicacion TSB.mp4',
    poster: '/media/video-posters/video_4_aplicacion_tsb.jpg',
    titleEs: 'Video 4 – Aplicación de TSB',
    titleEn: 'Video 4 – TSB application',
  },
  {
    src: '/videos/video_5_prueba final.mp4',
    poster: '/media/video-posters/video_5_prueba_final.jpg',
    titleEs: 'Video 5 – Prueba final de camino',
    titleEn: 'Video 5 – Final road test',
  },
]

export default function Videos() {
  const { lang } = useLanguage()
  const isEn = lang === 'en'

  return (
    <section
      id="videos"
      className="py-16 md:py-24 bg-white/5 min-h-[calc(100vh-64px)] flex items-center scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-4 w-full">
        <div className="text-center mb-10">
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">
            {isEn ? 'Application Videos' : 'Videos de Aplicación'}
          </h2>
          <p className="mt-2 font-sans text-slate-300">
            {isEn
              ? 'See how RoadBuilder products are applied on real job sites.'
              : 'Conozca cómo se aplican los productos RoadBuilder en obra real.'}
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
                <div className="relative w-full aspect-video bg-black/40">
                  <video
                    src={v.src}
                    poster={v.poster}
                    controls
                    preload="none"
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 text-center border-t border-white/10">
                  <h3 className="font-sans text-sm font-semibold text-slate-100">
                    {isEn ? v.titleEn : v.titleEs}
                  </h3>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
