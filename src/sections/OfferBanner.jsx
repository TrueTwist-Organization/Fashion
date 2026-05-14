import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiArrowRight, FiClock } from 'react-icons/fi'
import './OfferBanner.css'

export default function OfferBanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="offer-banner" ref={ref}>
      {/* Animated gradient background */}
      <div className="offer-banner__bg">
        <div className="offer-banner__gradient" />

        {/* Floating orbs */}
        {[
          { size: 300, top: '-80px', left: '-80px', color: 'rgba(196,168,232,0.15)' },
          { size: 200, bottom: '-60px', right: '-40px', color: 'rgba(244,168,120,0.15)' },
          { size: 160, top: '40%', left: '35%', color: 'rgba(255,255,255,0.05)' },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="offer-banner__orb"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              bottom: orb.bottom,
              left: orb.left,
              right: orb.right,
              background: `radial-gradient(circle, ${orb.color}, transparent)`,
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="offer-banner__content">
        {/* Left: Text */}
        <div className="offer-banner__text">
          <motion.div
            className="offer-banner__timer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <FiClock size={14} />
            Limited Time Offer
          </motion.div>

          <motion.h2
            className="offer-banner__title"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Up to <span className="offer-banner__percent">40%</span> Off
          </motion.h2>

          <motion.p
            className="offer-banner__subtitle"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            On our new seasonal collection — exclusive styles, premium fabrics,
            incredible prices. Don't miss out.
          </motion.p>

          <motion.div
            className="offer-banner__code-box"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <span className="offer-banner__code-label">Use Code</span>
            <span className="offer-banner__code">TWIST40</span>
          </motion.div>

          <motion.a
            href="#"
            className="btn-primary offer-banner__btn"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Shop the Sale
            <FiArrowRight size={18} />
          </motion.a>
        </div>

        {/* Right: rotating badge */}
        <div className="offer-banner__badge-wrap">
          <motion.div
            className="offer-banner__badge"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            {/* Circular text SVG */}
            <svg viewBox="0 0 200 200" fill="none">
              <defs>
                <path id="circle-text" d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
              </defs>
              <text fill="rgba(255,255,255,0.7)" fontSize="11.5" fontWeight="600" letterSpacing="3">
                <textPath href="#circle-text">
                  EXCLUSIVE DEAL ✦ TWIST40 ✦ EXCLUSIVE DEAL ✦ TWIST40 ✦
                </textPath>
              </text>
            </svg>
            {/* Center */}
            <div className="offer-banner__badge-center">
              <span className="offer-banner__badge-percent">40</span>
              <span className="offer-banner__badge-off">% OFF</span>
            </div>
          </motion.div>

          {/* Glowing rings */}
          <div className="offer-banner__ring offer-banner__ring--1" />
          <div className="offer-banner__ring offer-banner__ring--2" />
        </div>
      </div>
    </section>
  )
}
