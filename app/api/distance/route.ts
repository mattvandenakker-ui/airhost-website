import { NextRequest, NextResponse } from 'next/server'

const KEY          = process.env.GOOGLE_PLACES_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY!
const FREE_ZONE_KM = 5
const RATE_PER_KM  = 20

export async function GET(req: NextRequest) {
  const dest = req.nextUrl.searchParams.get('dest')
  if (!dest) return NextResponse.json({ error: 'missing dest' }, { status: 400 })

  if (!KEY) {
    console.error('[Distance] No API key configured')
    return NextResponse.json({ error: 'no_key' }, { status: 500 })
  }

  const origin = '-29.7269,31.0824'
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(dest)}&mode=driving&key=${KEY}`

  const res  = await fetch(url)
  const data = await res.json()

  console.log('[Distance] API response status:', data.status, '| element status:', data.rows?.[0]?.elements?.[0]?.status)

  const el = data.rows?.[0]?.elements?.[0]
  if (data.status !== 'OK' || el?.status !== 'OK') {
    console.error('[Distance] API error:', JSON.stringify(data))
    return NextResponse.json(
      { error: 'api_error', apiStatus: data.status, elStatus: el?.status, errorMessage: data.error_message },
      { status: 400 }
    )
  }

  const km  = Math.round((el.distance.value / 1000) * 10) / 10
  const fee = km <= FREE_ZONE_KM ? 0 : Math.round(km * RATE_PER_KM)

  return NextResponse.json({ km, fee })
}
