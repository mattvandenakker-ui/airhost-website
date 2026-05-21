import Link from 'next/link'

const whatsappIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 3.5A11.8 11.8 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.6A12 12 0 0012 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 22c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1112 22z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer style={{ marginTop: 100, paddingTop: 72, paddingBottom: 32, borderTop: '1px solid var(--navy-06)' }}>
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 select-none mb-4">
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
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--navy-70)', maxWidth: 320 }}>
              Premium luggage storage, delivery, and airport transfers across uMhlanga, Ballito, and the KZN coast.
            </p>
            <a
              href="https://wa.me/27000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mt-5 font-semibold text-sm transition-all duration-200 hover:bg-[var(--ocean)] hover:text-white"
              style={{ padding: '12px 18px', background: 'var(--ocean-50)', color: 'var(--ocean)', borderRadius: 'var(--r-pill)', border: '1px solid rgba(26,86,219,0.15)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {whatsappIcon}
              Chat on WhatsApp
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-[13px] font-bold uppercase" style={{ letterSpacing: '0.14em', color: 'var(--navy)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {['Luggage Storage','Door-to-Door','Airport Transfers','Beach Day Lockers'].map(s => (
                <li key={s}>
                  <Link href="/book" className="nav-link text-[14.5px]">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-[13px] font-bold uppercase" style={{ letterSpacing: '0.14em', color: 'var(--navy)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#how" className="nav-link text-[14.5px]">How It Works</a></li>
              <li><Link href="/pricing" className="nav-link text-[14.5px]">Pricing</Link></li>
              <li><a href="#reviews" className="nav-link text-[14.5px]">Reviews</a></li>
              <li><Link href="/about" className="nav-link text-[14.5px]">About</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[13px] font-bold uppercase" style={{ letterSpacing: '0.14em', color: 'var(--navy)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Contact
            </h4>
            <div className="flex flex-col gap-2.5">
              <div className="foot-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Umhlanga Rocks, KZN
              </div>
              <div className="foot-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.35 1.84.59 2.8.72A2 2 0 0122 16.92z"/></svg>
                +27 (0)31 123 4567
              </div>
              <div className="foot-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
                hello@airhostbagdrop.co.za
              </div>
              <div className="foot-contact-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Open daily · 07:00–21:00
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7" style={{ borderTop: '1px solid var(--navy-06)', fontSize: 13, color: 'var(--navy-50)' }}>
          <div>© {new Date().getFullYear()} Airhost Bagdrop (Pty) Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            {['Terms','Privacy','Insurance'].map(l => (
              <Link key={l} href="#" className="nav-link text-[13px]" style={{ color: 'var(--navy-50)' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
