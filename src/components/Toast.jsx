import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RiShoppingBagLine, RiHeartFill, RiCheckLine } from 'react-icons/ri'
import { toastRef } from '../utils/toast'

export default function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    toastRef.show = (msg, type) => {
      const id = Date.now() + Math.random()
      setToasts(prev => [...prev, { id, msg, type }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
    }
    return () => { toastRef.show = null }
  }, [])

  return (
    <div className="fixed top-4 right-4 md:top-[90px] md:right-5 left-4 md:left-auto flex flex-col gap-2.5 pointer-events-none" style={{ zIndex: 999999 }}>
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 16px', width: '100%', minWidth: 'auto',
              maxWidth: '380px', marginLeft: 'auto',
              background: 'rgba(10,10,10,0.98)',
              border: `1px solid ${t.type === 'wishlist' ? '#c8a45c' : 'rgba(200,164,92,0.5)'}`,
              boxShadow: '0 12px 50px rgba(0,0,0,0.9)',
              borderRadius: '8px'
            }}
          >
            {/* Icon */}
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
              background: 'rgba(200,164,92,0.15)', border: '1px solid rgba(200,164,92,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {t.type === 'wishlist'
                ? <RiHeartFill style={{ color: '#c8a45c', fontSize: '16px' }} />
                : <RiShoppingBagLine style={{ color: '#c8a45c', fontSize: '16px' }} />
              }
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <p style={{ color: '#f5f0e8', fontSize: '13px', fontWeight: 500, margin: 0, lineHeight: 1.4 }}>
                {t.msg}
              </p>
              <p style={{ color: '#c8a45c', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '2px 0 0' }}>
                {t.type === 'wishlist' ? 'Wishlist' : 'Cart'}
              </p>
            </div>

            <RiCheckLine style={{ color: '#c8a45c', fontSize: '18px', flexShrink: 0 }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
