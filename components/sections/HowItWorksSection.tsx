'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    num: 'Step 01',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h2M14 14h2M8 18h2"/>
      </svg>
    ),
    title: 'Book Online',
    body: 'Pick your pickup window and destination in under a minute. Pay securely with card, EFT, or SnapScan.',
  },
  {
    num: 'Step 02',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h2l2-9h10l2 5h2v4"/><circle cx="8" cy="19" r="2"/><circle cx="17" cy="19" r="2"/>
      </svg>
    ),
    title: 'We Collect',
    body: 'Our team arrives in branded vans at your hotel, Airbnb, or villa. Bags are tagged, sealed, and tracked end-to-end.',
  },
  {
    num: 'Step 03',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/>
      </svg>
    ),
    title: 'You Explore',
    body: 'Beach, lunch in Ballito, sunset on the Promenade — go hands-free. We deliver to wherever you need next.',
  },
]

const arrowSvg = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7"/>
  </svg>
)

export default function HowItWorksSection() {
  return (
    <section id="how" className="relative" style={{ padding: '112px 0', background: 'var(--bg-tint)' }}>
      <div className="max-w-[1240px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="block mb-4 text-[12px] font-semibold uppercase" style={{ letterSpacing: '0.18em', color: 'var(--ocean)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            How it works
          </span>
          <h2 style={{ fontSize: 'clamp(32px,4.4vw,48px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Three steps to luggage freedom
          </h2>
          <p style={{ fontSize: 17, maxWidth: 580, margin: '0 auto', color: 'var(--navy-70)' }}>
            From the moment you book to the moment your bags arrive — every handover is scheduled, tracked, and insured.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative bg-white rounded-[24px] p-9"
              style={{ border: '1px solid var(--navy-06)', boxShadow: 'var(--shadow-card)' }}
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-7" style={{ color: 'var(--sky)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <span className="flex items-center justify-center w-9 h-9 rounded-full" style={{ background: 'var(--ocean-50)', border: '1px solid var(--navy-06)' }} />
                {step.num}
              </div>

              {/* Icon */}
              <div className="step-icon-grad mb-6">{step.icon}</div>

              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
              <p style={{ fontSize: 15, color: 'var(--navy-70)' }}>{step.body}</p>

              {/* Arrow puck between cards */}
              {i < steps.length - 1 && (
                <span className="step-arrow-puck hidden md:grid" aria-hidden="true">{arrowSvg}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
