import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RiArrowLeftLine, RiHeartFill, RiHeartLine, RiShoppingBagLine, RiCloseLine, RiTrophyLine } from 'react-icons/ri'
import useStore from '../store/useStore'
import WatermarkOverlay from './WatermarkOverlay'

const getDiscountText = (product) => {
  if (!product?.oldPrice || !product?.price) return null
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
  return discount > 0 ? `-${discount}%` : null
}

const getProductMeta = (product) => ({
  size: product?.category === 'Kids' ? 'XS' : 'S',
  color: product?.colors?.length ? product.colors[0] : 'Brown',
  condition: 'Very Good',
  details: product?.badge ? `${product.badge} signature statement piece` : 'Cropped brown leopard print jacket',
})

const getSizeOptions = (product) => {
  if (product?.category === 'Kids') return ['XS', 'S', 'M', 'L']
  return ['S', 'M', 'L', 'XL']
}

export default function ProductDetailPage({ product, onBack } = {}) {
  const {
    openProduct, closeProduct, addToCart, toggleWishlist, wishlist,
    isAuth, openLogin, claimedVoucher, setClaimedVoucher,
    setPage, closePage, openCheckout
  } = useStore()
  const activeProduct = product || openProduct
  const [imageTilt, setImageTilt] = useState({ x: 0, y: 0 })
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })
  const [selectedImage, setSelectedImage] = useState(null)
  const [showVideo, setShowVideo] = useState(false)

  if (!activeProduct) return null

  const wished = wishlist.includes(activeProduct.id)
  const discountText = getDiscountText(activeProduct)
  const meta = getProductMeta(activeProduct)
  const sizeOptions = getSizeOptions(activeProduct)
  const [selectedSize, setSelectedSize] = useState(meta.size)

  const hasVideo = !!(activeProduct.video || activeProduct.hoverVideo)

  // All images: main + extras
  const allImages = activeProduct.images?.length
    ? [activeProduct.image, ...activeProduct.images]
    : []

  const displayImage = selectedImage || activeProduct.image

  useEffect(() => {
    setSelectedSize(getProductMeta(activeProduct).size)
    setSelectedImage(null)
    setShowVideo(!!(activeProduct.video || activeProduct.hoverVideo))
  }, [activeProduct])

  const handleTilt = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setImageTilt({ x: py * -8, y: px * 8 })
    setImageOffset({ x: px * 42, y: py * 42 })
  }

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ backgroundColor: '#030303', minHeight: '100vh' }}
      >
        <WatermarkOverlay />
        <div style={{ maxWidth: '1480px', margin: '0 auto', padding: 'clamp(12px,3vw,20px) clamp(12px,4vw,24px) 40px' }}>
          <button
            onClick={() => {
              if (onBack) onBack()
              else closeProduct()
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              background: 'transparent',
              color: '#f5f0e8',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: '18px',
            }}
          >
            <RiArrowLeftLine style={{ fontSize: '18px' }} />
            Back
          </button>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: 'clamp(24px, 4vw, 56px)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onMouseMove={handleTilt}
              onMouseLeave={() => {
                setImageTilt({ x: 0, y: 0 })
                setImageOffset({ x: 0, y: 0 })
              }}
              style={{
                flex: '1 1 300px',
                minWidth: '280px',
                perspective: '1600px',
              }}
            >
              <motion.div
                animate={{ scale: imageTilt.x || imageTilt.y ? 1.015 : 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                style={{
                  minHeight: 'clamp(220px, 38vw, 520px)',
                  backgroundColor: '#0b0b0b',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: 'clamp(14px, 2.5vw, 28px)',
                  overflow: 'hidden',
                }}
              >
                {hasVideo && showVideo ? (
                  <motion.video
                    src={activeProduct.video || activeProduct.hoverVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    animate={{
                      scale: imageTilt.x || imageTilt.y ? 1.05 : 1,
                      x: imageOffset.x * 0.5,
                      y: imageOffset.y * 0.5,
                    }}
                    transition={{ type: 'spring', stiffness: 170, damping: 20 }}
                    style={{
                      width: '88%',
                      maxWidth: '88%',
                      maxHeight: '380px',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                      transformStyle: 'preserve-3d',
                      borderRadius: '8px'
                    }}
                  />
                ) : (
                  <motion.img
                    key={displayImage}
                    src={displayImage}
                    alt={activeProduct.name}
                    animate={{
                      scale: imageTilt.x || imageTilt.y ? 1.12 : 1,
                      x: imageOffset.x,
                      y: imageOffset.y,
                    }}
                    transition={{ type: 'spring', stiffness: 170, damping: 20 }}
                    style={{
                      width: '88%',
                      maxWidth: '88%',
                      maxHeight: '380px',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                      transformStyle: 'preserve-3d',
                    }}
                  />
                )}
              </motion.div>

              {/* Thumbnails below the hero image/video */}
              {(allImages.length > 0 || hasVideo) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ display: 'flex', gap: '12px', marginTop: '16px', overflowX: 'auto', paddingBottom: '8px' }}
                >
                  {/* Video thumbnail — show if product has video */}
                  {hasVideo && (
                    <motion.div
                      onClick={() => { setShowVideo(true); setSelectedImage(null) }}
                      whileHover={{ y: -4, scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        width: 'clamp(60px, 8vw, 84px)',
                        aspectRatio: '3/4',
                        flexShrink: 0,
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: showVideo ? '2px solid #c8a45c' : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: showVideo ? '0 0 12px rgba(200,164,92,0.45)' : 'none',
                        transition: 'border 0.2s, box-shadow 0.2s',
                        opacity: showVideo ? 1 : 0.65,
                        position: 'relative',
                        background: '#0a0a0a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <img src={activeProduct.image} alt="video" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                      {/* Play icon overlay */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: '50%',
                          background: 'rgba(200,164,92,0.85)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: 9, color: '#000', marginLeft: 2 }}>▶</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Image thumbnails */}
                  {allImages.map((img, i) => {
                    const isActive = !showVideo && img === displayImage
                    return (
                      <motion.div
                        key={i}
                        onClick={() => { setSelectedImage(img); setShowVideo(false) }}
                        whileHover={{ y: -4, scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                          width: 'clamp(60px, 8vw, 84px)',
                          aspectRatio: '3/4',
                          flexShrink: 0,
                          borderRadius: '6px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: isActive ? '2px solid #c8a45c' : '1px solid rgba(255,255,255,0.1)',
                          boxShadow: isActive ? '0 0 12px rgba(200,164,92,0.45)' : 'none',
                          transition: 'border 0.2s, box-shadow 0.2s',
                          opacity: isActive ? 1 : 0.65,
                        }}
                      >
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              style={{
                flex: '1 1 280px',
                minWidth: '280px',
                backgroundColor: '#0b0b0b',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: 'clamp(20px, 4vw, 36px) clamp(16px, 3.5vw, 34px)',
              }}
            >
              <p style={{ margin: '0 0 10px', color: '#c8a45c', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                {activeProduct.category} Collection
              </p>

              <h1 style={{ fontSize: '23px', fontWeight: 500, color: '#f5f0e8', margin: 0 }}>
                {activeProduct.name}
              </h1>

              <div style={{ marginTop: '18px', display: 'flex', gap: '12px', color: 'rgba(245,240,232,0.58)', fontSize: '16px' }}>
                {activeProduct.oldPrice && <span style={{ textDecoration: 'line-through' }}>Rs. {activeProduct.oldPrice.toFixed(2)}</span>}
                {discountText && <span>{discountText}</span>}
              </div>

              <div style={{ marginTop: '10px', fontSize: '26px', fontWeight: 500, color: '#f5f0e8' }}>
                Rs. {activeProduct.price.toFixed(2)}
              </div>

              <p style={{ marginTop: '8px', marginBottom: 0, fontSize: '14px', color: 'rgba(245,240,232,0.62)' }}>
                calculated at checkout.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '22px', width: '100%' }}>
                <button
                  onClick={() => addToCart(activeProduct)}
                  style={{
                    minHeight: '50px',
                    flex: '1 1 130px',
                    border: 'none',
                    backgroundColor: '#c8a45c',
                    color: '#030303',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    padding: '0 16px',
                  }}
                >
                  ADD TO CART
                </button>

                <button
                  onClick={() => {
                    if (isAuth) {
                      openCheckout([activeProduct])
                    } else {
                      alert('Please login first to proceed with your purchase!');
                      openLogin();
                    }
                  }}
                  style={{
                    minHeight: '50px',
                    flex: '1 1 110px',
                    border: '1px solid rgba(200,164,92,0.35)',
                    backgroundColor: 'transparent',
                    color: '#c8a45c',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '0 14px',
                  }}
                >
                  Buy Now
                </button>
              </div>

              <button
                style={{
                  marginTop: '12px',
                  border: 'none',
                  background: 'transparent',
                  color: 'rgba(245,240,232,0.68)',
                  fontSize: '14px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                More payment options
              </button>

              <div style={{ marginTop: '28px' }}>
                <p style={{ margin: '0 0 12px', color: 'rgba(200,164,92,0.82)', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
                  Select Size
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {sizeOptions.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        minWidth: '58px',
                        height: '46px',
                        border: selectedSize === size ? '1px solid #c8a45c' : '1px solid rgba(255,255,255,0.14)',
                        background: selectedSize === size ? 'rgba(200,164,92,0.14)' : 'transparent',
                        color: selectedSize === size ? '#c8a45c' : '#f5f0e8',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        cursor: 'pointer',
                        transition: 'border-color 0.25s, background 0.25s, color 0.25s',
                      }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '34px', color: '#f5f0e8', fontSize: '16px', lineHeight: 2 }}>
                <p style={{ margin: 0 }}><span style={{ color: 'rgba(200,164,92,0.8)' }}>Size:</span> {selectedSize}</p>
                <p style={{ margin: 0 }}><span style={{ color: 'rgba(200,164,92,0.8)' }}>Color:</span> {meta.color}</p>
                <p style={{ margin: 0 }}><span style={{ color: 'rgba(200,164,92,0.8)' }}>Condition:</span> {meta.condition}</p>
                <p style={{ margin: 0 }}>{meta.details}</p>
              </div>
            </motion.div>
          </div>
        </div>

      </motion.section>
    </AnimatePresence>
  )
}
