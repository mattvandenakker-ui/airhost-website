import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

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

  // Verify it came from PayFast
  if (!verifySignature(params, PASSPHRASE, params.signature)) {
    console.error('[PayFast ITN] Invalid signature')
    return new NextResponse('Invalid signature', { status: 400 })
  }

  // Verify merchant ID
  if (params.merchant_id !== MERCHANT_ID) {
    console.error('[PayFast ITN] Wrong merchant ID')
    return new NextResponse('Unauthorized', { status: 401 })
  }

  if (params.payment_status === 'COMPLETE') {
    console.log('[PayFast ITN] Payment complete:', {
      paymentId: params.pf_payment_id,
      amount:    params.amount_gross,
      bookingId: params.m_payment_id,
      customer:  `${params.name_first} ${params.name_last}`,
      email:     params.email_address,
      service:   params.custom_str2,
      pickup:    params.custom_str3,
      dropoff:   params.custom_str4,
      date:      params.custom_str5,
    })
    // TODO: save to Supabase + send confirmation email
  }

  return new NextResponse('OK', { status: 200 })
}
