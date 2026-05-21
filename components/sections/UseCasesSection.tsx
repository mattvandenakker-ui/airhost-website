'use client'

import { motion } from 'framer-motion'
import { Clock, Umbrella, Plane, MapPin } from 'lucide-react'

const cases = [
  {
    icon: Clock,
    title: 'Hotel guests checking out early',
    description:
      'Checkout at 11am but exploring until 6pm? Store your bags with us and spend every minute enjoying Umhlanga — not dragging luggage around the promenade.',
  },
  {
    icon: Plane,
    title: 'King Shaka Airport connections',
    description:
      'Arriving early or flying late? We hold your luggage while you explore Durban, then deliver it to departures right on time — no airport dash required.',
  },
  {
    icon: Umbrella,
    title: 'Beach day adventures',
    description:
      "Heading to Umhlanga beach but staying nearby? Drop your bags with us and hit the sand completely hands-free. We'll have everything ready when you're back.",
  },
  {
    icon: MapPin,
    title: 'Moving between stays',
    description:
      "Staying at multiple accommodations across KZN? We bridge the gap — collect from one, deliver to the next so you're never stuck carrying bags between check-ins.",
  },
]

export default function UseCasesSection() {
  return (
    <section className="py-20 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <p className="font-body font-medium text-sm uppercase tracking-widest text-[#1A56DB] mb-3">
            Use Cases
          </p>
          <h2 className="font-heading font-bold text-[2.25rem] text-[#0D1F3C]">
            Built for how people actually travel
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-[#D1DEEF] rounded-2xl p-7 shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-[#EBF2FF] flex items-center justify-center mb-5">
                <item.icon size={20} className="text-[#1A56DB]" />
              </div>
              <h3 className="font-heading font-semibold text-[1.125rem] text-[#0D1F3C]">
                {item.title}
              </h3>
              <p className="mt-2 font-body text-sm text-[#4A6080] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
