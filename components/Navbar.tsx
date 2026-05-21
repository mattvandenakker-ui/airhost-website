'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#how', label: 'How It Works' },
  { href: '#services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-shadow duration-200"
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'saturate(180%) blur(16px)',
        WebkitBackdropFilter: 'saturate(180%) blur(16px)',
        borderBottom: '1px solid var(--navy-06)',
        boxShadow: scrolled ? '0 1px 12px rgba(13,31,60,0.08)' : 'none',
      }}
    >
      <nav className="max-w-[1240px] mx-auto px-8 flex items-center justify-between h-[72px] gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 select-none flex-shrink-0">
          <span className="logo-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4h6a1 1 0 0 1 1 1v3h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2V5a1 1 0 0 1 1-1z"/>
              <path d="M10 8V6h4v2"/>
            </svg>
          </span>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <span className="block font-extrabold text-[18px]" style={{ letterSpacing: '-0.02em', color: 'var(--navy)', lineHeight: 1.1 }}>
              Airhost<span style={{ color: 'var(--ocean)' }}>Bagdrop</span>
            </span>
            <span className="block text-[10px] font-medium uppercase" style={{ letterSpacing: '0.14em', color: 'var(--ocean)', marginTop: 2 }}>
              Umhlanga · KZN
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 mx-auto">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <span className="text-sm font-medium" style={{ color: 'var(--navy-70)' }}>
            +27 (0)31 123 4567
          </span>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 h-10 px-[18px] text-[14px] font-semibold text-white transition-all duration-150 hover:-translate-y-px"
            style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              background: 'var(--ocean)',
              borderRadius: 'var(--r-pill)',
              boxShadow: 'var(--shadow-cta)',
            }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-[10px] border"
          style={{ borderColor: 'var(--navy-12)', color: 'var(--navy)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-1" style={{ borderTop: '1px solid var(--navy-06)', background: 'rgba(255,255,255,0.96)' }}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="block py-2.5 px-3 rounded-xl text-sm font-medium"
              style={{ color: 'var(--navy-70)' }}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="pt-3">
            <Link
              href="/book"
              className="block w-full text-center text-white text-sm font-semibold py-3"
              style={{ background: 'var(--ocean)', borderRadius: 'var(--r-pill)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
