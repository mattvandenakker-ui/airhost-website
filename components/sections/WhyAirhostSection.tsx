'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Luggage, Umbrella, Plane, ArrowRight } from 'lucide-react'

const reasons = [
  {
    icon: Luggage,
    eyebrow: 'Save your day',
    title: 'Reclaim your day with on-demand collection',
    description:
      "Instead of rushing between check-out and check-in, or waiting in hotel lobbies with four bags, let us handle the transit. We arrive at your door in a confirmed time window — not a 4-hour vague slot.",
    gradient: 'from-[#1A56DB] to-[#0EA5E9]',
    reverse: false,
  },
  {
    icon: Umbrella,
    eyebrow: 'No more bag drag',
    title: 'No bags on the beach, at markets, or at restaurants',
    description:
      "Imagine walking Umhlanga Rocks Drive, browsing the Gateway food market, or sitting down at a beachfront restaurant — without a suitcase in tow. That's the Airhost Bagdrop experience.",
    gradient: 'from-[#0EA5E9] to-[#0D1F3C]',
    reverse: true,
  },
  {
    icon: Plane,
    eyebrow: 'Stress-free transfers',
    title: 'Seamless King Shaka Airport drop-offs',
    description:
      "We time our deliveries around your flight. Your bags arrive at King Shaka before you do — checked in, stress-free, exactly when you need them. No rush, no heavy lifting through the terminal.",
    gradient: 'from-[#0D1F3C] to-[#1A56DB]',
    reverse: false,
  },
]

export default function WhyAirhostSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <p className="font-body font-medium text-sm uppercase tracking-widest text-[#1A56DB] mb-3">
            Why Airhost Bagdrop
          </p>
          <h2 className="font-heading font-bold text-[2.25rem] text-[#0D1F3C]">
            Your stay, minus the luggage stress
          </h2>
        </motion.div>

        <div className="flex flex-col gap-16">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                reason.reverse ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Image placeholder */}
              <div
                className={`rounded-2xl min-h-[300px] bg-gradient-to-br ${reason.gradient} flex items-center justify-center`}
              >
                <reason.icon size={96} className="text-white/20" />
              </div>

              {/* Text */}
              <div>
                <span className="font-body font-medium text-sm uppercase tracking-widest text-[#0EA5E9]">
                  {reason.eyebrow}
                </span>
                <h3 className="mt-3 font-heading font-bold text-[1.75rem] text-[#0D1F3C] leading-snug">
                  {reason.title}
                </h3>
                <p className="mt-4 font-body text-[#4A6080] leading-relaxed">
                  {reason.description}
                </p>
                <Link
                  href="/book"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#1A56DB] hover:text-[#1140A6] font-body transition-colors duration-150"
                >
                  Book now <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
