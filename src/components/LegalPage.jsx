import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowLeftLine } from 'react-icons/ri'
import useStore from '../store/useStore'
import Footer from './Footer'
import WatermarkOverlay from './WatermarkOverlay'

const accent = '#c8a45c'

const pageContent = {
  disclaimer: {
    label: 'Disclaimer',
    title: 'Disclaimer',
    intro:
      'The information provided on TwistWear is for general fashion, shopping, and brand communication purposes only. We strive to keep all information accurate and up to date, but we do not guarantee completeness, reliability, or accuracy at all times.',
    sections: [
      {
        heading: 'General Information',
        body:
          'Product descriptions, pricing, availability, and promotional details may change without prior notice. Images are presented for reference and may slightly vary due to lighting, screen settings, or updates in product presentation.',
      },
      {
        heading: 'No Professional Advice',
        body:
          'Content on this website should not be considered legal, financial, medical, or professional advice. Any decision made based on website content is at your own discretion and responsibility.',
      },
      {
        heading: 'Limitation of Liability',
        body:
          'TwistWear shall not be held responsible for any indirect, incidental, or consequential loss arising from use of the website, purchase decisions, or inability to access services temporarily.',
      },
    ],
  },
  privacy: {
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    intro:
      'TwistWear respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the information you share with us while browsing or shopping.',
    sections: [
      {
        heading: 'Information We Collect',
        body:
          'We may collect your name, email address, phone number, shipping address, payment-related order data, and browsing behavior when you interact with our website, forms, and purchase flows.',
      },
      {
        heading: 'How We Use Data',
        body:
          'Your information is used to process orders, improve user experience, send service updates, provide customer support, and communicate relevant offers when permitted.',
      },
      {
        heading: 'Data Protection',
        body:
          'We take reasonable security measures to protect your information, but no online system is completely risk-free. By using the website, you acknowledge and accept this limitation.',
      },
      {
        heading: 'Third-Party Services',
        body:
          'Certain tools such as payment gateways, analytics services, and social platforms may process limited data based on their own privacy practices. We encourage users to review those third-party policies as well.',
      },
    ],
  },
  terms: {
    label: 'Terms and Conditions',
    title: 'Terms and Conditions',
    intro:
      'By accessing or using TwistWear, you agree to comply with the following terms and conditions. These terms govern website usage, purchases, communication, and general interaction with our brand.',
    sections: [
      {
        heading: 'Use of Website',
        body:
          'Users agree to use the website lawfully and respectfully. Any misuse, unauthorized access, attempt to disrupt services, or fraudulent activity may result in restricted access and further action where applicable.',
      },
      {
        heading: 'Orders and Pricing',
        body:
          'All orders are subject to availability and confirmation. Prices, discounts, and offers may be updated or withdrawn at any time without notice. TwistWear reserves the right to cancel or refuse orders when necessary.',
      },
      {
        heading: 'Returns and Support',
        body:
          'Returns, exchanges, and support requests are subject to our store policies and eligibility conditions. Customers are encouraged to review the relevant support details before placing an order.',
      },
      {
        heading: 'Intellectual Property',
        body:
          'All visual assets, branding, content, and design elements on TwistWear remain the property of the brand unless otherwise stated. They may not be copied, reproduced, or redistributed without permission.',
      },
    ],
  },
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
})

export default function LegalPage({ pageKey }) {
  const { closePage } = useStore()
  const scrollRef = useRef(null)
  const heroRef = useRef(null)
  const [showWatermark, setShowWatermark] = useState(false)
  const content = pageContent[pageKey]

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

  if (!content) return null

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
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 20%, rgba(200,164,92,0.12) 0%, transparent 30%), radial-gradient(circle at 80% 25%, rgba(255,255,255,0.08) 0%, transparent 24%)' }} />
          </div>

          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
            <motion.p {...fadeUp(0.08)} className="text-xs tracking-[0.5em] uppercase font-sans mb-5" style={{ color: accent }}>
              {content.label}
            </motion.p>
            <motion.h1 {...fadeUp(0.16)} className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-[#f5f0e8] leading-tight">
              {content.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="italic" style={{ color: accent }}>
                {content.title.split(' ').slice(-1)}
              </span>
            </motion.h1>
            <motion.p {...fadeUp(0.24)} className="mt-6 max-w-[760px] mx-auto text-white/45 font-sans text-sm md:text-base leading-8">
              {content.intro}
            </motion.p>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="grid gap-6">
            {content.sections.map((section, i) => (
              <motion.div
                key={section.heading}
                {...fadeUp(0.08 + i * 0.08)}
                className="bg-[#0b0b0b] border border-white/5 p-6 md:p-8"
              >
                <p className="text-[10px] tracking-[0.35em] uppercase font-sans mb-3" style={{ color: accent }}>
                  Section {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-light text-[#f5f0e8] mb-4">
                  {section.heading}
                </h2>
                <p className="text-white/45 font-sans text-sm md:text-[15px] leading-8">
                  {section.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}
