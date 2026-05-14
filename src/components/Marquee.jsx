import React from 'react'
const words = ['TWISTWEAR', 'NEW DROP', 'PREMIUM QUALITY', 'STREETWEAR', 'MODERN STYLE', 'NEW COLLECTION 2026', 'EXCLUSIVE DESIGNS', 'LUXURY FASHION']

function MarqueeLine({ reverse = false, speed = '28s' }) {
  const text = [...words, ...words]
  return (
    <div className="overflow-hidden">
      <div
        className={`flex items-center whitespace-nowrap ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}
        style={{ animationDuration: speed }}
      >
        {text.map((w, i) => (
          <span key={i} className="flex items-center gap-5 px-5">
            <span className="text-[#c8a45c]/60 flex-shrink-0 text-[8px]">✦</span>
            <span className="text-[11px] md:text-[12px] tracking-[0.35em] uppercase font-sans font-medium text-[#f5f0e8]/50">
              {w}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="w-full border-y border-white/5 py-4 bg-[#030303] overflow-hidden select-none">
      <MarqueeLine />
      <div className="mt-2 opacity-40">
        <MarqueeLine reverse speed="36s" />
      </div>
    </div>
  )
}
