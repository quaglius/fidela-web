import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Browser / server-component client (anon key)
export const supabase = createClient(url, anonKey)

// Server-only admin client (service role) — never import in client components
export function supabaseAdmin() {
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}
