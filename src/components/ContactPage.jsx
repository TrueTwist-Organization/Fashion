import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowLeftLine, RiMailLine, RiPhoneLine, RiMapPinLine, RiInstagramLine, RiTwitterLine, RiLinkedinLine } from 'react-icons/ri'
import useStore from '../store/useStore'
import Footer from './Footer'
import WatermarkOverlay from './WatermarkOverlay'

const accent = '#c8a45c'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
})

const fadeSide = (x = 30, delay = 0) => ({
  initial: { opacity: 0, x },
  animate: { opacity: 1, x: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
})

const contactItems = [
  { icon: <RiMailLine />, label: 'Email', value: 'hello@twistwear.com' },
  { icon: <RiPhoneLine />, label: 'Phone', value: '+91 98765 43210' },
  { icon: <RiMapPinLine />, label: 'Address', value: 'Fashion Street, Mumbai, India 400001' },
]

const socialItems = [
  { icon: <RiInstagramLine />, label: 'Instagram' },
  { icon: <RiTwitterLine />, label: 'Twitter' },
  { icon: <RiLinkedinLine />, label: 'LinkedIn' },
]

const hourItems = [
  { day: 'Mon - Fri', time: '9:00 AM - 7:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
  { day: 'Sunday', time: 'Closed' },
]

export default function ContactPage() {
  const { closePage } = useStore()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [showWatermark, setShowWatermark] = useState(false)
  const scrollRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
      scrollRef.current.focus({ preventScroll: true })
    }
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return undefined

    const updateWatermark = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? 0
      const revealPoint = Math.max(heroHeight - 120, 220)
      setShowWatermark(container.scrollTop > revealPoint)
    }

    updateWatermark()
    container.addEventListener('scroll', updateWatermark, { passive: true })
    window.addEventListener('resize', updateWatermark)

    return () => {
      container.removeEventListener('scroll', updateWatermark)
      window.removeEventListener('resize', updateWatermark)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#f5f0e8',
    padding: '14px 16px',
    fontSize: '13px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.3s, background 0.3s',
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] overflow-y-auto bg-[#030303]"
        tabIndex={-1}
        style={{ outline: 'none', overscrollBehavior: 'contain' }}
      >
        <WatermarkOverlay visible={showWatermark} />
        <div className="sticky top-0 z-10 bg-[#030303]/95 backdrop-blur-md border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[56px] flex items-center justify-between">
            <button onClick={closePage} className="flex items-center gap-2 text-white/40 hover:text-[#c8a45c] transition-colors text-xs tracking-[0.2em] uppercase font-sans">
              <RiArrowLeftLine className="text-base" /> Back
            </button>
            <p className="font-display text-sm tracking-[0.3em] uppercase text-[#f5f0e8]">
              Twist<span style={{ color: accent }}>Wear</span>
            </p>
            <span />
          </div>
        </div>

        <div ref={heroRef} className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 25%, rgba(200,164,92,0.14) 0%, transparent 32%), radial-gradient(circle at 82% 22%, rgba(255,255,255,0.08) 0%, transparent 26%)' }} />
            <div
              className="absolute top-[16%] right-[10%] w-44 h-44 rounded-full"
              style={{ opacity: 0.18, background: 'radial-gradient(circle, rgba(200,164,92,0.22) 0%, transparent 72%)', filter: 'blur(20px)' }}
            />
          </div>

          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="text-center mb-14 md:mb-18">
              <motion.p {...fadeUp(0.12)} className="text-xs tracking-[0.45em] uppercase font-sans mb-4" style={{ color: accent }}>
                Contact Us
              </motion.p>
              <motion.h1 {...fadeUp(0.2)} className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-[#f5f0e8] leading-tight">
                Let's <span className="italic" style={{ color: accent }}>Connect</span>
              </motion.h1>
              <motion.p {...fadeUp(0.3)} className="mt-5 text-white/38 font-sans text-sm md:text-base max-w-[620px] mx-auto leading-8">
                Have a question, collaboration idea, or need style guidance? Reach out to TwistWear and our team
                will help you with product support, orders, partnerships, and premium shopping assistance.
              </motion.p>
              <motion.div {...fadeUp(0.35)} className="w-16 h-px mx-auto mt-8" style={{ background: accent }} />
            </div>

            {/* Stats — clean, no boxes */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-wrap items-center justify-center gap-0 mt-2"
            >
              {[
                { title: 'Response Time', value: '< 24 Hrs' },
                { title: 'Support Window', value: 'Mon – Sat' },
                { title: 'Based In', value: 'Mumbai' },
              ].map((item, i) => (
                <div key={item.title} className="flex items-center">
                  <div className="px-4 sm:px-8 md:px-12 text-center">
                    <div className="font-display text-xl sm:text-2xl md:text-3xl font-light mb-1" style={{ color: accent }}>{item.value}</div>
                    <div className="text-[9px] tracking-[0.2em] uppercase font-sans text-white/35">{item.title}</div>
                  </div>
                  {i < 2 && (
                    <div className="h-10 w-px flex-shrink-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(200,164,92,0.4), transparent)' }} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12">
            <motion.div
              {...fadeSide(-34, 0.08)}
              className="bg-[#0b0b0b] border border-white/5 p-6 md:p-8 lg:p-10"
            >
              <h2 className="font-display text-2xl font-light text-[#f5f0e8] mb-8">Contact <span className="italic" style={{ color: accent }}>Info</span></h2>
              <div
                className="w-24 h-px mb-8"
                style={{ background: 'linear-gradient(90deg, #c8a45c, rgba(200,164,92,0.12))' }}
              />

              <div className="flex flex-col gap-4 mb-10">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-4 group border border-white/5 bg-white/[0.02] p-4 md:p-5"
                    whileHover={{ x: 4 }}
                    {...fadeUp(0.12 + i * 0.08)}
                  >
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                      style={{ color: accent, fontSize: '20px' }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-white/30 mb-1">{item.label}</p>
                      <p className="font-sans text-sm text-[#f5f0e8]/70">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div {...fadeUp(0.24)} className="border-t border-white/5 pt-8">
                <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-white/30 mb-5">Follow Us</p>
                <div
                  className="w-16 h-px mb-5"
                  style={{ background: 'linear-gradient(90deg, #c8a45c, rgba(200,164,92,0.12))' }}
                />
                <div className="flex gap-4 flex-wrap">
                  {socialItems.map(s => (
                    <motion.button
                      key={s.label}
                      className="w-10 h-10 flex items-center justify-center hover:text-[#c8a45c] transition-all duration-300 border border-white/10"
                      style={{ color: 'rgba(245,240,232,0.4)', fontSize: '20px' }}
                      title={s.label}
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.94 }}
                    >
                      {s.icon}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp(0.32)} className="mt-10">
                <p className="text-[10px] tracking-[0.3em] uppercase font-sans mb-4" style={{ color: accent }}>Business Hours</p>
                <div className="w-16 h-px mb-5" style={{ background: 'linear-gradient(90deg, #c8a45c, rgba(200,164,92,0.1))' }} />
                <div className="flex flex-col gap-1 border border-white/5 bg-white/[0.02] p-4 md:p-5">
                  {hourItems.map(h => (
                    <div key={h.day} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-b-0">
                      <span className="text-xs font-sans text-white/40 w-20">{h.day}</span>
                      <span className="text-xs font-sans text-white/60">{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              {...fadeSide(34, 0.12)}
              className="relative bg-[#0b0b0b] border border-white/5 p-6 md:p-8 lg:p-10"
            >
              <h2 className="relative font-display text-2xl font-light text-[#f5f0e8] mb-8">Send a <span className="italic" style={{ color: accent }}>Message</span></h2>
              <div
                className="relative w-24 h-px mb-8"
                style={{ background: 'linear-gradient(90deg, #c8a45c, rgba(200,164,92,0.12))' }}
              />

              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative mb-6 p-4 border text-sm font-sans"
                    style={{ borderColor: `${accent}60`, background: `${accent}12`, color: accent }}
                  >
                    Message sent! We'll get back to you within 24 hours.
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-sans text-white/30 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = `${accent}60`; e.target.style.background = 'rgba(255,255,255,0.05)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-sans text-white/30 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = `${accent}60`; e.target.style.background = 'rgba(255,255,255,0.05)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)' }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-sans text-white/30 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = `${accent}60`; e.target.style.background = 'rgba(255,255,255,0.05)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)' }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-sans text-white/30 mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => { e.target.style.borderColor = `${accent}60`; e.target.style.background = 'rgba(255,255,255,0.05)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)' }}
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 32px rgba(200,164,92,0.3)` }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 py-4 text-[11px] tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300"
                  style={{ background: accent, color: '#030303' }}
                >
                  Send Message →
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}
