import { Link } from 'react-router-dom'

const cards = [
  {
    slug: 'tsw',
    title: 'Top-Seal White (TSW)',
    desc: 'Estabilización de suelos, control de polvo y erosión; mejora resistencia e impermeabilidad.',
    img: '/Top-Seal White (TSW).png'
  },
  {
    slug: 'tsb',
    title: 'Top-Seal Black (TSB)',
    desc: 'Recubrimiento para caminos y reciclado en frío; no petrolero.',
    img: '/Top-Seal Black (TSB).jpg'
  },
  {
    slug: 'sx-prime',
    title: 'SX Prime (TP)',
    desc: 'Imprimación no petrolera; supera MC-30; sin VOCs.',
    img: '/SX Prime (TP).png'
  },
  {
    slug: 'sx-fog',
    title: 'SX Fog (TF)',
    desc: 'Preservación y rejuvenecimiento; sella microfisuras.',
    img: '/SX Fog (TF).png'
  },
]

export default function Products(){
  return (
    <section id="productos" className="py-16 min-h-[calc(100vh-64px)] flex items-center scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold">Nuestros Productos</h2>
          <p className="text-slate-300">Soluciones para estabilización, recubrimiento, imprimación y preservación.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map(c=>(
            <article
              key={c.slug}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur flex flex-col h-full"
            >
              <img src={c.img} alt={c.title} className="aspect-video w-full object-cover" />
              <div className="p-4 flex flex-col gap-2 items-center text-center flex-1">
                <h3 className="text-primary font-bold">{c.title}</h3>
                <p className="text-sm text-slate-300">{c.desc}</p>
                <Link
                  to={`/product/${c.slug}`}
                  className="mt-auto inline-flex justify-center rounded-lg border-2 border-primary px-4 py-2 font-extrabold text-primary hover:bg-primary hover:text-black mx-auto"
                >
                  Saber más
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
