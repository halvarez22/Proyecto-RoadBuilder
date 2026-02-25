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
      className="py-16 bg-white/5 min-h-[calc(100vh-64px)] flex items-center scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-4 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold">Videos de Aplicación</h2>
          <p className="text-slate-300">
            Conozca cómo se aplican los productos RoadBuilder en obra real.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((v) => (
            <article
              key={v.src}
              className="rounded-xl border border-white/10 bg-black/40 overflow-hidden"
            >
              <div className="relative w-full aspect-video">
                <video
                  src={v.src}
                  controls
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-slate-100">{v.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

