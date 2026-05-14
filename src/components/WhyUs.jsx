import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RiShieldCheckLine, RiTruckLine, RiRefreshLine, RiLockPasswordLine } from 'react-icons/ri'

const features = [
  {
    Icon: RiShieldCheckLine,
    title: 'Premium Quality',
    desc: 'Every garment is crafted from the finest materials, rigorously tested to meet our luxury standards.',
  },
  {
    Icon: RiTruckLine,
    title: 'Fast Delivery',
    desc: 'Express shipping worldwide. Your order packed with care and delivered to your door within 2–4 days.',
  },
  {
    Icon: RiRefreshLine,
    title: 'Easy Returns',
    desc: '30-day hassle-free returns policy. Not satisfied? We\'ll make it right — no questions asked.',
  },
  {
    Icon: RiLockPasswordLine,
    title: 'Secure Payment',
    desc: 'Bank-grade encryption on every transaction. Your data and payment are always safe with us.',
  },
]

export default function WhyUs() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 md:py-32 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-12 md:mb-20"
        >
          <p className="text-[#c8a45c] text-[11px] tracking-[0.4em] uppercase font-sans mb-4">Our Promise</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-[#f5f0e8]">
            Why Choose <span className="italic text-[#c8a45c]">TwistWear</span>
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, borderColor: 'rgba(200,164,92,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="group relative p-8 bg-[#0a0a0a] border border-white/5 transition-all duration-500 overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(200,164,92,0.08) 0%, transparent 70%)' }} />

              {/* Gold top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c8a45c]/0 via-[#c8a45c]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="w-14 h-14 bg-[#c8a45c]/8 border border-[#c8a45c]/15 flex items-center justify-center mb-6 group-hover:bg-[#c8a45c]/15 transition-colors duration-300">
                <Icon className="text-[#c8a45c] text-2xl" />
              </div>

              <h3 className="font-display text-xl font-light text-[#f5f0e8] mb-3 group-hover:text-[#c8a45c] transition-colors duration-300">
                {title}
              </h3>
              <p className="text-[#f5f0e8]/40 font-sans text-sm leading-relaxed">
                {desc}
              </p>

              {/* Number */}
              <div className="absolute bottom-5 right-6 font-display text-6xl font-bold text-white/[0.03] select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
