import React from 'react'
import { motion } from 'framer-motion'
import {
  FiInstagram, FiTwitter, FiFacebook, FiYoutube,
  FiMail, FiPhone, FiMapPin, FiArrowRight
} from 'react-icons/fi'
import './Footer.css'

const footerLinks = {
  'Shop': ['Women', 'Men', 'Western Wear', 'Ethnic Wear', 'Casual Wear', 'Party Wear', 'Sale'],
  'Help': ['Size Guide', 'Track Order', 'Returns & Exchanges', 'Shipping Info', 'FAQ'],
  'Company': ['About TwistWear', 'Careers', 'Press', 'Sustainability', 'Affiliates'],
}

const socials = [
  { Icon: FiInstagram, label: 'Instagram', href: '#' },
  { Icon: FiTwitter, label: 'Twitter', href: '#' },
  { Icon: FiFacebook, label: 'Facebook', href: '#' },
  { Icon: FiYoutube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__gradient-bg" />

      <div className="footer__inner">
        {/* Top: Brand + Newsletter */}
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="logo-twist">Twist</span>
              <span className="logo-wear">Wear</span>
            </div>
            <p className="footer__brand-desc">
              Redefining fashion with premium craftsmanship, sustainable practices,
              and a touch of luxury that speaks to the modern soul.
            </p>

            <div className="footer__contact">
              {[
                { Icon: FiMail, text: 'hello@twistwear.in' },
                { Icon: FiPhone, text: '+91 98765 43210' },
                { Icon: FiMapPin, text: 'Mumbai, India' },
              ].map(({ Icon, text }) => (
                <div key={text} className="footer__contact-item">
                  <Icon size={14} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer__newsletter">
            <h3 className="footer__newsletter-title">Join the Inner Circle</h3>
            <p className="footer__newsletter-desc">
              Get early access to new drops, styling tips & exclusive offers.
            </p>
            <div className="footer__newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="footer__newsletter-input"
              />
              <motion.button
                className="footer__newsletter-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiArrowRight size={18} />
              </motion.button>
            </div>
            <p className="footer__newsletter-note">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Middle: Links */}
        <div className="footer__links-grid">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer__links-col">
              <h4 className="footer__links-heading">{category}</h4>
              <ul className="footer__links-list">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="footer__link"
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="footer__divider" />
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2025 TwistWear. All rights reserved. Crafted with love in India.
          </p>

          <div className="footer__socials">
            {socials.map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="footer__social-btn"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          <div className="footer__legal-links">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="footer__legal-link">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
