'use client'

import Link from 'next/link'

export default function BookingSuccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '48px 40px', maxWidth: 480, width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(13,31,60,0.08)' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(45,182,125,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2DB67D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.75rem', fontWeight: 800, color: '#0D1F3C', margin: '0 0 12px' }}>
          Payment successful!
        </h1>
        <p style={{ fontFamily: 'var(--font-body, sans-serif)', color: '#4A6080', marginBottom: 32, lineHeight: 1.6 }}>
          Your booking is confirmed. We&apos;ll be in touch via WhatsApp to confirm your pickup time.
        </p>
        <Link href="/" style={{ display: 'inline-block', background: '#0D1F3C', color: '#fff', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 700, fontSize: '1rem', padding: '14px 32px', borderRadius: 12, textDecoration: 'none' }}>
          Back to home
        </Link>
      </div>
    </div>
  )
}
