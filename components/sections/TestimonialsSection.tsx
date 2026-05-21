'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    initials: 'SM',
    name: 'Sarah M.',
    role: 'Visiting from Cape Town',
    quote: 'Checked out of our Airbnb at 10am, flight wasn\'t until 8pm. Airhost stored everything and dropped us at King Shaka right on time. Genuine lifesavers.',
    stars: 5,
  },
  {
    initials: 'JT',
    name: 'James T.',
    role: 'Airbnb Superhost · Umhlanga',
    quote: 'I run three Airbnbs in Umhlanga Rocks and Airhost is now part of every check-in. The WhatsApp tracking gives guests confidence the second they book.',
    stars: 5,
  },
  {
    initials: 'EL',
    name: 'Emma & Luke',
    role: 'Locals · Durban North',
    quote: 'Used the beach day lockers at the Lighthouse — R30 well spent. Came back to dry bags, no sand, and the friendliest team. Will use every weekend.',
    stars: 5,
  },
]

const starIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z"/>
  </svg>
)

export default function TestimonialsSection() {
  return (
    <section id="reviews" style={{ padding: '112px 0' }}>
      <div className="max-w-[1240px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="block mb-4 text-[12px] font-semibold uppercase" style={{ letterSpacing: '0.18em', color: 'var(--ocean)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Reviews
          </span>
          <h2 style={{ fontSize: 'clamp(32px,4.4vw,48px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>
            What our guests say
          </h2>
          <p style={{ fontSize: 17, maxWidth: 580, margin: '0 auto', color: 'var(--navy-70)' }}>
            Trusted by Airbnb hosts, beach-day locals, and travellers across uMhlanga.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col gap-5 bg-white rounded-[24px] p-7"
              style={{ border: '1px solid var(--navy-06)', boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex gap-0.5" style={{ color: 'var(--sky)' }} aria-hidden="true">
                {[...Array(t.stars)].map((_, j) => <span key={j}>{starIcon}</span>)}
              </div>
              <p className="flex-1" style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--navy)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid var(--navy-06)' }}>
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--ocean), var(--sky))', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  {t.initials}
                </span>
                <div>
                  <div className="font-semibold text-[14.5px]" style={{ color: 'var(--navy)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{t.name}</div>
                  <div className="text-[13px]" style={{ color: 'var(--navy-50)' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
