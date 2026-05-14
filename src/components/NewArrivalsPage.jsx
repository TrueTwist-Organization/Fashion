import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowLeftLine, RiHeartLine, RiHeartFill, RiShoppingBagLine, RiStarFill } from 'react-icons/ri'
import useStore from '../store/useStore'
import { featuredProducts, newArrivals } from '../data/products'
import Footer from './Footer'
import WatermarkOverlay from './WatermarkOverlay'

const allProducts = [...newArrivals, ...featuredProducts]
const filters = ['All', 'Men', 'Women', 'Kids']

const accent = '#c8a45c'

function ProductCard({ p, i }) {
  const { addToCart, toggleWishlist, wishlist, setProduct } = useStore()
  const wished = wishlist.includes(p.id)
  const [added, setAdded] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [isTouch] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches)

  const openProductPage = () => {
    setProduct(p)
    window.history.pushState({ productId: p.id }, '', `/product/${p.id}`)
    window.dispatchEvent(new Event('locationchange'))
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -10, y: px * 12 })
    setGlow({ x: Math.round((px + 0.5) * 100), y: Math.round((py + 0.5) * 100) })
  }
  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (touch.clientX - rect.left) / rect.width - 0.5
    const py = (touch.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -8, y: px * 10 })
    setGlow({ x: Math.round((px + 0.5) * 100), y: Math.round((py + 0.5) * 100) })
  }
  const resetTilt = () => { setTilt({ x: 0, y: 0 }); setGlow({ x: 50, y: 50 }) }
  const isHov = tilt.x !== 0 || tilt.y !== 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <motion.div
        onClick={openProductPage}
        onMouseMove={!isTouch ? handleMouseMove : undefined}
        onMouseLeave={!isTouch ? resetTilt : undefined}
        onTouchMove={handleTouchMove}
        onTouchEnd={resetTilt}
        animate={{
          y: !isTouch && isHov ? -6 : 0,
          scale: !isTouch && isHov ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 170, damping: 18 }}
        className="relative cursor-pointer bg-[#0d0d0d] border border-white/5 hover:border-[#c8a45c]/30 transition-colors duration-300 overflow-hidden flex flex-col rounded-lg"
        style={{
          boxShadow: isHov ? '0 20px 50px rgba(0,0,0,0.42)' : '0 8px 24px rgba(0,0,0,0.18)',
        }}
      >
        {/* Glow layer */}
        <motion.div
          className="absolute -inset-6 rounded-[28px] pointer-events-none"
          animate={{ opacity: isHov ? 0.55 : 0.22, scale: isHov ? 1.04 : 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(200,164,92,0.24) 0%, rgba(200,164,92,0.08) 28%, transparent 62%)`,
            filter: 'blur(22px)',
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isHov ? 1 : 0.45 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.12) 0%, rgba(200,164,92,0.10) 16%, transparent 42%)`,
            mixBlendMode: 'screen',
          }}
        />

        {/* Image area */}
        <div className="relative overflow-hidden aspect-[3/4]">
          <motion.img
            src={p.image} alt={p.name}
            className="w-full h-full object-cover"
            loading="lazy"
            animate={{ scale: isHov ? 1.06 : 1, x: !isTouch ? tilt.y * 1.5 : 0, y: !isTouch ? tilt.x * -1.5 : 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80' }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

          {/* Badge */}
          {p.badge
            ? <div className={`absolute top-3 left-3 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase font-sans font-semibold ${p.badge === 'SALE' ? 'bg-red-900/90 text-red-300' : p.badge === 'NEW' ? 'bg-[#c8a45c] text-[#030303]' : 'bg-white/10 text-white'}`}>{p.badge}</div>
            : <div className="absolute top-3 left-3 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase font-sans font-semibold bg-[#c8a45c] text-[#030303]">NEW</div>
          }

          {/* Wishlist — top right */}
          <motion.button
            whileHover={{ scale: 1.18 }} whileTap={{ scale: 0.82 }}
            onClick={e => { e.stopPropagation(); toggleWishlist(p.id, p.name) }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: wished ? 'rgba(200,164,92,0.22)' : 'rgba(0,0,0,0.55)',
              border: wished ? '1.5px solid rgba(200,164,92,0.6)' : '1.5px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(6px)',
              transition: 'background 0.25s, border 0.25s',
            }}
          >
            {wished
              ? <RiHeartFill style={{ color: '#c8a45c', fontSize: '17px' }} />
              : <RiHeartLine style={{ color: '#ffffff', fontSize: '17px' }} />
            }
          </motion.button>

          {/* Add to Cart — slides up on hover / always on touch */}
          <motion.button
            onClick={e => { e.stopPropagation(); addToCart(p); setAdded(true); setTimeout(() => setAdded(false), 1800) }}
            className="absolute bottom-0 left-0 right-0 bg-[#c8a45c] text-[#030303] text-[11px] tracking-[0.2em] uppercase font-sans font-semibold py-3 flex items-center justify-center gap-2"
            animate={{ opacity: (isTouch || tilt.x !== 0 || tilt.y !== 0) ? 1 : 0, y: (isTouch || tilt.x !== 0 || tilt.y !== 0) ? 0 : 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
          >
            <RiShoppingBagLine className="text-sm" />
            {added ? 'Added ✓' : 'Add to Cart'}
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-1.5 flex-1">
          <p className="text-[#c8a45c]/60 text-[9px] tracking-[0.2em] uppercase font-sans">{p.category}</p>
          <h3 className="font-display text-sm font-light text-[#f5f0e8] group-hover:text-[#c8a45c] transition-colors duration-300">{p.name}</h3>
          <div className="flex gap-0.5 mt-0.5">
            {[1,2,3,4,5].map(s => (
              <RiStarFill key={s} style={{ fontSize: '10px', color: s <= Math.round(p.rating || 4.5) ? '#c8a45c' : 'rgba(255,255,255,0.1)' }} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/5">
            <span className="font-display text-base font-medium text-[#f5f0e8]">Rs. {p.price}</span>
            {p.oldPrice && <span className="text-white/25 text-xs line-through">Rs. {p.oldPrice}</span>}
            <motion.button
              whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
              onClick={e => { e.stopPropagation(); toggleWishlist(p.id, p.name) }}
              className="ml-auto w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{
                background: wished ? 'rgba(200,164,92,0.2)' : 'rgba(255,255,255,0.07)',
                border: wished ? '1.5px solid rgba(200,164,92,0.6)' : '1.5px solid rgba(255,255,255,0.18)',
              }}
            >
              {wished
                ? <RiHeartFill style={{ color: '#c8a45c', fontSize: '15px' }} />
                : <RiHeartLine style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }} />
              }
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function NewArrivalsPage() {
  const { closePage } = useStore()
  const [filter, setFilter] = useState('All')
  const [showWatermark, setShowWatermark] = useState(false)
  const scrollRef = useRef(null)
  const heroRef = useRef(null)

  const filtered = filter === 'All' ? allProducts : allProducts.filter(p => p.category === filter)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
      scrollRef.current.focus({ preventScroll: true })
    }
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return undefined

    const updateWatermark = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? 0
      const revealPoint = Math.max(heroHeight - 120, 160)
      setShowWatermark(container.scrollTop > revealPoint)
    }

    updateWatermark()
    container.addEventListener('scroll', updateWatermark, { passive: true })
    window.addEventListener('resize', updateWatermark)

    return () => {
      container.removeEventListener('scroll', updateWatermark)
      window.removeEventListener('resize', updateWatermark)
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] overflow-y-auto bg-[#030303]"
        tabIndex={-1}
        style={{ outline: 'none', overscrollBehavior: 'contain' }}
      >
        <WatermarkOverlay visible={showWatermark} />
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#030303]/95 backdrop-blur-md border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[56px] flex items-center justify-between">
            <button onClick={closePage} className="flex items-center gap-2 text-white/40 hover:text-[#c8a45c] transition-colors text-xs tracking-[0.2em] uppercase font-sans">
              <RiArrowLeftLine className="text-base" /> Back
            </button>
            <p className="font-display text-sm tracking-[0.3em] uppercase text-[#f5f0e8]">
              Twist<span style={{ color: accent }}>Wear</span>
            </p>
            <span className="text-white/25 text-xs font-sans">{filtered.length} items</span>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
          {/* Hero heading */}
          <div ref={heroRef} className="text-center mb-14">
            <p className="text-xs tracking-[0.4em] uppercase font-sans mb-4" style={{ color: accent }}>Fresh Drops</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-[#f5f0e8] leading-tight">
              New <span className="italic" style={{ color: accent }}>Arrivals</span>
            </h1>
            <p className="mt-4 text-white/35 font-sans text-sm tracking-wide">New drops every Monday & Thursday. Be the first to shop.</p>
            <div className="w-16 h-px mx-auto mt-8" style={{ background: accent }} />
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-sans transition-all duration-300"
                style={{
                  background: filter === f ? accent : 'transparent',
                  color: filter === f ? '#030303' : 'rgba(245,240,232,0.4)',
                  border: `1px solid ${filter === f ? accent : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)}
          </div>
        </div>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}
