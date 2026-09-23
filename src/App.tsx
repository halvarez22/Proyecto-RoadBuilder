import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppBubble from './components/WhatsAppBubble'
import ChatBotBubble from './components/ChatBotBubble'
import Home from './pages/Home'

const ProductDetail = lazy(() => import('./pages/ProductDetail'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Si hay ancla (#productos, #contacto), no forzar top: Home se encarga
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="min-h-[50vh]" aria-hidden />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppBubble />
        <ChatBotBubble />
      </div>
    </BrowserRouter>
  )
}
