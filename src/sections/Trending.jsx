import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import './Trending.css'

const trendingItems = [
  { id: 1, name: 'Velvet Noir Blazer', price: '₹4,299', tag: 'Hot', color: '#7b3fa0', accent: '#c4a8e8' },
  { id: 2, name: 'Silk Flow Dress', price: '₹6,799', tag: 'New', color: '#f4a878', accent: '#fde8d8' },
  { id: 3, name: 'Linen Edit Co-ord', price: '₹3,499', tag: 'Trending', color: '#5b2d9e', accent: '#c4a8e8' },
  { id: 4, name: 'Sheer Poetry Top', price: '₹2,199', tag: 'Hot', color: '#c9a84c', accent: '#e8d09c' },
  { id: 5, name: 'Plissé Skirt Set', price: '₹5,099', tag: 'New', color: '#d4a0d0', accent: '#e8d9f8' },
  { id: 6, name: 'Power Suit Jacket', price: '₹7,899', tag: 'Editor\'s Pick', color: '#3d1a6e', accent: '#8a70a8' },
]

const tagColors = {
  'Hot': { bg: '#ff6b6b', text: 'white' },
  'New': { bg: '#7b3fa0', text: 'white' },
  'Trending': { bg: '#f4a878', text: 'white' },
  "Editor's Pick": { bg: '#c9a84c', text: 'white' },
}

// Stylized clothing illustration
function ClothingIllustration({ color, accent, type = 0 }) {
  const shapes = [
    // Dress
    <svg key="dress" viewBox="0 0 120 160" fill="none">
      <ellipse cx="60" cy="28" rx="22" ry="22" fill={accent} opacity="0.3"/>
      <path d="M38 52 Q60 42 82 52 L95 155 Q60 165 25 155 Z" fill={color} opacity="0.9"/>
      <path d="M38 52 L30 80 L22 52" fill={accent} opacity="0.5"/>
      <path d="M82 52 L90 80 L98 52" fill={accent} opacity="0.5"/>
      <rect x="48" y="30" width="24" height="24" rx="4" fill={color}/>
      <ellipse cx="60" cy="28" rx="12" ry="14" fill={accent} opacity="0.6"/>
      <line x1="60" y1="70" x2="60" y2="140" stroke={accent} strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5"/>
    </svg>,
    // Top & pants
    <svg key="top" viewBox="0 0 120 160" fill="none">
      <rect x="30" y="35" width="60" height="55" rx="8" fill={color} opacity="0.9"/>
      <path d="M30 35 L18 60 L30 60" fill={accent} opacity="0.6"/>
      <path d="M90 35 L102 60 L90 60" fill={accent} opacity="0.6"/>
      <rect x="35" y="35" width="50" height="12" rx="6" fill={accent} opacity="0.5"/>
      <rect x="28" y="95" width="28" height="60" rx="6" fill={color} opacity="0.85"/>
      <rect x="64" y="95" width="28" height="60" rx="6" fill={color} opacity="0.85"/>
      <rect x="28" y="92" width="64" height="8" rx="4" fill={accent} opacity="0.6"/>
    </svg>,
    // Jacket
    <svg key="jacket" viewBox="0 0 120 160" fill="none">
      <path d="M25 45 Q60 35 95 45 L100 155 H20 Z" fill={color} opacity="0.9"/>
      <path d="M50 45 L60 100 L70 45" fill={accent} opacity="0.4"/>
      <path d="M25 45 L10 65 L20 155 L40 145 Z" fill={color} opacity="0.7"/>
      <path d="M95 45 L110 65 L100 155 L80 145 Z" fill={color} opacity="0.7"/>
      <ellipse cx="60" cy="30" rx="14" ry="16" fill={accent} opacity="0.5"/>
      <circle cx="48" cy="85" r="3" fill={accent} opacity="0.7"/>
      <circle cx="48" cy="100" r="3" fill={accent} opacity="0.7"/>
      <circle cx="48" cy="115" r="3" fill={accent} opacity="0.7"/>
    </svg>,
  ]
  return (
    <div className="clothing-illustration">
      {shapes[type % shapes.length]}
    </div>
  )
}

export default function Trending() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="trending" ref={ref}>
      <div className="trending__header">
        <motion.p
          className="trending__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          What's Hot Right Now
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Trending <span className="gradient-text">Outfits</span>
        </motion.h2>
      </div>

      <div className="trending__grid">
        {trendingItems.map((item, i) => {
          const fromLeft = i % 2 === 0
          return (
            <motion.div
              key={item.id}
              className="trending-card"
              initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -12, transition: { duration: 0.25 } }}
            >
              <div className="trending-card__image-wrap">
                <ClothingIllustration color={item.color} accent={item.accent} type={i % 3} />
                <div
                  className="trending-card__bg-gradient"
                  style={{
                    background: `radial-gradient(ellipse at center, ${item.color}30 0%, transparent 70%)`
                  }}
                />
                <span
                  className="trending-card__tag"
                  style={{
                    background: tagColors[item.tag]?.bg || '#7b3fa0',
                    color: tagColors[item.tag]?.text || 'white'
                  }}
                >
                  {item.tag}
                </span>
                <motion.button
                  className="trending-card__wishlist"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiHeart size={16} />
                </motion.button>
              </div>

              <div className="trending-card__info">
                <h3 className="trending-card__name">{item.name}</h3>
                <div className="trending-card__bottom">
                  <span className="trending-card__price">{item.price}</span>
                  <motion.button
                    className="trending-card__add"
                    style={{ background: item.color }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiShoppingBag size={14} />
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
