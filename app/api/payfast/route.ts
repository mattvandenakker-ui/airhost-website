import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const MERCHANT_ID  = process.env.PAYFAST_MERCHANT_ID!
const MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY!
const PASSPHRASE   = process.env.PAYFAST_PASSPHRASE!
const SANDBOX      = process.env.PAYFAST_SANDBOX === 'true'
const BASE_URL     = process.env.NEXT_PUBLIC_BASE_URL!

function generateSignature(data: Record<string, string>, passphrase: string): string {
  const str = Object.entries(data)
    .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%20/g, '+')}`)
    .join('&') + `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`
  return crypto.createHash('md5').update(str).digest('hex')
}

export async function POST(req: NextRequest) {
  const booking = await req.json()

  const amount = Number(booking.total).toFixed(2)
  const itemName = `Airhost Bagdrop – ${booking.serviceLabel}`

  const data: Record<string, string> = {
    merchant_id:   MERCHANT_ID,
    merchant_key:  MERCHANT_KEY,
    return_url:    `${BASE_URL}/book/success`,
    cancel_url:    `${BASE_URL}/book`,
    notify_url:    `${BASE_URL}/api/payfast/notify`,
    name_first:    booking.firstName,
    name_last:     booking.lastName,
    email_address: booking.email,
    m_payment_id:  booking.bookingId,
    amount,
    item_name:     itemName,
    custom_str1:   booking.bookingId,
    custom_str2:   booking.service,
    custom_str3:   booking.pickup || '',
    custom_str4:   booking.dropoff || '',
    custom_str5:   booking.date ? booking.date.slice(0, 10) : '',
  }

  const signature = generateSignature(data, PASSPHRASE)
  const payfastUrl = SANDBOX
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process'

  return NextResponse.json({ url: payfastUrl, data: { ...data, signature } })
}
