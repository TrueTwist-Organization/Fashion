import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine, RiShoppingBagLine, RiAddLine, RiSubtractLine, RiDeleteBin6Line, RiArrowRightLine, RiCheckLine } from 'react-icons/ri'
import useStore from '../store/useStore'

export default function CartDrawer() {
  const { cartOpen, closeCart, cart, removeFromCart, updateQty, cartTotal, openCheckout } = useStore()
  const total = cartTotal()

  const handleCheckout = () => {
    if (cart.length === 0) return;
    openCheckout(cart);
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[6000] bg-[#030303]/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[6000] w-full max-w-md bg-[#0a0a0a] border-l border-white/8 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <RiShoppingBagLine className="text-[#c8a45c] text-xl" />
                <h2 className="font-display text-xl font-light text-[#f5f0e8]">
                  Your Cart
                  {cart.length > 0 && (
                    <span className="ml-2 text-[#c8a45c] font-sans text-sm">({cart.length})</span>
                  )}
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, color: '#c8a45c' }} whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-[#f5f0e8]/50 text-xl transition-colors duration-300"
              >
                <RiCloseLine />
              </motion.button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-8">
                  <RiShoppingBagLine className="text-[#c8a45c]/20 text-7xl" />
                  <div>
                    <p className="font-display text-xl font-light text-[#f5f0e8]/60 mb-2">Your cart is empty</p>
                    <p className="text-[#f5f0e8]/30 text-sm font-sans">Add some pieces to get started</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    onClick={closeCart}
                    className="gold-btn text-xs"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-white/5">
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="flex gap-4 px-6 py-5"
                    >
                      {/* Image */}
                      <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-[#1a1a1a]">
                        <img src={item.image} alt={item.name}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.style.background = '#1a1a1a' }}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-base font-light text-[#f5f0e8] mb-1 truncate">{item.name}</h4>
                        <p className="text-[#c8a45c]/70 text-[10px] tracking-[0.2em] uppercase font-sans mb-3">{item.category}</p>

                        <div className="flex items-center justify-between">
                          {/* Qty control */}
                          <div className="flex items-center border border-white/10">
                            <button onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#f5f0e8]/50 hover:text-[#c8a45c] transition-colors text-sm">
                              <RiSubtractLine />
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-[#f5f0e8] text-sm font-sans">
                              {item.qty}
                            </span>
                            <button onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#f5f0e8]/50 hover:text-[#c8a45c] transition-colors text-sm">
                              <RiAddLine />
                            </button>
                          </div>

                          <span className="font-display text-lg text-[#f5f0e8]">
                            Rs. {(item.price * item.qty).toFixed(0)}
                          </span>

                          {/* Delete */}
                          <motion.button
                            whileHover={{ scale: 1.1, color: '#ef4444' }} whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#f5f0e8]/30 text-base transition-colors duration-300"
                          >
                            <RiDeleteBin6Line />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-white/5 px-6 py-6 flex flex-col gap-5">
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[#f5f0e8]/50 text-sm font-sans">
                    <span>Subtotal</span><span>Rs. {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#f5f0e8]/50 text-sm font-sans">
                    <span>Shipping</span><span className="text-[#c8a45c]">Free</span>
                  </div>
                  <div className="gold-line" />
                  <div className="flex justify-between font-display text-xl text-[#f5f0e8]">
                    <span>Total</span>
                    <span className="text-[#c8a45c]">Rs. {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(200,164,92,0.35)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  className="w-full gold-btn justify-center py-4 text-[12px]"
                >
                  Checkout <RiArrowRightLine className="text-base" />
                </motion.button>
                <button onClick={closeCart}
                  className="w-full text-center text-[#f5f0e8]/35 text-[11px] tracking-widest uppercase font-sans hover:text-[#c8a45c] transition-colors duration-300">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
