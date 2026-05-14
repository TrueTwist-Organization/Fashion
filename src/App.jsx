import React, { useEffect, useMemo, useRef, useState } from 'react'
import useStore from './store/useStore'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import FeaturedProducts from './components/FeaturedProducts'
import NewArrivals from './components/NewArrivals'
import DiscountBanner from './components/DiscountBanner'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import LuckyWheel from './components/LuckyWheel'
import Newsletter from './components/Newsletter'

import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import CategoryPage from './components/CategoryPage'
import ProductDetailPage from './components/ProductDetailPage'
import NewArrivalsPage from './components/NewArrivalsPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import LegalPage from './components/LegalPage'
import GlobalCheckoutModal from './components/GlobalCheckoutModal'
import WishlistDrawer from './components/WishlistDrawer'
import { featuredProducts, newArrivals } from './data/products'

const allProducts = [...featuredProducts, ...newArrivals]

export default function App() {
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)
  const watermarkRef = useRef(null)
  const openCategory = useStore(s => s.openCategory)
  const openProduct = useStore(s => s.openProduct)
  const openPage = useStore(s => s.openPage)
  const setProduct = useStore(s => s.setProduct)
  const closeProduct = useStore(s => s.closeProduct)
  const checkoutOpen = useStore(s => s.checkoutOpen)
  const [pathname, setPathname] = useState(window.location.pathname)
  const productIdFromPath = useMemo(() => {
    const match = pathname.match(/^\/product\/(\d+)$/)
    return match ? Number(match[1]) : null
  }, [pathname])
  const routedProduct = useMemo(
    () => allProducts.find(product => product.id === productIdFromPath) || null,
    [productIdFromPath]
  )
  const isProductRoute = Boolean(routedProduct)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorRing = cursorRingRef.current
    const watermark = watermarkRef.current
    let raf
    let mx = 0, my = 0, rx = 0, ry = 0

    const move = (e) => { mx = e.clientX; my = e.clientY }
    const tick = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (cursor) cursor.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
      if (cursorRing) cursorRing.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(tick)
    }

    const handleScroll = () => {
      if (watermark) {
        const heroHeight = document.getElementById('home')?.offsetHeight ?? window.innerHeight
        const revealPoint = heroHeight + 180
        if (window.scrollY < revealPoint) {
          watermark.style.opacity = '0'
        } else {
          watermark.style.opacity = '1'
        }
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const handleLocationChange = () => setPathname(window.location.pathname)

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('locationchange', handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('locationchange', handleLocationChange)
    }
  }, [])

  useEffect(() => {
    if (routedProduct) {
      if (!openProduct || openProduct.id !== routedProduct.id) {
        setProduct(routedProduct)
      }
      return
    }

    if (openProduct) closeProduct()
  }, [closeProduct, openProduct, routedProduct, setProduct])

  const handleProductBack = () => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    window.history.replaceState({}, '', '/')
    window.dispatchEvent(new Event('locationchange'))
  }

  if (isProductRoute) {
    return (
      <>
        <Navbar />
        <ProductDetailPage product={routedProduct} onBack={handleProductBack} />
        <Toast />
        <WishlistDrawer />
        <CartDrawer />
        <GlobalCheckoutModal />
      </>
    )
  }

  return (
    <>
      {/* Removed "round" custom cursor as requested */}
      <Navbar />
      <main style={{ visibility: openCategory || openPage ? 'hidden' : 'visible' }}>
        <section id="home"><Hero /></section>

        {/* All sections below hero — with TWISTWEAR watermark */}
        <div className="relative overflow-x-hidden md:overflow-x-visible">
          {/* Watermark — hidden when category page is open or in hero section */}
          <div ref={watermarkRef} className="fixed pointer-events-none select-none"
            style={{
              top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, overflow: 'hidden',
              display: openCategory || openProduct ? 'none' : 'block',
              transition: 'opacity 0.6s ease-in-out',
              opacity: 0 // Default to hidden until scroll
            }}>
            <div style={{
              position: 'absolute',
              top: '-60%', left: '-30%',
              width: '160%', height: '220%',
              transform: 'rotate(0deg)',
              display: 'flex', flexDirection: 'column', gap: '3.5rem',
            }}>
              {Array.from({ length: 18 }).map((_, r) => (
                <div key={r} style={{ display: 'flex', gap: '4rem', paddingLeft: '2rem' }}>
                  {Array.from({ length: 8 }).map((_, c) => (
                    <span key={c} style={{
                      fontFamily: 'Georgia,serif', fontSize: '1.15rem', fontWeight: '700',
                      letterSpacing: '0.55em', color: 'rgba(255,255,255,0.06)',
                      textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0,
                      textShadow: '0 1px 2px rgba(255,255,255,0.04)',
                    }}>
                      TWISTWEAR
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Marquee />
          <section id="featured"><FeaturedProducts /></section>
          <LuckyWheel />
          <section id="new-arrivals"><NewArrivals /></section>

          <DiscountBanner />
          <section id="about"><WhyUs /></section>
          <Testimonials />
          <section id="contact"><Newsletter /></section>
        </div>
      </main>
      <div style={{ visibility: openCategory || openPage ? 'hidden' : 'visible' }}><Footer /></div>
      <CategoryPage />
      {openPage === 'new-arrivals' && <NewArrivalsPage />}
      {openPage === 'about' && <AboutPage />}
      {openPage === 'contact' && <ContactPage />}
      {openPage === 'disclaimer' && <LegalPage pageKey="disclaimer" />}
      {openPage === 'privacy' && <LegalPage pageKey="privacy" />}
      {openPage === 'terms' && <LegalPage pageKey="terms" />}
      {openProduct && !isProductRoute && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflowY: 'auto', backgroundColor: '#030303' }}>
          <ProductDetailPage />
        </div>
      )}
      <CartDrawer />
      <WishlistDrawer />
      <GlobalCheckoutModal />
      <Toast />
    </>
  )
}
