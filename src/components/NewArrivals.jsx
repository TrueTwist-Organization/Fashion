import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { RiShoppingBagLine, RiStarFill, RiArrowRightLine, RiHeartLine, RiHeartFill } from 'react-icons/ri'
import useStore from '../store/useStore'
import { newArrivals } from '../data/products'

const categoryColors = {
  Women: '#c8a45c',
  Men: '#7ca4c0',
  Kids: '#a0c87c',
}

// Clip-path wipe directions per card
const wipeFrom = [
  { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' }, // left→right
  { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' }, // top→bottom
  { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' }, // right→left
  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' }, // bottom→top
]

function ArrivalCard({ p, i, groupCursor, flipPulse }) {
  const { addToCart, toggleWishlist, wishlist, setProduct } = useStore()
  const wished = wishlist.includes(p.id)
  const ref = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [imgMove, setImgMove] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [isTouch] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches)
  const imageFlipControls = useAnimation()

  const accent = categoryColors[p.category] || '#c8a45c'
  const wipe = wipeFrom[i % 4]

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: cy * -14, y: cx * 14 })
    setImgMove({ x: cx * -12, y: cy * -12 })
  }
  const handleTouchMove = (e) => {
    if (!cardRef.current) return
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const cx = (touch.clientX - rect.left) / rect.width - 0.5
    const cy = (touch.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: cy * -10, y: cx * 10 })
    setImgMove({ x: cx * -8, y: cy * -8 })
  }
  const handleMouseLeave = () => { setHovered(false); setTilt({ x: 0, y: 0 }); setImgMove({ x: 0, y: 0 }) }
  useEffect(() => {
    const delay = i * 100
    const timer = setTimeout(() => {
      imageFlipControls.start({
        rotateY: [0, 180, 360],
        transition: {
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.6, 1],
        },
      })
    }, delay)
    return () => clearTimeout(timer)
  }, [flipPulse, i, imageFlipControls])

  const openProductPage = () => {
    setProduct(p)
    window.history.pushState({ productId: p.id }, '', `/product/${p.id}`)
    window.dispatchEvent(new Event('locationchange'))
  }

  const shadow = hovered
    ? `${(-tilt.y * 1.1).toFixed(1)}px ${(22 + tilt.x * 1.1).toFixed(1)}px 48px rgba(0,0,0,0.55)`
    : '0 8px 24px rgba(0,0,0,0.35)'
  const hoverActive = hovered || tilt.x !== 0 || tilt.y !== 0

  return (
    <div ref={ref}>
      <motion.div
        ref={cardRef}
        onClick={openProductPage}
        onMouseEnter={() => !isTouch && setHovered(true)}
        onMouseMove={!isTouch ? handleMouseMove : undefined}
        onMouseLeave={!isTouch ? handleMouseLeave : undefined}
        onTouchStart={() => setHovered(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        initial={{ opacity: 0, y: 28, scale: 0.95 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? (!isTouch && (tilt.x !== 0 || tilt.y !== 0) ? -8 : 0) : 28,
          scale: inView ? (!isTouch && (tilt.x !== 0 || tilt.y !== 0) ? 1.03 : 1) : 0.95,
        }}
        transition={{
          opacity: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
          y: { type: 'spring', stiffness: 220, damping: 18 },
          scale: { type: 'spring', stiffness: 220, damping: 18 },
        }}
        style={{ boxShadow: shadow, willChange: 'transform, opacity' }}
        className="group relative bg-[#0a0a0a] overflow-hidden cursor-pointer"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          animate={{
            x: hovered ? imgMove.x * -0.5 : 0,
            y: hovered ? imgMove.y * -0.5 : 0,
            scale: hovered ? 0.98 : 1,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.25) 58%, rgba(0,0,0,0.48) 100%)',
          }}
        />

        <motion.div
          className="absolute -inset-5 pointer-events-none z-0"
          animate={{
            opacity: tilt.x !== 0 || tilt.y !== 0 ? 0.6 : [0.18, 0.3, 0.18],
            scale: tilt.x !== 0 || tilt.y !== 0 ? 1.05 : [0.98, 1.02, 0.98],
          }}
          transition={{
            opacity: { duration: 0.35, ease: 'easeOut' },
            scale: { duration: 4 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            background: `radial-gradient(circle, ${accent}20 0%, ${accent}08 35%, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />

        {/* Micro particle/noise layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[1]"
          animate={{
            opacity: hoverActive ? 0.22 : 0.08,
            backgroundPosition: hoverActive ? ['0% 0%', '100% 100%'] : '0% 0%',
          }}
          transition={{
            opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            backgroundPosition: { duration: 2.2, repeat: Infinity, ease: 'linear' },
          }}
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.11) 0.6px, transparent 0.8px), radial-gradient(rgba(200,164,92,0.18) 0.7px, transparent 0.9px)',
            backgroundSize: '14px 14px, 20px 20px',
            backgroundBlendMode: 'screen',
          }}
        />

        {/* Border glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          animate={{ opacity: tilt.x !== 0 || tilt.y !== 0 ? 1 : 0.45 }}
          transition={{ duration: 0.3 }}
          style={{ boxShadow: `inset 0 0 0 1px ${accent}50, 0 20px 60px rgba(0,0,0,0.5)` }}
        />

        {/* Top glow */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse at 50% -10%, ${accent}20 0%, transparent 60%)`,
            opacity: tilt.x !== 0 ? 1 : 0, transition: 'opacity 0.3s'
          }} />

        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/5]" style={{ perspective: '1200px' }}>
          <motion.div
            className="w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={imageFlipControls}
          >
            <motion.img
              src={p.image} alt={p.name}
              className="w-full h-full object-cover"
              loading="lazy"
              animate={{
                x: !isTouch ? imgMove.x : 0,
                y: !isTouch ? imgMove.y : 0,
                scale: !isTouch && (tilt.x !== 0 || tilt.y !== 0) ? 1.08 : 1,
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              style={{ backfaceVisibility: 'hidden' }}
              onError={e => { e.target.style.background = '#1a1a1a' }}
            />
            {/* Back face of flip */}
            <div
              className="absolute inset-0 bg-[#c8a45c]/10"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />

          {/* NEW badge — slides in */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={inView ? {
              x: 0,
              opacity: 1,
              rotate: hovered ? -5 : 0,
              y: hovered ? [0, -3, 0] : 0,
            } : {}}
            transition={{
              duration: 0.5,
              delay: i * 0.15 + 0.45,
              y: { duration: 0.8, repeat: hovered ? Infinity : 0, ease: [0.22, 1, 0.36, 1] },
            }}
            className="absolute top-4 left-4 z-10 text-[9px] tracking-[0.3em] uppercase font-sans font-bold px-3 py-1"
            style={{ background: accent, color: '#030303' }}
          >
            NEW
          </motion.div>

          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.2, y: -2, rotateY: 10 }} whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id, p.name) }}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: wished ? `${accent}25` : 'rgba(3,3,3,0.65)',
              border: `1px solid ${wished ? accent : 'rgba(255,255,255,0.2)'}`,
              boxShadow: hovered ? `0 0 18px ${accent}55` : 'none',
            }}
            animate={{ y: hovered ? -2 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {wished
              ? <RiHeartFill style={{ color: accent, fontSize: '14px' }} />
              : <RiHeartLine style={{ color: '#fff', fontSize: '14px' }} />
            }
          </motion.button>

          {/* Diagonal shimmer on tilt */}
          <motion.div
            animate={{
              x: hoverActive ? ['-120%', '220%'] : '-120%',
              opacity: hoverActive ? 0.95 : 0,
            }}
            transition={{
              x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }}
            className="absolute inset-y-0 w-20 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`, transform: 'skewX(-20deg)' }}
          />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: tilt.x !== 0 || tilt.y !== 0 ? 1 : 0.35 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              background: `radial-gradient(circle at 50% 15%, rgba(255,255,255,0.18) 0%, transparent 30%), radial-gradient(circle at 80% 80%, ${accent}16 0%, transparent 32%)`,
              mixBlendMode: 'screen',
            }}
          />

          <motion.button
            onClick={(e) => { e.stopPropagation(); addToCart(p) }}
            className="absolute left-3 right-3 bottom-3 md:left-4 md:right-4 md:bottom-4 z-20 h-10 md:h-11 flex items-center justify-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.24em] font-sans font-semibold"
            style={{
              background: 'rgba(8,8,8,0.42)',
              border: `1px solid ${accent}55`,
              color: '#f5f0e8',
              backdropFilter: 'blur(8px)',
            }}
            animate={{
              opacity: (isTouch || hovered) ? 1 : 0,
              y: (isTouch || hovered) ? 0 : 20,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
          >
            <RiShoppingBagLine style={{ fontSize: '14px' }} />
            Add to Cart
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4 md:p-5 relative z-10">
          {/* Category pill */}
          <span
            className="inline-block text-[9px] tracking-[0.25em] uppercase font-sans font-semibold px-2.5 py-1 mb-3"
            style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
          >
            {p.category}
          </span>

          <h3 className="font-display text-lg md:text-xl font-light mb-2 leading-tight transition-colors duration-300"
            style={{ color: tilt.x !== 0 ? accent : '#f5f0e8' }}>
            {p.name}
          </h3>

          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(s => (
              <RiStarFill key={s} style={{ fontSize: '11px', color: s <= Math.round(p.rating) ? accent : 'rgba(255,255,255,0.1)' }} />
            ))}
            <span className="text-[#f5f0e8]/30 text-[10px] font-sans ml-1">({p.rating})</span>
          </div>

          <div className="flex items-center justify-between">
            <motion.span
              className="font-display text-xl md:text-2xl font-medium text-[#f5f0e8]"
              animate={{ color: tilt.x !== 0 ? accent : '#f5f0e8' }}
              transition={{ duration: 0.3 }}
            >
              Rs. {p.price}
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); addToCart(p) }}
              className="w-10 h-10 flex items-center justify-center transition-all duration-300"
              style={{ border: `1px solid ${accent}50`, color: accent }}
            >
              <RiShoppingBagLine style={{ fontSize: '16px' }} />
            </motion.button>
          </div>

          {/* Bottom accent line — expands on tilt */}
          <motion.div
            animate={{ scaleX: tilt.x !== 0 ? 1 : 0, opacity: tilt.x !== 0 ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
            style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function NewArrivals() {
  const ref = useRef(null)
  const setPage = useStore(s => s.setPage)
  const inView = useInView(ref, { once: false, margin: '-20% 0px' })
  const [groupCursor, setGroupCursor] = useState({ x: 0, y: 0 })
  const [flipPulse, setFlipPulse] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice(!window.matchMedia('(hover: hover)').matches)
  }, [])

  useEffect(() => {
    if (inView) {
      setFlipPulse(prev => prev + 1)
    }
  }, [inView])

  // Removed auto-tilt effect as requested

  // Removed mouse-movement group cursor as requested

  return (
    <section
      ref={ref}
      className="py-12 md:py-16 bg-[#030303] overflow-hidden"
      onMouseEnter={() => setFlipPulse(prev => prev + 1)}
      onPointerDown={() => isTouchDevice && setFlipPulse(prev => prev + 1)}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '1em' }}
            animate={inView ? { opacity: 1, letterSpacing: '0.4em' } : {}}
            transition={{ duration: 1 }}
            className="text-[#c8a45c] text-[11px] uppercase font-sans mb-4"
          >
            Just Dropped
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-[#f5f0e8]"
          >
            New <span className="italic text-[#c8a45c]">Arrivals</span>
          </motion.h2>
          <motion.div
            className="gold-line mx-auto mt-6"
            initial={{ width: 0 }} animate={inView ? { width: 96 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {newArrivals.map((p, i) => (
            <ArrivalCard key={p.id} p={p} i={i} groupCursor={groupCursor} flipPulse={flipPulse} />
          ))}
        </div>

        {/* Promo row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 mt-10 md:mt-16 p-5 md:p-8 border border-white/5 bg-[#0a0a0a] relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(200,164,92,0.06) 0%, transparent 60%)' }} />
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-light text-[#f5f0e8] mb-1">
              Fresh Styles Every <span className="italic text-[#c8a45c]">Week</span>
            </h3>
            <p className="text-[#f5f0e8]/40 font-sans text-sm">New drops every Monday & Thursday. Don't miss out.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(200,164,92,0.3)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setPage('new-arrivals')}
            className="gold-btn whitespace-nowrap w-full sm:w-auto justify-center"
            style={{ padding: '8px 24px', fontSize: '10px', letterSpacing: '0.18em' }}
          >
            See All New Arrivals <RiArrowRightLine style={{ fontSize: '13px' }} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
