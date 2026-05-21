import { NextRequest, NextResponse } from 'next/server'

const KEY = process.env.GOOGLE_PLACES_KEY!
// Centre of uMhlanga Rocks
const LOCATION = '-29.7269,31.0824'
const RADIUS = '40000'

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get('input') || ''
  if (!input.trim()) return NextResponse.json({ predictions: [] })

  const url = new URL('https://maps.googleapis.com/maps/api/place/autocomplete/json')
  url.searchParams.set('input', input)
  url.searchParams.set('components', 'country:za')
  url.searchParams.set('location', LOCATION)
  url.searchParams.set('radius', RADIUS)
  url.searchParams.set('language', 'en')
  url.searchParams.set('key', KEY)

  try {
    const res = await fetch(url.toString())
    const data = await res.json()
    return NextResponse.json({ predictions: data.predictions || [] })
  } catch {
    return NextResponse.json({ predictions: [] }, { status: 500 })
  }
}
