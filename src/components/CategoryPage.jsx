import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiArrowLeftLine,
  RiShoppingBagLine, RiHeartLine, RiHeartFill, RiStarFill
} from 'react-icons/ri'
import useStore from '../store/useStore'
import { featuredProducts, newArrivals } from '../data/products'
import Footer from './Footer'
import WatermarkOverlay from './WatermarkOverlay'

const allProducts = [...featuredProducts, ...newArrivals]
const MEN_HERO_VIDEO = '/@fs/C:/Users/Dell/Downloads/WhatsApp%20Video%202026-03-30%20at%204.48.17%20PM.mp4'
const PRODUCT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80'

const CATEGORY_FILTERS = {
  Men: ['All', 'Shirts', 'Hoodies'],
  Women: ['All', 'Tops', 'Formal'],
  Kids: ['All', 'T-Shirts', 'Shorts'],
}

// Hero slide data per category
const CATEGORY_SLIDES = {
  Men: {
    tagLeft: 'STYLE THAT',
    tagRight: 'NEVER FADES',
    hero: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=700&q=85',
    heroVideo: MEN_HERO_VIDEO,
    accent: '#c8a45c',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80',
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    ],
  },
  Women: {
    tagLeft: 'ELEGANCE',
    tagRight: 'REDEFINED',
    hero: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85',
    heroVideo: null,
    accent: '#e8a0b4',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
    ],
  },
  Kids: {
    tagLeft: 'PLAYFUL',
    tagRight: 'AND BOLD',
    hero: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=700&q=85',
    heroVideo: null,
    accent: '#7ec8a0',
    images: [
      'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&q=80',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80',
    ],
  },
}
const MEN_SLIDES = [CATEGORY_SLIDES.Men]

const MEN_LOOKS = [
  { src: '/men-look-1.png', label: 'Party Suit', video: '/videos/street-casual.mp4' },
  { src: '/men-look-2.png', label: 'Polo Set', video: '/videos/smart-formal.mp4' },
  { src: '/men-look-3.png', label: 'Linen Shirt', video: '/videos/premium-suit.mp4' },
  { src: '/men-look-4.png', label: 'Dark Denim', video: '/videos/dark-edge.mp4' },
  { src: '/men-look-5.png', label: 'Oversized Tee', video: '/videos/clean-minimal.mp4' },
]

const WOMEN_LOOKS = [
  { src: '/women-hero-1.png', label: 'Evening Dress', video: '/women-hero-1.mp4' },
  { src: '/women-hero-2.png', label: 'Urban Blazer', video: '/women-hero-2.mp4' },
  { src: '/women-hero-3.png', label: 'Classic Top', video: '/women-hero-3.mp4' },
  { src: '/women-hero-4.png', label: 'Casual Top', video: '/women-hero-4.mp4' },
  { src: '/women-hero-center.png', label: 'Formal Shirt', video: '/women-formal-hover.mp4' },
]

const KIDS_LOOKS = [
  { src: '/kids-hero-1.png', label: 'Printed T-Shirt', video: '/kids-hero-1.mp4' },
  { src: '/kids-hero-2.png', label: 'Denim Dungaree', video: '/kids-hero-2.mp4' },
  { src: '/kids-hero-3.png', label: 'Casual Frock', video: '/kids-hero-3.mp4' },
  { src: '/kids-hero-4.png', label: 'Smart Kidswear', video: '/kids-hero-4.mp4' },
  { src: '/kids-hero-5.png', label: 'Weekend Outfit', video: '/kids-hero-5.mp4' },
]

const FAN_CONFIG = [
  { rotate: -22, tx: -210, ty: 28, z: 1 },
  { rotate: -11, tx: -105, ty: 12, z: 2 },
  { rotate: 0, tx: 0, ty: 0, z: 3 },
  { rotate: 11, tx: 105, ty: 12, z: 2 },
  { rotate: 22, tx: 210, ty: 28, z: 1 },
]

function MenLookbook() {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [sectionHovered, setSectionHovered] = useState(false)

  return (
    <div
      className="w-full py-20 flex flex-col items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030303 0%, #0a0805 50%, #030303 100%)' }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-[#c8a45c] text-[10px] tracking-[0.45em] uppercase font-sans mb-2"
      >
        The Collection
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.08, ease: 'easeOut' }}
        className="font-display text-3xl md:text-4xl font-light text-white mb-16"
      >
        Men&apos;s <span className="text-[#c8a45c] italic">Lookbook</span>
      </motion.h2>

      {/* Fan card area */}
      <div
        className="relative flex items-end justify-center overflow-x-hidden"
        style={{ height: 420, width: '100%', maxWidth: 900, perspective: '1200px' }}
        onMouseEnter={() => setSectionHovered(true)}
        onMouseLeave={() => { setSectionHovered(false); setHoveredIdx(null) }}
      >
        {MEN_LOOKS.map((look, i) => {
          const cfg = FAN_CONFIG[i]
          const isHovered = hoveredIdx === i
          const spreadMult = sectionHovered ? 1.35 : 1
          const focusedOther = hoveredIdx !== null && !isHovered

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{
                opacity: 0,
                y: 80,
                rotate: cfg.rotate * 2,
                scale: 0.7,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: cfg.rotate,
                scale: 1,
              }}
              viewport={{ once: true }}
              animate={{
                rotate: 0,
                x: isHovered
                  ? cfg.tx * spreadMult * 1.05
                  : focusedOther
                    ? cfg.tx * spreadMult * 1.2
                    : cfg.tx * spreadMult,
                y: isHovered ? -28 : cfg.ty,
                scale: isHovered ? 1.1 : focusedOther ? 0.93 : 1,
                zIndex: isHovered ? 20 : cfg.z,
                filter: focusedOther ? 'brightness(0.7)' : 'brightness(1)',
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 22,
                opacity: { duration: 0.6, delay: i * 0.12 },
                y: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
                rotate: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute cursor-pointer"
              style={{
                width: 150,
                height: 210,
                bottom: 0,
                left: '50%',
                marginLeft: -75,
                transformOrigin: 'bottom center',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card */}
              <div
                className="w-full h-full rounded-2xl overflow-hidden relative"
                style={{
                  boxShadow: isHovered
                    ? '0 30px 70px rgba(200,164,92,0.35), 0 10px 30px rgba(0,0,0,0.6)'
                    : '0 16px 48px rgba(0,0,0,0.5)',
                  border: isHovered
                    ? '1px solid rgba(200,164,92,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  transition: 'box-shadow 0.3s, border 0.3s',
                }}
              >
                <img
                  src={look.src}
                  alt={look.label}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'top center' }}
                />
                {/* Label overlay on hover */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-0 left-0 right-0 px-3 py-3"
                  style={{
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                  }}
                >
                  <p className="text-white text-[10px] tracking-[0.2em] uppercase font-sans text-center">
                    {look.label}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10 text-white/25 text-[11px] tracking-widest uppercase font-sans"
      >
        Hover to explore
      </motion.p>
    </div>
  )
}

function HeroFanCards({ vp }) {
  const [activeIdx, setActiveIdx] = useState(2)
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null)
  const { setOpenProduct, openCategory } = useStore()
  const advanceTimerRef = useRef(null)

  const currentLooks = openCategory === 'Women' ? WOMEN_LOOKS : openCategory === 'Kids' ? KIDS_LOOKS : MEN_LOOKS

  const isMob = vp < 768

  const CARD_W = isMob ? Math.max(110, Math.min(vp - 160, 165)) : 250
  const CARD_H = isMob ? Math.round(CARD_W * 1.5) : 375
  const HERO_HEIGHT = isMob ? CARD_H + 100 : 540
  const TOTAL = currentLooks.length

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current) {
      window.clearTimeout(advanceTimerRef.current)
      advanceTimerRef.current = null
    }
  }, [])

  const advanceToNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % TOTAL)
  }, [TOTAL])

  const scheduleAdvance = useCallback((durationMs) => {
    clearAdvanceTimer()
    advanceTimerRef.current = window.setTimeout(() => {
      advanceToNext()
    }, durationMs)
  }, [advanceToNext, clearAdvanceTimer])

  const handleActiveVideoReady = useCallback((event) => {
    const duration = event.currentTarget.duration
    if (Number.isFinite(duration) && duration > 0) {
      scheduleAdvance(Math.round(duration * 1000))
    } else {
      scheduleAdvance(2000)
    }
  }, [scheduleAdvance])

  useEffect(() => {
    if (TOTAL <= 1) return undefined

    const activeLook = currentLooks[activeIdx] || currentLooks[0]
    if (!activeLook?.video) {
      scheduleAdvance(2000)
    }

    return () => clearAdvanceTimer()
  }, [activeIdx, clearAdvanceTimer, currentLooks, scheduleAdvance, TOTAL])

  const REL_FAN = isMob ? [
    { rotate: -20, tx: -Math.round(CARD_W * 0.72), ty: 24, scale: 0.8, z: 1 },
    { rotate: -10, tx: -Math.round(CARD_W * 0.34), ty: 10, scale: 0.9, z: 2 },
    { rotate: 0, tx: 0, ty: 0, scale: 1.00, z: 5 },
    { rotate: 10, tx: Math.round(CARD_W * 0.34), ty: 10, scale: 0.9, z: 2 },
    { rotate: 20, tx: Math.round(CARD_W * 0.72), ty: 24, scale: 0.8, z: 1 },
  ] : [
    { rotate: -22, tx: -340, ty: 60, scale: 0.88, z: 1 },
    { rotate: -11, tx: -170, ty: 25, scale: 0.94, z: 2 },
    { rotate: 0, tx: 0, ty: 0, scale: 1.00, z: 5 },
    { rotate: 11, tx: 170, ty: 25, scale: 0.94, z: 2 },
    { rotate: 22, tx: 340, ty: 60, scale: 0.88, z: 1 },
  ]

  const handleCardClick = (i) => {
    setActiveIdx(i)
  }

  const handleDoubleClick = (look) => {
    // Collect all looks images for the small gallery below
    const thumbs = currentLooks.map(l => l.src)
    setOpenProduct({
      id: `hero-${look.label.replace(/\s+/g, '-').toLowerCase()}`,
      name: look.label,
      category: openCategory || 'Collection',
      price: 18500,
      oldPrice: 24000,
      image: look.src,
      video: look.video,
      images: thumbs,
    })
  }

  if (isMob) {
    const activeLook = currentLooks[activeIdx] || currentLooks[0]

    return (
      <div
        className="w-full flex flex-col items-center"
        style={{ marginTop: isMob ? 44 : 12 }}
      >
        <div className="flex justify-center">
          <motion.div
            key={activeLook.label}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            onClick={() => handleDoubleClick(activeLook)}
            style={{
              width: Math.min(vp - 32, 230),
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 22,
                padding: 3,
                background: 'linear-gradient(135deg,#e8e0d0 0%,#f5f0e8 50%,#e0d5c0 100%)',
                boxShadow: '0 18px 50px rgba(0,0,0,0.52), 0 0 0 1.5px rgba(200,164,92,0.5)',
              }}
            >
              <div style={{ position: 'relative', borderRadius: 19, overflow: 'hidden', aspectRatio: '2 / 3', background: '#0d0d0d' }}>
                {activeLook.video && (
                  <video
                    key={`mobile-video-${activeIdx}`}
                    src={activeLook.video}
                    autoPlay
                    muted
                    playsInline
                    poster={activeLook.src}
                    onLoadedMetadata={handleActiveVideoReady}
                    onEnded={advanceToNext}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      zIndex: 1,
                    }}
                  />
                )}
                <img
                  src={activeLook.src}
                  alt={activeLook.label}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    opacity: activeLook.video ? 0.16 : 1,
                    zIndex: 2,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.84) 100%)',
                    zIndex: 3,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 5,
                    pointerEvents: 'none',
                  }}
                >
                  <p style={{
                    margin: 0,
                    color: '#f5e9c8',
                    fontSize: 9,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    background: 'rgba(0,0,0,0.55)',
                    border: '1px solid rgba(200,164,92,0.45)',
                    borderRadius: 999,
                    padding: '6px 10px',
                    backdropFilter: 'blur(6px)',
                  }}>
                    {activeLook.label}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {currentLooks.map((look, i) => (
            <button
              key={look.label}
              onClick={() => handleCardClick(i)}
              style={{
                width: i === activeIdx ? 24 : 7,
                height: 7,
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                background: i === activeIdx ? '#c8a45c' : 'rgba(255,255,255,0.28)',
                transition: 'all 0.2s ease',
              }}
              aria-label={`Show ${look.label}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: isMob ? '100%' : 1040,
        height: HERO_HEIGHT,
        overflow: 'hidden',
        marginTop: isMob ? 18 : 36,
        paddingInline: isMob ? 12 : 0,
      }}
    >
      {currentLooks.map((look, i) => {
        const relPos = ((i - activeIdx + TOTAL + Math.floor(TOTAL / 2)) % TOTAL) - Math.floor(TOTAL / 2)
        const posIdx = relPos + 2
        const cfg = REL_FAN[posIdx]
        const isActive = relPos === 0
        const isHovered = hoveredCardIdx === i

        return (
          <motion.div
            key={i}
            onClick={() => {
              if (isActive) handleDoubleClick(look)
              else handleCardClick(i)
            }}
            onMouseEnter={() => setHoveredCardIdx(i)}
            onMouseLeave={() => setHoveredCardIdx(null)}
            initial={{ opacity: 0, y: 100, rotate: cfg.rotate * 2.5, scale: 0.5 }}
            animate={{
              opacity: 1,
              x: cfg.tx,
              y: cfg.ty,
              rotate: 0,
              scale: cfg.scale,
              zIndex: cfg.z,
            }}
            transition={{
              opacity: { duration: 0.6, delay: i * 0.08 },
              x: { type: 'spring', stiffness: 160, damping: 18, mass: 0.9 },
              y: { type: 'spring', stiffness: 160, damping: 18, mass: 0.9 },
              rotate: { duration: 0 },
              scale: { type: 'spring', stiffness: 200, damping: 16, mass: 0.8 },
              zIndex: { duration: 0 },
            }}
            style={{
              position: 'absolute',
              bottom: isMob ? 8 : 60,
              left: '50%',
              marginLeft: -(CARD_W / 2),
              width: CARD_W,
              height: CARD_H,
              transformOrigin: 'bottom center',
              cursor: 'pointer',
            }}
          >
            {/* Pulsing gold glow behind active card */}
            {isActive && (
              <motion.div
                animate={{
                  opacity: [0.55, 0.9, 0.55],
                  scale: [1, 1.08, 1],
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: -14,
                  borderRadius: 30,
                  background: 'radial-gradient(ellipse at 50% 80%, rgba(200,164,92,0.55) 0%, rgba(200,164,92,0.18) 55%, transparent 80%)',
                  filter: 'blur(14px)',
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              />
            )}

            {/* card frame */}
            <motion.div
              animate={{
                background: isActive
                  ? 'linear-gradient(135deg,#e8e0d0 0%,#f5f0e8 50%,#e0d5c0 100%)'
                  : 'linear-gradient(135deg,#1e1c14 0%,#2a2618 50%,#1e1c14 100%)',
                boxShadow: isActive
                  ? '0 28px 65px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(200,164,92,0.5)'
                  : '0 8px 28px rgba(0,0,0,0.45)',
                filter: isActive
                  ? 'brightness(1.08) saturate(1.12)'
                  : 'brightness(0.65) saturate(0.75)',
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 22,
                padding: 3,
              }}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: 19, overflow: 'hidden', position: 'relative' }}>
                {/* Video Layer (Bottom) */}
                {look.video && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: isActive ? 0.2 : 0 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      pointerEvents: 'none'
                    }}
                  >
                    <video
                      key={`desktop-video-${i}-${isActive ? activeIdx : 'idle'}`}
                      src={look.video}
                      autoPlay={isActive}
                      muted
                      playsInline
                      poster={look.src}
                      onLoadedMetadata={isActive ? handleActiveVideoReady : undefined}
                      onEnded={isActive ? advanceToNext : undefined}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                        zIndex: 1,
                      }}
                    />
                  </motion.div>
                )}

                {/* Image Layer (Top) */}
                <motion.img
                  key={isActive ? `active-${i}` : `idle-${i}`}
                  src={look.src}
                  alt={look.label}
                  initial={{ scale: isActive ? 1.22 : 1, opacity: isActive ? 0.85 : 1 }}
                  animate={{ scale: 1, opacity: isActive ? (isMob ? 0.18 : isHovered ? 1 : 0) : 1 }}
                  transition={{
                    scale: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.35, ease: 'easeOut' },
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                    position: 'absolute',
                    inset: 0,
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}
                />

                {/* shimmer sweep when card becomes active */}
                {isActive && (
                  <motion.div
                    initial={{ x: '-120%', opacity: 0.7 }}
                    animate={{ x: '140%', opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)',
                      pointerEvents: 'none',
                      transform: 'skewX(-12deg)',
                    }}
                  />
                )}

                {/* label */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: isMob ? 8 : 12,
                    left: isMob ? 8 : 12,
                    zIndex: 5,
                    pointerEvents: 'none',
                  }}
                >
                  <p style={{
                    color: '#f5e9c8',
                    fontSize: isMob ? 8 : 9,
                    letterSpacing: isMob ? '0.14em' : '0.16em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    fontFamily: 'sans-serif',
                    margin: 0,
                    background: 'rgba(0,0,0,0.58)',
                    border: '1px solid rgba(200,164,92,0.5)',
                    borderRadius: 999,
                    padding: isMob ? '5px 8px' : '6px 10px',
                    backdropFilter: 'blur(6px)',
                  }}>
                    {look.label}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )
      })}

      {/* Progress dots */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 7,
      }}>
        {currentLooks.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => handleCardClick(i)}
            animate={{
              width: i === activeIdx ? 22 : 6,
              opacity: i === activeIdx ? 1 : 0.3,
              background: i === activeIdx ? '#c8a45c' : '#ffffff',
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{ height: 6, borderRadius: 4, cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ p, i }) {
  const { addToCart, toggleWishlist, wishlist, setProduct } = useStore()
  const wished = wishlist.includes(p.id)
  const [added, setAdded] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const videoRef = React.useRef(null)
  const [isTouch] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches)
  const openProductPage = () => {
    setProduct(p)
    window.history.pushState({ productId: p.id }, '', `/product/${p.id}`)
    window.dispatchEvent(new Event('locationchange'))
  }

  // Mobile auto-play logic: play when card is scrolled into view
  useEffect(() => {
    if (!isTouch || !p.hoverVideo) return
    const currentVideo = videoRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHovered(true)
          currentVideo?.play().catch(() => {})
        } else {
          setHovered(false)
          currentVideo?.pause()
        }
      },
      { threshold: 0.7 }
    )
    if (currentVideo) observer.observe(currentVideo)
    return () => observer.disconnect()
  }, [isTouch, p.hoverVideo])
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
  const resetTilt = () => {
    setTilt({ x: 0, y: 0 })
    setGlow({ x: 50, y: 50 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <motion.div
        onClick={openProductPage}
        onMouseEnter={() => { if (p.hoverVideo) { setHovered(true); videoRef.current?.play() } }}
        onMouseMove={!isTouch ? handleMouseMove : undefined}
        onMouseLeave={() => { if (p.hoverVideo) { setHovered(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 } }; if (!isTouch) resetTilt() }}
        onTouchMove={handleTouchMove}
        onTouchEnd={resetTilt}
        animate={{
          y: !isTouch && (tilt.x !== 0 || tilt.y !== 0) ? -6 : 0,
          scale: !isTouch && (tilt.x !== 0 || tilt.y !== 0) ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 170, damping: 18 }}
        className="relative cursor-pointer bg-[#0d0d0d] border border-white/5 hover:border-[#c8a45c]/30 transition-colors duration-300 overflow-hidden flex flex-col rounded-lg h-full"
        style={{
          boxShadow: tilt.x !== 0 || tilt.y !== 0
            ? '0 20px 50px rgba(0,0,0,0.42)'
            : '0 8px 24px rgba(0,0,0,0.18)',
        }}
      >
        <motion.div
          className="absolute -inset-6 rounded-[28px] pointer-events-none"
          animate={{
            opacity: tilt.x !== 0 || tilt.y !== 0 ? 0.55 : 0.22,
            scale: tilt.x !== 0 || tilt.y !== 0 ? 1.04 : 0.98,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(200,164,92,0.24) 0%, rgba(200,164,92,0.08) 28%, transparent 62%)`,
            filter: 'blur(22px)',
          }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: tilt.x !== 0 || tilt.y !== 0 ? 1 : 0.45,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.12) 0%, rgba(200,164,92,0.10) 16%, transparent 42%)`,
            mixBlendMode: 'screen',
          }}
        />

        <motion.div
          className="absolute inset-[1px] rounded-lg pointer-events-none"
          animate={{
            opacity: tilt.x !== 0 || tilt.y !== 0 ? 1 : 0.65,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: 'inset 0 0 0 1px rgba(200,164,92,0.12)',
          }}
        />
        <div
          className="relative overflow-hidden w-full"
          style={{ aspectRatio: '2 / 3' }}
        >
          {/* Hover video overlay */}
          {p.hoverVideo && (
            <video
              ref={videoRef}
              src={p.hoverVideo}
              muted
              loop
              playsInline
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', zIndex: 3,
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.35s ease',
                pointerEvents: 'none',
              }}
            />
          )}
          <motion.img src={p.image} alt={p.name}
            className="w-full h-full object-cover"
            loading="lazy"
            animate={{
              scale: !isTouch && (tilt.x !== 0 || tilt.y !== 0) ? 1.08 : 1,
              x: !isTouch ? tilt.y * 1.5 : 0,
              y: !isTouch ? tilt.x * -1.5 : 0,
            }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            onError={e => {
              if (e.currentTarget.src !== PRODUCT_IMAGE_FALLBACK) {
                e.currentTarget.src = PRODUCT_IMAGE_FALLBACK
              }
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          {p.badge && (
            <div className={`absolute top-3 left-3 px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase font-sans font-semibold ${p.badge === 'SALE' ? 'bg-red-900/90 text-red-300' :
              p.badge === 'NEW' ? 'bg-[#c8a45c] text-[#030303]' : 'bg-white/10 text-white'
              }`}>{p.badge}</div>
          )}
          <motion.button
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.82 }}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id, p.name) }}
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
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              addToCart(p)
              setAdded(true)
              setTimeout(() => setAdded(false), 1800)
            }}
            className="absolute bottom-0 left-0 right-0 bg-[#c8a45c] text-[#030303] text-[11px] tracking-[0.2em] uppercase font-sans font-semibold py-3 flex items-center justify-center gap-2"
            animate={{ opacity: (isTouch || hovered || tilt.x !== 0 || tilt.y !== 0) ? 1 : 0, y: (isTouch || hovered || tilt.x !== 0 || tilt.y !== 0) ? 0 : 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
          >
            <RiShoppingBagLine className="text-sm" />
            {added ? 'Added ✓' : 'Add to Cart'}
          </motion.button>
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-1 min-h-[100px] justify-between">
          <div>
            <p className="text-[10px] text-[#c8a45c] tracking-widest uppercase mb-1">{p.category}</p>
            <h3 className="text-white text-xs sm:text-sm font-medium tracking-wide mb-1 leading-snug line-clamp-2">{p.name}</h3>
          </div>
          <div className="flex gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map(s => (
              <RiStarFill key={s} style={{ fontSize: '10px', color: s <= Math.round(p.rating) ? '#c8a45c' : 'rgba(255,255,255,0.1)' }} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/5">
            <span className="font-display text-base font-medium text-[#f5f0e8]">Rs. {p.price}</span>
            {p.oldPrice && <span className="text-white/25 text-xs line-through">Rs. {p.oldPrice}</span>}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id, p.name) }}
              className="ml-auto w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{
                background: wished ? 'rgba(200,164,92,0.2)' : 'rgba(255,255,255,0.07)',
                border: wished ? '1.5px solid rgba(200,164,92,0.6)' : '1.5px solid rgba(255,255,255,0.18)',
              }}
            >
              {wished
                ? <RiHeartFill style={{ color: '#c8a45c', fontSize: '15px' }} />
                : <RiHeartLine style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px' }} />
              }
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CategoryPage() {
  const { openCategory, openProduct, closeCategory } = useStore()
  const [activeFilter, setActiveFilter] = React.useState('All')
  const [viewportWidth, setViewportWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [showWatermark, setShowWatermark] = React.useState(false)
  const scrollRef = React.useRef(null)
  const heroRef = React.useRef(null)

  React.useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Reset filter when category changes
  useEffect(() => { setActiveFilter('All') }, [openCategory])

  const allCatProducts = allProducts.filter(p => p.category === openCategory)
  const products = (activeFilter === 'Trending' || activeFilter === 'All')
    ? allCatProducts
    : allCatProducts.filter(p => p.subcategory === activeFilter)

  useEffect(() => {
    document.body.style.overflow = openCategory || openProduct ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [openCategory, openProduct])

  // Auto-focus scrollable container so scroll works immediately on open
  useEffect(() => {
    if (openCategory && scrollRef.current) {
      scrollRef.current.scrollTop = 0
      scrollRef.current.focus({ preventScroll: true })
      setShowWatermark(false)
    }
  }, [openCategory])

  useEffect(() => {
    if (!openCategory || !scrollRef.current) return undefined

    const container = scrollRef.current
    const updateWatermark = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? 0
      const revealPoint = Math.max(heroHeight - 120, 220)
      setShowWatermark(container.scrollTop > revealPoint)
    }

    updateWatermark()
    container.addEventListener('scroll', updateWatermark, { passive: true })
    window.addEventListener('resize', updateWatermark)

    return () => {
      container.removeEventListener('scroll', updateWatermark)
      window.removeEventListener('resize', updateWatermark)
    }
  }, [openCategory, viewportWidth])

  const cur = CATEGORY_SLIDES[openCategory] || CATEGORY_SLIDES.Men
  const accent = cur.accent || '#c8a45c'

  return (
    <AnimatePresence>
      {openCategory && !openProduct && (
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] overflow-y-auto overflow-x-hidden bg-[#030303]"
          tabIndex={-1}
          style={{ outline: 'none', overscrollBehavior: 'contain' }}
        >
          <WatermarkOverlay visible={showWatermark} />

          <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")' }} />
          {/* HERO */}
          <div ref={heroRef} className="relative bg-[#0a0a0a] px-4 md:px-8 lg:px-12 py-10 overflow-hidden w-full">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-10">
              <div className="w-full flex justify-center overflow-visible">
                <HeroFanCards vp={viewportWidth} />
              </div>
            </div>

          </div>

          {/* PRODUCTS */}
          <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-10 pb-32">
            {/* Heading */}
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase font-sans mb-2" style={{ color: accent }}>Discovery</p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-white">
                  {(activeFilter === 'Trending' || activeFilter === 'All')
                    ? <>All <span style={{ color: accent }} className="italic">{openCategory}</span></>
                    : <span style={{ color: accent }} className="italic">{activeFilter}</span>}
                </h2>
              </div>
              <span className="text-white/25 text-xs">{products.length} items</span>
            </div>

            {/* CATEGORY FILTER BAR — below heading */}
            <div
              className="flex items-center gap-2.5 overflow-x-auto mb-8 pb-2 pt-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(CATEGORY_FILTERS[openCategory] || CATEGORY_FILTERS.Men).map((filter) => {
                const isActive = activeFilter === filter
                return (
                  <motion.button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    whileTap={{ scale: 0.93 }}
                    whileHover={{ scale: 1.04 }}
                    animate={{
                      backgroundColor: isActive ? accent : 'rgba(255,255,255,0.07)',
                      color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.75)',
                      borderColor: isActive ? accent : 'rgba(255,255,255,0.12)',
                      boxShadow: isActive
                        ? `0 4px 18px ${accent}55`
                        : '0 2px 8px rgba(0,0,0,0.25)',
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ fontWeight: isActive ? 700 : 500 }}
                    className="flex-shrink-0 px-5 py-2 rounded-full border text-[11.5px] tracking-[0.12em] uppercase font-sans cursor-pointer whitespace-nowrap"
                  >
                    {filter}
                  </motion.button>
                )
              })}
            </div>

            <div className="gold-line w-full mb-8" />

            {/* Product grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {products.length > 0
                  ? products.map((p, i) => <ProductCard key={p.id} p={p} i={i} />)
                  : (
                    <div className="col-span-full flex flex-col items-center py-20">
                      <p className="text-white/30 text-sm tracking-widest uppercase">No items in this category yet</p>
                    </div>
                  )
                }
              </motion.div>
            </AnimatePresence>
          </div>

          <Footer />

          {/* FLOATING ACTION BAR - BOTTOM */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
