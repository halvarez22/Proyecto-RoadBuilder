import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-bg/80 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-sans">
          <div className="relative w-9 h-9 rounded-md bg-primary/90 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src="/raod_builder_logo-removebg-preview.png"
              alt="RoadBuilder"
              className="h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            />
          </div>
          <span className="font-extrabold tracking-wide text-white">RoadBuilder</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm font-sans">
          <a href="/" className="text-slate-200 hover:text-primary transition-colors duration-200">
            Inicio
          </a>
          <a href="/#beneficios" className="text-slate-200 hover:text-primary transition-colors duration-200">
            Beneficios
          </a>
          <a href="/#productos" className="text-slate-200 hover:text-primary transition-colors duration-200">
            Productos
          </a>
          <a href="/#videos" className="text-slate-200 hover:text-primary transition-colors duration-200">
            Videos
          </a>
          <a
            href="/#contacto"
            className="rounded-lg border border-primary px-3 py-1.5 font-bold text-black bg-primary shadow-sm hover:brightness-110 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  )
}
