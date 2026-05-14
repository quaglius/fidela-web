import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const PIXEL_ID = process.env.META_PIXEL_ID!
const CAPI_TOKEN = process.env.META_CAPI_TOKEN!
const CAPI_URL = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`

function hash(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { event_name, event_data = {} } = body

    if (!event_name) {
      return NextResponse.json({ error: 'event_name required' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? req.headers.get('x-real-ip') ?? ''
    const userAgent = req.headers.get('user-agent') ?? ''
    const fbp = req.cookies.get('_fbp')?.value
    const fbc = req.cookies.get('_fbc')?.value

    const userData: Record<string, string> = {}
    if (ip) userData.client_ip_address = ip
    if (userAgent) userData.client_user_agent = userAgent
    if (fbp) userData.fbp = fbp
    if (fbc) userData.fbc = fbc
    if (event_data.email) userData.em = hash(event_data.email)
    if (event_data.phone) userData.ph = hash(event_data.phone)

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: event_data.url ?? '',
          action_source: 'website',
          user_data: userData,
          custom_data: event_data.custom ?? {},
        },
      ],
      test_event_code: process.env.META_TEST_EVENT_CODE,
    }

    const res = await fetch(`${CAPI_URL}?access_token=${CAPI_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await res.json()
    return NextResponse.json(result, { status: res.status })
  } catch (err) {
    console.error('[CAPI]', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
