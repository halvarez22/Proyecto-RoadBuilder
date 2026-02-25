export default function Benefits() {
  return (
    <section id="beneficios" className="py-16 bg-white/5 min-h-[calc(100vh-64px)] flex items-center scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 w-full grid gap-8 md:grid-cols-3">
        <div className="md:col-span-3 text-center mb-4">
          <h2 className="text-3xl font-extrabold">Beneficios de RoadBuilder</h2>
          <p className="text-slate-300">
            Soluciones sostenibles, costo-efectivas y de alto desempeño para la construcción y mantenimiento de caminos.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-primary">Mayor durabilidad</h3>
          <p className="text-slate-300 text-sm">
            Top-Seal White (TSW) y SX Prime (TP) incrementan la resistencia estructural de la base y subrasante,
            reducen la formación de baches y deformaciones, y alargan la vida útil del pavimento antes de requerir
            rehabilitaciones mayores.
          </p>
          <p className="text-slate-400 text-xs">
            TSW estabiliza el suelo y controla el polvo en la estructura del camino; SX Prime mejora la adherencia entre
            base y carpeta, evitando desprendimientos prematuros.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-primary">Eficiencia en costos</h3>
          <p className="text-slate-300 text-sm">
            Top-Seal Black (TSB) y SX Fog (TF) permiten recubrir y preservar caminos existentes con menor consumo de
            materiales, menos equipo especializado y menores tiempos de cierre al tránsito frente a soluciones
            tradicionales.
          </p>
          <p className="text-slate-400 text-xs">
            TSB genera una superficie negra tipo asfalto sobre bases tratadas, ideal para reciclado en frío en sitio;
            SX Fog actúa como sellador de microfisuras que retrasa intervenciones costosas y extiende la vida del
            pavimento.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-bold text-primary">Enfoque ecológico</h3>
          <p className="text-slate-300 text-sm">
            Toda la línea RoadBuilder (TSW, TSB, SX Prime y SX Fog) está formulada con tecnologías no petroleras o de
            muy bajas emisiones, reduciendo el uso de solventes y VOCs frente a estabilizaciones e imprimaciones
            convencionales.
          </p>
          <p className="text-slate-400 text-xs">
            Esto se traduce en menos impacto ambiental en obra, mejores condiciones para el personal y una solución
            alineada con políticas de sustentabilidad y responsabilidad social.
          </p>
        </div>
      </div>
    </section>
  )
}

