import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-bg/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-9 h-9 rounded-md bg-primary/90 flex items-center justify-center overflow-hidden">
            <img
              src="/raod_builder_logo-removebg-preview.png"
              alt="RoadBuilder"
              className="h-8 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            />
          </div>
          <span className="font-extrabold tracking-wide">RoadBuilder</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="/" className="hover:text-primary">
            Inicio
          </a>
          <a href="/#beneficios" className="hover:text-primary">
            Beneficios
          </a>
          <a href="/#productos" className="hover:text-primary">
            Productos
          </a>
          <a href="/#videos" className="hover:text-primary">
            Videos
          </a>
          <a
            href="/#contacto"
            className="rounded-lg border border-primary px-3 py-1.5 font-bold text-black bg-primary hover:brightness-110"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  )
}
