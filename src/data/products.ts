/**
 * MCP Resource: catálogo de productos RoadBuilder
 * Única fuente de verdad para listado y fichas (/product/:slug) ES/EN.
 */

export type ProductSection = {
  title: string
  body: string
  items?: string[]
}

export type Product = {
  slug: string
  title: string
  cardDesc: string
  cardDescEn: string
  subtitle: string
  subtitleEn: string
  desc: string
  descEn: string
  img: string
  bullets: string[]
  bulletsEn: string[]
  sections: ProductSection[]
  sectionsEn: ProductSection[]
}

/** Vista localizada lista para UI */
export type LocalizedProduct = {
  slug: string
  title: string
  cardDesc: string
  subtitle: string
  desc: string
  img: string
  bullets: string[]
  sections: ProductSection[]
}

export const PRODUCTS: Record<string, Product> = {
  tsw: {
    slug: 'tsw',
    title: 'Top-Seal White (TSW)',
    cardDesc:
      'Estabilización de suelos, control de polvo y erosión; mejora resistencia e impermeabilidad.',
    cardDescEn:
      'Liquid soil stabilizer for dust and erosion control that improves strength and reduces permeability.',
    subtitle: 'Estabilizador de suelos y control de polvo de alto desempeño',
    subtitleEn: 'High-performance soil stabilizer and dust control',
    desc: 'Top-Seal White (TSW) es un estabilizador de suelos líquido, no petrolero, desarrollado en la Universidad de Texas en Austin. Se mezcla con agua y se aplica con equipo convencional para transformar suelos sueltos en capas sólidas, resistentes y con baja permeabilidad.',
    descEn:
      'Top-Seal White (TSW) is a non-petroleum liquid soil stabilizer developed at The University of Texas at Austin. It is mixed with water and applied with conventional equipment to transform loose soils into strong, low-permeability layers.',
    bullets: [
      'Incrementa significativamente la resistencia del suelo',
      'Reduce polvo, erosión y problemas de base',
      'No contiene solventes ni VOCs; formulación ecológica',
      'Mejora la resistencia al agua y al tráfico pesado',
    ],
    bulletsEn: [
      'Significantly increases soil strength',
      'Reduces dust, erosion, and base failures',
      'Solvent-free and VOC-free; environmentally friendly',
      'Improves moisture resistance under heavy traffic',
    ],
    img: '/media/tsw.webp',
    sections: [
      {
        title: '¿Cómo funciona Top-Seal White?',
        body: 'TSW es una emulsión polimérica que se mezcla con agua y se aplica durante la construcción normal del camino. El polímero recubre y enlaza las partículas del suelo, creando una matriz sólida y flexible que resiste el agrietamiento y la acción del agua.',
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
        body: 'Al comparar TSW con estabilizaciones tradicionales, se obtienen ahorros importantes en costos de mantenimiento y una reducción considerable en emisiones de polvo y problemas ambientales.',
        items: [
          'Desempeño comparable a estabilizaciones con cemento en muchas aplicaciones',
          'Menor costo total de ciclo de vida que soluciones convencionales',
          'Reducción de quejas por polvo y mejor visibilidad en caminos',
          'Producto amigable con el medio ambiente y seguro para el personal',
        ],
      },
    ],
    sectionsEn: [
      {
        title: 'How Top-Seal White works',
        body: 'TSW is a polymer emulsion that is mixed with water and applied during normal road construction. The polymer coats and bonds soil particles, creating a solid yet flexible matrix that resists cracking and water intrusion.',
        items: [
          'Applied diluted in water over the base or subgrade',
          'Does not require special equipment for application',
          'Roads can be opened to traffic shortly after application',
        ],
      },
      {
        title: 'Typical applications',
        body: 'TSW is ideal for stabilizing soils and controlling dust across a wide range of projects.',
        items: [
          'Rural access roads and development roads',
          'Parking lots and laydown yards',
          'Industrial and mining platforms',
          'Airstrips, helipads, and rural aerodromes',
          'Erosion control on slopes, channels, and embankments',
        ],
      },
      {
        title: 'Benefits for your project',
        body: 'Compared to traditional stabilizations, TSW can deliver important savings in maintenance costs and a substantial reduction in dust emissions and environmental complaints.',
        items: [
          'Performance comparable to cement stabilization in many applications',
          'Lower life-cycle cost than conventional solutions',
          'Fewer dust complaints and better visibility on roads',
          'Environmentally friendly and safe for crews',
        ],
      },
    ],
  },
  tsb: {
    slug: 'tsb',
    title: 'Top-Seal Black (TSB)',
    cardDesc: 'Recubrimiento para caminos y reciclado en frío; no petrolero.',
    cardDescEn: 'Non-petroleum black surface treatment for roads and in-place cold recycling.',
    subtitle: 'Recubrimiento tipo asfalto y superficie de rodadura',
    subtitleEn: 'Asphalt-like non-petroleum wearing surface',
    desc: 'Top-Seal Black (TSB) es un recubrimiento polimérico negro que genera una superficie de rodadura tipo asfalto sobre la base tratada, sin utilizar productos petroleros. Forma una membrana continua que sella la base e incrementa la capacidad estructural del camino.',
    descEn:
      'Top-Seal Black (TSB) is a black polymer coating that creates an asphalt-like wearing surface over treated bases, without using petroleum products. It forms a continuous membrane that seals the base and increases the structural capacity of the road.',
    bullets: [
      'Crea una superficie negra tipo asfalto',
      'Sella la base y reduce la penetración de agua y aire',
      'No emite VOCs ni contiene solventes',
      'Alternativa ecológica a recubrimientos asfálticos tradicionales',
    ],
    bulletsEn: [
      'Creates a black, asphalt-like surface',
      'Seals the base and reduces water and air penetration',
      'No VOCs or solvents',
      'Eco-friendly alternative to conventional asphalt treatments',
    ],
    img: '/media/tsb.webp',
    sections: [
      {
        title: '¿Qué hace diferente a Top-Seal Black?',
        body: 'TSB forma una capa independiente sobre la base, creando una superficie de rodadura continua y de alto desempeño. La membrana polimérica evita la intrusión de agua y aire, protege la estructura del camino y mejora la fricción superficial.',
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
        body: 'Al ser un recubrimiento no petrolero, TSB reduce el impacto ambiental y simplifica la logística de obra, manteniendo o superando el desempeño de recubrimientos convencionales.',
        items: [
          'Mayor seguridad y menor riesgo de quemaduras en obra (no requiere calentamiento)',
          'Reducción de emisiones y olores asociados al asfalto',
          'Mejora la fricción y acorta distancias de frenado',
          'Mayor vida útil de la superficie y menor mantenimiento',
        ],
      },
    ],
    sectionsEn: [
      {
        title: 'What makes Top-Seal Black different?',
        body: 'TSB forms an independent layer over the base, delivering a continuous, high-performance wearing surface. The polymer membrane prevents water and air from entering the structure, protects the base, and improves surface friction.',
        items: [
          'Applied diluted in water at a typical rate of about 0.5 L/m²',
          'No heating or asphalt kettles required',
          'Cures quickly so the road can be reopened to traffic soon after application',
        ],
      },
      {
        title: 'Recommended uses',
        body: 'TSB is suitable for both new roads and rehabilitation or in-place cold recycling.',
        items: [
          'Rural and secondary roads',
          'Parking lots and internal development roads',
          'Surfacing of bases treated with Top-Seal White or other stabilizers',
          'Surfacing of roads treated with cold in-place recycling',
        ],
      },
      {
        title: 'Key advantages',
        body: 'Because it is a non-petroleum coating, TSB reduces environmental impact and simplifies logistics while maintaining or exceeding the performance of conventional asphalt-based treatments.',
        items: [
          'Greater safety and lower burn risk on site (no heating required)',
          'Reduced emissions and odors associated with asphalt',
          'Improved friction and shorter braking distances',
          'Longer surface life and reduced maintenance',
        ],
      },
    ],
  },
  'sx-prime': {
    slug: 'sx-prime',
    title: 'SX Prime (TP)',
    cardDesc: 'Imprimación no petrolera; supera MC-30; sin VOCs.',
    cardDescEn: 'Non-petroleum prime coat that replaces MC-30 with high penetration and low emissions.',
    subtitle: 'Imprimación no petrolera para bases y subrasantes',
    subtitleEn: 'Non-petroleum prime coat for bases and subgrades',
    desc: 'SX Prime (TP) es una imprimación líquida no petrolera diseñada para reemplazar productos como MC-30 en la preparación de superficies antes de colocar la capa de rodadura. Ofrece alta penetración, excelente adherencia y menores emisiones.',
    descEn:
      'SX Prime (TP) is a non-petroleum liquid prime coat designed to replace MC-30 and similar products when preparing surfaces before placing the wearing course. It offers deep penetration, excellent adhesion, and lower emissions.',
    bullets: [
      'Imprimación no petrolera para reemplazar MC-30',
      'Alta penetración en bases y subrasantes granulares',
      'Sin VOCs significativos ni solventes volátiles',
      'Diseñado para condiciones de clima y tráfico exigentes',
    ],
    bulletsEn: [
      'Non-petroleum prime to replace MC-30',
      'High penetration into granular bases and subgrades',
      'Very low VOCs, no volatile solvents',
      'Designed for demanding climate and traffic conditions',
    ],
    img: '/media/sx-prime.webp',
    sections: [
      {
        title: 'Función de la imprimación SX Prime',
        body: 'SX Prime se aplica sobre la base o subrasante para fijar partículas sueltas, reducir el polvo y mejorar la adherencia con la capa de rodadura posterior. Su formulación no petrolera ofrece una alternativa más limpia y segura que los cortes asfálticos tradicionales.',
        items: [
          'Penetra en la base granular para fijar partículas superficiales',
          'Reduce el desprendimiento de material durante la construcción',
          'Favorece la unión entre base y carpeta de rodadura',
        ],
      },
      {
        title: 'Ventajas frente a imprimaciones convencionales',
        body: 'A diferencia de imprimaciones a base de asfalto cortado con solventes, SX Prime está formulado para minimizar emisiones y tiempos de espera, manteniendo al mismo tiempo un excelente desempeño.',
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
    sectionsEn: [
      {
        title: 'Role of SX Prime as a prime coat',
        body: 'SX Prime is applied over the base or subgrade to lock in loose particles, reduce dust, and improve bonding with the subsequent wearing course. Its non-petroleum formulation offers a cleaner, safer alternative to traditional cutback asphalts.',
        items: [
          'Penetrates granular bases to bind surface particles',
          'Reduces material loss during construction',
          'Promotes a strong bond between base and asphalt layer',
        ],
      },
      {
        title: 'Advantages over conventional primes',
        body: 'Unlike solvent-cut asphalts, SX Prime is formulated to minimize emissions and waiting times while still delivering excellent performance.',
        items: [
          'Lower environmental impact and fewer emission constraints',
          'Shorter waiting times before placing the next layer or opening to traffic',
          'Compatible with a wide range of surfacing systems',
        ],
      },
      {
        title: 'Typical applications',
        body: 'SX Prime can be used on both new construction and rehabilitation projects.',
        items: [
          'Rural and low-to-medium volume roads',
          'Parking lots and internal roadways',
          'Stabilized bases that require a prime coat prior to surfacing',
        ],
      },
    ],
  },
  'sx-fog': {
    slug: 'sx-fog',
    title: 'SX Fog (TF)',
    cardDesc: 'Preservación y rejuvenecimiento; sella microfisuras.',
    cardDescEn: 'Fog seal for pavement preservation and rejuvenation that seals microcracks.',
    subtitle: 'Tratamiento de preservación y rejuvenecimiento de pavimentos',
    subtitleEn: 'Pavement preservation and rejuvenation treatment',
    desc: 'SX Fog (TF) es un tratamiento tipo fog seal formulado para preservar y rejuvenecer superficies asfálticas existentes. Sella microfisuras, reduce la oxidación y prolonga la vida útil del pavimento a bajo costo.',
    descEn:
      'SX Fog (TF) is a fog seal treatment formulated to preserve and rejuvenate existing asphalt surfaces. It seals microcracks, slows oxidation, and extends pavement life at a low cost.',
    bullets: [
      'Sella microfisuras y reduce la oxidación del asfalto',
      'Mejora la apariencia y rejuvenece superficies envejecidas',
      'Tratamiento preventivo de bajo costo',
      'Ayuda a retrasar intervenciones mayores de rehabilitación',
    ],
    bulletsEn: [
      'Seals microcracks and reduces asphalt oxidation',
      'Improves appearance and rejuvenates aged surfaces',
      'Low-cost preventive maintenance treatment',
      'Helps postpone major rehabilitation interventions',
    ],
    img: '/media/sx-fog.webp',
    sections: [
      {
        title: '¿Qué es un fog seal como SX Fog?',
        body: 'SX Fog es una emulsión que se aplica en una dosificación ligera sobre pavimentos asfálticos existentes. Penetra en la superficie, rellena vacíos finos y sella microfisuras, ayudando a impedir la entrada de agua y aire que aceleran el deterioro.',
        items: [
          'Se aplica en tasas típicas cercanas a 0.1 gal/yd² (aprox. 0.45 L/m²)',
          'Requiere un cierre temporal de la vía mientras cura',
          'Devuelve a la superficie un color negro renovado',
        ],
      },
      {
        title: 'Cuándo usar SX Fog',
        body: 'Es ideal como tratamiento preventivo antes de que aparezcan daños severos, o como mantenimiento sobre sellos existentes y mezclas asfálticas envejecidas.',
        items: [
          'Pavimentos con oxidación superficial y pérdida de color',
          'Sellos previos de gravilla que empiezan a mostrar desgaste',
          'Caminos de bajo y medio volumen de tránsito',
          'Pistas y calles de rodaje con superficie envejecida',
        ],
      },
      {
        title: 'Beneficios económicos y de desempeño',
        body: 'Al aplicar SX Fog a tiempo, se extiende la vida útil del pavimento y se pospone la necesidad de tratamientos más costosos.',
        items: [
          'Reducción del costo de ciclo de vida del pavimento',
          'Menor frecuencia de intervenciones mayores',
          'Mejor confort y seguridad para los usuarios',
        ],
      },
    ],
    sectionsEn: [
      {
        title: 'What is a fog seal like SX Fog?',
        body: 'SX Fog is an emulsion applied in a light coat over existing asphalt pavements. It penetrates the surface, fills small voids, and seals microcracks, helping to prevent the ingress of water and air that accelerate deterioration.',
        items: [
          'Applied at typical rates around 0.45 L/m² (about 0.1 gal/yd²)',
          'Requires a temporary closure while the treatment cures',
          'Restores a rich black color to aged surfaces',
        ],
      },
      {
        title: 'When to use SX Fog',
        body: 'SX Fog is ideal as a preventive treatment before severe distress appears, or as maintenance over existing chip seals and aged asphalt mixtures.',
        items: [
          'Pavements with surface oxidation and color loss',
          'Existing chip seals starting to show wear',
          'Low- and medium-volume roads',
          'Runways and taxiways with aged asphalt surfaces',
        ],
      },
      {
        title: 'Economic and performance benefits',
        body: 'Applied at the right time, SX Fog extends pavement life and delays the need for more expensive treatments.',
        items: [
          'Lower pavement life-cycle cost',
          'Reduced frequency of major interventions',
          'Improved comfort and safety for users',
        ],
      },
    ],
  },
}

export const PRODUCT_ORDER = ['tsw', 'tsb', 'sx-prime', 'sx-fog'] as const

export type ProductSlug = (typeof PRODUCT_ORDER)[number]

export function listProducts(): Product[] {
  return PRODUCT_ORDER.map((slug) => PRODUCTS[slug])
}

export function getProduct(slug: string | undefined): Product | undefined {
  if (!slug) return undefined
  return PRODUCTS[slug]
}

export function localizeProduct(product: Product, lang: 'es' | 'en'): LocalizedProduct {
  const en = lang === 'en'
  return {
    slug: product.slug,
    title: product.title,
    cardDesc: en ? product.cardDescEn : product.cardDesc,
    subtitle: en ? product.subtitleEn : product.subtitle,
    desc: en ? product.descEn : product.desc,
    img: product.img,
    bullets: en ? product.bulletsEn : product.bullets,
    sections: en ? product.sectionsEn : product.sections,
  }
}

export function getLocalizedProduct(
  slug: string | undefined,
  lang: 'es' | 'en',
): LocalizedProduct | undefined {
  const p = getProduct(slug)
  return p ? localizeProduct(p, lang) : undefined
}
