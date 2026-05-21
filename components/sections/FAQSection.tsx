'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const plusIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)

const faqs = [
  {
    q: 'Where are you based and which areas do you serve?',
    a: "We're based in Umhlanga Rocks and serve the full KZN coast — uMhlanga, Ballito, Durban North, Umdloti, and direct transfers to King Shaka International Airport. Need a custom route? WhatsApp us.",
  },
  {
    q: 'How do you keep my bags safe?',
    a: 'Every bag is photographed, tagged with a unique QR seal, and stored in our access-controlled, climate-monitored facility. All bags are insured up to R10,000 (extendable on request) and tracked from collection to delivery.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking 24 hours ahead so we can lock in your collection window. Same-day bookings are usually fine outside of peak season — just give us 3–4 hours notice via the booking form or WhatsApp.',
  },
  {
    q: 'Can you deliver directly to King Shaka Airport?',
    a: "Yes. Our Airport plan times your luggage drop-off to your check-in window. We'll meet you in the departures lane or hand bags over inside the terminal — your call. We also handle arrivals: collect, store, and deliver to your accommodation.",
  },
  {
    q: 'What if my flight is delayed or my plans change?',
    a: "Things shift — that's travel. Storage is billed per 12-hour block, so we'll just keep your bags secure until you need them. Deliveries can be rescheduled up to 2 hours before your slot at no extra cost.",
  },
]

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className="bg-white rounded-[18px] overflow-hidden transition-all duration-200"
      style={{
        border: open ? '1px solid rgba(26,86,219,0.25)' : '1px solid var(--navy-06)',
        boxShadow: open ? 'var(--shadow-card)' : 'none',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left"
        style={{ padding: '22px 26px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 16.5, color: 'var(--navy)' }}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className={`faq-toggle ${open ? 'is-open' : ''}`} aria-hidden="true">
          {plusIcon}
        </span>
      </button>
      <div className="faq-body" style={{ maxHeight: open ? 400 : 0 }}>
        <p style={{ padding: '0 26px 24px', fontSize: 15.5, lineHeight: 1.6, color: 'var(--navy-70)' }}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" style={{ padding: '112px 0', background: 'var(--bg-tint)' }}>
      <div className="max-w-[1240px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="block mb-4 text-[12px] font-semibold uppercase" style={{ letterSpacing: '0.18em', color: 'var(--ocean)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            FAQ
          </span>
          <h2 style={{ fontSize: 'clamp(32px,4.4vw,48px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Questions, answered
          </h2>
          <p style={{ fontSize: 17, maxWidth: 580, margin: '0 auto', color: 'var(--navy-70)' }}>
            Still curious? WhatsApp us anytime — we usually reply within minutes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-3 max-w-[760px] mx-auto"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
