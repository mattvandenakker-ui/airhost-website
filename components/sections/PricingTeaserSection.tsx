'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const checkIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--ocean)', marginTop: 4 }}>
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

const plans = [
  {
    name: 'Day Pass',
    desc: 'Perfect for early check-outs and beach days.',
    amount: '45',
    per: '/ bag',
    note: 'Up to 12 hours of storage',
    features: ['Secure, monitored facility', 'Insured up to R5,000', 'Same-day collection'],
    cta: 'Get Started',
    featured: false,
    href: '/book',
  },
  {
    name: 'Traveller',
    desc: 'Storage + one door-to-door delivery.',
    amount: '165',
    per: '/ bag',
    note: 'Includes 24h storage + 1 delivery',
    features: ['Door-to-door across uMhlanga', 'Live tracking via WhatsApp', 'Insured up to R10,000', '2-hour service windows'],
    cta: 'Book Traveller',
    featured: true,
    badge: 'Most popular',
    href: '/book',
  },
  {
    name: 'Airport',
    desc: 'All-in transfer between you and King Shaka.',
    amount: '295',
    per: '/ trip',
    note: 'Direct collection or drop-off',
    features: ['Synced to your flight time', 'Up to 3 bags included', 'Pickup at any KZN address'],
    cta: 'Book Transfer',
    featured: false,
    href: '/book',
  },
]

export default function PricingTeaserSection() {
  return (
    <section id="pricing" style={{ padding: '112px 0', background: 'var(--bg-tint)' }}>
      <div className="max-w-[1240px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="block mb-4 text-[12px] font-semibold uppercase" style={{ letterSpacing: '0.18em', color: 'var(--ocean)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Pricing
          </span>
          <h2 style={{ fontSize: 'clamp(32px,4.4vw,48px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Simple, transparent rates
          </h2>
          <p style={{ fontSize: 17, maxWidth: 580, margin: '0 auto', color: 'var(--navy-70)' }}>
            No surprise fees. Every plan includes insurance, tracking, and friendly handovers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1080px] mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative bg-white rounded-[24px] p-9 transition-all duration-200 ${plan.featured ? 'price-featured' : ''}`}
              style={!plan.featured ? { border: '1px solid var(--navy-06)', boxShadow: 'var(--shadow-card)' } : undefined}
            >
              {plan.badge && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 -top-3.5 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full"
                  style={{ background: 'var(--ocean)', fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '0.04em', boxShadow: 'var(--shadow-cta)' }}
                >
                  {plan.badge}
                </span>
              )}

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{plan.name}</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--navy-50)' }}>{plan.desc}</p>

              <div className="flex items-baseline gap-1.5 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <span style={{ fontSize: 18, color: 'var(--navy-50)', fontWeight: 600 }}>R</span>
                <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--navy)' }}>{plan.amount}</span>
                <span style={{ fontSize: 15, color: 'var(--navy-50)' }}>{plan.per}</span>
              </div>
              <p className="text-[13px] mb-7" style={{ color: 'var(--navy-50)' }}>{plan.note}</p>

              <ul className="flex flex-col gap-3 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-[14.5px]" style={{ color: 'var(--navy)' }}>
                    {checkIcon}{f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className="flex items-center justify-center w-full h-[46px] font-semibold text-[15px] transition-all duration-200 hover:-translate-y-px"
                style={{
                  borderRadius: 'var(--r-pill)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  ...(plan.featured
                    ? { background: 'var(--ocean)', color: '#fff', boxShadow: 'var(--shadow-cta)' }
                    : { background: '#fff', color: 'var(--navy)', border: '1px solid var(--navy-12)' }),
                }}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-10 text-[15px]"
          style={{ color: 'var(--navy-50)' }}
        >
          Need volume pricing or a custom route?{' '}
          <Link href="/pricing" className="font-semibold" style={{ color: 'var(--ocean)', borderBottom: '1px solid var(--ocean-50)' }}>
            View the full pricing page →
          </Link>
        </motion.p>
      </div>
    </section>
  )
}
