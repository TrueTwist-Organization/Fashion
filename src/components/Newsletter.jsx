import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { RiMailLine, RiArrowRightLine, RiCheckLine } from 'react-icons/ri'

export default function Newsletter() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email,    setEmail]    = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setEmail('') }, 3500)
  }

  return (
    <section ref={ref} className="py-16 md:py-32 bg-[#050505] relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.06] rounded-full"
          style={{ background: 'radial-gradient(ellipse, #c8a45c 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-[700px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="w-14 h-14 bg-[#c8a45c]/10 border border-[#c8a45c]/20 flex items-center justify-center mx-auto mb-8">
            <RiMailLine className="text-[#c8a45c] text-2xl" />
          </div>

          <p className="text-[#c8a45c] text-[11px] tracking-[0.4em] uppercase font-sans mb-5">Stay In The Loop</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-[#f5f0e8] mb-5">
            Join the <span className="italic text-[#c8a45c]">Inner Circle</span>
          </h2>
          <p className="text-[#f5f0e8]/45 font-sans text-base leading-relaxed mb-12 max-w-md mx-auto">
            Subscribe for exclusive early access to new collections, private sale events,
            and curated style guides — delivered straight to your inbox.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-0 border border-white/10 bg-[#0a0a0a] overflow-hidden mb-8"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 bg-transparent px-6 py-5 text-[#f5f0e8] placeholder-[#f5f0e8]/25 text-sm font-sans outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ backgroundColor: '#e8d5a3' }}
            whileTap={{ scale: 0.97 }}
            disabled={submitted}
            className="bg-[#c8a45c] text-[#030303] px-8 py-5 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold flex items-center justify-center gap-2 min-w-[160px] transition-colors duration-300 disabled:opacity-80"
          >
            {submitted ? (
              <><RiCheckLine className="text-lg" /> Subscribed!</>
            ) : (
              <>Subscribe <RiArrowRightLine className="text-base" /></>
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[#f5f0e8]/25 text-[11px] font-sans tracking-wide"
        >
          No spam, ever. Unsubscribe at any time. —
          <span className="text-[#c8a45c]/60"> 85,000+ subscribers</span>
        </motion.p>
      </div>
    </section>
  )
}
