import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Airhost Bagdrop',
  description: 'Get in touch with Airhost Bagdrop in Umhlanga, KZN.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-[2.25rem] font-bold text-[#0D1F3C]">Contact</h1>
        <p className="mt-4 text-[#4A6080] font-body">
          Contact details coming soon.
        </p>
      </div>
    </div>
  )
}
