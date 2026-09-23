import { Suspense, lazy, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'

const Benefits = lazy(() => import('../sections/Benefits'))
const Products = lazy(() => import('../sections/Products'))
const Videos = lazy(() => import('../sections/Videos'))
const Contact = lazy(() => import('../sections/Contact'))

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden />
}

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const id = location.hash.replace('#', '')
    let cancelled = false

    const tryScroll = (attempts = 0) => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      // Secciones lazy: reintentar hasta que existan en el DOM
      if (attempts < 40) {
        window.setTimeout(() => tryScroll(attempts + 1), 50)
      }
    }

    tryScroll()
    return () => {
      cancelled = true
    }
  }, [location.pathname, location.hash])

  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <Benefits />
        <Products />
        <Videos />
        <Contact />
      </Suspense>
    </>
  )
}
