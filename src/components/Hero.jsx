import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { RiArrowRightLine } from 'react-icons/ri'
import useStore from '../store/useStore'

const scrollToSection = (id) => {
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Hero() {
  const scrollRef = useRef(null)
  const [videoError, setVideoError] = useState(false)
  const { setPage, closeCategory } = useStore()

  // Removed parallax scroll effect as requested

  return (
    <section className="relative z-20 min-h-[100svh] md:min-h-screen w-full overflow-hidden bg-[#030303] flex items-start">

      {/* ── Fallback background image so hero never goes blank ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(3,3,3,0.82), rgba(3,3,3,0.45)), url(https://images.unsplash.com/photo-1496747611176-43c7bf7f5fda?w=1600&q=80)',
        }}
      />

      {/* ── Full-screen background video ── */}
      <video
        src="/showroom.mp4"
        autoPlay
        muted
        loop
        playsInline
        onError={() => setVideoError(true)}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ display: videoError ? 'none' : 'block' }}
      />

      {/* ── Single uniform dark overlay — light enough that video shows through ── */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #030303 0%, transparent 100%)' }} />

      {/* ── Content ── */}
      <div
        ref={scrollRef}
        className="relative z-20 max-w-[1400px] mx-auto w-full px-5 sm:px-6 pt-52 sm:pt-60 md:pt-72 pb-10 sm:pb-12 min-h-screen flex flex-col justify-start"
      >
        {/* Extra clearance spacer for fixed Navbar */}
        <div className="h-20 md:h-28 w-full shrink-0" />

        {/* Tag line */}
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-3 mb-4 sm:mb-8">
          <div className="w-10 sm:w-12 h-[1px] bg-[#c8a45c]" />
          <span className="text-[#c8a45c] text-[10px] sm:text-[11px] tracking-[0.35em] sm:tracking-[0.4em] uppercase font-sans">
            New Collection 2026
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="overflow-visible mb-1">
          <motion.h1
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="font-display font-light leading-tight tracking-tight text-white m-0"
            style={{ fontSize: 'clamp(1.2rem, 7.5vw, 4.8rem)', textShadow: '0 2px 20px rgba(0,0,0,0.8)', color: '#ffffff' }}
          >
            TWIST
          </motion.h1>
        </div>
        <div className="overflow-visible mb-8">
          <motion.h1
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
            className="font-display font-extrabold leading-tight tracking-tight m-0"
            style={{
              fontSize: 'clamp(1.2rem, 7.5vw, 4.8rem)',
              background: 'linear-gradient(135deg, #c8a45c 0%, #f5e6a3 50%, #c8a45c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 2px 14px rgba(200,164,92,0.5))',
            }}
          >
            WEAR
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p {...fadeUp(0.6)}
          initial={false}
          className="font-sans font-light text-sm sm:text-base md:text-lg leading-snug sm:leading-relaxed mb-8 sm:mb-10 max-w-[18rem] sm:max-w-sm md:max-w-md"
          style={{ color: 'rgba(255,255,255,0.90)', textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
          Premium Quality Fashion for the Modern Lifestyle.<br />
          Crafted for those who define their own style.
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.75)} initial={false} className="relative z-30 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-16">
          <motion.button
            type="button"
            whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(200,164,92,0.5)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              closeCategory()
              setPage('new-arrivals')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="gold-btn relative z-30 inline-flex w-auto justify-center pointer-events-auto px-6 py-3 text-xs sm:px-7"
          >
            Shop Now <RiArrowRightLine className="text-lg" />
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div {...fadeUp(0.9)} initial={false} className="flex items-center flex-wrap gap-6 sm:gap-10 mt-6 md:mt-0">
          {[
            { num: '500+', label: 'Collections' },
            { num: '120K', label: 'Happy Clients' },
            { num: '4.9★', label: 'Avg Rating' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-semibold text-[#c8a45c]"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>{num}</span>
              <span className="text-white/60 text-[9px] sm:text-[11px] tracking-widest uppercase font-sans">{label}</span>
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  )
}
