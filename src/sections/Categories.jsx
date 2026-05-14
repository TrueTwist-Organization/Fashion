import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Categories.css'

const categories = [
  {
    name: 'Women',
    tagline: 'Elegant & Bold',
    gradient: 'linear-gradient(135deg, #7b3fa0, #c4a8e8)',
    emoji: '👗',
    count: '840+ styles',
  },
  {
    name: 'Men',
    tagline: 'Sharp & Refined',
    gradient: 'linear-gradient(135deg, #3d1a6e, #5b2d9e)',
    emoji: '🧥',
    count: '620+ styles',
  },
  {
    name: 'Western Wear',
    tagline: 'Contemporary Chic',
    gradient: 'linear-gradient(135deg, #f4a878, #f0d0b8)',
    emoji: '✨',
    count: '450+ styles',
  },
  {
    name: 'Ethnic Wear',
    tagline: 'Heritage Beauty',
    gradient: 'linear-gradient(135deg, #c9a84c, #e8d09c)',
    emoji: '🌸',
    count: '380+ styles',
  },
  {
    name: 'Casual Wear',
    tagline: 'Effortlessly Cool',
    gradient: 'linear-gradient(135deg, #5b2d9e, #8a70a8)',
    emoji: '👕',
    count: '720+ styles',
  },
  {
    name: 'Party Wear',
    tagline: 'Glamour Unleashed',
    gradient: 'linear-gradient(135deg, #d4a0d0, #c4a8e8)',
    emoji: '🥂',
    count: '290+ styles',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function Categories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="categories" id="categories" ref={ref}>
      <div className="categories__header">
        <motion.p
          className="categories__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Shop by Category
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Find Your <span className="gradient-text">Perfect Style</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Curated collections for every occasion and mood
        </motion.p>
      </div>

      <div className="categories__grid">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="category-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            whileHover={{
              y: -10,
              rotateY: 3,
              rotateX: -3,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <div className="category-card__bg" style={{ background: cat.gradient }} />

            <div className="category-card__content">
              <div className="category-card__emoji">{cat.emoji}</div>
              <h3 className="category-card__name">{cat.name}</h3>
              <p className="category-card__tagline">{cat.tagline}</p>
              <span className="category-card__count">{cat.count}</span>
            </div>

            <motion.div
              className="category-card__arrow"
              initial={{ x: 0, opacity: 0 }}
              whileHover={{ x: 4, opacity: 1 }}
            >
              →
            </motion.div>

            <div className="category-card__shine" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
