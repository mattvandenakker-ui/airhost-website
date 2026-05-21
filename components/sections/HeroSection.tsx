'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white" style={{ padding: '88px 0 120px' }}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="max-w-[1240px] mx-auto px-8 relative z-10" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }}>
        {/* Left: text */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 bg-white border rounded-full text-[13px] font-medium"
            style={{ padding: '6px 14px 6px 8px', borderColor: 'var(--navy-12)', color: 'var(--navy-70)', boxShadow: '0 4px 12px -8px rgba(13,31,60,0.2)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--sky)', boxShadow: '0 0 0 4px rgba(14,165,233,0.18)' }} />
            Now serving <strong style={{ color: 'var(--ocean)', fontWeight: 600 }}>Umhlanga &amp; Surrounds</strong>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 'clamp(40px,6vw,68px)', fontWeight: 800, letterSpacing: '-0.035em', margin: '22px 0 20px', color: 'var(--navy)' }}
          >
            Drop your bags.<br />
            <span style={{ color: 'var(--ocean)', position: 'relative', whiteSpace: 'nowrap' }}>
              Explore freely.
              <span aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 4, height: 10, background: 'var(--sky)', opacity: 0.18, borderRadius: 4, zIndex: -1 }} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--navy-70)', maxWidth: 540, marginBottom: 32 }}
          >
            Secure same-day luggage storage, door-to-door delivery, and King Shaka airport
            transfers — built for travellers, locals, and beach days along the KZN coast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-9"
          >
            <Link
              href="/book"
              className="inline-flex items-center gap-2 font-semibold text-white transition-all duration-150 hover:-translate-y-px"
              style={{ height: 48, padding: '0 22px', borderRadius: 'var(--r-pill)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, background: 'var(--ocean)', boxShadow: 'var(--shadow-cta)' }}
            >
              Book Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center font-semibold transition-all duration-150"
              style={{ height: 48, padding: '0 22px', borderRadius: 'var(--r-pill)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 15, background: '#fff', color: 'var(--navy)', border: '1px solid var(--navy-12)' }}
            >
              See Pricing
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="flex items-center gap-3.5 text-[13.5px]"
            style={{ color: 'var(--navy-50)' }}
          >
            <div className="flex" aria-hidden="true">
              {['SM','JT','EL','+'].map((v, i) => (
                <span key={v} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-semibold" style={{ marginLeft: i === 0 ? 0 : -8, background: 'var(--ocean-50)', color: 'var(--ocean)' }}>
                  {v}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex gap-0.5" style={{ color: 'var(--sky)' }} aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z"/></svg>
                ))}
              </span>
              <strong style={{ color: 'var(--navy)', fontWeight: 600 }}>4.9</strong> from 320+ guests
            </div>
          </motion.div>
        </div>

        {/* Right: visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative hidden md:block"
          style={{ aspectRatio: '4/5' }}
          aria-hidden="true"
        >
          <div className="hero-visual">
            <div className="hv-grid" />
            <div className="hv-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/umhlanga-lighthouse.png" alt="Umhlanga Lighthouse on the Promenade" />
              <span className="hv-caption">Umhlanga Promenade</span>
            </div>
          </div>

          {/* Floating status cards */}
          <div className="float-card float-1">
            <span className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: 'var(--ocean-50)', color: 'var(--ocean)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7l-8 8-4-4"/><circle cx="12" cy="12" r="10"/></svg>
            </span>
            <div>
              <div className="text-xs mb-0.5" style={{ color: 'var(--navy-50)' }}>Bag collected</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--navy)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>10:42 · Umhlanga</div>
            </div>
          </div>

          <div className="float-card float-2">
            <span className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: 'var(--ocean-50)', color: 'var(--ocean)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </span>
            <div>
              <div className="text-xs mb-0.5" style={{ color: 'var(--navy-50)' }}>Next stop</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--navy)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>King Shaka · 14:20</div>
            </div>
          </div>

          <div className="float-card float-3">
            <span className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: 'var(--ocean-50)', color: 'var(--ocean)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </span>
            <div>
              <div className="text-xs mb-0.5" style={{ color: 'var(--navy-50)' }}>Secure storage</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--navy)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Climate-controlled</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
