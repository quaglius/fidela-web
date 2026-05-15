/**
 * fix-categories.mjs
 * Fixes TiendaNube categories:
 *  1. Assigns uncategorized products to correct canonical categories
 *  2. Reassigns products from duplicate category IDs to canonical ones
 *
 * Usage: node --env-file=.env.local scripts/fix-categories.mjs
 */

const TN_STORE_ID = process.env.TN_STORE_ID ?? '7699826'
const TN_TOKEN    = process.env.TN_ACCESS_TOKEN ?? '977859b787345518cf6f78bebfcf03c21a3e4f84'
const TN_BASE     = `https://api.tiendanube.com/2025-03/${TN_STORE_ID}`
const TN_HEADERS  = {
  Authentication: `bearer ${TN_TOKEN}`,
  'Content-Type': 'application/json',
  'User-Agent': 'FidelaWeb/1.0 (daniel.quagliano@gmail.com)',
}

// Canonical category IDs (lowest ID = original)
const CANONICAL = {
  'aromatizantes':    38792649,
  'velas-de-soja':    38792650,
  'jabones-naturales':38792651,
  'bienestar':        38792652,
  'cuidado-corporal': 38792653,
  'boxes-kits':       38792654,
}

// Map duplicate category IDs → canonical ID
const DUPE_TO_CANONICAL = {
  // Set "1"
  38792716: 38792649, // aromatizantes1 → aromatizantes
  38792717: 38792650, // velas-de-soja1 → velas-de-soja
  38792718: 38792651, // jabones-naturales1 → jabones-naturales
  38792719: 38792652, // bienestar1 → bienestar
  38792722: 38792653, // cuidado-corporal1 → cuidado-corporal
  38792723: 38792654, // boxes-kits1 → boxes-kits
  // Set "2"
  38792763: 38792649, // aromatizantes2 → aromatizantes
  38792764: 38792650, // velas-de-soja2 → velas-de-soja
  38792765: 38792651, // jabones-naturales2 → jabones-naturales
  38792766: 38792652, // bienestar2 → bienestar
  38792767: 38792653, // cuidado-corporal2 → cuidado-corporal
  38792768: 38792654, // boxes-kits2 → boxes-kits
}

// Name-based category inference for uncategorized products
function inferCategory(productName) {
  const n = productName?.toLowerCase() ?? ''
  if (n.includes('vela')) return CANONICAL['velas-de-soja']
  if (n.includes('box') || n.includes('kit')) return CANONICAL['boxes-kits']
  if (n.includes('jabón') || n.includes('jabon')) return CANONICAL['jabones-naturales']
  if (n.includes('difusor') || n.includes('home spray') || n.includes('refill') ||
      n.includes('aromatiz') || n.includes('hornito') || n.includes('perlitas') ||
      n.includes('aceite') || n.includes('telas')) return CANONICAL['aromatizantes']
  if (n.includes('crema') || n.includes('corporal')) return CANONICAL['cuidado-corporal']
  return null
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function tnGet(path) {
  const res = await fetch(`${TN_BASE}${path}`, { headers: TN_HEADERS })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

async function tnPut(path, body) {
  const res = await fetch(`${TN_BASE}${path}`, {
    method: 'PUT', headers: TN_HEADERS, body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`PUT ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

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

async function main() {
  console.log('═══════════════════════════════════════')
  console.log('  FIDELA — Fix TiendaNube Categories')
  console.log('═══════════════════════════════════════\n')

  const products = await getAllProducts()
  console.log(`Found ${products.length} products\n`)

  let updated = 0, skipped = 0

  for (const product of products) {
    const name = product.name?.es ?? `ID:${product.id}`
    const currentCatIds = (product.categories ?? []).map(c => c.id)

    // Determine new category IDs:
    //  - Replace duplicate IDs with canonical ones
    //  - For uncategorized products, infer from name
    let newCatIds

    if (currentCatIds.length === 0) {
      const inferred = inferCategory(name)
      if (!inferred) { console.log(`  ⚠  Skipping (can't infer): ${name}`); skipped++; continue }
      newCatIds = [inferred]
    } else {
      newCatIds = [...new Set(currentCatIds.map(id => DUPE_TO_CANONICAL[id] ?? id))]
    }

    // Check if anything changed
    const changed = JSON.stringify([...currentCatIds].sort()) !== JSON.stringify([...newCatIds].sort())
    if (!changed) { skipped++; continue }

    try {
      await tnPut(`/products/${product.id}`, {
        categories: newCatIds,
      })
      console.log(`  ✓  ${name}`)
      console.log(`     ${currentCatIds.length ? currentCatIds.join(',') : '(none)'} → ${newCatIds.join(',')}`)
      updated++
      await sleep(600)
    } catch (err) {
      console.error(`  ✗  ${name}: ${err.message}`)
      await sleep(1200)
    }
  }

  console.log(`\n═══════════════════════════════════════`)
  console.log(`  Done. Updated: ${updated} | Skipped: ${skipped}`)
  console.log(`═══════════════════════════════════════`)
}

main().catch(err => { console.error(err); process.exit(1) })
