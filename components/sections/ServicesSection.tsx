'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const services = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="7" width="14" height="14" rx="2"/><path d="M9 7V4h6v3"/><path d="M9 12h6M9 16h6"/></svg>,
    title: 'Luggage Storage',
    desc: 'Secure, climate-controlled storage by the hour or day. Insured up to R10,000 per bag.',
    price: 'From R45 / day',
    href: '/book',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-6 9 6v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
    title: 'Door-to-Door Delivery',
    desc: 'From hotel to hotel, Airbnb to villa — same-day routed deliveries across Umhlanga and Ballito.',
    price: 'From R120 / drop',
    href: '/book',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 16l10-12 10 12"/><path d="M6 16l6-7 6 7"/><path d="M2 20h20"/></svg>,
    title: 'Airport Transfers',
    desc: 'Direct collection or drop-off to King Shaka International. Co-ordinated with your flight schedule.',
    price: 'From R250 / transfer',
    href: '/book',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a4 4 0 014 4v0a4 4 0 11-8 0v0a4 4 0 014-4z"/><path d="M2 20c2-3 5-4 10-4s8 1 10 4"/></svg>,
    title: 'Beach Day Storage',
    desc: 'Hourly lockers at Umhlanga Lighthouse & Granny\'s Pool. Walk up, drop in, swim freely.',
    price: 'From R30 / hour',
    href: '/book',
  },
]

const arrowIcon = (
  <svg className="service-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7"/>
  </svg>
)

export default function ServicesSection() {
  return (
    <section id="services" style={{ padding: '112px 0' }}>
      <div className="max-w-[1240px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="block mb-4 text-[12px] font-semibold uppercase" style={{ letterSpacing: '0.18em', color: 'var(--ocean)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Services
          </span>
          <h2 style={{ fontSize: 'clamp(32px,4.4vw,48px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Built for the KZN coast
          </h2>
          <p style={{ fontSize: 17, maxWidth: 580, margin: '0 auto', color: 'var(--navy-70)' }}>
            Whether you&apos;re catching a flight, checking out early, or planning a beach day — we&apos;ve got the logistics covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={s.href}
                className="service-card flex flex-col gap-4 h-full bg-white rounded-[24px] p-7 transition-all duration-200"
                style={{ border: '1px solid var(--navy-06)', boxShadow: 'var(--shadow-card)', minHeight: '100%' }}
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-[14px]" style={{ background: 'var(--ocean-50)', color: 'var(--ocean)' }}>
                  {s.icon}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>{s.title}</h3>
                <p className="flex-1" style={{ fontSize: 14.5, color: 'var(--navy-70)' }}>{s.desc}</p>
                <div
                  className="service-link flex items-center gap-1.5 pt-3.5"
                  style={{ borderTop: '1px solid var(--navy-06)', fontSize: 13, color: 'var(--ocean)', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {s.price}
                  {arrowIcon}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
