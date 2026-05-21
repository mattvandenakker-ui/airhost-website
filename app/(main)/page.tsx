'use client'
import { useState } from 'react'
import Link from 'next/link'
import s from './page.module.css'

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
  </svg>
)
const StarLg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
  </svg>
)
const Arrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)
const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)
const Plus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
)
const Wa = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 3.5A11.8 11.8 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.6A12 12 0 0012 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 22c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1112 22z" />
  </svg>
)

const FAQS = [
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

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className={s.pagePb}>
      {/* ============ HERO ============ */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true" />
        <div className={s.heroGrid} aria-hidden="true" />
        <div className={`${s.container} ${s.heroInner}`}>
          <div>
            <span className={s.eyebrow}>
              <span className={s.eyebrowDot} />
              Now serving <strong className={s.eyebrowStrong}>Umhlanga &amp; Surrounds</strong>
            </span>
            <h1 className={s.heroH1}>
              Drop your bags.<br />
              <span className={s.accent}>Explore freely.</span>
            </h1>
            <p className={s.heroSub}>
              Secure same-day luggage storage, door-to-door delivery, and King Shaka airport
              transfers — built for travellers, locals, and beach days along the KZN coast.
            </p>
            <div className={s.heroCta}>
              <Link href="/book" className={`${s.btn} ${s.btnPrimary}`}>
                Book Now <Arrow />
              </Link>
              <a href="#pricing" className={`${s.btn} ${s.btnGhost}`}>See Pricing</a>
            </div>
            <div className={s.trust}>
              <div className={s.avatars} aria-hidden="true">
                {['SM', 'JT', 'EL', '+'].map(i => (
                  <span key={i} className={s.av}>{i}</span>
                ))}
              </div>
              <div>
                <span className={s.stars} aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
                </span>{' '}
                <strong style={{ color: 'var(--navy)', fontWeight: 600 }}>4.9</strong> from 320+ guests
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className={s.heroStage} aria-hidden="true">
            <div className={s.heroVisual}>
              <div className={s.hvGrid} />
              <div className={s.hvPhoto}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={s.hvPhotoImg}
                  src="/umhlanga-lighthouse.png"
                  alt="Umhlanga Lighthouse on the Promenade"
                />
                <span className={s.hvCaption}>Umhlanga Promenade</span>
              </div>
            </div>
            <div className={`${s.floatCard} ${s.float1}`}>
              <span className={s.floatIc}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7l-8 8-4-4" /><circle cx="12" cy="12" r="10" />
                </svg>
              </span>
              <div>
                <div className={s.floatT}>Bag collected</div>
                <div className={s.floatV}>10:42 · Umhlanga</div>
              </div>
            </div>
            <div className={`${s.floatCard} ${s.float2}`}>
              <span className={s.floatIc}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                </svg>
              </span>
              <div>
                <div className={s.floatT}>Next stop</div>
                <div className={s.floatV}>King Shaka · 14:20</div>
              </div>
            </div>
            <div className={`${s.floatCard} ${s.float3}`}>
              <span className={s.floatIc}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </span>
              <div>
                <div className={s.floatT}>Secure storage</div>
                <div className={s.floatV}>Climate-controlled</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how" className={`${s.section} ${s.sectionTint}`}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <span className={s.sectionEyebrow}>How it works</span>
            <h2 className={s.sectionH2}>Three steps to luggage freedom</h2>
            <p className={s.sectionP}>From the moment you book to the moment your bags arrive — every handover is scheduled, tracked, and insured.</p>
          </div>
          <div className={s.steps}>
            <div className={s.stepCard}>
              <div className={s.stepNum}>Step 01</div>
              <div className={s.stepIcon}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h2M14 14h2M8 18h2" />
                </svg>
              </div>
              <h3 className={s.stepH3}>Book Online</h3>
              <p className={s.stepP}>Pick your pickup window and destination in under a minute. Pay securely with card, EFT, or SnapScan.</p>
              <div className={s.stepArrow} aria-hidden="true"><Arrow size={14} /></div>
            </div>
            <div className={s.stepCard}>
              <div className={s.stepNum}>Step 02</div>
              <div className={s.stepIcon}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h2l2-9h10l2 5h2v4" /><circle cx="8" cy="19" r="2" /><circle cx="17" cy="19" r="2" />
                </svg>
              </div>
              <h3 className={s.stepH3}>We Collect</h3>
              <p className={s.stepP}>Our team arrives in branded vans at your hotel, Airbnb, or villa. Bags are tagged, sealed, and tracked end-to-end.</p>
              <div className={s.stepArrow} aria-hidden="true"><Arrow size={14} /></div>
            </div>
            <div className={s.stepCard}>
              <div className={s.stepNum}>Step 03</div>
              <div className={s.stepIcon}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24" />
                </svg>
              </div>
              <h3 className={s.stepH3}>You Explore</h3>
              <p className={s.stepP}>Beach, lunch in Ballito, sunset on the Promenade — go hands-free. We deliver to wherever you need next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section id="services" className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <span className={s.sectionEyebrow}>Services</span>
            <h2 className={s.sectionH2}>Built for the KZN coast</h2>
            <p className={s.sectionP}>Whether you're catching a flight, checking out early, or planning a beach day — we've got the logistics covered.</p>
          </div>
          <div className={s.services}>
            <Link href="/book" className={s.service}>
              <span className={s.serviceIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="7" width="14" height="14" rx="2" /><path d="M9 7V4h6v3" /><path d="M9 12h6M9 16h6" />
                </svg>
              </span>
              <h3 className={s.serviceH3}>Luggage Storage</h3>
              <p className={s.serviceP}>Secure, climate-controlled storage by the hour or day. Insured up to R10,000 per bag.</p>
              <span className={s.serviceMeta}>From R45 / day <Arrow size={14} /></span>
            </Link>
            <Link href="/book" className={s.service}>
              <span className={s.serviceIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-6 9 6v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M9 22V12h6v10" />
                </svg>
              </span>
              <h3 className={s.serviceH3}>Door-to-Door Delivery</h3>
              <p className={s.serviceP}>From hotel to hotel, Airbnb to villa — same-day routed deliveries across Umhlanga and Ballito.</p>
              <span className={s.serviceMeta}>From R120 / drop <Arrow size={14} /></span>
            </Link>
            <Link href="/book" className={s.service}>
              <span className={s.serviceIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l10-12 10 12" /><path d="M6 16l6-7 6 7" /><path d="M2 20h20" />
                </svg>
              </span>
              <h3 className={s.serviceH3}>Airport Transfers</h3>
              <p className={s.serviceP}>Direct collection or drop-off to King Shaka International. We co-ordinate with your flight schedule.</p>
              <span className={s.serviceMeta}>From R250 / transfer <Arrow size={14} /></span>
            </Link>
            <Link href="/book" className={s.service}>
              <span className={s.serviceIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a4 4 0 014 4v0a4 4 0 11-8 0v0a4 4 0 014-4z" /><path d="M2 20c2-3 5-4 10-4s8 1 10 4" />
                </svg>
              </span>
              <h3 className={s.serviceH3}>Beach Day Storage</h3>
              <p className={s.serviceP}>Hourly lockers at Umhlanga Lighthouse &amp; Granny&apos;s Pool. Walk up, drop in, swim freely.</p>
              <span className={s.serviceMeta}>From R30 / hour <Arrow size={14} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className={`${s.section} ${s.sectionTint}`}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <span className={s.sectionEyebrow}>Pricing</span>
            <h2 className={s.sectionH2}>Simple, transparent rates</h2>
            <p className={s.sectionP}>No surprise fees. Every plan includes insurance, tracking, and friendly handovers.</p>
          </div>
          <div className={s.pricing}>
            <div className={s.priceCard}>
              <h3 className={s.priceH3}>Day Pass</h3>
              <p className={s.priceDesc}>Perfect for early check-outs and beach days.</p>
              <div className={s.priceAmount}>
                <span className={s.priceCurrency}>R</span>
                <span className={s.priceNum}>45</span>
                <span className={s.pricePer}>/ bag</span>
              </div>
              <div className={s.priceNote}>Up to 12 hours of storage</div>
              <ul className={s.priceFeatures}>
                <li><Check />Secure, monitored facility</li>
                <li><Check />Insured up to R5,000</li>
                <li><Check />Same-day collection</li>
              </ul>
              <Link href="/book" className={`${s.btn} ${s.btnGhost} ${s.priceCta}`}>Get Started</Link>
            </div>
            <div className={`${s.priceCard} ${s.priceFeatured}`}>
              <span className={s.priceBadge}>Most popular</span>
              <h3 className={s.priceH3}>Traveller</h3>
              <p className={s.priceDesc}>Storage + one door-to-door delivery.</p>
              <div className={s.priceAmount}>
                <span className={s.priceCurrency}>R</span>
                <span className={s.priceNum}>165</span>
                <span className={s.pricePer}>/ bag</span>
              </div>
              <div className={s.priceNote}>Includes 24h storage + 1 delivery</div>
              <ul className={s.priceFeatures}>
                <li><Check />Door-to-door across uMhlanga</li>
                <li><Check />Live tracking via WhatsApp</li>
                <li><Check />Insured up to R10,000</li>
                <li><Check />2-hour service windows</li>
              </ul>
              <Link href="/book" className={`${s.btn} ${s.btnPrimary} ${s.priceCta}`}>Book Traveller</Link>
            </div>
            <div className={s.priceCard}>
              <h3 className={s.priceH3}>Airport</h3>
              <p className={s.priceDesc}>All-in transfer between you and King Shaka.</p>
              <div className={s.priceAmount}>
                <span className={s.priceCurrency}>R</span>
                <span className={s.priceNum}>295</span>
                <span className={s.pricePer}>/ trip</span>
              </div>
              <div className={s.priceNote}>Direct collection or drop-off</div>
              <ul className={s.priceFeatures}>
                <li><Check />Synced to your flight time</li>
                <li><Check />Up to 3 bags included</li>
                <li><Check />Pickup at any KZN address</li>
              </ul>
              <Link href="/book" className={`${s.btn} ${s.btnGhost} ${s.priceCta}`}>Book Transfer</Link>
            </div>
          </div>
          <p className={s.pricingFoot}>
            Need volume pricing or a custom route?{' '}
            <Link href="/pricing">View the full pricing page →</Link>
          </p>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section id="reviews" className={s.section}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <span className={s.sectionEyebrow}>Reviews</span>
            <h2 className={s.sectionH2}>What our guests say</h2>
            <p className={s.sectionP}>Trusted by Airbnb hosts, beach-day locals, and travellers across uMhlanga.</p>
          </div>
          <div className={s.testimonials}>
            {[
              { initials: 'SM', name: 'Sarah M.', role: 'Visiting from Cape Town', quote: '"Checked out of our Airbnb at 10am, flight wasn\'t until 8pm. Airhost stored everything and dropped us at King Shaka right on time. Genuine lifesavers."' },
              { initials: 'JT', name: 'James T.', role: 'Airbnb Superhost · Umhlanga', quote: '"I run three Airbnbs in Umhlanga Rocks and Airhost is now part of every check-in. The WhatsApp tracking gives guests confidence the second they book."' },
              { initials: 'EL', name: 'Emma & Luke', role: 'Locals · Durban North', quote: '"Used the beach day lockers at the Lighthouse — R30 well spent. Came back to dry bags, no sand, and the friendliest team. Will use every weekend."' },
            ].map(({ initials, name, role, quote }) => (
              <div key={initials} className={s.testimonial}>
                <span className={s.stars} aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => <StarLg key={i} />)}
                </span>
                <p className={s.quote}>{quote}</p>
                <div className={s.who}>
                  <span className={s.whoAv}>{initials}</span>
                  <div>
                    <div className={s.whoName}>{name}</div>
                    <div className={s.whoRole}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className={`${s.section} ${s.sectionTint}`}>
        <div className={s.container}>
          <div className={s.sectionHead}>
            <span className={s.sectionEyebrow}>FAQ</span>
            <h2 className={s.sectionH2}>Questions, answered</h2>
            <p className={s.sectionP}>Still curious? WhatsApp us anytime — we usually reply within minutes.</p>
          </div>
          <div className={s.faqWrap}>
            {FAQS.map((item, idx) => (
              <div
                key={idx}
                className={`${s.faqItem} ${openFaq === idx ? s.faqItemOpen : ''}`}
              >
                <button
                  className={s.faqQ}
                  onClick={() => setOpenFaq(prev => prev === idx ? -1 : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{item.q}</span>
                  <span className={`${s.faqToggle} ${openFaq === idx ? s.faqToggleOpen : ''}`} aria-hidden="true">
                    <Plus />
                  </span>
                </button>
                <div
                  className={s.faqA}
                  style={{ maxHeight: openFaq === idx ? '400px' : '0' }}
                >
                  <div className={s.faqAInner}>{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <div className={s.ctaBand} id="book">
        <div className={s.ctaBandInner}>
          <div className={s.ctaBandText}>
            <h2 className={s.ctaBandH2}>Travel luggage-free today.</h2>
            <p className={s.ctaBandP}>Book your slot in under a minute. We handle the rest — from collection to King Shaka.</p>
          </div>
          <div className={s.ctaBandActions}>
            <Link href="/book" className={`${s.btn} ${s.btnWhite}`}>
              Book Now <Arrow />
            </Link>
            <a href="https://wa.me/27000000000" className={`${s.btn} ${s.btnOutlineWhite}`}>
              <Wa size={16} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ============ STICKY MOBILE CTA ============ */}
      <div className={s.mobileCta}>
        <Link href="/book" className={`${s.btn} ${s.btnPrimary}`}>
          Book Now <Arrow />
        </Link>
        <a href="https://wa.me/27000000000" className={`${s.btn} ${s.mobileCtaWa}`} aria-label="WhatsApp us">
          <Wa />
        </a>
      </div>
    </div>
  )
}
