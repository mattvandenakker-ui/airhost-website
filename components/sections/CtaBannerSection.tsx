'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const whatsappIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 3.5A11.8 11.8 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.6A12 12 0 0012 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 22c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1112 22z"/>
  </svg>
)

export default function CtaBannerSection() {
  return (
    <section style={{ padding: '0 0 112px' }}>
      <div className="max-w-[1240px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="cta-gradient-band"
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ color: '#fff', fontSize: 'clamp(28px,3.6vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
              Travel luggage-free today.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, maxWidth: 480 }}>
              Book your slot in under a minute. We handle the rest — from collection to King Shaka.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 flex-shrink-0" style={{ position: 'relative', zIndex: 1 }}>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 font-semibold transition-all duration-150 hover:bg-[#EEF3FE]"
              style={{ height: 52, padding: '0 22px', borderRadius: 'var(--r-pill)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, background: '#fff', color: 'var(--ocean)' }}
            >
              Book Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <a
              href="https://wa.me/27000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold transition-all duration-150 hover:border-white hover:bg-white/10"
              style={{ height: 52, padding: '0 22px', borderRadius: 'var(--r-pill)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)' }}
            >
              {whatsappIcon}
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
