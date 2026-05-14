import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { RiArrowRightLine, RiTimeLine } from 'react-icons/ri'

function Countdown() {
  const [time, setTime] = useState({ h: 11, m: 47, s: 23 })
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; m = 59; s = 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const pad = n => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-3">
      <RiTimeLine className="text-[#c8a45c] text-xl" />
      {[['h', time.h], ['m', time.m], ['s', time.s]].map(([label, val], i) => (
        <React.Fragment key={label}>
          {i > 0 && <span className="text-[#c8a45c]/60 text-xl font-display">:</span>}
          <div className="flex flex-col items-center bg-white/5 border border-white/10 px-3 py-2 min-w-[52px]">
            <span className="font-display text-2xl font-semibold text-[#f5f0e8] leading-none">{pad(val)}</span>
            <span className="text-[#f5f0e8]/30 text-[9px] tracking-widest uppercase font-sans mt-0.5">{label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

// Rotating sale badge
function RotatingBadge() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      className="w-28 h-28 md:w-36 md:h-36 flex-shrink-0"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <path id="circle" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
        </defs>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#c8a45c" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="28" fill="rgba(200,164,92,0.12)" />
        <text className="text-[#c8a45c]" fontSize="11" fill="#c8a45c" letterSpacing="4" fontFamily="Inter, sans-serif" fontWeight="600">
          <textPath href="#circle">SUMMER SALE • LIMITED OFFER •&nbsp;</textPath>
        </text>
        <text x="50" y="55" textAnchor="middle" fontSize="16" fill="#c8a45c" fontFamily="serif" fontWeight="bold">40%</text>
      </svg>
    </motion.div>
  )
}

export default function DiscountBanner() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-25% 0px -25% 0px' })
  const [hovered, setHovered] = useState(false)
  const shouldReveal = inView && hovered

  return (
    <section ref={ref} className="py-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative"
        style={{
          background: 'linear-gradient(135deg, #0a0600 0%, #1a1000 25%, #0d0800 50%, #150f00 75%, #0a0600 100%)',
        }}
      >
        {/* Background video */}
        <video
          src="/summer-sale-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.24 }}
        />
        <div className="absolute inset-0 bg-[#050300]/75" />

        {/* Moving gradient overlay */}
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(200,164,92,0.3) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />

        {/* Gold scanline */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a45c] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a45c] to-transparent" />

        <motion.div
          className="relative max-w-[1400px] mx-auto px-6 py-20 md:py-28"
          initial={false}
          animate={shouldReveal ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: shouldReveal ? 'auto' : 'none' }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, x: -50 }} animate={shouldReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[#c8a45c] text-[11px] tracking-[0.5em] uppercase font-sans mb-5"
              >
                ✦ Limited Time Offer ✦
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, x: -70 }} animate={shouldReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -70 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(3rem,7vw,6rem)] font-light leading-[0.9] text-[#f5f0e8] mb-4"
              >
                SUMMER<br />
                <span className="italic text-[#c8a45c]">SALE</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, x: -35, scaleX: 0 }} animate={shouldReveal ? { opacity: 1, x: 0, scaleX: 1 } : { opacity: 0, x: -35, scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="h-[1px] bg-[#c8a45c]/40 w-full max-w-xs mx-auto lg:mx-0 mb-6 origin-left"
              />

              <motion.p
                initial={{ opacity: 0, x: -45 }} animate={shouldReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -45 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#f5f0e8]/50 font-sans text-base mb-8 max-w-md mx-auto lg:mx-0"
              >
                Up to <span className="text-[#c8a45c] font-semibold">40% off</span> on selected premium collections.
                Upgrade your wardrobe with the finest styles.
              </motion.p>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, x: -40 }} animate={shouldReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center lg:justify-start mb-10"
              >
                <Countdown />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }} animate={shouldReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="flex gap-4 flex-wrap justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(200,164,92,0.45)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                  className="gold-btn"
                >
                  Explore Collection <RiArrowRightLine className="text-lg" />
                </motion.button>
                <button
                  onClick={() => document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-[#f5f0e8]/50 text-[11px] tracking-[0.25em] uppercase font-sans hover:text-[#c8a45c] transition-colors duration-300 underline underline-offset-4">
                  View All Offers
                </button>
              </motion.div>
            </div>

            {/* Right: badge + features */}
            <motion.div
              initial={{ opacity: 0, y: 70, scale: 0.82 }}
              animate={shouldReveal ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 70, scale: 0.82 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-10"
            >
              <RotatingBadge />

              {/* Feature pills */}
              <div className="flex flex-col gap-3">
                {['Free Shipping on Orders Rs. 99+', 'Easy 30-Day Returns', 'Exclusive Member Discounts'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-[#f5f0e8]/60 text-sm font-sans">
                    <span className="w-1.5 h-1.5 bg-[#c8a45c] rounded-full flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
