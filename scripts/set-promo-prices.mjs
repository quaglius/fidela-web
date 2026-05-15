/**
 * set-promo-prices.mjs
 * Sets promotional_price = price * 0.70 (30% OFF) on ALL published product variants.
 * Also updates the Supabase announcement bar to "30% OFF EN TODA LA TIENDA · HASTA AGOTAR STOCK".
 *
 * Usage: node scripts/set-promo-prices.mjs
 */

// Read from environment (set in .env.local or shell)
// Usage: node --env-file=.env.local scripts/set-promo-prices.mjs
//   OR:  TN_STORE_ID=... TN_ACCESS_TOKEN=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/set-promo-prices.mjs
const TN_STORE_ID   = process.env.TN_STORE_ID       ?? '7699826'
const TN_TOKEN      = process.env.TN_ACCESS_TOKEN
const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://lifvbsqsgwypycdtvlnx.supabase.co'
const SUPABASE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!TN_TOKEN) {
  console.error('❌  TN_ACCESS_TOKEN env var is required. Run with: node --env-file=.env.local scripts/set-promo-prices.mjs')
  process.exit(1)
}
if (!SUPABASE_KEY) {
  console.warn('⚠  SUPABASE_SERVICE_ROLE_KEY not set — skipping announcement bar update.')
}

const TN_BASE       = `https://api.tiendanube.com/2025-03/${TN_STORE_ID}`
const TN_HEADERS    = {
  Authentication:  `bearer ${TN_TOKEN}`,
  'Content-Type':  'application/json',
  'User-Agent':    'FidelaWeb/1.0 (daniel.quagliano@gmail.com)',
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function tnGet(path) {
  const res = await fetch(`${TN_BASE}${path}`, { headers: TN_HEADERS })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

async function tnPut(path, body) {
  const res = await fetch(`${TN_BASE}${path}`, {
    method:  'PUT',
    headers: TN_HEADERS,
    body:    JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`PUT ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

/** Fetch all published products (paginated) */
async function getAllProducts() {
  const all = []
  let page = 1
  while (true) {
    const batch = await tnGet(`/products?page=${page}&per_page=50&published=true`)
    if (!batch.length) break
    all.push(...batch)
    if (batch.length < 50) break
    page++
  }
  return all
}

/** Round price to nearest integer (TN stores as integer cents) */
function promoPrice(rawPrice) {
  const raw = parseFloat(rawPrice)
  return String(Math.round(raw * 0.70))
}

/** Sleep helper to respect rate limits */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ── Update Supabase announcement bar ─────────────────────────────────────────

async function updateAnnouncement() {
  const newText = '30% OFF EN TODA LA TIENDA · HASTA AGOTAR STOCK'
  if (!SUPABASE_KEY) { console.log('  (skipped — no SUPABASE_SERVICE_ROLE_KEY)'); return }
  // Try upsert via REST API
  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_config`, {
    method: 'POST',
    headers: {
      apikey:          SUPABASE_KEY,
      Authorization:   `Bearer ${SUPABASE_KEY}`,
      'Content-Type':  'application/json',
      Prefer:          'resolution=merge-duplicates',
    },
    body: JSON.stringify({ key: 'announcement_bar', value: newText }),
  })
  if (!res.ok) {
    const t = await res.text()
    console.warn(`⚠  Supabase update failed (${res.status}): ${t}`)
  } else {
    console.log(`✓  Announcement bar updated → "${newText}"`)
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log('  FIDELA — Set 30% Promotional Prices + Announcement')
  console.log('═══════════════════════════════════════════════════\n')

  // 1. Update announcement bar
  await updateAnnouncement()
  console.log()

  // 2. Fetch all products
  console.log('Fetching products from TiendaNube...')
  const products = await getAllProducts()
  console.log(`Found ${products.length} products.\n`)

  let updated = 0, skipped = 0, errors = 0

  for (const product of products) {
    const name = product.name?.es ?? `ID:${product.id}`

    for (const variant of (product.variants ?? [])) {
      const raw = parseFloat(variant.price)
      if (isNaN(raw) || raw === 0) { skipped++; continue }

      const newPromo = promoPrice(variant.price)
      const currentPromo = variant.promotional_price

      // Skip if already correct (within 1 unit rounding)
      if (currentPromo && Math.abs(parseFloat(currentPromo) - parseFloat(newPromo)) <= 1) {
        skipped++
        continue
      }

      const varLabel = variant.values?.map(v => v.es).join(' / ') || `v${variant.id}`

      try {
        await tnPut(`/products/${product.id}/variants/${variant.id}`, {
          promotional_price: newPromo,
        })
        console.log(`  ✓  ${name} [${varLabel}]  ${variant.price} → promo: ${newPromo}`)
        updated++
        // Rate limit: TN allows ~2 req/s on PUT
        await sleep(600)
      } catch (err) {
        console.error(`  ✗  ${name} [${varLabel}]: ${err.message}`)
        errors++
        await sleep(1200)
      }
    }
  }

  console.log(`\n═══════════════════════════════════════════════════`)
  console.log(`  Done. Updated: ${updated} | Skipped: ${skipped} | Errors: ${errors}`)
  console.log(`═══════════════════════════════════════════════════`)
}

main().catch(err => { console.error(err); process.exit(1) })
