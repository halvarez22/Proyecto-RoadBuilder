export default function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-64px)] flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/roadbuilder_7.png')" }}
    >
      <div className="relative mx-auto max-w-[920px] w-full px-4 flex flex-col items-center text-center gap-4">
        <div className="w-full flex items-center justify-center">
          <img
            src="/raod_builder_logo-removebg-preview.png"
            alt="RoadBuilder"
            className="block w-auto max-h-[220px] sm:max-h-[260px] md:max-h-[320px] lg:max-h-[380px] scale-[1.8] md:scale-[2] drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
          />
        </div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black leading-tight">
          Soluciones innovadoras para caminos y pavimentos
        </h1>
        <p className="max-w-[720px] text-lg font-bold text-slate-900">
          Mejorando los Caminos del Mundo con productos ecológicos, costo-efectivos y de alto desempeño.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href="#contacto"
            className="inline-flex items-center rounded-lg border-2 border-primary bg-black/70 px-6 py-3 font-extrabold text-primary hover:bg-primary hover:text-black"
          >
            Solicite una Cotización
          </a>
          <a
            href="#productos"
            className="inline-flex items-center rounded-lg border-2 border-primary bg-black/70 px-6 py-3 font-extrabold text-primary hover:bg-primary hover:text-black"
          >
            Conozca los Productos
          </a>
        </div>
      </div>
    </section>
  )
}
