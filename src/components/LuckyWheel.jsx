import React, { useState, useRef } from 'react'
// Removed createPortal since modal is now confined to the section
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { RiGamepadLine, RiTrophyLine, RiCloseLine, RiEmotionSadLine } from 'react-icons/ri'
import useStore from '../store/useStore'

const SEGMENTS = [
  { label: '10% OFF', color: '#1a1a1a', neon: '#c8a45c' },
  { label: '15% OFF', color: '#0f0f0f', neon: '#ffffff' },
  { label: '20% OFF', color: '#1a1a1a', neon: '#c8a45c' },
  { label: 'FREE SHIP', color: '#0f0f0f', neon: '#ffffff' },
  { label: '₹100 OFF', color: '#1a1a1a', neon: '#c8a45c' },
  { label: 'TRY AGAIN', color: '#0f0f0f', neon: '#ff4444' },
]

// Separate WinningModal component for high priority display
const WinningModal = ({ result, onClose, onRetry }) => {
  const isTryAgain = result === 'TRY AGAIN';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-4 md:px-6 bg-black/95 backdrop-blur-xl"
      style={{ zIndex: 999999 }}
    >
      {/* Confetti Explosion effect inside modal */}
      {!isTryAgain && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2000000]">
          {[...Array(60)].map((_, i) => {
            const colors = ['#c8a45c', '#ffffff', '#e8e0d0', '#f5f0e8', '#ffd700', '#ff4d4d', '#4d79ff'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full"
                style={{
                  background: randomColor,
                  left: '50%',
                  top: '50%'
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0.5,
                  opacity: 1
                }}
                animate={{
                  x: (Math.random() - 0.5) * window.innerWidth * 0.8,
                  y: (Math.random() - 0.5) * window.innerHeight * 0.8,
                  rotate: Math.random() * 720,
                  opacity: [1, 1, 0],
                  scale: [1, 1.2, 0.5]
                }}
                transition={{
                  duration: Math.random() * 1.5 + 1.5,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            )
          })}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        className={`bg-[#0a0a0a] border-2 ${isTryAgain ? 'border-red-500/50 shadow-[0_0_100px_rgba(255,0,0,0.2)]' : 'border-[#c8a45c]/50 shadow-[0_0_100px_rgba(200,164,92,0.3)]'} p-10 md:p-14 text-center max-w-md w-full relative z-[1000000]`}
      >
        <button
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
          onClick={onClose}
        >
          <RiCloseLine size={32} />
        </button>

        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner ${isTryAgain ? 'bg-red-500/10 border border-red-500/30' : 'bg-[#c8a45c]/10 border border-[#c8a45c]/30'}`}>
          {isTryAgain ? (
            <RiEmotionSadLine className="text-red-500 text-4xl animate-pulse" />
          ) : (
            <RiTrophyLine className="text-[#c8a45c] text-4xl animate-bounce" />
          )}
        </div>

        <h3 className={`font-display text-4xl text-white mb-2 underline ${isTryAgain ? 'decoration-red-500/30' : 'decoration-[#c8a45c]/30'} underline-offset-8`}>
          {isTryAgain ? 'Oops!' : 'Congratulations!'}
        </h3>
        <p className={`${isTryAgain ? 'text-red-500' : 'text-[#c8a45c]'} uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 font-black`}>
          {isTryAgain ? 'Better luck next time' : "You've unlocked a reward"}
        </p>

        <div className="text-5xl md:text-7xl font-display text-white mb-10 tracking-tighter italic font-bold">
          {isTryAgain ? 'No Reward' : result}
        </div>

        {!isTryAgain && (
          <div className="bg-black/80 border-2 border-dashed border-[#c8a45c]/30 p-8 mb-10 relative group">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.5em] block mb-4">Official Voucher Code</span>
            <div className="text-3xl md:text-5xl font-bold text-white tracking-[0.25em] font-sans">
              {result === 'FREE SHIP' ? 'FREESHIP' : `TWIST${parseInt(result) || 20}`}
            </div>
            <div className="absolute top-0 left-[-100%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#c8a45c] to-transparent group-hover:left-[100%] transition-all duration-1000" />
          </div>
        )}

        {isTryAgain ? (
          <button
            onClick={() => { onClose(); if (onRetry) onRetry(); }}
            className="w-full py-5 bg-red-500 text-white font-black text-xs uppercase tracking-[0.4em] hover:bg-red-600 transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_15px_40px_rgba(255,0,0,0.3)]"
          >
            Try Again
          </button>
        ) : (
          <button
            onClick={() => {
              const cleanedResult = result.replace(/[^0-9]/g, '');
              const code = result === 'FREE SHIP' ? 'FREESHIP' : (cleanedResult ? `TWIST${cleanedResult}` : 'TWIST20');
              if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true') {
                useStore.getState().setClaimedVoucher(code);
                alert(`Reward claimed successfully! Code ${code} is now active.`);
                onClose();
              } else {
                useStore.getState().openLogin();
              }
            }}
            className="w-full py-5 bg-[#c8a45c] text-black font-black text-xs uppercase tracking-[0.4em] hover:bg-[#d4b46c] transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_15px_40px_rgba(200,164,92,0.3)]"
          >
            Claim Reward
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function LuckyWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const absoluteRotation = useRef(0)
  const controls = useAnimation()

  const spinWheel = async () => {
    if (isSpinning || (result && result !== 'TRY AGAIN')) return
    setIsSpinning(true)
    setResult(null)

    // Now Math.random() * 6 allows it to land on any of the 6 segments, including TRY AGAIN (index 5)
    const winningIndex = Math.floor(Math.random() * 6)
    const extraSpins = 6 + Math.floor(Math.random() * 4)

    // Calculate the perfect absolute angle to center the winning segment at the top (0 degrees)
    const exactTargetAngle = 360 - (winningIndex * 60) - 30;

    // Add extra spins to the current wheel rotation using the base multiple of 360
    const baseRotation = Math.floor(absoluteRotation.current / 360) * 360;
    const newTargetRotation = baseRotation + (extraSpins * 360) + exactTargetAngle;

    await controls.start({
      rotate: newTargetRotation,
      transition: { duration: 5, ease: [0.15, 0, 0.15, 1] }
    })

    absoluteRotation.current = newTargetRotation;
    setIsSpinning(false)
    setResult(SEGMENTS[winningIndex].label)
  }

  return (
    <section className="relative py-24 md:py-48 overflow-hidden bg-[#030303] border-y border-white/5">
      {/* Background Ambience & Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_center,rgba(200,164,92,0.08),transparent_75%)]" />
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#c8a45c]"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              opacity: 0.1
            }}
            animate={{
              y: ['-10%', '110%'],
              opacity: [0, 0.4, 0]
            }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-32">

          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 border border-[#c8a45c]/50 mb-10 w-fit backdrop-blur-md shadow-[0_0_20px_rgba(200,164,92,0.1)]">
              <RiGamepadLine className="text-[#c8a45c] text-xl animate-pulse" />
              <span className="text-[#c8a45c] text-[11px] tracking-[0.5em] font-sans uppercase font-black">Gaming Experience</span>
            </div>

            <h2 className="font-display text-5xl md:text-8xl font-light text-white leading-[1] mb-10">
              Play & Win <br />
              <span className="italic text-[#c8a45c] font-bold">Fashion Voucher</span>
            </h2>

            <p className="text-white/50 font-sans text-sm md:text-lg mb-14 leading-relaxed max-w-md mx-auto lg:mx-0">
              Spin the artisanal neon wheel to reveal your exclusive luxury benefit. Play now to test your luck.
            </p>

            <button
              onClick={spinWheel}
              disabled={isSpinning || (result && result !== 'TRY AGAIN')}
              className="px-16 py-6 bg-[#c8a45c] text-black text-[13px] font-sans tracking-[0.5em] uppercase font-black hover:bg-[#d4b46c] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_rgba(200,164,92,0.3)] disabled:opacity-40"
            >
              {isSpinning ? 'SPINNING...' : (result && result !== 'TRY AGAIN' ? 'UNLOCKED' : 'PLAY')}
            </button>
          </div>

          {/* Right Side: The Premium Wheel */}
          <div className="flex-1 relative flex justify-center items-center">
            <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
              {/* Outer Glow Circles */}
              <div className="absolute inset-[-40px] rounded-full border border-[#c8a45c]/5 animate-pulse" />
              <div className="absolute inset-[-20px] rounded-full border border-[#c8a45c]/20" />

              {/* Triangular Ticker (TOP POSITION) */}
              <div className="absolute top-[-25px] md:top-[-40px] left-1/2 -translate-x-1/2 z-50 filter drop-shadow-[0_0_10px_rgba(200,164,92,0.8)] pointer-events-none">
                <svg width="40" height="50" viewBox="0 0 40 50" fill="none" className="w-[40px] h-[50px] md:w-[60px] md:h-[70px]">
                  <path d="M20 45L5 10C5 10 5 0 20 0C35 0 35 10 35 10L20 45Z" fill="url(#arrowGrad)" />
                  <path d="M20 50L0 0H40L20 50Z" fill="url(#arrowGrad)" className="opacity-0" />
                  {/* The actual triangle we use: */}
                  <polygon points="0,0 40,0 20,50" fill="url(#arrowGrad)" stroke="#fff" strokeWidth="2" />
                  <defs>
                    <linearGradient id="arrowGrad" x1="20" y1="0" x2="20" y2="50" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f7d486" />
                      <stop offset="1" stopColor="#a8843c" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* The Wheel */}
              <motion.div
                animate={controls}
                className="w-full h-full rounded-full relative overflow-visible shadow-[0_0_150px_rgba(0,0,0,1)] ring-8 ring-[#111]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <defs>
                    <radialGradient id="sliceGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="black" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {SEGMENTS.map((seg, i) => {
                    const angle = 60
                    const rotation = i * angle
                    return (
                      <g key={i} transform={`rotate(${rotation}, 50, 50)`}>
                        <path d="M50,50 L50,0 A50,50 0 0,1 93.3,25 Z" fill={seg.color} stroke="#000" strokeWidth="0.2" />
                        <path d="M50,50 L50,0 A50,50 0 0,1 93.3,25 Z" fill="url(#sliceGrad)" />

                        {/* Glowing Arc Border */}
                        <path
                          d="M50,0 A50,50 0 0,1 93.3,25"
                          fill="none"
                          stroke={seg.neon}
                          strokeWidth="2.5"
                          className="opacity-90"
                          style={{ filter: `drop-shadow(0 0 8px ${seg.neon}88)` }}
                        />

                        <text
                          x="74" y="27"
                          fill={seg.neon}
                          fontSize="3.8"
                          fontWeight="black"
                          transform="rotate(30, 74, 27)"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{
                            fontFamily: 'Outfit, sans-serif',
                            textShadow: `0 0 10px ${seg.neon}77`
                          }}
                        >
                          {seg.label}
                        </text>
                      </g>
                    )
                  })}
                </svg>

                {/* Center Core Hub */}
                <div className="absolute inset-[37%] bg-gradient-to-br from-[#1a1a1a] to-[#000] rounded-full border-4 border-[#c8a45c] z-30 flex items-center justify-center shadow-inner">
                  <div className="absolute inset-0 bg-[#c8a45c]/5 rounded-full animate-ping opacity-30" />
                  <div className="w-1/2 h-half border border-white/5 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CONFINED TO SECTION */}
      <AnimatePresence>
        {result && (
          <WinningModal
            key="winning-modal"
            result={result}
            onClose={() => setResult(null)}
            onRetry={result === 'TRY AGAIN' ? spinWheel : undefined}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
