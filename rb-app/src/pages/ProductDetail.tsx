import { useParams } from 'react-router-dom'

type ProductSection = {
  title: string
  body: string
  items?: string[]
}

type ProductPage = {
  title: string
  subtitle: string
  desc: string
  img: string
  bullets: string[]
  sections: ProductSection[]
}

const PRODUCTS: Record<string, ProductPage> = {
  'tsw': {
    title: 'Top-Seal White (TSW)',
    subtitle: 'Estabilizador de suelos y control de polvo de alto desempeño',
    desc: 'Top-Seal White (TSW) es un estabilizador de suelos líquido, no petrolero, desarrollado en la Universidad de Texas en Austin. Se mezcla con agua y se aplica con equipo convencional para transformar suelos sueltos en capas sólidas, resistentes y con baja permeabilidad.',
    bullets: [
      'Incrementa significativamente la resistencia del suelo',
      'Reduce polvo, erosión y problemas de base',
      'No contiene solventes ni VOCs; formulación ecológica',
      'Mejora la resistencia al agua y al tráfico pesado',
    ],
    img: '/Top-Seal White (TSW).png',
    sections: [
      {
        title: '¿Cómo funciona Top-Seal White?',
        body:
          'TSW es una emulsión polimérica que se mezcla con agua y se aplica durante la construcción normal del camino. El polímero recubre y enlaza las partículas del suelo, creando una matriz sólida y flexible que resiste el agrietamiento y la acción del agua.',
        items: [
          'Se aplica diluido con agua sobre la capa de base o subrasante',
          'No requiere equipo especializado para su aplicación',
          'La superficie puede abrirse al tráfico en tiempos muy cortos',
        ],
      },
      {
        title: 'Aplicaciones típicas',
        body: 'TSW es ideal para estabilizar suelos y controlar el polvo en una gran variedad de proyectos.',
        items: [
          'Caminos rurales y de acceso a desarrollos',
          'Estacionamientos y patios de maniobras',
          'Plataformas industriales y mineras',
          'Pistas de aterrizaje, helipuertos y aeródromos rurales',
          'Control de erosión en taludes, canales y bordos',
        ],
      },
      {
        title: 'Beneficios para su proyecto',
        body:
          'Al comparar TSW con estabilizaciones tradicionales, se obtienen ahorros importantes en costos de mantenimiento y una reducción considerable en emisiones de polvo y problemas ambientales.',
        items: [
          'Desempeño comparable a estabilizaciones con cemento en muchas aplicaciones',
          'Menor costo total de ciclo de vida que soluciones convencionales',
          'Reducción de quejas por polvo y mejor visibilidad en caminos',
          'Producto amigable con el medio ambiente y seguro para el personal',
        ],
      },
    ],
  },
  'tsb': {
    title: 'Top-Seal Black (TSB)',
    subtitle: 'Recubrimiento tipo asfalto y superficie de rodadura',
    desc: 'Top-Seal Black (TSB) es un recubrimiento polimérico negro que genera una superficie de rodadura tipo asfalto sobre la base tratada, sin utilizar productos petroleros. Forma una membrana continua que sella la base e incrementa la capacidad estructural del camino.',
    bullets: [
      'Crea una superficie negra tipo asfalto',
      'Sella la base y reduce la penetración de agua y aire',
      'No emite VOCs ni contiene solventes',
      'Alternativa ecológica a recubrimientos asfálticos tradicionales',
    ],
    img: '/Top-Seal Black (TSB).jpg',
    sections: [
      {
        title: '¿Qué hace diferente a Top-Seal Black?',
        body:
          'TSB forma una capa independiente sobre la base, creando una superficie de rodadura continua y de alto desempeño. La membrana polimérica evita la intrusión de agua y aire, protege la estructura del camino y mejora la fricción superficial.',
        items: [
          'Se aplica diluido con agua a una tasa típica de alrededor de 0.5 L/m²',
          'No requiere calentamiento ni calderas de asfalto',
          'Cura rápidamente, permitiendo habilitar el tránsito en poco tiempo',
        ],
      },
      {
        title: 'Usos recomendados',
        body: 'TSB es adecuado tanto para caminos nuevos como para rehabilitación y reciclado en frío.',
        items: [
          'Caminos rurales y secundarios',
          'Estacionamientos y vialidades internas en desarrollos',
          'Recubrimiento de bases tratadas con Top-Seal White u otros estabilizadores',
          'Revestimiento de caminos con reciclado en frío en sitio',
        ],
      },
      {
        title: 'Ventajas clave',
        body:
          'Al ser un recubrimiento no petrolero, TSB reduce el impacto ambiental y simplifica la logística de obra, manteniendo o superando el desempeño de recubrimientos convencionales.',
        items: [
          'Mayor seguridad y menor riesgo de quemaduras en obra (no requiere calentamiento)',
          'Reducción de emisiones y olores asociados al asfalto',
          'Mejora la fricción y acorta distancias de frenado',
          'Mayor vida útil de la superficie y menor mantenimiento',
        ],
      },
    ],
  },
  'sx-prime': {
    title: 'SX Prime (TP)',
    subtitle: 'Imprimación no petrolera para bases y subrasantes',
    desc: 'SX Prime (TP) es una imprimación líquida no petrolera diseñada para reemplazar productos como MC-30 en la preparación de superficies antes de colocar la capa de rodadura. Ofrece alta penetración, excelente adherencia y menores emisiones.',
    bullets: [
      'Imprimación no petrolera para reemplazar MC-30',
      'Alta penetración en bases y subrasantes granulares',
      'Sin VOCs significativos ni solventes volátiles',
      'Diseñado para condiciones de clima y tráfico exigentes',
    ],
    img: '/SX Prime (TP).png',
    sections: [
      {
        title: 'Función de la imprimación SX Prime',
        body:
          'SX Prime se aplica sobre la base o subrasante para fijar partículas sueltas, reducir el polvo y mejorar la adherencia con la capa de rodadura posterior. Su formulación no petrolera ofrece una alternativa más limpia y segura que los cortes asfálticos tradicionales.',
        items: [
          'Penetra en la base granular para fijar partículas superficiales',
          'Reduce el desprendimiento de material durante la construcción',
          'Favorece la unión entre base y carpeta de rodadura',
        ],
      },
      {
        title: 'Ventajas frente a imprimaciones convencionales',
        body:
          'A diferencia de imprimaciones a base de asfalto cortado con solventes, SX Prime está formulado para minimizar emisiones y tiempos de espera, manteniendo al mismo tiempo un excelente desempeño.',
        items: [
          'Menor impacto ambiental y menores restricciones por emisiones',
          'Tiempos de apertura a tráfico y siguientes capas más cortos',
          'Compatible con una amplia gama de sistemas de recubrimiento',
        ],
      },
      {
        title: 'Aplicaciones típicas',
        body: 'SX Prime puede emplearse en proyectos nuevos o de rehabilitación.',
        items: [
          'Caminos rurales y carreteras de bajo y medio volumen',
          'Estacionamientos y vialidades internas',
          'Bases estabilizadas que requieren imprimación previa a recubrimiento',
        ],
      },
    ],
  },
  'sx-fog': {
    title: 'SX Fog (TF)',
    subtitle: 'Tratamiento de preservación y rejuvenecimiento de pavimentos',
    desc: 'SX Fog (TF) es un tratamiento tipo fog seal formulado para preservar y rejuvenecer superficies asfálticas existentes. Sella microfisuras, reduce la oxidación y prolonga la vida útil del pavimento a bajo costo.',
    bullets: [
      'Sella microfisuras y reduce la oxidación del asfalto',
      'Mejora la apariencia y rejuvenece superficies envejecidas',
      'Tratamiento preventivo de bajo costo',
      'Ayuda a retrasar intervenciones mayores de rehabilitación',
    ],
    img: '/SX Fog (TF).png',
    sections: [
      {
        title: '¿Qué es un fog seal como SX Fog?',
        body:
          'SX Fog es una emulsión que se aplica en una dosificación ligera sobre pavimentos asfálticos existentes. Penetra en la superficie, rellena vacíos finos y sella microfisuras, ayudando a impedir la entrada de agua y aire que aceleran el deterioro.',
        items: [
          'Se aplica en tasas típicas cercanas a 0.1 gal/yd² (aprox. 0.45 L/m²)',
          'Requiere un cierre temporal de la vía mientras cura',
          'Devuelve a la superficie un color negro renovado',
        ],
      },
      {
        title: 'Cuándo usar SX Fog',
        body:
          'Es ideal como tratamiento preventivo antes de que aparezcan daños severos, o como mantenimiento sobre sellos existentes y mezclas asfálticas envejecidas.',
        items: [
          'Pavimentos con oxidación superficial y pérdida de color',
          'Sellos previos de gravilla que empiezan a mostrar desgaste',
          'Caminos de bajo y medio volumen de tránsito',
          'Pistas y calles de rodaje con superficie envejecida',
        ],
      },
      {
        title: 'Beneficios económicos y de desempeño',
        body:
          'Al aplicar SX Fog a tiempo, se extiende la vida útil del pavimento y se pospone la necesidad de tratamientos más costosos.',
        items: [
          'Reducción del costo de ciclo de vida del pavimento',
          'Menor frecuencia de intervenciones mayores',
          'Mejor confort y seguridad para los usuarios',
        ],
      },
    ],
  },
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const p = (slug && PRODUCTS[slug]) || PRODUCTS['tsw']

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 space-y-8">
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <img src={p.img} alt={p.title} className="w-full aspect-[16/6] object-cover" />
        </div>

        <header>
          <p className="font-sans text-sm font-semibold text-primary uppercase tracking-wide mb-1">
            Solución RoadBuilder
          </p>
          <h1 className="font-sans text-4xl font-extrabold mb-1 text-white">{p.title}</h1>
          <h2 className="font-sans text-lg text-slate-200 mb-3">{p.subtitle}</h2>
          <p className="font-sans text-slate-300 mb-4 leading-relaxed">{p.desc}</p>
          <ul className="font-sans list-disc pl-6 grid gap-1 text-slate-200">
            {p.bullets.map((b) => (
              <li key={b} className="mb-0.5">{b}</li>
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
          <a
            href="/#contacto"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 font-extrabold text-black shadow-md hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Solicitar Cotización
          </a>
          <a
            href="/#productos"
            className="inline-flex items-center rounded-xl border-2 border-primary px-6 py-3 font-extrabold text-primary hover:bg-primary hover:text-black shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Volver a Productos
          </a>
        </div>
      </div>
    </section>
  )
}
