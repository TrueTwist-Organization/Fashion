import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { RiShoppingBagLine, RiHeartLine, RiHeartFill, RiStarFill, RiEyeLine, RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import useStore from '../store/useStore'
import { featuredProducts } from '../data/products'

const CARD_GAP = 0
const PRODUCT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80'

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <RiStarFill key={s} className={`text-[10px] ${s <= Math.round(rating) ? 'text-[#c8a45c]' : 'text-white/15'}`} />
      ))}
      <span className="text-[#f5f0e8]/40 text-[10px] font-sans ml-1">({rating})</span>
    </div>
  )
}

function ProductCard({ product, index, flipPulse, groupCursor, cardWidth = 300, isActive }) {
  const { addToCart, toggleWishlist, wishlist, setProduct } = useStore()
  const wished = wishlist.includes(product.id)
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0, px: 50, py: 50 })
  const [isTouch] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches)
  const videoRef = useRef(null)
  const isTouchDevice = typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches
  const addTimerRef = useRef(null)
  const controls = useAnimation()
  const imageFlipControls = useAnimation()

  // Removed Intersection Observer to prevent mobile auto-play on scroll as requested. Video only on interaction.

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

  useEffect(() => {
    // Initial entrance flip OR pulse trigger
    const delay = index * 85
    const timer = window.setTimeout(() => {
      imageFlipControls.start({
        rotateY: [0, 180, 360],
        transition: {
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        },
      })
    }, delay)
    return () => window.clearTimeout(timer)
  }, [flipPulse, index, imageFlipControls])

  useEffect(() => {
    // Trigger flip when card becomes active in carousel
    if (isActive) {
      imageFlipControls.start({
        rotateY: [0, 180, 360],
        transition: {
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        },
      })
    }
  }, [isActive, imageFlipControls])

  useEffect(() => {
    const delay = index * 85
    const timer = window.setTimeout(() => {
      controls.start({
        y: [24, -2, 0],
        opacity: [0, 1, 1],
        transition: {
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.62, 1],
        },
      })
    }, delay)
    return () => window.clearTimeout(timer)
  }, [index, controls])

  useEffect(() => {
    return () => {
      if (addTimerRef.current) {
        window.clearTimeout(addTimerRef.current)
      }
    }
  }, [])

  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100)
    const py = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100)
    setCursor({ x: px / 100 - 0.5, y: py / 100 - 0.5, px, py })
  }, [])

  const handlePointerLeave = useCallback(() => {
    setHovered(false)
    setCursor({ x: 0, y: 0, px: 50, py: 50 })
  }, [])

  const handleAdd = useCallback((event) => {
    event.stopPropagation()
    addToCart(product)
    setAdded(true)

    if (addTimerRef.current) {
      window.clearTimeout(addTimerRef.current)
    }

    addTimerRef.current = window.setTimeout(() => {
      setAdded(false)
    }, 1800)
  }, [addToCart, product])

  const handleWishlist = useCallback((event) => {
    event.stopPropagation()
    toggleWishlist(product.id, product.name)
  }, [product.id, product.name, toggleWishlist])

  const openProductPage = useCallback(() => {
    setProduct(product)
    window.history.pushState({ productId: product.id }, '', `/product/${product.id}`)
    window.dispatchEvent(new Event('locationchange'))
  }, [product, setProduct])

  const tiltX = hovered ? -(cursor.y * 12) + groupCursor.y * 3 : groupCursor.y * 3
  const tiltY = hovered ? cursor.x * 12 + groupCursor.x * 3 : groupCursor.x * 3

  return (
    <motion.div
      className="flex-shrink-0"
      style={{ width: `${cardWidth}px`, perspective: '1300px' }}
      animate={{
        scale: hovered ? 1.02 : 1,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="relative"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity', width: `${cardWidth}px` }}
        initial={{ opacity: 0, y: 26 }}
        animate={controls}
      >
        {/* Front Face */}
        <div
          className="group relative bg-[#0a0a0a] border border-white/5 hover:border-[#c8a45c]/25 transition-colors duration-500 flex flex-col flex-shrink-0"
          style={{ width: `${cardWidth}px`, backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
          onClick={openProductPage}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              transform: 'translateZ(68px)',
              background: `radial-gradient(circle at ${cursor.px}% ${cursor.py}%, rgba(212,175,55,0.2) 0%, rgba(255,255,255,0.08) 14%, transparent 42%)`,
              mixBlendMode: 'screen',
            }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              transform: 'translateZ(72px)',
              background: 'linear-gradient(118deg, transparent 34%, rgba(255,255,255,0.10) 46%, rgba(200,164,92,0.18) 50%, transparent 58%)',
            }}
            animate={{ opacity: hovered ? 0.9 : 0.4, x: hovered ? cursor.x * 14 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />

          <div
            className="relative overflow-hidden w-full"
            style={{
              aspectRatio: '2 / 3',
              transform: 'translateZ(54px)',
              perspective: '1200px'
            }}
          >
            <motion.div
              className="relative h-full w-full"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              animate={imageFlipControls}
            >
              <motion.div
                className="absolute inset-0"
                style={{ backfaceVisibility: 'hidden' }}
                animate={{
                  scale: hovered ? 1.06 : 1,
                  x: hovered ? cursor.x * 6 : 0,
                  y: hovered ? cursor.y * 6 : 0,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={e => {
                    if (e.currentTarget.src !== PRODUCT_IMAGE_FALLBACK) {
                      e.currentTarget.src = PRODUCT_IMAGE_FALLBACK
                    }
                  }}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                animate={{
                  scale: hovered ? 1.06 : 1.01,
                  x: hovered ? cursor.x * -5 : 0,
                  y: hovered ? cursor.y * -5 : 0,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={(product.images && product.images.length > 0) ? product.images[0] : product.image}
                  alt={`${product.name} flip`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/24" />
              </motion.div>
            </motion.div>

            <div className="absolute inset-0 bg-[#030303]/0 group-hover:bg-[#030303]/25 transition-all duration-500" />

            {product.badge && (
              <div className={`absolute top-3 left-3 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase font-sans font-semibold ${product.badge === 'SALE' ? 'bg-red-900/90 text-red-300' :
                product.badge === 'NEW' ? 'bg-[#c8a45c] text-[#030303]' :
                  'bg-white/10 text-white'
                }`}>{product.badge}</div>
            )}

            <motion.button
              onClick={handleAdd}
              className="absolute bottom-0 left-0 right-0 bg-[#c8a45c] text-[#030303] text-[11px] tracking-[0.2em] uppercase font-sans font-semibold py-3 flex items-center justify-center gap-2"
              style={{ pointerEvents: (isTouch || hovered) ? 'auto' : 'none' }}
              animate={{ opacity: (isTouch || hovered) ? 1 : 0, y: (isTouch || hovered) ? 0 : 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.97 }}
            >
              <RiShoppingBagLine className="text-sm" />
              {added ? 'Added ✓' : 'Add to Cart'}
            </motion.button>
          </div>

          <div className="p-4 flex flex-col gap-2 flex-1" style={{ transform: 'translateZ(26px)' }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#c8a45c]/70 text-[10px] tracking-[0.25em] uppercase font-sans">{product.category}</p>
                <h3 className="font-display text-base font-light text-[#f5f0e8] group-hover:text-[#c8a45c] transition-colors duration-300 leading-tight mt-1">
                  {product.name}
                </h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.2, rotate: 8, y: -2 }}
                whileTap={{ scale: 0.85 }}
                animate={{ y: hovered ? -2 : 0, rotate: hovered ? cursor.x * 5 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={handleWishlist}
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 ml-2"
                style={{
                  background: wished ? 'rgba(200,164,92,0.15)' : 'transparent',
                  borderColor: wished ? '#c8a45c' : 'rgba(255,255,255,0.2)',
                }}
              >
                {wished
                  ? <RiHeartFill className="text-[#c8a45c]" style={{ fontSize: '18px' }} />
                  : <RiHeartLine className="text-white/60" style={{ fontSize: '18px' }} />
                }
              </motion.button>
            </div>

            <Stars rating={product.rating} />
            <div className="flex items-center gap-2 mt-auto pt-1.5">
              <span className="font-display text-lg font-medium text-[#f5f0e8]">Rs. {product.price}</span>
              {product.oldPrice && (
                <span className="text-[#f5f0e8]/30 text-sm font-sans line-through">Rs. {product.oldPrice}</span>
              )}
              <div className="flex gap-1 ml-auto">
                {product.colors?.slice(0, 3).map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}

export default function FeaturedProducts() {
  const { setPage, closeCategory } = useStore()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px' })
  const [filter, setFilter] = useState('All')
  const [offset, setOffset] = useState(0)
  const [animated, setAnimated] = useState(true)
  const [flipPulse, setFlipPulse] = useState(0)
  const [groupCursor, setGroupCursor] = useState({ x: 0, y: 0 })
  const [cardWidth, setCardWidth] = useState(300)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const filters = ['All', 'Men', 'Women', 'Kids']
  const filtered = filter === 'All' ? featuredProducts : featuredProducts.filter(p => p.category === filter)

  useEffect(() => {
    const updateCardWidth = () => {
      const vw = window.innerWidth
      setIsTouchDevice(!window.matchMedia('(hover: hover)').matches)
      // On mobile without arrows: section px-6 (48px) = ~327px on iPhone.
      if (vw < 768) setCardWidth(vw - 64)
      else if (vw < 1024) setCardWidth(280)
      else setCardWidth(320)
    }
    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)
    return () => window.removeEventListener('resize', updateCardWidth)
  }, [])

  // Removed auto-tilt effect as requested

  const allCards = filtered

  const advance = useCallback(() => {
    setAnimated(true)
    setOffset(prev => prev + 1)
  }, [])

  // Auto-advance every 5s
  useEffect(() => {
    const id = setInterval(advance, 3000)
    return () => clearInterval(id)
  }, [advance])

  // Handle wrap-around for the carousel
  useEffect(() => {
    if (offset >= filtered.length) {
      setOffset(0)
    } else if (offset < 0) {
      setOffset(filtered.length - 1)
    }
  }, [offset, filtered.length])

  // Reset offset when filter changes
  useEffect(() => {
    setAnimated(false)
    setOffset(0)
  }, [filter])

  useEffect(() => {
    if (inView) {
      setFlipPulse(prev => prev + 1)
    }
  }, [inView, filter])

  const STEP = cardWidth + CARD_GAP
  const translateX = -(offset * STEP)
  // Removed group movement as requested

  return (
    <section
      ref={ref}
      className="py-16 md:py-32 bg-[#050505] overflow-hidden"
      onMouseEnter={() => setFlipPulse(prev => prev + 1)}
      onPointerDown={() => isTouchDevice && setFlipPulse(prev => prev + 1)}
    >
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-14">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#c8a45c] text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-sans mb-3 text-center md:text-left">Curated For You</p>
            <h2 className="font-display text-4xl md:text-6xl font-light text-[#f5f0e8] leading-tight">
              Featured <span className="italic text-[#c8a45c]">Products</span>
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex gap-2 flex-wrap justify-center md:justify-end"
          >
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-6 py-2.5 text-[11px] md:text-[12px] tracking-[0.25em] uppercase font-sans transition-all duration-500 border rounded-none ${filter === f
                  ? 'bg-[#c8a45c] border-[#c8a45c] text-[#030303] font-bold shadow-[0_0_20px_rgba(200,164,92,0.3)]'
                  : 'border-white/10 text-[#f5f0e8]/60 hover:border-[#c8a45c] hover:text-[#c8a45c]'
                  }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Carousel wrapper with arrows */}
        <div className="relative group/carousel">
          <div className="flex items-center gap-2 md:gap-6">

            {/* Left Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#c8a45c', color: '#030303' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setAnimated(true); setOffset(prev => (prev - 1 + filtered.length) % filtered.length) }}
              className="hidden md:flex flex-shrink-0 w-14 h-14 bg-transparent border border-[#c8a45c]/40 text-[#c8a45c] items-center justify-center transition-all duration-300 z-20"
            >
              <RiArrowLeftLine className="text-2xl" />
            </motion.button>

            {/* Carousel track */}
            <div className="flex-1 relative overflow-x-hidden overflow-y-visible">
              <div
                className="flex"
                style={{
                  gap: `${CARD_GAP}px`,
                  transform: `translateX(${translateX}px)`,
                  transition: animated ? 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
                  willChange: 'transform',
                }}
              >
                {allCards.map((p, i) => (
                  <ProductCard
                    key={`${p.id}-${i}`}
                    product={p}
                    index={i % filtered.length}
                    flipPulse={flipPulse}
                    groupCursor={groupCursor}
                    cardWidth={cardWidth}
                    isActive={(offset % filtered.length) === (i % filtered.length)}
                  />
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#c8a45c', color: '#030303' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setAnimated(true); setOffset(prev => prev + 1) }}
              className="hidden md:flex flex-shrink-0 w-14 h-14 bg-transparent border border-[#c8a45c]/40 text-[#c8a45c] items-center justify-center transition-all duration-300 z-20"
            >
              <RiArrowRightLine className="text-2xl" />
            </motion.button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimated(true); setOffset(i) }}
              className={`transition-all duration-300 rounded-full ${(offset % filtered.length) === i
                ? 'w-6 h-1.5 bg-[#c8a45c]'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
            />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(200,164,92,0.25)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => { 
              closeCategory();
              setPage('new-arrivals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="gold-btn"
          >
            View All Products
          </motion.button>
        </div>

      </div>
    </section>
  )
}
