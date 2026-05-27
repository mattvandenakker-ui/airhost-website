import { NextRequest, NextResponse } from 'next/server'

const KEY          = process.env.GOOGLE_PLACES_KEY!
const FREE_ZONE_KM = 5
const RATE_PER_KM  = 20

export async function GET(req: NextRequest) {
  const dest = req.nextUrl.searchParams.get('dest')
  if (!dest) return NextResponse.json({ error: 'missing dest' }, { status: 400 })

  const origin = '-29.7269,31.0824'
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(dest)}&mode=driving&key=${KEY}`

  const res  = await fetch(url)
  const data = await res.json()

  const el = data.rows?.[0]?.elements?.[0]
  if (data.status !== 'OK' || el?.status !== 'OK') {
    console.error('[Distance] API error:', data.status, el?.status)
    return NextResponse.json({ error: 'api_error', apiStatus: data.status, elStatus: el?.status }, { status: 400 })
  }

  const km  = Math.round((el.distance.value / 1000) * 10) / 10
  const fee = km <= FREE_ZONE_KM ? 0 : Math.round(km * RATE_PER_KM)

  return NextResponse.json({ km, fee })
}
