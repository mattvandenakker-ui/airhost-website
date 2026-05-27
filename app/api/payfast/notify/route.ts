import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase } from '@/lib/supabase'

const MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID!
const PASSPHRASE  = process.env.PAYFAST_PASSPHRASE!

function verifySignature(data: Record<string, string>, passphrase: string, received: string): boolean {
  const str = Object.entries(data)
    .filter(([k]) => k !== 'signature')
    .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%20/g, '+')}`)
    .join('&') + `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`
  const expected = crypto.createHash('md5').update(str).digest('hex')
  return expected === received
}

export async function POST(req: NextRequest) {
  const body = await req.text()
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
    const { error } = await supabase.from('bookings').insert({
      booking_id:      params.m_payment_id,
      payfast_id:      params.pf_payment_id,
      amount:          parseFloat(params.amount_gross),
      customer_name:   `${params.name_first} ${params.name_last}`,
      customer_email:  params.email_address,
      service:         params.custom_str2,
      pickup:          params.custom_str3 || null,
      dropoff:         params.custom_str4 || null,
      date:            params.custom_str5 || null,
      status:          'confirmed',
    })

    if (error) console.error('[Supabase] Insert error:', error)
    else console.log('[Supabase] Booking saved:', params.m_payment_id)
  }

  return new NextResponse('OK', { status: 200 })
}
