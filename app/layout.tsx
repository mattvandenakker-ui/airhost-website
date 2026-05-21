import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Airhost Bagdrop | Luggage Storage & Delivery in Umhlanga',
  description:
    'Secure luggage storage and door-to-door delivery in Umhlanga, KZN. Drop your bags and explore freely, hassle-free.',
  keywords:
    'luggage storage Umhlanga, Airhost Bagdrop, bag drop KZN, luggage delivery Umhlanga, King Shaka airport luggage',
  openGraph: {
    title: 'Airhost Bagdrop | Luggage Storage & Delivery',
    description: 'Drop your bags. Explore freely.',
    url: 'https://www.airhostbagdrop.co.za',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
