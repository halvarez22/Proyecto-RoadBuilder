import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Benefits from '../sections/Benefits'
import Products from '../sections/Products'
import Videos from '../sections/Videos'
import Contact from '../sections/Contact'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location.hash])

  return (
    <>
      <Hero />
      <Benefits />
      <Products />
      <Videos />
      <Contact />
    </>
  )
}
