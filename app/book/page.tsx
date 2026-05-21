import type { Metadata } from 'next'
import BookingWizard from './BookingWizard'

export const metadata: Metadata = {
  title: 'Book | Airhost Bagdrop',
  description: 'Book luggage storage or delivery with Airhost Bagdrop in Umhlanga, KZN.',
}

export default function BookPage() {
  return <BookingWizard />
}
