import React from 'react'

export default function WatermarkOverlay({
  visible = true,
  textColor = 'rgba(255,255,255,0.12)',
  shadowColor = 'rgba(255,255,255,0.08)',
  zIndex = 0,
}) {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{
        zIndex,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-60%',
          left: '-30%',
          width: '160%',
          height: '220%',
          transform: 'rotate(0deg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '3.5rem',
        }}
      >
        {Array.from({ length: 18 }).map((_, row) => (
          <div key={row} style={{ display: 'flex', gap: '4rem', paddingLeft: '2rem' }}>
            {Array.from({ length: 8 }).map((__, col) => (
              <span
                key={col}
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  letterSpacing: '0.55em',
                  color: textColor,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  textShadow: `0 1px 2px ${shadowColor}`,
                }}
              >
                TWISTWEAR
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
