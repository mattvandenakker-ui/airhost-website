import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing | Airhost Bagdrop',
  description: 'Transparent luggage storage and delivery rates in Umhlanga, KZN. No hidden fees.',
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#2DB67D', flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function PricingPage() {
  return (
    <div style={{ background: '#F7F9FC', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: '#0D1F3C', padding: '80px 24px 64px', textAlign: 'center' }}>
        <p style={{ color: '#2DB67D', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Pricing</p>
        <h1 style={{ color: '#fff', fontFamily: 'var(--font-heading, serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, margin: '0 0 16px' }}>
          Simple, transparent rates
        </h1>
        <p style={{ color: '#A8BBCF', fontFamily: 'var(--font-body, sans-serif)', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto 32px' }}>
          No surprise fees. No bundles. Pay exactly for what you need.
        </p>
        <Link href="/book" style={{ display: 'inline-block', background: '#2DB67D', color: '#fff', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 700, fontSize: '1rem', padding: '14px 32px', borderRadius: 12, textDecoration: 'none' }}>
          Book now
        </Link>
      </section>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px' }}>

        {/* ── LUGGAGE STORAGE ── */}
        <ServiceBlock
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              <line x1="12" y1="12" x2="12" y2="16" />
              <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
          }
          title="Luggage Storage"
          description="Drop your bags at our secure facility at Beacon Rock, Umhlanga Rocks, and collect any time. Priced per bag per hour — only pay for the hours you need."
          features={['Secure, 24/7 monitored facility', 'Flexible hours — book 1 to 12 hours', 'Optional premium insurance']}
          table={
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Bag type</th>
                  <th style={thStyle}>Rate</th>
                  <th style={thStyle}>Example (4 hours)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}><strong>Cabin bag</strong> (carry-on)</td>
                  <td style={tdStyle}>R50 / hr</td>
                  <td style={{ ...tdStyle, color: '#2DB67D', fontWeight: 600 }}>R200</td>
                </tr>
                <tr style={{ background: '#F0F4FA' }}>
                  <td style={tdStyle}><strong>Check-in bag</strong> (standard)</td>
                  <td style={tdStyle}>R60 / hr</td>
                  <td style={{ ...tdStyle, color: '#2DB67D', fontWeight: 600 }}>R240</td>
                </tr>
                <tr>
                  <td style={tdStyle}><strong>Oversized</strong> (surfboards, prams)</td>
                  <td style={tdStyle}>R70 / hr</td>
                  <td style={{ ...tdStyle, color: '#2DB67D', fontWeight: 600 }}>R280</td>
                </tr>
              </tbody>
            </table>
          }
          note="Mix bag types — each size is billed separately at its own rate."
          cta="Store My Bags"
        />

        <Divider />

        {/* ── DOOR-TO-DOOR ── */}
        <ServiceBlock
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 5v3h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          }
          title="Door-to-Door Delivery"
          description="We collect your bags from one address and deliver them to another anywhere in uMhlanga. Great for hotel check-outs, Airbnb handovers, and beach days."
          features={['Live WhatsApp tracking', 'Flexible collection windows', 'Optional premium insurance']}
          table={
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Charge</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}><strong>Collection & drop-off</strong></td>
                  <td style={tdStyle}>R250</td>
                  <td style={tdStyle}>Flat fee per booking</td>
                </tr>
                <tr style={{ background: '#F0F4FA' }}>
                  <td style={tdStyle}><strong>Cabin bag</strong></td>
                  <td style={tdStyle}>+ R50 / bag</td>
                  <td style={tdStyle}>Per bag handled</td>
                </tr>
                <tr>
                  <td style={tdStyle}><strong>Check-in bag</strong></td>
                  <td style={tdStyle}>+ R60 / bag</td>
                  <td style={tdStyle}>Per bag handled</td>
                </tr>
                <tr style={{ background: '#F0F4FA' }}>
                  <td style={tdStyle}><strong>Oversized</strong></td>
                  <td style={tdStyle}>+ R70 / bag</td>
                  <td style={tdStyle}>Per item handled</td>
                </tr>
              </tbody>
            </table>
          }
          note="Example: 1 cabin bag delivery = R250 + R50 = R300 total."
          cta="Book Delivery"
          featured
        />

        <Divider />

        {/* ── AIRPORT TRANSFER ── */}
        <ServiceBlock
          icon={
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 16l10-12 10 12" /><path d="M6 16l6-7 6 7" /><path d="M2 20h20" />
            </svg>
          }
          title="Airport Transfer"
          description="Direct collection or drop-off to King Shaka International Airport. We sync with your flight time so there's no waiting around."
          features={['To or from King Shaka International', 'Pickup at any KZN address', 'Optional premium insurance']}
          table={
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Charge</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}><strong>Base fare</strong></td>
                  <td style={tdStyle}>R295</td>
                  <td style={tdStyle}>Includes up to 3 bags</td>
                </tr>
                <tr style={{ background: '#F0F4FA' }}>
                  <td style={tdStyle}><strong>Extra bags</strong></td>
                  <td style={tdStyle}>+ R50 / bag</td>
                  <td style={tdStyle}>4th bag and beyond</td>
                </tr>
              </tbody>
            </table>
          }
          note="Example: 5 bags to King Shaka = R295 + (2 × R50) = R395 total."
          cta="Book Transfer"
        />

        <Divider />

        {/* ── ADD-ONS ── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.5rem', fontWeight: 700, color: '#0D1F3C', marginBottom: 8 }}>Add-ons</h2>
          <p style={{ color: '#4A6080', fontFamily: 'var(--font-body, sans-serif)', marginBottom: 24 }}>Optional extras available on any booking.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <AddOn title="Premium Insurance" price="R49 / bag" desc="Cover up to R10,000 per bag. Peace of mind for valuables." />
            <AddOn title="Special Item Handling" price="From R30" desc="Surfboards, prams, bicycles, and bulky items." />
          </div>
        </section>

        {/* ── PROMO ── */}
        <section style={{ background: '#0D1F3C', borderRadius: 16, padding: '48px 32px', textAlign: 'center' }}>
          <p style={{ color: '#2DB67D', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>First booking</p>
          <h2 style={{ color: '#fff', fontFamily: 'var(--font-heading, serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: 12 }}>Use code WELCOME10 for 10% off</h2>
          <p style={{ color: '#A8BBCF', fontFamily: 'var(--font-body, sans-serif)', marginBottom: 28 }}>Valid on your first booking. Enter at checkout.</p>
          <Link href="/book" style={{ display: 'inline-block', background: '#2DB67D', color: '#fff', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 700, fontSize: '1rem', padding: '14px 32px', borderRadius: 12, textDecoration: 'none' }}>
            Book now
          </Link>
        </section>

      </div>
    </div>
  )
}

/* ─── Sub-components ─── */

function ServiceBlock({ icon, title, description, features, table, note, cta, featured }: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  table: React.ReactNode
  note: string
  cta: string
  featured?: boolean
}) {
  return (
    <section style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ color: featured ? '#2DB67D' : '#0D1F3C' }}>{icon}</span>
        <h2 style={{ fontFamily: 'var(--font-heading, serif)', fontSize: '1.75rem', fontWeight: 700, color: '#0D1F3C', margin: 0 }}>{title}</h2>
        {featured && <span style={{ background: '#2DB67D', color: '#fff', fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginLeft: 4 }}>Most popular</span>}
      </div>
      <p style={{ color: '#4A6080', fontFamily: 'var(--font-body, sans-serif)', fontSize: '1rem', marginBottom: 20, maxWidth: 640 }}>{description}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexWrap: 'wrap', gap: '8px 24px' }}>
        {features.map((f) => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0D1F3C', fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.9rem' }}>
            <Check />{f}
          </li>
        ))}
      </ul>
      <div style={{ overflowX: 'auto', marginBottom: 12 }}>{table}</div>
      <p style={{ color: '#4A6080', fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.875rem', marginBottom: 20 }}>{note}</p>
      <Link href="/book" style={{ display: 'inline-block', background: featured ? '#2DB67D' : '#0D1F3C', color: '#fff', fontFamily: 'var(--font-body, sans-serif)', fontWeight: 700, fontSize: '0.95rem', padding: '12px 28px', borderRadius: 10, textDecoration: 'none' }}>
        {cta}
      </Link>
    </section>
  )
}

function AddOn({ title, price, desc }: { title: string; price: string; desc: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <strong style={{ fontFamily: 'var(--font-body, sans-serif)', color: '#0D1F3C' }}>{title}</strong>
        <span style={{ fontFamily: 'var(--font-body, sans-serif)', fontWeight: 700, color: '#2DB67D' }}>{price}</span>
      </div>
      <p style={{ fontFamily: 'var(--font-body, sans-serif)', color: '#4A6080', fontSize: '0.875rem', margin: 0 }}>{desc}</p>
    </div>
  )
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '0 0 64px' }} />
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'var(--font-body, sans-serif)',
  fontSize: '0.9rem',
  background: '#fff',
  border: '1px solid #E2E8F0',
  borderRadius: 12,
  overflow: 'hidden',
}

const thStyle: React.CSSProperties = {
  background: '#0D1F3C',
  color: '#fff',
  fontWeight: 600,
  textAlign: 'left',
  padding: '12px 16px',
}

const tdStyle: React.CSSProperties = {
  color: '#0D1F3C',
  padding: '12px 16px',
  borderBottom: '1px solid #E2E8F0',
}
