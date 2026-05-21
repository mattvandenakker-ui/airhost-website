# DESIGN.md — Airhost Bagdrop

> This file is the single source of truth for brand, design, and tone across the entire project.
> Reference it for every component, page, and style decision.

---

## Brand Identity

| Property | Value |
|---|---|
| **Brand Name** | Airhost Bagdrop |
| **Tagline** | Drop your bags. Explore freely. |
| **Location** | Umhlanga, KwaZulu-Natal, South Africa |
| **Service** | Luggage storage, door-to-door delivery, airport transfers |
| **Tone** | Friendly, confident, coastal, trustworthy |

---

## Colour Palette

```css
:root {
  /* Primary */
  --color-primary:        #1A56DB;  /* Bold ocean blue — CTAs, buttons, links */
  --color-primary-dark:   #1140A6;  /* Hover states, active */
  --color-primary-light:  #EBF2FF;  /* Tinted backgrounds, section fills */

  /* Neutrals */
  --color-white:          #FFFFFF;  /* Page background, cards */
  --color-off-white:      #F7F9FC;  /* Alternate section background */
  --color-border:         #D1DEEF;  /* Dividers, card borders */

  /* Text */
  --color-text-primary:   #0D1F3C;  /* Headings — deep navy, not black */
  --color-text-secondary: #4A6080;  /* Body copy, subheadings */
  --color-text-muted:     #8AA0BC;  /* Placeholders, captions */

  /* Accent */
  --color-accent:         #0EA5E9;  /* Sky blue — highlights, badges, icons */
  --color-accent-light:   #E0F4FE;  /* Accent tint backgrounds */

  /* Feedback */
  --color-success:        #16A34A;
  --color-error:          #DC2626;
}
```

### Usage Rules
- **White** is the dominant background. Never use grey backgrounds as primary fills.
- **Primary blue (#1A56DB)** is for all CTAs, buttons, and active nav items.
- **Deep navy (#0D1F3C)** is for all headings — gives weight without harsh black.
- **Sky accent (#0EA5E9)** is for icons, badge highlights, and decorative elements.
- **No gradients** except a subtle `primary → accent` on the hero overlay.
- **No dark mode** — this is a light, airy coastal brand.

---

## Typography

```css
/* Import in layout.tsx or globals.css */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --font-heading: 'Plus Jakarta Sans', sans-serif;  /* All headings */
  --font-body:    'DM Sans', sans-serif;             /* Body, UI, forms */
}
```

### Type Scale
| Element | Font | Weight | Size |
|---|---|---|---|
| H1 (Hero) | Plus Jakarta Sans | 800 | 56px / 3.5rem |
| H2 (Section) | Plus Jakarta Sans | 700 | 36px / 2.25rem |
| H3 (Card title) | Plus Jakarta Sans | 600 | 22px / 1.375rem |
| Body | DM Sans | 400 | 16px / 1rem |
| Small / Caption | DM Sans | 400 | 13px / 0.8125rem |
| Button | DM Sans | 500 | 15px / 0.9375rem |

---

## Spacing & Layout

- **Max content width**: 1200px (container class: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`)
- **Section vertical padding**: `py-20` (80px) desktop, `py-12` mobile
- **Card padding**: `p-6` (24px)
- **Border radius**: `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for buttons
- **Grid**: 3-column for service/feature cards, 2-column for pricing

---

## Components

### Buttons
```jsx
// Primary CTA
<button className="bg-[#1A56DB] hover:bg-[#1140A6] text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200">
  Book Now
</button>

// Secondary / Ghost
<button className="border border-[#1A56DB] text-[#1A56DB] hover:bg-[#EBF2FF] font-medium px-6 py-3 rounded-xl transition-colors duration-200">
  See Pricing
</button>
```

### Cards
```jsx
<div className="bg-white border border-[#D1DEEF] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
  {/* content */}
</div>
```

### Section Backgrounds (alternating)
- Odd sections: `bg-white`
- Even sections: `bg-[#F7F9FC]`
- Feature/CTA sections: `bg-[#EBF2FF]`

---

## Navigation

- Sticky top nav, white background with `shadow-sm` on scroll
- Logo: "Airhost" bold in `--color-primary`, "Bagdrop" light in `--color-text-secondary`
- Nav links: `--color-text-secondary`, active/hover: `--color-primary`
- CTA button: Primary blue "Book Now"
- Mobile: Hamburger menu, full-width slide-down drawer

---

## Pages & Structure

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | Hero, How It Works, Services, Pricing teaser, Testimonials, FAQ |
| Book | `/book` | Booking form with confirmation |
| Pricing | `/pricing` | Storage, delivery, airport rates |
| About | `/about` | Story, team, Umhlanga focus |
| Contact | `/contact` | Form, WhatsApp CTA, map |

---

## Services

1. **Luggage Storage** — Secure daily storage at our facility
2. **Door-to-Door Delivery** — We collect and deliver to your hotel, Airbnb, or address
3. **Airport Transfers** — King Shaka International Airport pickups & drop-offs
4. **Beach Day Storage** — Lockers / manned storage near Umhlanga beach

---

## Animations (Framer Motion)

- **Page load**: Staggered fade-up on hero elements (0ms, 150ms, 300ms delays)
- **Scroll reveal**: `whileInView={{ opacity: 1, y: 0 }}` with `initial={{ opacity: 0, y: 24 }}`
- **Hover on cards**: `whileHover={{ y: -4 }}` subtle lift
- **Transition duration**: 0.4s ease for all reveals
- No looping animations — keep it calm and professional

---

## Iconography

Use **Lucide React** icons throughout (`lucide-react` package).
Recommended icons:
- `Luggage` — storage
- `Truck` — delivery
- `Plane` — airport
- `Umbrella` — beach storage
- `Clock` — scheduling
- `Shield` — security/trust
- `MapPin` — location
- `Phone` / `MessageCircle` — contact / WhatsApp

---

## WhatsApp CTA

- Floating button: bottom-right, `bg-[#25D366]`, `rounded-full`, `shadow-lg`
- Link: `https://wa.me/27XXXXXXXXX` (replace with real number)
- Icon: WhatsApp SVG or emoji fallback
- Tooltip on hover: "Chat with us on WhatsApp"

---

## SEO & Meta

```jsx
// Default metadata (layout.tsx)
export const metadata = {
  title: 'Airhost Bagdrop | Luggage Storage & Delivery in Umhlanga',
  description: 'Secure luggage storage and door-to-door delivery in Umhlanga, KZN. Drop your bags and explore freely, hassle-free.',
  keywords: 'luggage storage Umhlanga, Airhost Bagdrop, bag drop KZN, luggage delivery Umhlanga, King Shaka airport luggage',
  openGraph: {
    title: 'Airhost Bagdrop | Luggage Storage & Delivery',
    description: 'Drop your bags. Explore freely.',
    url: 'https://www.airhostbagdrop.co.za',
    type: 'website',
  }
}
```

---

## What to Avoid

- ❌ Purple, green, or orange accents — keep it strictly blue + white
- ❌ Dark backgrounds or dark mode
- ❌ Inter or Roboto (use Plus Jakarta Sans + DM Sans only)
- ❌ Emoji as section dividers or decorative elements
- ❌ Gradients on body text or cards
- ❌ Generic stock photo vibes — use clean, travel-lifestyle imagery
- ❌ Cluttered layouts — generous whitespace is the rule
