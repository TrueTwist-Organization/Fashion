import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    review: 'TwistWear completely transformed my wardrobe. The quality is outstanding — every piece feels luxurious and the styling is absolutely timeless.',
    rating: 5,
    purchase: 'Empress Collection',
    initials: 'PS',
    color: '#7b3fa0',
  },
  {
    id: 2,
    name: 'Aisha Malhotra',
    location: 'Delhi',
    review: "I ordered the silk wrap blouse and I am absolutely obsessed. The fabric drapes beautifully and I've received so many compliments. Will definitely order again!",
    rating: 5,
    purchase: 'Satin Wrap Blouse',
    initials: 'AM',
    color: '#f4a878',
  },
  {
    id: 3,
    name: 'Riya Kapoor',
    location: 'Bangalore',
    review: 'The packaging alone felt premium — like receiving a gift. The dress fits perfectly and the color is even more stunning in person. TwistWear is my new favorite brand.',
    rating: 5,
    purchase: 'Bloom Maxi Dress',
    initials: 'RK',
    color: '#c9a84c',
  },
  {
    id: 4,
    name: 'Meera Patel',
    location: 'Ahmedabad',
    review: 'From browsing to delivery, every step was seamless. The website is beautiful, size guide was accurate, and the clothes are absolutely stunning. 10/10!',
    rating: 5,
    purchase: 'Golden Hour Edit',
    initials: 'MP',
    color: '#5b2d9e',
  },
  {
    id: 5,
    name: 'Kavya Nair',
    location: 'Kochi',
    review: 'I was skeptical about online fashion shopping but TwistWear exceeded every expectation. The velvet blazer is chef\'s kiss — I wear it to every event.',
    rating: 5,
    purchase: 'Velvet Noir Blazer',
    initials: 'KN',
    color: '#d4a0d0',
  },
]

function StarRow({ rating }) {
  return (
    <div className="testimonial__stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={15}
          style={{
            fill: i < rating ? '#f4a878' : 'none',
            color: i < rating ? '#f4a878' : '#d0c0d0',
            filter: i < rating ? 'drop-shadow(0 0 3px rgba(244,168,120,0.5))' : 'none',
          }}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))
  }

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  const visible = [
    (current - 1 + testimonials.length) % testimonials.length,
    current,
    (current + 1) % testimonials.length,
  ]

  return (
    <section className="testimonials" ref={ref}>
      <div className="testimonials__header">
        <motion.p
          className="testimonials__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Real Stories
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          What Our <span className="gradient-text">Customers Say</span>
        </motion.h2>
      </div>

      <div className="testimonials__carousel">
        <motion.button
          className="testimonials__nav testimonials__nav--prev"
          onClick={prev}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronLeft size={22} />
        </motion.button>

        <div className="testimonials__track">
          {visible.map((idx, pos) => {
            const t = testimonials[idx]
            const isCenter = pos === 1
            return (
              <motion.div
                key={t.id}
                className={`testimonial-card ${isCenter ? 'testimonial-card--active' : ''}`}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{
                  opacity: isCenter ? 1 : 0.45,
                  x: 0,
                  scale: isCenter ? 1 : 0.88,
                  rotateY: isCenter ? 0 : pos === 0 ? 8 : -8,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                onClick={() => {
                  if (pos === 0) prev()
                  if (pos === 2) next()
                }}
                whileHover={!isCenter ? { opacity: 0.7 } : { rotateZ: 1 }}
              >
                <div className="testimonial-card__top">
                  <div
                    className="testimonial-card__avatar"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="testimonial-card__name">{t.name}</h4>
                    <p className="testimonial-card__location">{t.location}</p>
                  </div>
                  <div className="testimonial-card__quote-icon">"</div>
                </div>

                <StarRow rating={t.rating} />

                <p className="testimonial-card__review">{t.review}</p>

                <div className="testimonial-card__purchase">
                  <span>Purchased:</span> {t.purchase}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.button
          className="testimonials__nav testimonials__nav--next"
          onClick={next}
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight size={22} />
        </motion.button>
      </div>

      {/* Dots */}
      <div className="testimonials__dots">
        {testimonials.map((_, i) => (
          <motion.button
            key={i}
            className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
            onClick={() => {
              setDirection(i > current ? 1 : -1)
              setCurrent(i)
            }}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>
    </section>
  )
}
