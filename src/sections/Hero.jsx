import React, { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import { gsap } from 'gsap'
import ShowroomScene from '../components/ShowroomScene'
import './Hero.css'

export default function Hero() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    if (titleRef.current && subtitleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
      )
    }
  }, [])

  return (
    <section className="hero">
      {/* Text overlay */}
      <div className="hero__content">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ✦ New Collection 2025
        </motion.div>

        <h1 className="hero__title" ref={titleRef}>
          Redefine Your Style<br />
          with <span className="gradient-text">TwistWear</span>
        </h1>

        <p className="hero__subtitle" ref={subtitleRef}>
          Step into a 3D fashion experience — where luxury meets innovation
        </p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href="#categories"
            className="btn-primary"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Collection
            <FiArrowRight size={18} />
          </motion.a>
          <motion.a
            href="#"
            className="hero__watch-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="hero__play-icon">
              <FiPlay size={14} />
            </span>
            Watch Lookbook
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero__stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {[
            { num: '50K+', label: 'Happy Customers' },
            { num: '2K+', label: 'Collections' },
            { num: '4.9★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="hero__stat">
              <span className="hero__stat-num">{stat.num}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background Video */}
      <div className="hero__video-wrapper">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero__video"
          src="/videos/hero-video.mp4"
        />
        <div className="hero__video-overlay" />
      </div>

      {/* 3D Canvas */}
      <div className="hero__canvas-wrapper">
        <Canvas
          shadows
          camera={{ position: [0, 1.4, 4.8], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ShowroomScene />
        </Canvas>

        {/* Gradient overlays for blending */}
        <div className="hero__canvas-overlay-left" />
        <div className="hero__canvas-overlay-bottom" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="hero__scroll-dot" />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}
