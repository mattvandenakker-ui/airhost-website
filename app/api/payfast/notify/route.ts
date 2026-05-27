import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const MERCHANT_ID  = process.env.PAYFAST_MERCHANT_ID!
const PASSPHRASE   = process.env.PAYFAST_PASSPHRASE!
const resend       = new Resend(process.env.RESEND_API_KEY!)
const ALERT_EMAIL  = process.env.BOOKING_ALERT_EMAIL!

function verifySignature(data: Record<string, string>, passphrase: string, received: string): boolean {
  const str = Object.entries(data)
    .filter(([k]) => k !== 'signature')
    .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%20/g, '+')}`)
    .join('&') + `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`
  const expected = crypto.createHash('md5').update(str).digest('hex')
  return expected === received
}

const serviceLabel: Record<string, string> = {
  storage: 'Luggage Storage',
  door:    'Door-to-Door Delivery',
  airport: 'Airport Transfer',
}

export async function POST(req: NextRequest) {
  const body   = await req.text()
  const params = Object.fromEntries(new URLSearchParams(body))

  if (!verifySignature(params, PASSPHRASE, params.signature)) {
    console.error('[PayFast ITN] Invalid signature')
    return new NextResponse('Invalid signature', { status: 400 })
  }

  if (params.merchant_id !== MERCHANT_ID) {
    console.error('[PayFast ITN] Wrong merchant ID')
    return new NextResponse('Unauthorized', { status: 401 })
  }

  if (params.payment_status === 'COMPLETE') {
    const customerName  = `${params.name_first} ${params.name_last}`
    const customerEmail = params.email_address
    const service       = serviceLabel[params.custom_str2] || params.custom_str2
    const pickup        = params.custom_str3 || '—'
    const dropoff       = params.custom_str4 || '—'
    const date          = params.custom_str5 || '—'
    const amount        = `R${parseFloat(params.amount_gross).toFixed(2)}`
    const bookingId     = params.m_payment_id

    // Save to Supabase
    const { error } = await supabase.from('bookings').insert({
      booking_id:     bookingId,
      payfast_id:     params.pf_payment_id,
      amount:         parseFloat(params.amount_gross),
      customer_name:  customerName,
      customer_email: customerEmail,
      service:        params.custom_str2,
      pickup:         params.custom_str3 || null,
      dropoff:        params.custom_str4 || null,
      date:           date,
      status:         'confirmed',
    })
    if (error) console.error('[Supabase] Insert error:', error)

    // Alert email to owner
    await resend.emails.send({
      from:    'Airhost Bagdrop <onboarding@resend.dev>',
      to:      ALERT_EMAIL,
      subject: `New booking — ${service} — ${amount}`,
      html: `
        <h2>New booking received</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
          <tr><td style="padding:8px 16px 8px 0;color:#666">Booking ID</td><td><strong>${bookingId}</strong></td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Service</td><td>${service}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Amount</td><td>${amount}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Customer</td><td>${customerName}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Email</td><td>${customerEmail}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Pickup</td><td>${pickup}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Drop-off</td><td>${dropoff}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Date</td><td>${date}</td></tr>
        </table>
      `,
    })

    // Confirmation email to customer
    await resend.emails.send({
      from:    'Airhost Bagdrop <onboarding@resend.dev>',
      to:      customerEmail,
      subject: `Booking confirmed — ${bookingId}`,
      html: `
        <h2>Your booking is confirmed!</h2>
        <p>Hi ${params.name_first}, thanks for booking with Airhost Bagdrop.</p>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
          <tr><td style="padding:8px 16px 8px 0;color:#666">Booking ID</td><td><strong>${bookingId}</strong></td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Service</td><td>${service}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Amount paid</td><td>${amount}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Pickup</td><td>${pickup}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Drop-off</td><td>${dropoff}</td></tr>
          <tr><td style="padding:8px 16px 8px 0;color:#666">Date</td><td>${date}</td></tr>
        </table>
        <p style="margin-top:24px">We'll be in touch via WhatsApp to confirm your pickup time. If you have any questions reply to this email.</p>
        <p>— The Airhost Bagdrop Team</p>
      `,
    })

    console.log('[Resend] Emails sent for booking:', bookingId)
  }

  return new NextResponse('OK', { status: 200 })
}
