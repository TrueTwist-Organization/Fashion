import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiSearchLine, RiHeartLine, RiHeartFill, RiShoppingBagLine, RiMenuLine, RiCloseLine } from 'react-icons/ri'
import useStore from '../store/useStore'
import AuthModal from './AuthModal'
import { featuredProducts, newArrivals } from '../data/products'

const navLinks = [
  { label: 'Home',        id: 'home',        type: 'scroll'   },
  { label: 'Men',         id: 'Men',         type: 'category' },
  { label: 'Women',       id: 'Women',       type: 'category' },
  { label: 'Kids',        id: 'Kids',        type: 'category' },
  { label: 'New Arrivals',id: 'new-arrivals',type: 'page'     },
  { label: 'About',       id: 'about',       type: 'page'     },
  { label: 'Contact',     id: 'contact',     type: 'page'     },
]

function getWinW() {
  return typeof window !== 'undefined' ? window.innerWidth : 1200
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [winW,     setWinW]     = useState(getWinW)
  const {
    toggleCart, cartCount, wishlist, toggleWishlistDrawer,
    openCategory, openPage,
    setCategory, closeCategory, setPage, closePage, closeProduct, setProduct,
    isAuth, setAuth, openLogin
  } = useStore()
  const count     = cartCount()
  const wishCount = wishlist.length
  const allProducts = useMemo(() => [...featuredProducts, ...newArrivals], [])
  const activeLabel = useMemo(() => {
    if (openCategory) return openCategory
    if (openPage === 'new-arrivals') return 'New Arrivals'
    if (openPage === 'about') return 'About'
    if (openPage === 'contact') return 'Contact'
    return 'Home'
  }, [openCategory, openPage])
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return allProducts.slice(0, 6)
    return allProducts
      .filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query)
      )
      .slice(0, 8)
  }, [allProducts, searchQuery])

  const isMobile = winW < 1140
  const isSmall  = winW < 640

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, searchOpen])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false)
  }, [isMobile]) // eslint-disable-line

  const navigate = (label, id, type) => {
    setMenuOpen(false)
    setSearchOpen(false)
    closeProduct()
    
    // Push home path to clear any product detail URL parameters
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new Event('locationchange'))

    if (id === 'home')       { closeCategory(); closePage(); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    if (type === 'category') { closePage();     setCategory(id); return }
    if (type === 'page')     { closeCategory(); setPage(id);     return }
  }

  const openSearch = () => {
    setMenuOpen(false)
    setSearchOpen(true)
  }

  const handleSearchSelect = (product) => {
    setSearchOpen(false)
    setSearchQuery('')
    closeCategory()
    closePage()
    closeProduct()
    setProduct(product)
    window.history.pushState({ productId: product.id }, '', `/product/${product.id}`)
    window.dispatchEvent(new Event('locationchange'))
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 5000,
          background: scrolled ? 'rgba(10,10,10,0.85)' : '#0a0a0a',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: 1440,
          margin: '0 auto',
          padding: isSmall ? '0 12px' : '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: isSmall ? 52 : 70,
          transition: 'all 0.4s ease',
        }}>

          {/* ── Logo ── */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <a
              href="/"
              onClick={e => { e.preventDefault(); navigate('Home', 'home', 'scroll') }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: winW < 360 ? 17 : isSmall ? 18 : 24,
                fontWeight: 700, letterSpacing: '0.01em',
                color: '#f5f0e8', textDecoration: 'none', userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Twist<span style={{ color: '#c8a45c' }}>Wear</span>
            </a>
          </div>

          {/* ── Desktop Nav ── */}
          {!isMobile && (
            <nav style={{
              display: 'flex', alignItems: 'center',
              gap: 28, flex: 1, justifyContent: 'center',
            }}>
              {navLinks.map(({ label, id, type }) => (
                <button
                  key={label}
                  onClick={() => navigate(label, id, type)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Inter', sans-serif", fontSize: 11,
                    fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: activeLabel === label ? '#c8a45c' : 'rgba(245,240,232,0.5)',
                    position: 'relative', padding: '8px 0',
                    transition: 'color 0.3s ease', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (activeLabel !== label) e.currentTarget.style.color = '#f5f0e8' }}
                  onMouseLeave={e => { if (activeLabel !== label) e.currentTarget.style.color = 'rgba(245,240,232,0.5)' }}
                >
                  {label}
                  <span style={{
                    position: 'absolute', bottom: 0, left: '50%',
                    width: activeLabel === label ? '100%' : '0%', height: 1.5,
                    background: '#c8a45c', transform: 'translateX(-50%)',
                    transition: 'width 0.3s ease', display: 'block',
                  }} />
                </button>
              ))}
            </nav>
          )}

          {/* ── Actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isSmall ? 2 : 8, flexShrink: 0 }}>

            <button
              aria-label="Search"
              onClick={openSearch}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#f5f0e8', fontSize: isSmall ? 18 : 20, padding: isSmall ? 6 : 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'color 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c8a45c'}
              onMouseLeave={e => e.currentTarget.style.color = '#f5f0e8'}
            >
              <RiSearchLine />
            </button>

            {/* Wishlist */}
            <button
              onClick={toggleWishlistDrawer}
              aria-label="Wishlist"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: wishCount > 0 ? '#c8a45c' : '#f5f0e8',
                fontSize: isSmall ? 18 : 20, padding: isSmall ? 6 : 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', transition: 'color 0.25s',
              }}
            >
              {wishCount > 0 ? <RiHeartFill /> : <RiHeartLine />}
              {wishCount > 0 && (
                <span style={{
                  position: 'absolute', top: isSmall ? 2 : 3, right: isSmall ? 2 : 3,
                  background: '#c8a45c', color: '#000',
                  fontSize: 8, fontWeight: 700,
                  minWidth: 14, height: 14, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 2px',
                }}>{wishCount}</span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              aria-label="Cart"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#f5f0e8', fontSize: isSmall ? 20 : 22, padding: isSmall ? 6 : 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', transition: 'color 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c8a45c'}
              onMouseLeave={e => e.currentTarget.style.color = '#f5f0e8'}
            >
              <RiShoppingBagLine />
              {count > 0 && (
                <span style={{
                  position: 'absolute', top: isSmall ? 2 : 3, right: isSmall ? 2 : 3,
                  background: '#c8a45c', color: '#000',
                  fontSize: 8, fontWeight: 700,
                  width: 14, height: 14, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{count}</span>
              )}
            </button>

            {/* Login Toggle */}
            <button
              onClick={() => isAuth ? setAuth(false) : openLogin()}
              style={{
                background: isAuth ? 'transparent' : '#c8a45c', 
                border: isAuth ? '1px solid rgba(255,255,255,0.2)' : '1px solid #c8a45c',
                cursor: 'pointer',
                color: isAuth ? '#f5f0e8' : '#000', 
                fontSize: 10, padding: isSmall ? '6px 10px' : '8px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.25s', borderRadius: 4, fontWeight: 800,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                marginLeft: isSmall ? 4 : 8,
              }}
              onMouseEnter={e => {
                if (isAuth) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
              }}
              onMouseLeave={e => {
                if (isAuth) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
            >
              {isAuth ? 'LOGOUT' : 'LOGIN'}
            </button>

            {/* Hamburger — mobile only */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(v => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: menuOpen ? 'rgba(200,164,92,0.15)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${menuOpen ? 'rgba(200,164,92,0.35)' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 12, cursor: 'pointer',
                  color: menuOpen ? '#c8a45c' : '#f5f0e8',
                  width: isSmall ? 36 : 46, height: isSmall ? 36 : 46,
                  fontSize: isSmall ? 18 : 24,
                  flexShrink: 0,
                  transition: 'all 0.25s',
                  marginLeft: 4,
                }}
              >
                {menuOpen ? <RiCloseLine /> : <RiMenuLine />}
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 10001,
              background: 'rgba(3,3,3,0.82)', backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              padding: isSmall ? '90px 16px 24px' : '110px 24px 30px',
            }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              style={{
                width: '100%',
                maxWidth: '760px',
                background: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: isSmall ? '14px' : '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <RiSearchLine style={{ color: '#c8a45c', fontSize: '20px', flexShrink: 0 }} />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search products, categories..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#f5f0e8',
                    fontSize: isSmall ? '14px' : '15px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(245,240,232,0.6)', cursor: 'pointer', fontSize: '22px', display: 'flex' }}
                  aria-label="Close search"
                >
                  <RiCloseLine />
                </button>
              </div>

              <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: isSmall ? '8px' : '10px' }}>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleSearchSelect(product)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: isSmall ? '10px' : '12px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: isSmall ? '54px' : '60px', height: isSmall ? '68px' : '76px', objectFit: 'cover', flexShrink: 0, background: '#111' }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: '#f5f0e8', fontSize: isSmall ? '14px' : '15px', fontFamily: '"Playfair Display", serif' }}>
                          {product.name}
                        </div>
                        <div style={{ color: 'rgba(245,240,232,0.42)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', marginTop: '4px' }}>
                          {product.category} · {product.subcategory}
                        </div>
                        <div style={{ color: '#c8a45c', fontSize: '12px', marginTop: '6px' }}>
                          Rs. {product.price}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div style={{ padding: '26px 18px', color: 'rgba(245,240,232,0.45)', textAlign: 'center', fontSize: '14px' }}>
                    No products found.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        {menuOpen && (
          <motion.div
            key="mob-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 10000,
              background: '#080808',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Top bar */}
            <div style={{
              position: 'sticky', top: 0, left: 0, right: 0,
              height: isSmall ? 70 : 88,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: isSmall ? '0 16px' : '0 32px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: '#080808',
              zIndex: 2,
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isSmall ? 20 : 24, fontWeight: 700, color: '#f5f0e8',
              }}>
                Twist<span style={{ color: '#c8a45c' }}>Wear</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(200,164,92,0.15)',
                  border: '1px solid rgba(200,164,92,0.35)',
                  borderRadius: 10, cursor: 'pointer', color: '#c8a45c',
                  width: isSmall ? 38 : 42, height: isSmall ? 38 : 42,
                  fontSize: isSmall ? 20 : 24,
                }}
              >
                <RiCloseLine />
              </button>
            </div>

            {/* Links */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              paddingTop: isSmall ? 12 : 20,
              paddingBottom: 72,
            }}>
              {navLinks.map(({ label, id, type }, idx) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + idx * 0.05, duration: 0.3 }}
                  onClick={() => navigate(label, id, type)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isSmall ? 26 : 32,
                    fontWeight: 600, letterSpacing: '0.01em',
                    color: activeLabel === label ? '#c8a45c' : 'rgba(245,240,232,0.85)',
                    padding: `${isSmall ? 18 : 20}px 32px`,
                    width: '100%', textAlign: 'center',
                    borderBottom: idx < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                </motion.button>
              ))}
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{
                paddingBottom: 32,
                color: 'rgba(255,255,255,0.15)', fontSize: 10,
                letterSpacing: '0.4em', textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              TWISTWEAR EST. 2026
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal />
    </>
  )
}
