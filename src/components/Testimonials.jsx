import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { RiStarFill, RiArrowLeftSLine, RiArrowRightSLine, RiDoubleQuotesL } from 'react-icons/ri'
import { testimonials } from '../data/products'

export default function Testimonials() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [idx, setIdx]       = useState(0)
  const [direction, setDir] = useState(1)

  const go = (dir) => {
    setDir(dir)
    setIdx(i => (i + dir + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  }

  const current = testimonials[idx]

  return (
    <section ref={ref} className="py-16 md:py-32 bg-[#030303] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-10 md:mb-16"
        >
          <p className="text-[#c8a45c] text-[11px] tracking-[0.4em] uppercase font-sans mb-4">Client Stories</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-[#f5f0e8]">
            What They <span className="italic text-[#c8a45c]">Say</span>
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Quote icon */}
          <RiDoubleQuotesL className="text-[#c8a45c]/15 text-[120px] absolute -top-8 -left-4 pointer-events-none select-none" />

          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={idx}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                  {/* Avatar */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-3">
                    <div className="relative">
                      <img
                        src={current.avatar} alt={current.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-[#c8a45c]/30"
                      />
                      <div className="absolute inset-0 rounded-full border border-[#c8a45c]/20 scale-110" />
                    </div>
                    <div className="text-center">
                      <p className="font-display text-sm font-medium text-[#f5f0e8]">{current.name}</p>
                      <p className="text-[#c8a45c]/70 text-[10px] tracking-[0.2em] uppercase font-sans">{current.role}</p>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(current.rating)].map((_, i) => (
                        <RiStarFill key={i} className="text-[#c8a45c] text-xs" />
                      ))}
                    </div>
                  </div>

                  {/* Review text */}
                  <div className="flex-1">
                    <p className="font-display text-xl md:text-2xl lg:text-3xl font-light italic text-[#f5f0e8]/80 leading-relaxed">
                      "{current.text}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-12">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i) }}
                  className={`h-[2px] transition-all duration-400 ${
                    i === idx ? 'w-10 bg-[#c8a45c]' : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              {[[-1, RiArrowLeftSLine], [1, RiArrowRightSLine]].map(([dir, Icon]) => (
                <motion.button key={dir} onClick={() => go(dir)}
                  whileHover={{ scale: 1.1, borderColor: '#c8a45c', color: '#c8a45c' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 border border-white/15 flex items-center justify-center text-[#f5f0e8]/60 text-2xl transition-all duration-300"
                >
                  <Icon />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Brand statement strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/5"
        >
          {[
            { num: '120K+', label: 'Happy Customers' },
            { num: '500+',  label: 'Collections' },
            { num: '98%',   label: 'Satisfaction Rate' },
            { num: '4.9',   label: 'Average Rating' },
          ].map(({ num, label }) => (
            <div key={label} className="bg-[#030303] p-8 text-center hover:bg-[#0a0a0a] transition-colors duration-300 group">
              <div className="font-display text-4xl font-light text-[#c8a45c] group-hover:scale-105 transition-transform duration-300 inline-block">
                {num}
              </div>
              <p className="text-[#f5f0e8]/40 text-[11px] tracking-[0.25em] uppercase font-sans mt-2">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
