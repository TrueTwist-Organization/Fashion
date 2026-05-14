import React from 'react'
import { motion } from 'framer-motion'
import {
  RiInstagramLine, RiFacebookCircleLine, RiArrowUpLine,
} from 'react-icons/ri'

import useStore from '../store/useStore'

const footerLinks = {
  Shop:       [
    { label:'New Arrivals',   id:'new-arrivals', type:'page' },
    { label:'Best Sellers',   id:'featured', type:'scroll' },
    { label:'Sale',           id:'featured', type:'scroll' },
  ],
  Categories: [
    { label:'Men',            id:'Men', type:'category' },
    { label:'Women',          id:'Women', type:'category' },
    { label:'Kids',           id:'Kids', type:'category' },
  ],
  Info:       [
    { label:'Disclaimer',            id:'disclaimer', type:'page' },
    { label:'Privacy Policy',        id:'privacy', type:'page' },
    { label:'Terms and Conditions',  id:'terms', type:'page' },
    { label:'About Us',              id:'about',   type:'page' },
    { label:'Contact Us',            id:'contact', type:'page' },
  ],
}

const socials = [
  { Icon: RiInstagramLine,      href: 'https://www.instagram.com/', label: 'Instagram' },
  { Icon: RiFacebookCircleLine, href: 'https://www.facebook.com/',  label: 'Facebook' },
]

export default function Footer() {
  const { setCategory, closeCategory, setPage, closePage, closeProduct } = useStore()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const navigate = (id, type) => {
    closeProduct()
    if (type === 'category') {
      closePage()
      setCategory(id)
      window.scrollTo({ top: 0 })
      return
    }
    if (type === 'page') {
      closeCategory()
      setPage(id)
      window.scrollTo({ top: 0 })
      return
    }
    if (type === 'scroll') {
      closeCategory()
      closePage()
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
      return
    }
  }

  return (
    <footer className="relative z-10 bg-[#030303] border-t border-white/5">

      {/* Top strip */}
      <div className="gold-line" />

      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand column */}
          <div className="col-span-2">
            <a href="/" className="font-display text-3xl font-semibold tracking-[0.15em] text-[#f5f0e8] uppercase mb-5 inline-block">
              Twist<span className="text-[#c8a45c]">Wear</span>
            </a>
            <p className="text-[#f5f0e8]/60 font-sans text-sm leading-relaxed mb-8 max-w-xs">
              Premium fashion for the modern lifestyle. Crafted with passion, worn with purpose.
              Redefine your style with TwistWear.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"
                  whileHover={{ y: -4, color: '#c8a45c' }} whileTap={{ scale: 0.88 }}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-[#f5f0e8]/50 text-base hover:border-[#c8a45c]/40 transition-colors duration-300">
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-[#c8a45c] text-[10px] tracking-[0.35em] uppercase font-sans font-semibold mb-6">
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, id, type }) => (
                  <li key={label}>
                    <motion.button
                      onClick={() => navigate(id, type)}
                      whileHover={{ x: 4, color: '#c8a45c' }}
                      className="text-[#f5f0e8]/60 hover:text-[#c8a45c] text-sm font-sans transition-colors duration-300 inline-block text-left">
                      {label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="gold-line mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-8 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <p className="text-[#f5f0e8]/50 text-xs font-sans tracking-wide">
              © 2026 TwistWear. All rights reserved. Crafted with elegance.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-[#f5f0e8]/40 text-[10px] font-sans tracking-[0.2em] uppercase">
              <a href="https://truetwist.in/" target="_blank" rel="noreferrer" className="group flex items-center gap-2 hover:text-[#c8a45c] transition-colors duration-300">
                <span className="w-1 h-1 rounded-full bg-[#c8a45c]/40 group-hover:bg-[#c8a45c] transition-colors" />
                Designed By <span className="text-[#c8a45c]/70 font-semibold group-hover:text-[#c8a45c]">Trutwist</span>
              </a>
              <a href="https://369network.com/" target="_blank" rel="noreferrer" className="group flex items-center gap-2 hover:text-[#c8a45c] transition-colors duration-300">
                <span className="w-1 h-1 rounded-full bg-[#c8a45c]/40 group-hover:bg-[#c8a45c] transition-colors" />
                Marketing By <span className="text-[#c8a45c]/70 font-semibold group-hover:text-[#c8a45c]">369 Network</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="flex flex-wrap items-center justify-center gap-3 text-[#f5f0e8]/40 text-[11px] font-sans tracking-widest uppercase">
              {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map(p => (
                <span key={p} className="border border-white/10 px-3 py-1 hover:border-[#c8a45c]/40 transition-colors cursor-default">{p}</span>
              ))}
            </div>

            <div className="flex items-center gap-8 text-[#f5f0e8]/50 text-[10px] font-sans tracking-widest uppercase">
              <button onClick={() => navigate('privacy', 'page')} className="hover:text-[#c8a45c] transition-colors">Privacy Policy</button>
              <button onClick={() => navigate('terms', 'page')} className="hover:text-[#c8a45c] transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={scrollTop}
        whileHover={{ scale: 1.1, backgroundColor: '#c8a45c', color: '#030303' }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-11 md:h-11 bg-[#0a0a0a] border border-[#c8a45c]/30 text-[#c8a45c] flex items-center justify-center z-30 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
      >
        <RiArrowUpLine className="text-lg" />
      </motion.button>
    </footer>
  )
}
