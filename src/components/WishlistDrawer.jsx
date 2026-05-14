import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine, RiHeartLine, RiShoppingBagLine, RiDeleteBin6Line, RiArrowRightLine } from 'react-icons/ri'
import useStore from '../store/useStore'
import { featuredProducts, newArrivals } from '../data/products'

const allProducts = [...featuredProducts, ...newArrivals]

export default function WishlistDrawer() {
  const { 
    wishlistOpen, closeWishlistDrawer, wishlist, 
    toggleWishlist, addToCart, toggleCart 
  } = useStore()
  
  const wishItems = wishlist.map(id => allProducts.find(p => p.id === id)).filter(Boolean)

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeWishlistDrawer}
            className="fixed inset-0 z-[6000] bg-[#030303]/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[6001] w-full max-w-md bg-[#0a0a0a] border-l border-white/8 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <RiHeartLine className="text-[#c8a45c] text-xl" />
                <h2 className="font-display text-xl font-light text-[#f5f0e8]">
                  Wishlist
                  {wishItems.length > 0 && (
                    <span className="ml-2 text-[#c8a45c] font-sans text-sm">({wishItems.length})</span>
                  )}
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, color: '#c8a45c' }} whileTap={{ scale: 0.9 }}
                onClick={closeWishlistDrawer}
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-[#f5f0e8]/50 text-xl transition-colors duration-300"
              >
                <RiCloseLine />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {wishItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-8">
                  <RiHeartLine className="text-[#c8a45c]/20 text-7xl" />
                  <div>
                    <p className="font-display text-xl font-light text-[#f5f0e8]/60 mb-2">No favorites yet</p>
                    <p className="text-[#f5f0e8]/30 text-sm font-sans">Save pieces you love for later</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-white/5">
                  {wishItems.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="flex gap-4 px-6 py-5"
                    >
                      <div className="w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 overflow-hidden bg-[#1a1a1a]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm sm:text-base font-light text-[#f5f0e8] mb-1 truncate">{item.name}</h4>
                        <p className="text-[#c8a45c]/70 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-sans mb-3 font-bold">Rs. {item.price}</p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mt-4 sm:mt-0">
                          <button
                            onClick={() => {
                              addToCart(item);
                              toggleWishlist(item.id, item.name);
                              setTimeout(() => { toggleCart(); }, 300);
                            }}
                            className="text-[9px] sm:text-[10px] uppercase tracking-widest font-black text-[#c8a45c] flex items-center gap-2 hover:opacity-80 transition-all hover:translate-x-1"
                          >
                            <RiShoppingBagLine /> Move to Cart
                          </button>
                          
                          <button
                            onClick={() => toggleWishlist(item.id, item.name)}
                            className="text-[9px] sm:text-[10px] uppercase tracking-widest font-black text-white/30 flex items-center gap-2 hover:text-red-500 transition-colors"
                          >
                            <RiDeleteBin6Line /> Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/5 relative z-10 pointer-events-auto">
              <button 
                onClick={() => {
                  closeWishlistDrawer();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 bg-[#c8a45c] text-black font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-transform"
              >
                Back To Shop <RiArrowRightLine />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
