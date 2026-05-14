import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, useAnimation } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import './FeaturedCollection.css'

const collections = [
  {
    id: 1,
    title: 'The Empress Collection',
    subtitle: 'For the woman who commands every room',
    season: 'Spring / Summer 2025',
    gradient: 'linear-gradient(135deg, #1a0a3e 0%, #5b2d9e 50%, #c4a8e8 100%)',
    accent: '#c4a8e8',
    pieces: 48,
  },
  {
    id: 2,
    title: 'Golden Hour Edit',
    subtitle: 'Draped in warmth, drenched in luxury',
    season: 'Exclusive Drop',
    gradient: 'linear-gradient(135deg, #2a1a0a 0%, #c9a84c 60%, #f4a878 100%)',
    accent: '#f4a878',
    pieces: 32,
  },
]

function PremiumCard({ collection, index, flipPulse }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1])
  const inView = useInView(ref, { once: false, margin: '-20% 0px' })
  const flipControls = useAnimation()

  useEffect(() => {
    if (inView) {
      const delay = index * 100
      const timer = setTimeout(() => {
        flipControls.start({
          rotateY: [0, 360],
          transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          },
        })
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [inView, index, flipControls, flipPulse])

  return (
    <motion.div
      ref={ref}
      className="featured-card"
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div 
        className="featured-card__inner" 
        style={{ scale, transformStyle: 'preserve-3d' }}
        animate={flipControls}
      >
        <div className="featured-card__bg" style={{ background: collection.gradient }}>
          {/* Decorative geometric elements */}
          <div className="featured-card__circle" style={{ borderColor: collection.accent + '40' }} />
          <div className="featured-card__circle featured-card__circle--2" style={{ borderColor: collection.accent + '25' }} />

          {/* Decorative lines */}
          <svg className="featured-card__deco" viewBox="0 0 400 300" fill="none">
            <line x1="200" y1="0" x2="200" y2="300" stroke={collection.accent} strokeWidth="0.5" strokeDasharray="6,4" opacity="0.3"/>
            <line x1="0" y1="150" x2="400" y2="150" stroke={collection.accent} strokeWidth="0.5" strokeDasharray="6,4" opacity="0.3"/>
            <circle cx="200" cy="150" r="80" stroke={collection.accent} strokeWidth="0.5" opacity="0.2"/>
            <circle cx="200" cy="150" r="140" stroke={collection.accent} strokeWidth="0.5" opacity="0.1"/>
          </svg>

          {/* Silhouette figure */}
          <div className="featured-card__figure">
            <svg viewBox="0 0 100 200" fill="none">
              <ellipse cx="50" cy="25" rx="15" ry="18" fill={collection.accent} opacity="0.6"/>
              <path d="M32 48 Q50 40 68 48 L75 120 Q50 130 25 120 Z" fill={collection.accent} opacity="0.5"/>
              <path d="M32 48 L20 90 L30 90" fill={collection.accent} opacity="0.4"/>
              <path d="M68 48 L80 90 L70 90" fill={collection.accent} opacity="0.4"/>
              <path d="M36 120 L32 185 L44 185 L50 150 L56 185 L68 185 L64 120 Z" fill={collection.accent} opacity="0.45"/>
            </svg>
          </div>
        </div>

        <motion.div
          className="featured-card__content"
          style={{ y }}
        >
          <span className="featured-card__season">{collection.season}</span>
          <h2 className="featured-card__title">{collection.title}</h2>
          <p className="featured-card__subtitle">{collection.subtitle}</p>
          <div className="featured-card__meta">
            <span className="featured-card__pieces">{collection.pieces} Exclusive Pieces</span>
          </div>
          <motion.a
            href="#"
            className="featured-card__btn"
            style={{ borderColor: collection.accent, color: collection.accent }}
            whileHover={{
              background: collection.accent,
              color: '#1a0a2e',
              scale: 1.03,
            }}
            transition={{ duration: 0.2 }}
          >
            View Collection
            <FiArrowRight size={16} />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function FeaturedCollection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-20% 0px' })
  const [flipPulse, setFlipPulse] = useState(0)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(!window.matchMedia('(hover: hover)').matches)
  }, [])

  return (
    <section 
      className="featured" 
      ref={ref}
      onMouseEnter={() => setFlipPulse(prev => prev + 1)}
      onPointerDown={() => isTouch && setFlipPulse(prev => prev + 1)}
    >
      <div className="featured__header">
        <motion.p
          className="featured__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Curated Exclusively
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Featured <span className="gradient-text">Collections</span>
        </motion.h2>
      </div>

      <div className="featured__grid">
        {collections.map((col, i) => (
          <PremiumCard key={col.id} collection={col} index={i} flipPulse={flipPulse} />
        ))}
      </div>
    </section>
  )
}
