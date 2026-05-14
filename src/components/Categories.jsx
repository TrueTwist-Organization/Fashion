import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { RiArrowRightLine } from 'react-icons/ri'
import { categories } from '../data/products'
import useStore from '../store/useStore'

function CategoryCard({ cat, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [imageShift, setImageShift] = useState({ x: 0, y: 0 })
  const [light, setLight] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const { setCategory } = useStore()

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width  - 0.5
    const cy = (e.clientY - rect.top)  / rect.height - 0.5
    setTilt({ x: cy * -18, y: cx * 18 })
    setImageShift({ x: cx * -18, y: cy * -18 })
    setLight({ x: Math.round((cx + 0.5) * 100), y: Math.round((cy + 0.5) * 100) })
  }
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setImageShift({ x: 0, y: 0 })
    setLight({ x: 50, y: 50 })
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
      className={`cat-float-${index + 1}`}
    >
      <motion.div
        ref={cardRef}
        animate={
          (tilt.x !== 0 || tilt.y !== 0)
            ? {
                scale: 1.05,
              }
            : {
                scale: 1,
              }
        }
        transition={
          (tilt.x !== 0 || tilt.y !== 0)
            ? { type: 'spring', stiffness: 210, damping: 16 }
            : { duration: 0.35, ease: 'easeOut' }
        }
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setCategory(cat.name)}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden cursor-pointer group"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transformOrigin: 'center center',
          height: '400px',
          boxShadow: (tilt.x !== 0 || tilt.y !== 0)
            ? '0 35px 110px rgba(0,0,0,0.55)'
            : '0 18px 42px rgba(0,0,0,0.22)',
          clipPath: index === 0
            ? 'polygon(0 0, 96% 0, 100% 100%, 0% 100%)'
            : index === 1
            ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
            : 'polygon(4% 0, 100% 0, 100% 100%, 0% 100%)',
        }}
      >
        {/* Primary Image (shown by default) */}
        {!cat.videoEmbed && (
          <motion.img
            src={cat.image}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            animate={{
              x: imageShift.x,
              y: imageShift.y,
              scale: hovered || tilt.x !== 0 ? 1.14 : 1.06,
              opacity: hovered && cat.video ? 0 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onError={e => { e.target.style.background = '#1a1a1a' }}
            style={{ transform: 'translateZ(0px)' }}
          />
        )}

        {/* Video Embed Case */}
        {cat.videoEmbed && (
          <motion.div
            className="absolute inset-0"
            animate={{
              x: imageShift.x,
              y: imageShift.y,
              scale: hovered || tilt.x !== 0 ? 1.12 : 1.06,
              opacity: hovered || tilt.x !== 0 ? 0.25 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: 'translateZ(0px)' }}
          >
            <iframe
              src={cat.videoEmbed}
              title={`${cat.name} reel`}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full h-full border-0 pointer-events-none"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        )}

        {/* Video File Case (Hidden by default, shown on hover) */}
        {cat.video && (
          <motion.video
            src={cat.video}
            poster={cat.image}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
            animate={{
              x: imageShift.x,
              y: imageShift.y,
              scale: hovered || tilt.x !== 0 ? 1.12 : 1.06,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: 'translateZ(0px)' }}
          />
        )}

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: hovered || tilt.x !== 0 ? 1 : 0,
            x: hovered ? -10 : 0,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 16%, transparent 20%, transparent 80%, rgba(200,164,92,0.08) 84%, rgba(255,255,255,0.10) 100%)',
            mixBlendMode: 'screen',
            transform: 'translateZ(12px)',
          }}
        />

        {cat.hoverImage && (
          <motion.img
            src={cat.hoverImage || cat.image}
            alt={`${cat.name} hover`}
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
            animate={{
              x: imageShift.x * 0.5,
              y: imageShift.y * 0.5,
              scale: hovered ? 1.12 : 1.04,
              opacity: hovered || tilt.x !== 0 ? 0.98 : 0,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onError={e => { e.target.style.background = '#1a1a1a' }}
            style={{ transform: 'translateZ(0px)', mixBlendMode: hovered ? 'normal' : (tilt.x !== 0 ? 'screen' : 'normal') }}
          />
        )}

        <div
          className="absolute inset-y-0 right-0 w-12 pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, rgba(200,164,92,0.18) 0%, rgba(200,164,92,0.06) 40%, transparent 100%)',
            opacity: hovered || tilt.x !== 0 ? 1 : 0.65,
            transform: 'translateZ(14px)',
          }}
        />

        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(3,3,3,0.96) 0%, rgba(3,3,3,0.34) 55%, rgba(3,3,3,0.06) 100%)' }} />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(255,255,255,0.10) 0%, rgba(200,164,92,0.10) 12%, transparent 42%)`,
            mixBlendMode: 'screen',
          }}
        />

        <motion.div
          className="absolute inset-4 pointer-events-none rounded-[2px]"
          animate={{
            opacity: hovered || tilt.x !== 0 ? 1 : 0,
            rotateZ: hovered ? 1.5 : 0,
            scale: hovered ? 1.005 : 1,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            border: '1px solid rgba(200,164,92,0.35)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 40px rgba(200,164,92,0.12)',
          }}
        />

        <div className="cat-glow-border" />

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: 'radial-gradient(ellipse at 50% 90%, rgba(200,164,92,0.34) 0%, transparent 60%)' }}
        />

        <motion.div
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 1.6, delay: index * 0.4, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
          className="absolute inset-y-0 w-20 opacity-30 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,92,0.8), transparent)', transform: 'skewX(-15deg)' }}
        />

        <div
          className="absolute top-5 left-5 z-10 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/80 backdrop-blur-sm"
          style={{ transform: 'translateZ(48px)' }}
        >
          {cat.count} Styles
        </div>

        <motion.div
          className="absolute right-5 top-1/3 h-24 w-24 rounded-full opacity-50 blur-2xl pointer-events-none"
          animate={{ scale: tilt.x !== 0 ? 1.4 : 1, x: tilt.x !== 0 ? 8 : 0, y: tilt.x !== 0 ? -8 : 0, opacity: tilt.x !== 0 ? 0.7 : 0.45 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ background: 'radial-gradient(circle, rgba(200,164,92,0.55) 0%, rgba(200,164,92,0) 70%)', transform: 'translateZ(20px)' }}
        />

        {cat.videoEmbed && (
          <motion.div
            className="absolute top-5 right-5 z-20 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[9px] tracking-[0.35em] uppercase text-[#f5f0e8]/80 backdrop-blur-sm"
            animate={{ opacity: hovered || tilt.x !== 0 ? 1 : 0.8, y: hovered ? -2 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ transform: 'translateZ(80px)' }}
          >
            reel
          </motion.div>
        )}

        {(cat.detailImage || cat.hoverImage) && (
          <motion.div
            className="absolute right-6 bottom-8 w-32 h-44 overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_20px_60px_rgba(0,0,0,0.45)] pointer-events-none"
            animate={{
              opacity: hovered || tilt.x !== 0 ? 1 : 0,
              y: hovered || tilt.x !== 0 ? 0 : 16,
              x: hovered || tilt.x !== 0 ? 0 : 12,
              rotate: hovered || tilt.x !== 0 ? -4 : 8,
              scale: hovered || tilt.x !== 0 ? 1 : 0.92,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: 'translateZ(70px)' }}
          >
            <motion.img
              src={cat.detailImage || cat.hoverImage || cat.image}
              alt={`${cat.name} detail`}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.08 : 1.02 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onError={e => { e.target.style.background = '#1a1a1a' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-[#c8a45c]/15" />
          </motion.div>
        )}



        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered || tilt.x !== 0 ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            background:
              'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.10) 0%, transparent 28%), radial-gradient(circle at 85% 80%, rgba(200,164,92,0.12) 0%, transparent 32%)',
            mixBlendMode: 'screen',
          }}
        />

        <motion.div
          className="absolute inset-2 pointer-events-none rounded-[2px]"
          animate={{
            opacity: hovered || tilt.x !== 0 ? 1 : 0,
            scale: hovered || tilt.x !== 0 ? 1 : 0.985,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: 'inset 0 0 0 1px rgba(200,164,92,0.18), 0 0 0 1px rgba(0,0,0,0.3)',
            transform: 'translateZ(28px)',
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-7 z-10" style={{ transform: 'translateZ(48px)' }}>
          <motion.div
            className="h-[1px] bg-[#c8a45c]/40 mb-4 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.4 }}
          />
          <h3 className="font-display text-4xl font-light text-white group-hover:text-[#c8a45c] transition-colors duration-400 mb-4 tracking-wide">
            {cat.name}
          </h3>
          <div className="flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase font-sans transition-all duration-400 text-[#c8a45c]/60 group-hover:text-[#c8a45c] group-hover:gap-3">
            Explore <RiArrowRightLine className="text-sm" />
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.06) 45%, transparent 60%)',
            transform: 'translateZ(30px) skewX(-12deg)',
          }}
        />

      </motion.div>
    </motion.div>
  )
}

export default function Categories() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 md:py-32 bg-[#030303] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[#c8a45c] text-[11px] tracking-[0.4em] uppercase font-sans mb-4">Explore</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-[#f5f0e8]">
            Shop by <span className="italic text-[#c8a45c]">Category</span>
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
