'use client'

import { motion } from 'framer-motion'
import { Clock, Plane, MapPin } from 'lucide-react'

const stats = [
  {
    icon: Clock,
    label: 'Open 7 Days',
    sub: 'Available every day of the week',
  },
  {
    icon: Plane,
    label: 'King Shaka Airport',
    sub: 'Covering all KZN airport routes',
  },
  {
    icon: MapPin,
    label: 'Umhlanga & Beyond',
    sub: 'Delivering across greater Durban',
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-white border-t border-[#D1DEEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EBF2FF] flex items-center justify-center">
                <stat.icon size={22} className="text-[#1A56DB]" />
              </div>
              <p className="font-heading font-bold text-xl text-[#0D1F3C]">
                {stat.label}
              </p>
              <p className="font-body text-sm text-[#4A6080]">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
