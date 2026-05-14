import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowLeftLine } from 'react-icons/ri'
import useStore from '../store/useStore'
import Footer from './Footer'
import WatermarkOverlay from './WatermarkOverlay'

const accent = '#c8a45c'

const values = [
  {
    title: 'Premium Quality',
    desc: 'Every garment is crafted with the finest fabrics sourced from around the world. We believe luxury is not a privilege — it\'s a standard.',
    icon: '✦',
  },
  {
    title: 'Timeless Design',
    desc: 'Our collections are designed to transcend seasons. We blend contemporary aesthetics with classic silhouettes that never go out of style.',
    icon: '◈',
  },
  {
    title: 'Sustainable Fashion',
    desc: 'We are committed to responsible production. From eco-friendly packaging to ethical sourcing, sustainability is woven into everything we do.',
    icon: '❋',
  },
  {
    title: 'Inclusive Style',
    desc: 'Fashion is for everyone. Our collections span Men, Women, and Kids — because every family deserves to look exceptional.',
    icon: '◉',
  },
]

const team = [
  { name: 'Aryan Shah', role: 'Founder & Creative Director', img: 'https://i.pravatar.cc/300?img=11' },
  { name: 'Priya Mehta', role: 'Head of Design', img: 'https://i.pravatar.cc/300?img=47' },
  { name: 'Rohan Verma', role: 'Brand Strategist', img: 'https://i.pravatar.cc/300?img=33' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
})

const fadeSide = (x = 30, delay = 0) => ({
  initial: { opacity: 0, x },
  animate: { opacity: 1, x: 0 },
  transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
})

export default function AboutPage() {
  const { closePage } = useStore()
  const scrollRef = useRef(null)
  const heroRef = useRef(null)
  const [showWatermark, setShowWatermark] = useState(false)

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
        {/* Sticky top bar */}
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

        {/* Hero */}
        <div ref={heroRef} className="relative overflow-hidden border-b border-white/5" style={{ minHeight: '72vh', display: 'flex', alignItems: 'center' }}>
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"
              alt="About TwistWear"
              className="w-full h-full object-cover"
              style={{ opacity: 0.2 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(3,3,3,0.96) 0%, rgba(3,3,3,0.56) 30%, rgba(3,3,3,0.6) 70%, #030303 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(200,164,92,0.12) 0%, transparent 55%)' }} />
            <div
              className="absolute top-[18%] left-[12%] w-40 h-40 rounded-full"
              style={{ opacity: 0.2, background: 'radial-gradient(circle, rgba(200,164,92,0.2) 0%, transparent 72%)', filter: 'blur(18px)' }}
            />
            <div
              className="absolute bottom-[16%] right-[10%] w-56 h-56 rounded-full"
              style={{ opacity: 0.15, background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 72%)', filter: 'blur(26px)' }}
            />
          </div>
          <div className="relative max-w-[860px] mx-auto px-6 md:px-10 py-24 md:py-32 text-center w-full">
            <motion.p {...fadeUp(0.08)} className="text-xs tracking-[0.55em] uppercase font-sans mb-6" style={{ color: accent }}>
              Our Story
            </motion.p>
            <motion.h1 {...fadeUp(0.16)} className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-[#f5f0e8] leading-tight">
              Crafted With <br />
              <span className="italic" style={{ color: accent }}>Passion</span>
            </motion.h1>
            <motion.div {...fadeUp(0.22)} className="w-16 h-px mx-auto mt-7 mb-7" style={{ background: 'linear-gradient(90deg, rgba(200,164,92,0.15), #c8a45c, rgba(200,164,92,0.15))' }} />
            <motion.p
              {...fadeUp(0.28)}
              className="max-w-[620px] mx-auto text-sm md:text-[15px] font-sans leading-8 text-white/50"
            >
              We create elevated everyday fashion with a luxury attitude — blending timeless silhouettes,
              modern confidence, and carefully selected materials into pieces that feel distinctive from the first wear.
            </motion.p>

            {/* Stats — clean, no boxes */}
            <motion.div
              {...fadeUp(0.36)}
              className="mt-12 flex items-center justify-center gap-0"
            >
              {[
                { label: 'Premium Pieces', value: '455+' },
                { label: 'Happy Clients', value: '12K+' },
                { label: 'Est. Year', value: '2022' },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center">
                  <div className="px-4 sm:px-8 md:px-12 text-center">
                    <div className="font-display text-2xl sm:text-3xl md:text-4xl font-light mb-1" style={{ color: accent }}>{item.value}</div>
                    <div className="text-[9px] tracking-[0.2em] uppercase font-sans text-white/35">{item.label}</div>
                  </div>
                  {i < 2 && (
                    <div className="h-10 w-px flex-shrink-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(200,164,92,0.4), transparent)' }} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Story */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 md:py-10">
          <motion.div
            {...fadeUp(0)}
            className="relative overflow-hidden"
            style={{
              border: '1px solid rgba(200,164,92,0.28)',
              background: 'linear-gradient(135deg, #0d0d0d 0%, #0a0a0a 100%)',
              boxShadow: '0 0 0 1px rgba(200,164,92,0.06), 0 24px 64px rgba(0,0,0,0.35)',
            }}
          >
            {/* Top gold accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, #c8a45c 30%, #c8a45c 70%, transparent)' }} />

            {/* Corner ornament top-right */}
            <div className="absolute top-4 right-5 text-[10px] tracking-[0.3em] uppercase font-sans" style={{ color: 'rgba(200,164,92,0.35)' }}>✦</div>

            {/* BG radial glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 10% 50%, rgba(200,164,92,0.07) 0%, transparent 55%)' }} />

            <div className="relative p-8 md:p-12">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-8"
                style={{ borderBottom: '1px solid rgba(200,164,92,0.14)' }}>
                <div>
                  <p className="text-[10px] tracking-[0.45em] uppercase font-sans mb-3" style={{ color: accent }}>
                    Who We Are
                  </p>
                  <h2 className="font-display text-2xl md:text-4xl font-light text-[#f5f0e8] leading-tight">
                    Premium fashion designed for
                    <br className="hidden md:block" />
                    <span className="italic" style={{ color: accent }}> modern expression</span>
                  </h2>
                </div>
                {/* Est. badge */}
                <div className="flex-shrink-0 text-center px-6 py-3 hidden md:block"
                  style={{ border: '1px solid rgba(200,164,92,0.22)', background: 'rgba(200,164,92,0.06)' }}>
                  <div className="font-display text-2xl text-[#f5f0e8]">2022</div>
                  <div className="text-[9px] tracking-[0.26em] uppercase font-sans mt-1" style={{ color: 'rgba(200,164,92,0.6)' }}>Est. Year</div>
                </div>
              </div>

              {/* Two-column body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <motion.p {...fadeUp(0.1)} className="font-sans text-[13px] md:text-sm text-white/48 leading-[2]">
                  TwistWear was born from a simple belief that premium fashion should be accessible, expressive,
                  and deeply personal. Founded in 2022, we started as a small studio with a big dream: to create
                  clothing that tells a story through detail, texture, and silhouette.
                </motion.p>
                <motion.p {...fadeUp(0.16)} className="font-sans text-[13px] md:text-sm text-white/48 leading-[2]">
                  From structured tailoring to fluid occasion wear, every TwistWear creation is designed to help
                  you feel confident, elegant, and unmistakably yourself — a brand built on the belief that
                  style should feel personal, not prescribed.
                </motion.p>
              </div>
            </div>

            {/* Bottom gold accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,92,0.3) 50%, transparent)' }} />
          </motion.div>
        </div>

        {/* Values */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 md:py-10">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.4em] uppercase font-sans mb-3" style={{ color: accent }}>What We Stand For</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#f5f0e8]">Our <span className="italic" style={{ color: accent }}>Values</span></h2>
            <div className="w-24 h-px mx-auto mt-6" style={{ background: 'linear-gradient(90deg, rgba(200,164,92,0.06), #c8a45c, rgba(200,164,92,0.06))' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.08)}
                className="relative group bg-[#0a0a0a] p-5 md:p-6 flex flex-col gap-4 overflow-hidden"
                style={{ border: '1px solid rgba(200,164,92,0.14)' }}
                whileHover={{ y: -6, borderColor: 'rgba(200,164,92,0.38)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* top gold line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: 'linear-gradient(90deg, #c8a45c, rgba(200,164,92,0.2))' }} />

                <div className="text-2xl" style={{ color: accent }}>{v.icon}</div>
                <div>
                  <h3 className="font-display text-[15px] md:text-base font-light text-[#f5f0e8] mb-2 group-hover:text-[#c8a45c] transition-colors duration-300 leading-snug">{v.title}</h3>
                  <p className="font-sans text-[12px] md:text-xs text-white/38 leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="border-y border-white/5 bg-[#0a0a0a] py-8 md:py-10 mt-4">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: '455+', label: 'Premium Products' },
                { num: '12K+', label: 'Happy Customers' },
                { num: '3', label: 'Collections' },
                { num: '2022', label: 'Est. Year' },
              ].map((s, i) => (
                <motion.div key={s.label} {...fadeUp(i * 0.1)} className="relative" whileHover={{ y: -6 }}>
                  <div className="font-display text-4xl md:text-5xl font-light mb-2" style={{ color: accent }}>{s.num}</div>
                  <div className="text-xs tracking-[0.25em] uppercase font-sans text-white/35">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="text-center mb-10 mt-8 md:mt-14">
            <p className="text-xs tracking-[0.4em] uppercase font-sans mb-3" style={{ color: accent }}>The People Behind</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-[#f5f0e8]">Meet the <span className="italic" style={{ color: accent }}>Team</span></h2>
            <div className="w-24 h-px mx-auto mt-5" style={{ background: 'linear-gradient(90deg, rgba(200,164,92,0.06), #c8a45c, rgba(200,164,92,0.06))' }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-14">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(i * 0.12)}
                className="flex flex-col items-center text-center group bg-[#0a0a0a] border border-white/5 p-6 md:p-8"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Avatar with gold ring */}
                <div className="relative mb-5">
                  <div className="absolute -inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'conic-gradient(from 0deg, #c8a45c, rgba(200,164,92,0.2), #c8a45c)', borderRadius: '50%' }} />
                  <img
                    src={member.img}
                    alt={member.name}
                    className="relative w-28 h-28 rounded-full object-cover"
                    style={{ border: '2px solid rgba(200,164,92,0.35)' }}
                  />
                </div>

                {/* Thin gold line */}
                <div className="w-8 h-px mb-4" style={{ background: accent }} />

                <h3 className="font-display text-lg font-light text-[#f5f0e8] mb-1 group-hover:text-[#c8a45c] transition-colors duration-300">{member.name}</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase font-sans" style={{ color: 'rgba(200,164,92,0.65)' }}>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}
