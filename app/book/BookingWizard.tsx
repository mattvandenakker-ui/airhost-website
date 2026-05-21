'use client'

import { useState, useMemo, useEffect, useRef, ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
type SizeId = 'S' | 'M' | 'L'
interface ServiceData { id: string; title: string; desc: string; badge: string | null; icon: ReactNode; hours: string; color: string; colorBg: string; base: number; unit: string }
interface FacilityData { id: string; name: string; addr: string; hours: string; distance: string; availability: 'high' | 'low'; icon: ReactNode }
interface LockerData { id: string; name: string; addr: string; hours: string; available: number; total: number; icon: ReactNode }
interface SpecialItem { id: string; label: string; sub: string; price: number; icon: ReactNode }
interface SizeData { id: SizeId; label: string; lim: string }
interface DurationData { id: string; label: string; sub: string; hours: number; icon: ReactNode }
interface PriceLine { label: string; amount: number; discount?: boolean }
interface Details { name: string; phone: string; email: string; whatsapp: boolean; airline: string; flight: string }
interface Bags { S: number; M: number; L: number }
interface LocationData { name: string; addr: string; area?: string; outOfArea?: boolean }
interface BookingState {
  service: string; pickup: string; dropoff: string; facility: string; locker: string
  direction: 'to' | 'from'; date: Date; time: string; endDate: Date; endTime: string
  duration: string; bags: Bags; hours: number; extras: string[]
  details: Details; recipient: { name: string; phone: string }; insurance: boolean
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ico = {
  Box:      ({ n = 22 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="7" width="14" height="14" rx="2"/><path d="M9 7V4h6v3"/><path d="M9 12h6M9 16h6"/></svg>,
  Home:     ({ n = 22 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-6 9 6v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
  Plane:    ({ n = 22 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>,
  Sun:      ({ n = 22 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4"/></svg>,
  Arrow:    ({ n = 16 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  Back:     ({ n = 18 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
  Close:    ({ n = 16 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  Check:    ({ n = 14 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  Clock:    ({ n = 14 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Shield:   ({ n = 14 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z"/><path d="M9 12l2 2 4-4"/></svg>,
  Pin:      ({ n = 20 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Cal:      ({ n = 18 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  Plus:     ({ n = 16 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  Minus:    ({ n = 16 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14"/></svg>,
  Luggage:  ({ n = 24, full = 0 }: { n?: number; full?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="14" rx="2"/><path d="M9 6V4h6v2"/><path d="M9 10h6"/>{full > 1 && <path d="M9 14h6"/>}{full > 2 && <path d="M9 17h6"/>}</svg>,
  Surf:     ({ n = 18 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c2.5-2 5-3 9-3s6.5 1 9 3"/><path d="M7 18c4-2 8-8 10-15"/><path d="M17 3c-2 2-3 4-3 7s1 5 3 7"/></svg>,
  Baby:     ({ n = 18 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="6" r="2"/><path d="M9 10h6l-2 6h-2z"/><circle cx="8" cy="19" r="2"/><circle cx="16" cy="19" r="2"/></svg>,
  Fragile:  ({ n = 18 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2h8l-2 7c2 1 3 3 3 5 0 3-2 5-5 5s-5-2-5-5c0-2 1-4 3-5z"/><path d="M10 19v2M14 19v2"/></svg>,
  Bike:     ({ n = 18 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M5.5 17.5L11 8l4 5h3.5"/><path d="M9 4h3"/></svg>,
  WA:       ({ n = 16 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0012 0C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.6A12 12 0 0012 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 22c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1112 22z"/></svg>,
  Wallet:   ({ n = 18 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M16 14h2"/><path d="M2 10h20"/></svg>,
  Spark:    ({ n = 14 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 4.7L18 8l-4.2 1.6L12 14l-1.8-4.4L6 8l4.2-1.3z"/></svg>,
  Wave:     ({ n = 28 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 7c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>,
  Lock:     ({ n = 22 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>,
  Building: ({ n = 22 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01"/></svg>,
  Umbrella: ({ n = 22 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="M2 12C2 7 6.5 3 12 3s10 4 10 9z"/><path d="M12 12v6a3 3 0 003 3"/></svg>,
  Departure:({ n = 18 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M22 12.5a1.5 1.5 0 01-2 1.4L4 9V4l3 1 3 4 6.5-1.8a2 2 0 012.4 1.4z"/></svg>,
  Arrival:  ({ n = 18 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M3 12.5a1.5 1.5 0 002 1.4L21 9V4l-3 1-3 4-6.5-1.8a2 2 0 00-2.4 1.4z"/></svg>,
  User:     ({ n = 16 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
  ChevDown: ({ n = 12 }: { n?: number }) => <svg width={n} height={n} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>,
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES: ServiceData[] = [
  { id: 'storage', title: 'Luggage Storage',       desc: 'Secure storage by the hour at our Umhlanga facility.',            badge: null,      icon: <Ico.Box />,   hours: '07:00 – 21:00', color: 'var(--ocean)', colorBg: 'var(--ocean-50)', base: 50,  unit: 'per bag / hour' },
  { id: 'door',    title: 'Door-to-Door Delivery', desc: 'Hotel to Airbnb, Airbnb to villa — same-day routed delivery.',   badge: 'Popular', icon: <Ico.Home />,  hours: '08:00 – 18:00', color: 'var(--sky)',   colorBg: 'var(--sky-50)',   base: 300, unit: 'per delivery, 1 cabin bag' },
  { id: 'airport', title: 'King Shaka Transfer',   desc: 'Synced to your flight — pickup from any KZN address.',           badge: 'New',     icon: <Ico.Plane />, hours: '05:00 – 22:00', color: 'var(--deep)', colorBg: 'var(--deep-50)',  base: 295, unit: 'per trip' },
  { id: 'beach',   title: 'Beach Day Storage',     desc: "Walk-up lockers at Umhlanga Lighthouse & Granny's Pool.",        badge: null,      icon: <Ico.Sun />,   hours: '06:00 – 19:00', color: 'var(--pale)', colorBg: 'var(--pale-50)',  base: 30,  unit: 'per bag / hour' },
]
const STORAGE_SIZE_RATE: Record<SizeId, number> = { S: 50, M: 60, L: 70 }
const STORAGE_HOURS = [1, 2, 3, 4, 5, 6, 8, 10, 12]

const STORAGE_FACILITIES: FacilityData[] = [
  { id: 'beacon', name: 'Beacon Rock', addr: '21 Lighthouse Road, Umhlanga Rocks', hours: '07:00 – 21:00', distance: 'A few minutes from the Village & Promenade', availability: 'high', icon: <Ico.Building n={20} /> },
]
const BEACH_LOCKERS: LockerData[] = [
  { id: 'lighthouse', name: 'Umhlanga Lighthouse', addr: 'Lighthouse Rd Promenade',    hours: '06:00 – 19:00', available: 14, total: 24, icon: <Ico.Umbrella n={20} /> },
  { id: 'grannys',    name: "Granny's Pool",        addr: 'North Beach Promenade',      hours: '06:00 – 19:00', available: 7,  total: 18, icon: <Ico.Umbrella n={20} /> },
  { id: 'bronze',     name: 'Bronze Beach',         addr: 'Lagoon Dr Boardwalk',        hours: '07:00 – 18:00', available: 16, total: 20, icon: <Ico.Umbrella n={20} /> },
  { id: 'westbrook',  name: 'Westbrook Beach',      addr: 'Westbrook Pkwy, La Mercy',   hours: '07:00 – 18:00', available: 3,  total: 12, icon: <Ico.Umbrella n={20} /> },
]
const PRESET_LOCATIONS: LocationData[] = [
  { name: 'The Oyster Box',                  addr: '2 Lighthouse Rd, Umhlanga Rocks',        area: 'Umhlanga' },
  { name: 'Beverly Hills Hotel',             addr: 'Lighthouse Rd, Umhlanga Rocks',           area: 'Umhlanga' },
  { name: 'Cabana Beach Resort',             addr: '10 Lagoon Dr, Umhlanga',                  area: 'Umhlanga' },
  { name: 'Pearls of Umhlanga',              addr: '6 Lagoon Dr, Umhlanga',                   area: 'Umhlanga' },
  { name: 'Breakers Resort',                 addr: '88 Lagoon Dr, Umhlanga',                  area: 'Umhlanga' },
  { name: 'Pearl Sky Apartments',            addr: '8 Lighthouse Rd, Umhlanga',               area: 'Umhlanga' },
  { name: 'Gateway Theatre of Shopping',     addr: '1 Palm Blvd, Umhlanga Ridge',             area: 'Umhlanga Ridge' },
  { name: 'uShaka Marine World',             addr: '1 King Shaka Ave, Durban',                area: 'Durban' },
  { name: 'Sun Coast Hotel',                 addr: 'Suncoast Blvd, Durban',                   area: 'Durban' },
  { name: 'King Shaka International Airport',addr: 'La Mercy, KZN',                           area: 'Airport' },
  { name: 'Ballito Junction Mall',           addr: 'Leonora Dr, Ballito',                     area: 'Ballito' },
  { name: 'Salt Rock Hotel',                 addr: 'Basil Hulett Dr, Salt Rock',              area: 'North Coast' },
  { name: 'La Lucia Mall',                   addr: 'William Campbell Dr, La Lucia',           area: 'La Lucia' },
  { name: "Granny's Pool",                   addr: 'North Beach Promenade, Umhlanga',         area: 'Umhlanga' },
  // Out-of-area entries show a service notice in results
  { name: 'Cape Town International Airport', addr: 'Matroosfontein, Cape Town',               area: 'Western Cape', outOfArea: true },
  { name: 'V&A Waterfront',                  addr: 'Dock Rd, Cape Town',                      area: 'Western Cape', outOfArea: true },
  { name: 'OR Tambo International Airport',  addr: 'Kempton Park, Johannesburg',              area: 'Gauteng',      outOfArea: true },
  { name: 'Sandton City',                    addr: 'Rivonia Rd, Sandton',                     area: 'Gauteng',      outOfArea: true },
]
const SPECIAL_ITEMS: SpecialItem[] = [
  { id: 'surf',    label: 'Surfboard',        sub: 'Up to 8ft',           price: 100, icon: <Ico.Surf /> },
  { id: 'pram',    label: 'Pram / Stroller',  sub: 'Folding only',        price: 100, icon: <Ico.Baby /> },
  { id: 'fragile', label: 'Fragile items',    sub: 'Extra care handling', price: 100, icon: <Ico.Fragile /> },
  { id: 'sport',   label: 'Sports equipment', sub: 'Golf, bikes, etc.',   price: 100, icon: <Ico.Bike /> },
]
const TIME_SLOTS = ['08:00','10:00','11:00','13:00','15:00','17:00']
const SIZES: SizeData[] = [
  { id: 'S', label: 'Cabin',     lim: 'Up to 7kg' },
  { id: 'M', label: 'Check-in',  lim: '8–23kg' },
  { id: 'L', label: 'Oversized', lim: '24–32kg' },
]
const DURATIONS: DurationData[] = [
  { id: '1h',   label: '1 Hour',   sub: 'Quick swim', hours: 1, icon: <Ico.Clock n={20} /> },
  { id: 'half', label: 'Half Day', sub: '4 hours',    hours: 4, icon: <Ico.Sun n={20} /> },
  { id: 'full', label: 'All Day',  sub: '8 hours',    hours: 8, icon: <Ico.Umbrella n={20} /> },
]

// ─── Step routing ─────────────────────────────────────────────────────────────
const DEFAULT_STEPS  = ['service','where','when','bags','details','review','done']
const STORAGE_STEPS  = ['service','where','bags','when','details','review','done']
const DOOR_STEPS     = ['service','where','bags','when','details','review','done']
const stepsFor = (serviceId: string) => {
  if (serviceId === 'storage') return STORAGE_STEPS
  if (serviceId === 'door')    return DOOR_STEPS
  return DEFAULT_STEPS
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtPrice    = (n: number) => Math.round(n).toLocaleString('en-ZA')
const totalBags   = (bags: Bags) => (bags?.S || 0) + (bags?.M || 0) + (bags?.L || 0)
const storageHourly = (bags: Bags) => (bags?.S || 0) * 50 + (bags?.M || 0) * 60 + (bags?.L || 0) * 70
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DOW = ['S','M','T','W','T','F','S']
function buildCalendar(year: number, month: number): (Date | null)[] {
  const first    = new Date(year, month, 1)
  const startDow = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7) cells.push(null)
  return cells
}
const fmtDay  = (d: Date | null) => d ? d.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' }) : '—'
const sameDay = (a: Date | null, b: Date | null) => !!(a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate())
const daysBetween = (a: Date, b: Date) => Math.max(1, Math.round((b.getTime() - a.getTime()) / 86400000))

// ─── CalendarPicker ───────────────────────────────────────────────────────────
function CalendarPicker({ value, setValue, minDate }: { value: Date; setValue: (d: Date) => void; minDate?: Date }) {
  const today   = new Date(); today.setHours(0,0,0,0)
  const baseMin = minDate || today
  const [view, setView] = useState({ y: value.getFullYear(), m: value.getMonth() })
  const cells = useMemo(() => buildCalendar(view.y, view.m), [view])
  return (
    <div className="calendar">
      <div className="cal-head">
        <div className="cal-month">{MONTH_NAMES[view.m]} {view.y}</div>
        <div className="cal-nav">
          <button onClick={() => setView(v => v.m === 0 ? { y: v.y - 1, m: 11 } : { y: v.y, m: v.m - 1 })}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={() => setView(v => v.m === 11 ? { y: v.y + 1, m: 0 } : { y: v.y, m: v.m + 1 })}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      <div className="cal-grid">
        {DOW.map((d, i) => <div key={i} className="cal-dow">{d}</div>)}
        {cells.map((c, i) => {
          if (!c) return <div key={i} />
          const isPast  = c < baseMin
          const isToday = sameDay(c, today)
          const isSel   = sameDay(c, value)
          return (
            <button key={i} className={['cal-day', isPast ? 'disabled' : '', isToday ? 'today' : '', isSel ? 'selected' : ''].filter(Boolean).join(' ')} disabled={isPast} onClick={() => !isPast && setValue(c)}>
              {c.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Address Input ────────────────────────────────────────────────────────────
function AddressInput({ value, onChange, placeholder, label, color = 'var(--ocean)' }: { value: string; onChange: (v: string) => void; placeholder: string; label: string; color?: string }) {
  const [focused, setFocused] = useState(false)
  const suggestions = useMemo(() => {
    if (!focused) return []
    const q = (value || '').toLowerCase().trim()
    if (!q) return PRESET_LOCATIONS.filter(p => !p.outOfArea).slice(0, 6)
    const matches = PRESET_LOCATIONS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.addr.toLowerCase().includes(q) ||
      (p.area && p.area.toLowerCase().includes(q))
    )
    return matches.sort((a, b) => (a.outOfArea ? 1 : 0) - (b.outOfArea ? 1 : 0)).slice(0, 6)
  }, [value, focused])
  return (
    <div className="input-group">
      <span className="input-label">{label}</span>
      <div className="input-wrap">
        <span className="lead" style={{ color }}><Ico.Pin n={18} /></span>
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 150)} />
      </div>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {!value && <div className="suggestions-header">Familiar addresses</div>}
          {suggestions.map(s => (
            <button key={s.name} className={'suggestion' + (s.outOfArea ? ' out-of-area' : '')}
              onMouseDown={e => { e.preventDefault(); onChange(s.name); setFocused(false) }}>
              <span className="ic"><Ico.Pin n={14} /></span>
              <div>
                <div className="name">{s.name}{s.outOfArea && <span className="oos-tag">Outside service area</span>}</div>
                <div className="addr">{s.addr}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Map tile ─────────────────────────────────────────────────────────────────
function MapTile() {
  return (
    <div className="bk-map">
      <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(26,86,219,0.08)" strokeWidth="1"/></pattern></defs>
        <rect width="400" height="180" fill="url(#grid)"/>
        <path d="M 0 60 Q 100 40 200 70 T 400 50" fill="none" stroke="rgba(14,165,233,0.45)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 0 60 Q 100 40 200 70 T 400 50 L 400 0 L 0 0 Z" fill="rgba(14,165,233,0.12)"/>
        <path d="M 50 180 Q 130 130 200 120 T 380 100" fill="none" stroke="rgba(13,31,60,0.18)" strokeWidth="2"/>
        <g fill="rgba(26,86,219,0.18)">
          <rect x="90" y="105" width="14" height="14" rx="2"/><rect x="115" y="100" width="10" height="20" rx="1.5"/><rect x="140" y="115" width="18" height="10" rx="1.5"/>
          <rect x="240" y="105" width="12" height="16" rx="1.5"/><rect x="265" y="110" width="20" height="12" rx="1.5"/><rect x="300" y="100" width="10" height="22" rx="1.5"/>
        </g>
        <text x="22" y="172" fill="rgba(13,31,60,0.4)" fontSize="9" fontFamily="DM Sans">Umhlanga Rocks</text>
      </svg>
      <div className="bk-map-pulse" />
      <svg className="bk-map-pin" viewBox="0 0 24 32" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12zm0 17a5 5 0 110-10 5 5 0 010 10z"/><circle cx="12" cy="12" r="3.5" fill="#fff"/></svg>
    </div>
  )
}

// ─── STEP 1 — Service ─────────────────────────────────────────────────────────
function StepService({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  return (
    <div>
      <h1 className="step-title">What can we help with?</h1>
      <p className="step-sub">Pick a service to get started — each one tailors the next few steps.</p>
      <div className="service-list">
        {SERVICES.map(s => (
          <button key={s.id} className={'svc-card' + (value === s.id ? ' selected' : '')} style={{ '--c': s.color, '--c-bg': s.colorBg } as React.CSSProperties} onClick={() => onChange(s.id)}>
            <span className="svc-ic">{s.icon}</span>
            <div className="svc-body">
              <div className="svc-title-row">
                <span className="svc-title">{s.title}</span>
                {s.badge && <span className="svc-badge">{s.badge}</span>}
              </div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-meta">
                <span className="chip"><Ico.Clock />{s.hours}</span>
                <span className="chip"><Ico.Check />Tracked</span>
                <span className="chip"><Ico.Shield />Insured</span>
              </div>
            </div>
            <span className="svc-arrow"><Ico.Arrow n={14} /></span>
          </button>
        ))}
      </div>
      <div className="section-label">Recent bookings</div>
      <div className="empty-card">
        <div className="ic"><Ico.Box n={20} /></div>
        No upcoming bookings yet.<br />
        <span style={{ color: 'var(--navy-30)', fontSize: 12 }}>Your first one starts here.</span>
      </div>
    </div>
  )
}

// ─── STEP 2 — Where ───────────────────────────────────────────────────────────
function StepWhere({ service, state, set }: { service: ServiceData; state: BookingState; set: (p: Partial<BookingState>) => void }) {
  if (service.id === 'storage') return <WhereStorage state={state} set={set} />
  if (service.id === 'beach')   return <WhereBeach   state={state} set={set} />
  if (service.id === 'airport') return <WhereAirport state={state} set={set} />
  return <WhereDoor state={state} set={set} />
}

function WhereStorage({ state, set }: { state: BookingState; set: (p: Partial<BookingState>) => void }) {
  return (
    <div>
      <h1 className="step-title">Pick a storage facility</h1>
      <p className="step-sub">Drop in, get a sealed claim ticket, come back any time during opening hours.</p>
      {STORAGE_FACILITIES.map(f => (
        <button key={f.id} className={'facility-card' + (state.facility === f.id ? ' selected' : '')} onClick={() => set({ facility: f.id })}>
          <span className="fc-ic">{f.icon}</span>
          <div className="fc-body">
            <div className="fc-name">{f.name}</div>
            <div className="fc-addr">{f.addr}</div>
            <div className="fc-meta">
              <span className="chip"><Ico.Clock />{f.hours}</span>
              <span className="pin"><Ico.Pin n={11} />{f.distance}</span>
            </div>
          </div>
          <span className="fc-radio">{state.facility === f.id && <Ico.Check n={12} />}</span>
        </button>
      ))}
      <div className="section-label">Need pickup from your hotel instead?</div>
      <button className="chip-btn" style={{ width: '100%', padding: '12px' }}>Switch to Door-to-Door delivery →</button>
    </div>
  )
}

function WhereBeach({ state, set }: { state: BookingState; set: (p: Partial<BookingState>) => void }) {
  return (
    <div>
      <h1 className="step-title">Choose your beach locker</h1>
      <p className="step-sub">Walk-up, self-service lockers. We&apos;ll send a 4-digit unlock code instantly.</p>
      {BEACH_LOCKERS.map(l => {
        const ratio  = l.available / l.total
        const status = ratio > 0.4 ? 'high' : 'low'
        return (
          <button key={l.id} className={'facility-card' + (state.locker === l.id ? ' selected' : '')} onClick={() => set({ locker: l.id })}>
            <span className="fc-ic" style={{ background: state.locker === l.id ? 'var(--ocean)' : 'var(--sky-50)', color: state.locker === l.id ? '#fff' : 'var(--sky)' }}>{l.icon}</span>
            <div className="fc-body">
              <div className="fc-name">{l.name}<span className={'availability ' + status}>{l.available} / {l.total} free</span></div>
              <div className="fc-addr">{l.addr}</div>
              <div className="fc-meta"><span className="chip"><Ico.Clock />{l.hours}</span><span className="pin"><Ico.Wave n={12} />Beachfront</span></div>
            </div>
            <span className="fc-radio">{state.locker === l.id && <Ico.Check n={12} />}</span>
          </button>
        )
      })}
    </div>
  )
}

function WhereAirport({ state, set }: { state: BookingState; set: (p: Partial<BookingState>) => void }) {
  return (
    <div>
      <h1 className="step-title">Where are you flying?</h1>
      <p className="step-sub">We&apos;ll sync your transfer to King Shaka International.</p>
      <div className={'dir-toggle' + (state.direction === 'from' ? ' right' : '')}>
        <button className={state.direction === 'to' ? 'on' : ''} onClick={() => set({ direction: 'to' })}>
          <Ico.Departure n={16} /> To Airport
        </button>
        <button className={state.direction === 'from' ? 'on' : ''} onClick={() => set({ direction: 'from' })}>
          <Ico.Arrival n={16} /> From Airport
        </button>
      </div>
      <MapTile />
      <AddressInput label={state.direction === 'to' ? 'Pickup from' : 'Drop off at'} value={state.pickup} onChange={v => set({ pickup: v })} placeholder="Hotel, address, or area" />
      <div className="input-group">
        <span className="input-label">{state.direction === 'to' ? 'Drop off at' : 'Collect from'}</span>
        <div className="input-wrap" style={{ background: 'var(--bg-tint)', borderStyle: 'dashed' }}>
          <span className="lead"><Ico.Plane n={18} /></span>
          <div className="fixed-dest">King Shaka International</div>
          <span className="trailing">Terminal 1</span>
        </div>
      </div>
    </div>
  )
}

function WhereDoor({ state, set }: { state: BookingState; set: (p: Partial<BookingState>) => void }) {
  return (
    <div>
      <h1 className="step-title">Where shall we collect?</h1>
      <p className="step-sub">Search any South African address — we currently operate inside uMhlanga and the immediate KZN coast.</p>
      <MapTile />
      <AddressInput label="Pickup"   value={state.pickup}  onChange={v => set({ pickup: v })}  placeholder="Search hotel, address, or area" />
      <AddressInput label="Drop-off" value={state.dropoff} onChange={v => set({ dropoff: v })} placeholder="Where should we deliver?" color="var(--sky)" />
      <div className="service-area-note">
        <Ico.Pin n={14} />
        <span>Outside uMhlanga? WhatsApp us — we may still be able to help on a custom route.</span>
      </div>
    </div>
  )
}

// ─── STEP 3 — When ────────────────────────────────────────────────────────────
function StepWhen({ service, state, set }: { service: ServiceData; state: BookingState; set: (p: Partial<BookingState>) => void }) {
  if (service.id === 'storage') return <WhenStorage state={state} set={set} />
  if (service.id === 'beach')   return <WhenBeach   state={state} set={set} />
  return <WhenDefault state={state} set={set} service={service} />
}

function WhenStorage({ state, set }: { state: BookingState; set: (p: Partial<BookingState>) => void }) {
  const today    = new Date(); today.setHours(0,0,0,0)
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1)
  const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 2)
  const [showCalendar, setShowCalendar] = useState(false)

  const hours    = state.hours || 2
  const bagCount = totalBags(state.bags)
  const total    = storageHourly(state.bags) * hours

  const isQuickDay    = sameDay(state.date, today) || sameDay(state.date, tomorrow) || sameDay(state.date, dayAfter)
  const customDayLabel = !isQuickDay && state.date
    ? state.date.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })
    : null

  return (
    <div>
      <h1 className="step-title">When do you need it stored?</h1>
      <p className="step-sub">Pick the day, a drop-off time, and how many hours you&apos;ll need it. We charge per hour, per bag.</p>
      <div className="section-label" style={{ marginTop: 0 }}>Day</div>
      <div className="quick-dates">
        <button className={'chip-btn' + (sameDay(state.date, today) ? ' selected' : '')} onClick={() => { set({ date: today }); setShowCalendar(false) }}>Today</button>
        <button className={'chip-btn' + (sameDay(state.date, tomorrow) ? ' selected' : '')} onClick={() => { set({ date: tomorrow }); setShowCalendar(false) }}>Tomorrow</button>
        <button className={'chip-btn' + (sameDay(state.date, dayAfter) ? ' selected' : '')} onClick={() => { set({ date: dayAfter }); setShowCalendar(false) }}>
          {dayAfter.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })}
        </button>
        <button className={'chip-btn' + (customDayLabel || showCalendar ? ' selected' : '')} onClick={() => setShowCalendar(v => !v)} aria-expanded={showCalendar}>
          {customDayLabel || 'Pick a date'}
          <span style={{ display: 'inline-block', marginLeft: 4, transform: showCalendar ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s ease', verticalAlign: 'middle' }}>
            <Ico.ChevDown />
          </span>
        </button>
      </div>
      {showCalendar && (
        <CalendarPicker value={state.date} setValue={d => { set({ date: d }); setShowCalendar(false) }} />
      )}
      <div className="section-label">Drop-off time</div>
      <div className="time-grid">
        {TIME_SLOTS.map(t => <button key={t} className={'time-slot' + (state.time === t ? ' selected' : '')} onClick={() => set({ time: t })}>{t}</button>)}
      </div>
      <div className="section-label">How many hours?</div>
      <div className="hours-dropdown-wrap">
        <select className="hours-dropdown" value={hours} onChange={e => set({ hours: Number(e.target.value) })}>
          {STORAGE_HOURS.map(h => <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>)}
        </select>
        <span className="hours-dropdown-caret"><Ico.Arrow n={14} /></span>
      </div>
      {bagCount > 0 && (
        <div className="duration-hint">
          <Ico.Clock /> {bagCount} bag{bagCount !== 1 ? 's' : ''} · {hours}h · <strong style={{ color: 'var(--navy)', marginLeft: 4 }}>R{total}</strong>
        </div>
      )}
    </div>
  )
}

function WhenBeach({ state, set }: { state: BookingState; set: (p: Partial<BookingState>) => void }) {
  return (
    <div>
      <h1 className="step-title">When&apos;s beach time?</h1>
      <p className="step-sub">Lockers unlock the moment you arrive — pick how long you&apos;ll need it.</p>
      <div className="section-label">Start time today</div>
      <div className="time-grid" style={{ marginBottom: 22 }}>
        {TIME_SLOTS.map(t => <button key={t} className={'time-slot' + (state.time === t ? ' selected' : '')} onClick={() => set({ time: t })}>{t}</button>)}
      </div>
      <div className="section-label">How long?</div>
      <div className="duration-grid">
        {DURATIONS.map(d => (
          <button key={d.id} className={'duration-card' + (state.duration === d.id ? ' selected' : '')} onClick={() => set({ duration: d.id })}>
            <div className="ic">{d.icon}</div>
            <div className="lbl">{d.label}</div>
            <div className="sub">{d.sub}</div>
          </button>
        ))}
      </div>
      <div className="duration-hint"><Ico.Sun /> Sunset is at 17:42 today — we&apos;ll send a reminder 30 min before closing.</div>
    </div>
  )
}

function WhenDefault({ state, set, service }: { state: BookingState; set: (p: Partial<BookingState>) => void; service: ServiceData }) {
  const today    = new Date(); today.setHours(0,0,0,0)
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1)
  const quick    = (offset: number) => { const d = new Date(today); d.setDate(today.getDate() + offset); set({ date: d }) }
  return (
    <div>
      <h1 className="step-title">{service.id === 'airport' ? 'When are you flying?' : 'When works best?'}</h1>
      <p className="step-sub">{service.id === 'airport' ? 'We sync drop-off to your departure — 3h international, 90 min domestic.' : "We'll arrive within a 30-minute window of your slot."}</p>
      <div className="quick-dates">
        <button className={'chip-btn' + (sameDay(state.date, today) ? ' selected' : '')} onClick={() => quick(0)}>Today</button>
        <button className={'chip-btn' + (sameDay(state.date, tomorrow) ? ' selected' : '')} onClick={() => quick(1)}>Tomorrow</button>
        <button className={'chip-btn' + (sameDay(state.date, new Date(today.getTime() + 2*86400000)) ? ' selected' : '')} onClick={() => quick(2)}>+2 days</button>
      </div>
      <CalendarPicker value={state.date} setValue={d => set({ date: d })} />
      <div className="section-label">{service.id === 'airport' ? 'Drop-off window' : 'Pickup window'}</div>
      <div className="time-grid">{TIME_SLOTS.map(t => <button key={t} className={'time-slot' + (state.time === t ? ' selected' : '')} onClick={() => set({ time: t })}>{t}</button>)}</div>
    </div>
  )
}

// ─── STEP 4 — Bags ────────────────────────────────────────────────────────────
function StepBags({ state, set }: { state: BookingState; set: (p: Partial<BookingState>) => void }) {
  const bags  = state.bags || { S: 0, M: 0, L: 0 }
  const total = totalBags(bags)
  const MAX   = 8
  const setBag = (sizeId: SizeId, delta: number) => {
    const cur  = bags[sizeId] || 0
    const next = Math.max(0, Math.min(cur + delta, MAX - (total - cur)))
    set({ bags: { ...bags, [sizeId]: next } })
  }
  return (
    <div>
      <h1 className="step-title">How many bags?</h1>
      <p className="step-sub">Tell us how many of each size — you can mix and match. Up to {MAX} bags per booking.</p>
      <div className="bag-mix-stack">
        {SIZES.map(s => {
          const qty  = bags[s.id] || 0
          const rate = STORAGE_SIZE_RATE[s.id]
          return (
            <div key={s.id} className={'bag-mix-row' + (qty > 0 ? ' active' : '')}>
              <span className="bag-mix-ic">
                <Ico.Luggage n={s.id === 'S' ? 24 : s.id === 'M' ? 30 : 36} full={s.id === 'L' ? 3 : s.id === 'M' ? 2 : 1} />
              </span>
              <div className="bag-mix-info">
                <div className="bag-mix-title">{s.label}</div>
                <div className="bag-mix-sub">{s.lim} · R{rate}/hr storage</div>
              </div>
              <div className="counter-controls">
                <button className="counter-btn" onClick={() => setBag(s.id, -1)} disabled={qty <= 0} aria-label={`Remove ${s.label}`}><Ico.Minus /></button>
                <span className="counter-val" key={qty}>{qty}</span>
                <button className="counter-btn" onClick={() => setBag(s.id, +1)} disabled={total >= MAX} aria-label={`Add ${s.label}`}><Ico.Plus /></button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="bag-mix-summary">
        <span>Total bags</span>
        <strong>{total} / {MAX}</strong>
      </div>
      <div className="section-label">Anything special?</div>
      {SPECIAL_ITEMS.map(it => {
        const on = state.extras.includes(it.id)
        return (
          <div key={it.id} className={'toggle-row' + (on ? ' on' : '')} onClick={() => set({ extras: on ? state.extras.filter(e => e !== it.id) : [...state.extras, it.id] })}>
            <span className="ic">{it.icon}</span>
            <div className="info"><div className="t">{it.label}</div><div className="s">{it.sub}</div></div>
            <span className="p">+R{it.price}</span>
            <span className="check">{on && <Ico.Check n={12} />}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── STEP 5 — Details ─────────────────────────────────────────────────────────
function StepDetails({ service, state, set }: { service: ServiceData; state: BookingState; set: (p: Partial<BookingState>) => void }) {
  const isDoor    = service.id === 'door'
  const isAirport = service.id === 'airport'
  const upd = (patch: Partial<Details>) => set({ details: { ...state.details, ...patch } })
  return (
    <div>
      <h1 className="step-title">Your contact details</h1>
      <p className="step-sub">{isDoor ? "We'll need details for both ends of the trip." : "We'll send a confirmation and live tracking link."}</p>
      <div className="section-label" style={{ marginTop: 0 }}>Your details</div>
      <div className="field-stack">
        <div>
          <span className="input-label">Full name</span>
          <div className="input-wrap"><input type="text" value={state.details.name} onChange={e => upd({ name: e.target.value })} placeholder="As on your booking" /></div>
        </div>
        <div>
          <span className="input-label">Mobile number</span>
          <div className="input-wrap"><span className="input-prefix">+27</span><input type="tel" value={state.details.phone} onChange={e => upd({ phone: e.target.value })} placeholder="83 555 1234" /></div>
        </div>
        <div className={'toggle-row' + (state.details.whatsapp ? ' on' : '')} onClick={() => upd({ whatsapp: !state.details.whatsapp })}>
          <span className="ic"><Ico.WA /></span>
          <div className="info"><div className="t">Send updates via WhatsApp</div><div className="s">Live driver location and ETA pings.</div></div>
          <span className={'bk-switch' + (state.details.whatsapp ? ' on' : '')} />
        </div>
        <div>
          <span className="input-label">Email</span>
          <div className="input-wrap"><input type="email" value={state.details.email} onChange={e => upd({ email: e.target.value })} placeholder="you@example.com" /></div>
        </div>
      </div>
      {isDoor && (
        <>
          <div className="section-label">Recipient (drop-off)</div>
          <div className="recipient-toggle"><Ico.User n={14} /><span>If different from you, we&apos;ll WhatsApp them ahead of arrival.</span></div>
          <div className="field-stack">
            <div>
              <span className="input-label">Recipient name</span>
              <div className="input-wrap"><input type="text" value={state.recipient.name} onChange={e => set({ recipient: { ...state.recipient, name: e.target.value } })} placeholder="Or 'Same as me'" /></div>
            </div>
            <div>
              <span className="input-label">Recipient mobile</span>
              <div className="input-wrap"><span className="input-prefix">+27</span><input type="tel" value={state.recipient.phone} onChange={e => set({ recipient: { ...state.recipient, phone: e.target.value } })} placeholder="83 555 1234" /></div>
            </div>
          </div>
        </>
      )}
      {isAirport && (
        <>
          <div className="section-label">Flight details</div>
          <div className="flight-input">
            <div className="input-wrap"><input type="text" value={state.details.airline} onChange={e => upd({ airline: e.target.value })} placeholder="Airline" /></div>
            <div className="input-wrap"><input type="text" value={state.details.flight} onChange={e => upd({ flight: e.target.value })} placeholder="Flight no." /></div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--navy-50)', marginTop: 8, display: 'flex', gap: 6, alignItems: 'center' }}>
            <Ico.Plane n={14} /> We&apos;ll auto-sync to your {state.direction === 'to' ? 'departure' : 'arrival'} time.
          </div>
        </>
      )}
    </div>
  )
}

// ─── STEP 6 — Review & Pay ────────────────────────────────────────────────────
interface ReviewProps {
  service: ServiceData; state: BookingState; breakdown: { lines: PriceLine[]; total: number }
  payMethod: string; setPayMethod: (m: string) => void; promo: string; setPromo: (p: string) => void
  promoApplied: { code: string; type: string; value: number; label: string } | null
  applyPromo: () => void; set: (p: Partial<BookingState>) => void
}
function StepReview({ service, state, breakdown, payMethod, setPayMethod, promo, setPromo, promoApplied, applyPromo, set }: ReviewProps) {
  const facility = STORAGE_FACILITIES.find(f => f.id === state.facility)
  const locker   = BEACH_LOCKERS.find(l => l.id === state.locker)
  const duration = DURATIONS.find(d => d.id === state.duration)
  const bagCount = totalBags(state.bags)
  const bagDesc  = SIZES.filter(s => (state.bags?.[s.id] || 0) > 0)
    .map(s => `${state.bags[s.id]} ${s.label.toLowerCase()}`).join(', ') || '—'
  return (
    <div>
      <h1 className="step-title">Review &amp; pay</h1>
      <p className="step-sub">Last check before we lock in your slot.</p>
      <div className="review-section">
        <h4>Your booking</h4>
        <div className="review-row"><span className="k">Service</span><span className="v">{service.title}</span></div>
        {service.id === 'storage' && <>
          <div className="review-row"><span className="k">Facility</span><span className="v">{facility?.name || '—'}</span></div>
          <div className="review-row"><span className="k">Drop-off</span><span className="v">{fmtDay(state.date)} · {state.time}</span></div>
          <div className="review-row"><span className="k">Duration</span><span className="v">{state.hours} hour{state.hours > 1 ? 's' : ''}</span></div>
        </>}
        {service.id === 'door' && <>
          <div className="review-row"><span className="k">Pickup</span><span className="v">{state.pickup || '—'}</span></div>
          <div className="review-row"><span className="k">Drop-off</span><span className="v">{state.dropoff || '—'}</span></div>
          <div className="review-row"><span className="k">When</span><span className="v">{fmtDay(state.date)} · {state.time}</span></div>
          {state.recipient.name && <div className="review-row"><span className="k">Recipient</span><span className="v">{state.recipient.name}</span></div>}
        </>}
        {service.id === 'airport' && <>
          <div className="review-row"><span className="k">Direction</span><span className="v">{state.direction === 'to' ? 'To departures' : 'From arrivals'}</span></div>
          <div className="review-row"><span className="k">Address</span><span className="v">{state.pickup || '—'}</span></div>
          <div className="review-row"><span className="k">Flight</span><span className="v">{state.details.airline} {state.details.flight}</span></div>
          <div className="review-row"><span className="k">When</span><span className="v">{fmtDay(state.date)} · {state.time}</span></div>
        </>}
        {service.id === 'beach' && <>
          <div className="review-row"><span className="k">Locker site</span><span className="v">{locker?.name || '—'}</span></div>
          <div className="review-row"><span className="k">Start</span><span className="v">Today · {state.time}</span></div>
          <div className="review-row"><span className="k">Duration</span><span className="v">{duration?.label}</span></div>
        </>}
        <div className="review-row"><span className="k">Bags</span><span className="v">{bagDesc}</span></div>
      </div>
      <div className="section-label">Add-ons</div>
      <div className={'toggle-row' + (state.insurance ? ' on' : '')} onClick={() => set({ insurance: !state.insurance })}>
        <span className="ic"><Ico.Shield n={18} /></span>
        <div className="info"><div className="t">Premium insurance</div><div className="s">Coverage up to R25,000 per bag.</div></div>
        <span className="p">+R{49 * bagCount}</span>
        <span className="check">{state.insurance && <Ico.Check n={12} />}</span>
      </div>
      <div className="section-label">Payment method</div>
      {[
        { id: 'card', logo: 'VISA', name: 'Credit / Debit card', sub: 'Visa, Mastercard, Amex', style: {} },
        { id: 'snap', logo: 'SNAP', name: 'SnapScan',            sub: 'QR code on next step',  style: { background: '#1A56DB', color: '#fff', borderColor: '#1A56DB' } },
        { id: 'eft',  logo: 'EFT',  name: 'Instant EFT',         sub: 'Ozow secure transfer',  style: {} },
      ].map(pm => (
        <div key={pm.id} className={'pay-row' + (payMethod === pm.id ? ' selected' : '')} onClick={() => setPayMethod(pm.id)}>
          <div className="logo-box" style={pm.style}>{pm.logo}</div>
          <div className="info"><div className="name">{pm.name}</div><div className="sub">{pm.sub}</div></div>
          <span className="radio-dot" />
        </div>
      ))}
      <div className="section-label">Promo code</div>
      {promoApplied ? (
        <div className="promo-applied"><Ico.Spark /><span><strong>{promoApplied.code}</strong> applied — {promoApplied.label}</span></div>
      ) : (
        <div className="promo-row">
          <div className="input-wrap"><input type="text" value={promo} onChange={e => setPromo(e.target.value.toUpperCase())} placeholder="Got a code?" /></div>
          <button onClick={applyPromo}>Apply</button>
        </div>
      )}
      <div className="section-label">Price breakdown</div>
      <div className="price-breakdown">
        {breakdown.lines.map((l, i) => (
          <div key={i} className={'price-row' + (l.discount ? ' discount' : '')}>
            <span>{l.label}</span><span className="num">{l.discount ? '−' : ''}R{fmtPrice(l.amount)}</span>
          </div>
        ))}
        <div className="price-row total"><span>Total</span><span className="num">R{fmtPrice(breakdown.total)}</span></div>
      </div>
    </div>
  )
}

// ─── QR visual ────────────────────────────────────────────────────────────────
function FakeQR({ seed }: { seed: string }) {
  const cells = useMemo(() => {
    let h = 0
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) & 0xffffffff
    const arr: number[] = []
    for (let i = 0; i < 49; i++) { h = (h * 1103515245 + 12345) & 0xffffffff; arr.push((h >> 16) & 1) }
    ;[0,1,2,6,7,8,13,14,15,42,43,44,48].forEach(i => { if (arr[i] !== undefined) arr[i] = 1 })
    return arr
  }, [seed])
  return (
    <div className="qr">
      <div className="qr-grid">{cells.slice(0, 49).map((c, i) => <div key={i} className={c ? 'on' : ''} />)}</div>
    </div>
  )
}

// ─── STEP 7 — Done ────────────────────────────────────────────────────────────
function StepDone({ service, state, breakdown, refCode, onRestart }: { service: ServiceData; state: BookingState; breakdown: { lines: PriceLine[]; total: number }; refCode: string; onRestart: () => void }) {
  const facility   = STORAGE_FACILITIES.find(f => f.id === state.facility)
  const locker     = BEACH_LOCKERS.find(l => l.id === state.locker)
  const bagCount   = totalBags(state.bags)
  const bagDesc    = SIZES.filter(s => (state.bags?.[s.id] || 0) > 0)
    .map(s => `${state.bags[s.id]} ${s.label.toLowerCase()}`).join(', ')
  return (
    <div className="success">
      <div className="success-circle">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <h2>{service.id === 'beach' ? "You're in!" : "You're all set!"}</h2>
      <p>
        {service.id === 'storage' && "We've sent your claim ticket to WhatsApp. Show the QR when you drop off and again to collect."}
        {service.id === 'door'    && "A driver will be assigned 30 min before pickup. You'll get a tracking link via WhatsApp."}
        {service.id === 'airport' && "We've linked your flight — if it changes, we'll adjust automatically."}
        {service.id === 'beach'   && 'Tap your code below at the locker keypad to unlock. The locker is yours for the booked window.'}
      </p>
      <div className="booking-ref">
        <div className="label">Booking reference</div>
        <div className="code">{refCode}</div>
      </div>
      {service.id === 'storage' && (
        <div className="ticket">
          <div className="ticket-top">
            <span className="badge-ic"><Ico.Box n={20} /></span>
            <div className="info"><div className="t">Claim Ticket · {facility?.name}</div><div className="s">Show at counter on arrival &amp; collection</div></div>
          </div>
          <div className="qr-wrap">
            <FakeQR seed={refCode} />
            <div style={{ flex: 1, fontSize: 13, color: 'var(--navy-70)', textAlign: 'left' }}>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: 'var(--navy)', fontSize: 14, marginBottom: 4 }}>
                {bagCount} bag{bagCount !== 1 ? 's' : ''}{bagDesc ? ` · ${bagDesc}` : ''}
              </div>
              <div>{fmtDay(state.date)} · {state.time}</div>
              <div style={{ color: 'var(--navy-50)', marginTop: 4 }}>{state.hours} hour{state.hours > 1 ? 's' : ''} of storage</div>
            </div>
          </div>
        </div>
      )}
      {service.id === 'door' && (
        <div className="tracking-strip">
          <div className="pulse" />
          <div className="info"><div className="t">Live tracking ready</div><div className="s">Driver assigned 30 min before {state.time}</div></div>
          <Ico.Arrow n={14} />
        </div>
      )}
      {service.id === 'airport' && (
        <div className="ticket" style={{ textAlign: 'left' }}>
          <div className="ticket-top">
            <span className="badge-ic"><Ico.Plane n={20} /></span>
            <div className="info"><div className="t">{state.details.airline} {state.details.flight}</div><div className="s">{state.direction === 'to' ? 'Departures · Terminal 1' : 'Arrivals · Terminal 1'}</div></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
            <div><div style={{ fontSize: 11, color: 'var(--navy-50)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Pickup</div><div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600 }}>{state.time}</div></div>
            <div style={{ textAlign: 'right' }}><div style={{ fontSize: 11, color: 'var(--navy-50)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Status</div><div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: 'var(--ocean)' }}>Synced ✓</div></div>
          </div>
        </div>
      )}
      {service.id === 'beach' && (
        <div className="ticket" style={{ textAlign: 'center', padding: '24px 20px' }}>
          <div className="unlock-label">Locker unlock code</div>
          <div className="unlock-code">{refCode.split('-')[1]?.slice(0, 4)}</div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed var(--navy-12)', display: 'flex', justifyContent: 'space-around', fontSize: 12 }}>
            <div><div style={{ color: 'var(--navy-50)' }}>Site</div><div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, marginTop: 2 }}>{locker?.name}</div></div>
            <div><div style={{ color: 'var(--navy-50)' }}>Until</div><div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, marginTop: 2 }}>{state.time} +{DURATIONS.find(d => d.id === state.duration)?.hours}h</div></div>
          </div>
        </div>
      )}
      <div className="review-section" style={{ width: '100%', textAlign: 'left' }}>
        <h4>Total paid</h4>
        <div className="review-row" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <span className="k">{bagCount} bag{bagCount !== 1 ? 's' : ''}</span>
          <span className="v" style={{ color: 'var(--ocean)', fontSize: 18 }}>R{fmtPrice(breakdown.total)}</span>
        </div>
      </div>
      <div className="success-actions">
        <a className="btn-wa" href="https://wa.me/27000000000" target="_blank" rel="noopener noreferrer">
          <Ico.WA /> {service.id === 'door' ? 'Chat to your driver' : 'Open in WhatsApp'}
        </a>
        {service.id !== 'door' && <button className="btn-wallet"><Ico.Wallet /> Add to Apple Wallet</button>}
        <button className="chip-btn" style={{ marginTop: 6, padding: '10px 18px' }} onClick={onRestart}>Book another</button>
      </div>
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
function AppHeader({ step, totalSteps, onBack, onClose }: { step: number; totalSteps: number; onBack: () => void; onClose: () => void }) {
  const pct = (step / (totalSteps - 1)) * 100
  return (
    <div className="bk-app-header">
      <div className="bk-header-row">
        <button className="bk-icon-btn" aria-label="Back" onClick={onBack} disabled={step === 0}><Ico.Back /></button>
        <div className="bk-step-counter">
          {step < totalSteps - 1 ? (<>Step <b>{step + 1}</b> of <b>{totalSteps - 1}</b></>) : (<span style={{ color: 'var(--ocean)', fontWeight: 700 }}>Confirmed</span>)}
        </div>
        <button className="bk-icon-btn" aria-label="Close" onClick={onClose}><Ico.Close /></button>
      </div>
      <div className="bk-progress-track"><div className="bk-progress-fill" style={{ width: pct + '%' }} /></div>
    </div>
  )
}

// ─── Footer Bar ───────────────────────────────────────────────────────────────
function FooterBar({ totalLabel, total, qtyLabel, ctaLabel, onClick, disabled, loading }: { totalLabel: string; total: number; qtyLabel: string; ctaLabel: string; onClick: () => void; disabled: boolean; loading: boolean }) {
  const [bump, setBump] = useState(0)
  const prev = useRef(total)
  useEffect(() => { if (prev.current !== total) { setBump(b => b + 1); prev.current = total } }, [total])
  return (
    <div className="bk-footer-bar">
      <div className="bk-price-summary">
        <div><div className="label">{totalLabel}</div><div className="qty">{qtyLabel}</div></div>
        <div className={'amount' + (bump ? ' bump' : '')} key={bump}><span className="currency">R</span>{fmtPrice(total)}</div>
      </div>
      <button className="btn-cta" onClick={onClick} disabled={disabled}>
        {loading ? <><span className="bk-loader" /> Processing…</> : <>{ctaLabel} <Ico.Arrow n={16} /></>}
      </button>
    </div>
  )
}

// ─── Main App (orchestrator) ──────────────────────────────────────────────────
function BookingApp() {
  const [step, setStep]             = useState(0)
  const [direction, setDirection]   = useState<'fwd' | 'back'>('fwd')
  const [loading, setLoading]       = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  const today    = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d }, [])
  const tomorrow = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + 1); return d }, [today])

  const [state, setState] = useState<BookingState>({
    service: 'door', pickup: 'The Oyster Box', dropoff: '', facility: 'beacon', locker: 'lighthouse',
    direction: 'to', date: tomorrow, time: '11:00', endDate: new Date(tomorrow.getTime() + 2 * 86400000), endTime: '11:00',
    duration: 'half', bags: { S: 1, M: 0, L: 0 }, hours: 2, extras: [],
    details: { name: '', phone: '', email: '', whatsapp: true, airline: '', flight: '' },
    recipient: { name: '', phone: '' }, insurance: false,
  })
  const set = (patch: Partial<BookingState>) => setState(s => ({ ...s, ...patch }))

  const [payMethod, setPayMethod]   = useState('card')
  const [promo, setPromo]           = useState('')
  const [promoApplied, setPromoApplied] = useState<{ code: string; type: string; value: number; label: string } | null>(null)

  const service    = SERVICES.find(s => s.id === state.service)!
  const stepKeys   = stepsFor(state.service)
  const currentKey = stepKeys[step]

  const breakdown = useMemo(() => {
    const lines: PriceLine[] = []
    let base = 0
    const bags     = state.bags || { S: 0, M: 0, L: 0 }
    const bagCount = totalBags(bags)

    if (service.id === 'storage') {
      const h = state.hours || 1
      SIZES.forEach(s => {
        const qty = bags[s.id] || 0
        if (qty > 0) {
          const rate = STORAGE_SIZE_RATE[s.id]
          const amt  = qty * rate * h
          lines.push({ label: `${s.label} · ${qty} bag${qty > 1 ? 's' : ''} × ${h}h · R${rate}/hr`, amount: amt })
          base += amt
        }
      })
    } else if (service.id === 'beach') {
      const h = DURATIONS.find(d => d.id === state.duration)?.hours ?? 1
      base = service.base * bagCount * h
      lines.push({ label: `Beach locker · ${bagCount} bag${bagCount > 1 ? 's' : ''} × ${h}h`, amount: base })
    } else if (service.id === 'airport') {
      base = service.base
      lines.push({ label: 'Airport transfer · base fare', amount: base })
      if (bagCount > 3) {
        const extra = (bagCount - 3) * 50
        lines.push({ label: `Extra bags × ${bagCount - 3}`, amount: extra })
        base += extra
      }
    } else {
      // door-to-door: R250 flat collection + per-size per-bag fee
      lines.push({ label: 'Collection & drop-off', amount: 250 })
      base += 250
      SIZES.forEach(s => {
        const qty = bags[s.id] || 0
        if (qty > 0) {
          const rate = STORAGE_SIZE_RATE[s.id]
          const amt  = qty * rate
          lines.push({ label: `${s.label} · ${qty} bag${qty > 1 ? 's' : ''} × R${rate}`, amount: amt })
          base += amt
        }
      })
    }

    // Oversized handling (airport & beach only — storage and door already price by size)
    if (service.id !== 'storage' && service.id !== 'door' && bags.L > 0) {
      const xl = 30 * bags.L
      lines.push({ label: `Oversized handling × ${bags.L}`, amount: xl })
    }
    state.extras.forEach(eid => { const it = SPECIAL_ITEMS.find(x => x.id === eid); if (it) lines.push({ label: it.label, amount: it.price }) })
    if (state.insurance) lines.push({ label: 'Premium insurance', amount: 49 * totalBags(bags) })
    const subtotal = lines.reduce((s, l) => s + l.amount, 0)
    let total = subtotal
    if (promoApplied) {
      const disc = promoApplied.type === 'pct' ? Math.round(subtotal * promoApplied.value / 100) : promoApplied.value
      lines.push({ label: `Promo ${promoApplied.code}`, amount: disc, discount: true })
      total -= disc
    }
    return { lines, total: Math.max(0, total) }
  }, [service, state, promoApplied])

  const canContinue = useMemo((): boolean => {
    switch (currentKey) {
      case 'service': return !!state.service
      case 'where': {
        if (service.id === 'storage') return !!state.facility
        if (service.id === 'beach')   return !!state.locker
        if (service.id === 'airport') return !!state.pickup && !!state.direction
        return !!state.pickup && !!state.dropoff
      }
      case 'when': {
        if (service.id === 'storage') return !!(state.date && state.time && state.hours)
        if (service.id === 'beach')   return !!(state.time && state.duration)
        return !!(state.date && state.time)
      }
      case 'bags': return totalBags(state.bags) > 0
      case 'details': {
        const d = state.details
        if (!d.name || !d.phone || !d.email) return false
        if (service.id === 'airport' && (!d.airline || !d.flight)) return false
        return true
      }
      case 'review': return !!payMethod
      default: return true
    }
  }, [currentKey, state, service, payMethod])

  const handleContinue = () => {
    if (currentKey === 'review') {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setBookingRef('AHB-' + Math.floor(Math.random() * 90000 + 10000))
        setDirection('fwd')
        setStep(stepKeys.length - 1)
      }, 1400)
      return
    }
    setDirection('fwd')
    setStep(s => Math.min(stepKeys.length - 1, s + 1))
  }
  const handleBack  = () => { setDirection('back'); setStep(s => Math.max(0, s - 1)) }
  const handleClose = () => { if (typeof window !== 'undefined' && window.confirm('Cancel this booking?')) { setDirection('back'); setStep(0) } }
  const applyPromo  = () => {
    const codes: Record<string, { code: string; type: string; value: number; label: string }> = {
      WELCOME10: { code: 'WELCOME10', type: 'pct',  value: 10, label: '10% off your first booking' },
      BEACH50:   { code: 'BEACH50',   type: 'flat', value: 50, label: 'R50 off' },
    }
    if (codes[promo]) { setPromoApplied(codes[promo]); setPromo('') }
    else if (promo)   { setPromoApplied({ code: promo, type: 'flat', value: 25, label: 'R25 promotional discount' }); setPromo('') }
  }
  const restart = () => { setStep(0); setBookingRef(''); setPromoApplied(null); setState(s => ({ ...s, extras: [], insurance: false, recipient: { name: '', phone: '' } })) }

  const cta = currentKey === 'review' ? `Pay R${fmtPrice(breakdown.total)}` : currentKey === 'done' ? 'Done' : 'Continue'
  const bagCount = totalBags(state.bags)
  const qtyLabel = (() => {
    if (currentKey === 'service') return service.unit
    const bagPart = `${bagCount} bag${bagCount !== 1 ? 's' : ''}`
    if (service.id === 'storage') return `${bagPart} · ${state.hours || 1}h${state.insurance ? ' · insured' : ''}`
    if (service.id === 'beach') {
      const h = DURATIONS.find(d => d.id === state.duration)?.hours || 1
      return `${bagPart} · ${h}h${state.insurance ? ' · insured' : ''}`
    }
    return `${bagPart}${state.insurance ? ' · insured' : ''}`
  })()

  const stepKey = currentKey + step + state.service

  return (
    <>
      {currentKey !== 'done' && <AppHeader step={step} totalSteps={stepKeys.length} onBack={handleBack} onClose={handleClose} />}
      <div className="bk-app-body">
        <div key={stepKey} className={direction === 'back' ? 'step-enter-back' : 'step-enter'}>
          {currentKey === 'service' && <StepService value={state.service} onChange={id => set({ service: id })} />}
          {currentKey === 'where'   && <StepWhere service={service} state={state} set={set} />}
          {currentKey === 'when'    && <StepWhen  service={service} state={state} set={set} />}
          {currentKey === 'bags'    && <StepBags  state={state} set={set} />}
          {currentKey === 'details' && <StepDetails service={service} state={state} set={set} />}
          {currentKey === 'review'  && (
            <StepReview service={service} state={state} breakdown={breakdown} payMethod={payMethod} setPayMethod={setPayMethod}
              promo={promo} setPromo={setPromo} promoApplied={promoApplied} applyPromo={applyPromo} set={set} />
          )}
          {currentKey === 'done' && (
            <StepDone service={service} state={state} breakdown={breakdown} refCode={bookingRef} onRestart={restart} />
          )}
        </div>
      </div>
      {currentKey !== 'done' && (
        <FooterBar totalLabel={step === 0 ? 'From' : 'Estimated total'} total={breakdown.total}
          qtyLabel={qtyLabel} ctaLabel={cta} onClick={handleContinue} disabled={!canContinue} loading={loading} />
      )}
    </>
  )
}

// ─── Star icons for testimonial ───────────────────────────────────────────────
const Star = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z"/></svg>

// ─── Full Page ────────────────────────────────────────────────────────────────
export default function BookingWizard() {
  return (
    <div className="bk-stage">
      {/* Left aside — desktop only */}
      <aside className="bk-stage-side left" aria-hidden="true">
        <div className="side-logo">
          <span className="logo-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4h6a1 1 0 0 1 1 1v3h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2V5a1 1 0 0 1 1-1z"/>
              <path d="M10 8V6h4v2"/>
            </svg>
          </span>
          <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Airhost<span style={{ color: 'var(--ocean)' }}>Bagdrop</span>
          </span>
        </div>
        <h2>Book a Bagdrop in <span className="accent">under a minute.</span></h2>
        <p>Same-day collection, secure storage, and door-to-door delivery across Umhlanga, Ballito and King Shaka International.</p>
        <ul className="bk-side-list">
          <li><span className="sli"><Ico.Check n={14} /></span><div><strong>Insured up to R10,000</strong>Every bag, every leg of the journey.</div></li>
          <li><span className="sli"><Ico.Check n={14} /></span><div><strong>Live WhatsApp tracking</strong>From pickup to drop-off, no guessing.</div></li>
          <li><span className="sli"><Ico.Check n={14} /></span><div><strong>2-hour service windows</strong>You stay in control of your day.</div></li>
        </ul>
      </aside>

      {/* Phone frame */}
      <div className="bk-phone">
        <div className="bk-status-bar">
          <span>9:41</span>
          <span className="right-icons">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect y="6" width="3" height="5" rx="0.5"/><rect x="4" y="4" width="3" height="7" rx="0.5"/><rect x="8" y="2" width="3" height="9" rx="0.5"/><rect x="12" width="3" height="11" rx="0.5"/></svg>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1.5 4.2a9 9 0 0113 0M3.5 6.2a6 6 0 019 0M5.5 8.2a3 3 0 015 0"/></svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="14" height="7" rx="1.2" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor"/></svg>
          </span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <BookingApp />
        </div>
      </div>

      {/* Right aside — desktop only */}
      <aside className="bk-stage-side right" aria-hidden="true">
        <div className="bk-testimonial-card">
          <span className="stars">{[1,2,3,4,5].map(i => <Star key={i} />)}</span>
          <p className="q">&ldquo;Booked in 45 seconds, paid via SnapScan, and our bags landed at King Shaka before we did. This is what travel should feel like.&rdquo;</p>
          <div className="who">
            <span className="av">JT</span>
            <div><div className="tname">James T.</div><div className="trole">Airbnb Superhost · Umhlanga</div></div>
          </div>
        </div>
        <div style={{ marginTop: 18, fontSize: 12, color: 'var(--navy-50)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <Ico.Lock n={14} />
          Secured by 256-bit SSL · POPIA compliant
        </div>
      </aside>
    </div>
  )
}
