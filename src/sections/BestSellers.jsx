import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi'
import './BestSellers.css'

const products = [
  { id: 1, name: 'Bloom Maxi Dress', category: 'Women', price: '₹5,499', originalPrice: '₹7,200', rating: 4.9, reviews: 284, color: '#c4a8e8', color2: '#e8d9f8', badge: 'Bestseller' },
  { id: 2, name: 'Urbane Trench Coat', category: 'Men', price: '₹8,999', originalPrice: '₹11,500', rating: 4.8, reviews: 197, color: '#5b2d9e', color2: '#8a70a8', badge: 'Top Rated' },
  { id: 3, name: 'Satin Wrap Blouse', category: 'Women', price: '₹2,799', originalPrice: '₹3,800', rating: 4.7, reviews: 412, color: '#f4a878', color2: '#fde8d8', badge: 'Fan Fav' },
  { id: 4, name: 'Linen Breeze Pants', category: 'Men', price: '₹3,199', originalPrice: '₹4,200', rating: 4.8, reviews: 163, color: '#3d1a6e', color2: '#7b3fa0', badge: 'Bestseller' },
]

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          className={`star ${star <= Math.floor(rating) ? 'star--filled' : star <= rating ? 'star--half' : ''}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: star * 0.08, type: 'spring', stiffness: 400 }}
        >
          <FiStar size={13} />
        </motion.span>
      ))}
      <span className="star-num">{rating}</span>
    </div>
  )
}

// Product card illustration
function ProductVisual({ color, color2, index }) {
  const shapes = [
    // Long dress
    <svg key="d" viewBox="0 0 100 140" fill="none">
      <ellipse cx="50" cy="20" rx="14" ry="16" fill={color2} opacity="0.6"/>
      <path d="M36 38 Q50 30 64 38 L74 135 Q50 142 26 135 Z" fill={color} opacity="0.88"/>
      <rect x="40" y="22" width="20" height="18" rx="4" fill={color} opacity="0.9"/>
      <line x1="50" y1="55" x2="50" y2="125" stroke={color2} strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6"/>
      <path d="M36 38 L28 62 L36 62" fill={color2} opacity="0.5"/>
      <path d="M64 38 L72 62 L64 62" fill={color2} opacity="0.5"/>
    </svg>,
    // Coat
    <svg key="c" viewBox="0 0 100 140" fill="none">
      <ellipse cx="50" cy="18" rx="12" ry="14" fill={color2} opacity="0.5"/>
      <path d="M28 35 Q50 25 72 35 L78 135 H22 Z" fill={color} opacity="0.9"/>
      <path d="M22 40 L10 65 L20 135 L34 130 Z" fill={color} opacity="0.7"/>
      <path d="M78 40 L90 65 L80 135 L66 130 Z" fill={color} opacity="0.7"/>
      <path d="M44 35 L50 90 L56 35" fill={color2} opacity="0.3"/>
      <circle cx="40" cy="70" r="2.5" fill={color2} opacity="0.7"/>
      <circle cx="40" cy="85" r="2.5" fill={color2} opacity="0.7"/>
      <circle cx="40" cy="100" r="2.5" fill={color2} opacity="0.7"/>
    </svg>,
    // Top
    <svg key="t" viewBox="0 0 100 140" fill="none">
      <ellipse cx="50" cy="18" rx="12" ry="14" fill={color2} opacity="0.5"/>
      <rect x="28" y="32" width="44" height="52" rx="8" fill={color} opacity="0.9"/>
      <path d="M28 32 L16 58 L28 56" fill={color2} opacity="0.6"/>
      <path d="M72 32 L84 58 L72 56" fill={color2} opacity="0.6"/>
      <ellipse cx="50" cy="30" rx="12" ry="8" fill={color2} opacity="0.5"/>
      <rect x="26" y="88" width="22" height="48" rx="6" fill={color} opacity="0.82"/>
      <rect x="52" y="88" width="22" height="48" rx="6" fill={color} opacity="0.82"/>
      <rect x="26" y="85" width="48" height="8" rx="4" fill={color2} opacity="0.5"/>
    </svg>,
    // Pants + shirt
    <svg key="p" viewBox="0 0 100 140" fill="none">
      <ellipse cx="50" cy="18" rx="12" ry="14" fill={color2} opacity="0.5"/>
      <rect x="32" y="32" width="36" height="40" rx="6" fill={color2} opacity="0.7"/>
      <rect x="26" y="74" width="22" height="62" rx="6" fill={color} opacity="0.9"/>
      <rect x="52" y="74" width="22" height="62" rx="6" fill={color} opacity="0.9"/>
      <rect x="26" y="72" width="48" height="8" rx="4" fill={color2} opacity="0.5"/>
      <line x1="50" y1="38" x2="50" y2="70" stroke={color} strokeWidth="1.5" opacity="0.4"/>
    </svg>,
  ]

  return (
    <div className="product-visual">
      {shapes[index % shapes.length]}
    </div>
  )
}

export default function BestSellers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bestsellers" ref={ref}>
      <div className="bestsellers__header">
        <motion.p
          className="bestsellers__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Customer Favorites
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Best <span className="gradient-text">Sellers</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Loved by thousands, defined by style
        </motion.p>
      </div>

      <div className="bestsellers__grid">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            className="product-card"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.12,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
          >
            <div className="product-card__image">
              <ProductVisual color={product.color} color2={product.color2} index={i} />
              <div
                className="product-card__glow"
                style={{
                  background: `radial-gradient(ellipse, ${product.color}25 0%, transparent 70%)`
                }}
              />
              <span className="product-card__badge">{product.badge}</span>

              <div className="product-card__hover-actions">
                <motion.button
                  className="product-card__action-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiHeart size={16} />
                </motion.button>
                <motion.button
                  className="product-card__action-btn product-card__action-btn--primary"
                  style={{ background: product.color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiShoppingBag size={16} />
                </motion.button>
              </div>
            </div>

            <div className="product-card__info">
              <span className="product-card__category">{product.category}</span>
              <h3 className="product-card__name">{product.name}</h3>

              <StarRating rating={product.rating} />
              <span className="product-card__reviews">({product.reviews} reviews)</span>

              <div className="product-card__pricing">
                <span className="product-card__price">{product.price}</span>
                <span className="product-card__original">{product.originalPrice}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
