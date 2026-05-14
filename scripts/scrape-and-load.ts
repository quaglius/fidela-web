/**
 * Etapa 1 — Script único de scraping + carga en TN nueva + Supabase
 * Ejecutar: npx tsx scripts/scrape-and-load.ts
 */
import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'
import * as dotenv from 'dotenv'
import {
  scrapeProductList,
  scrapeProductDetail,
  scrapeCategories,
  scrapeAromas,
  scrapeHomepage,
  type ScrapedProduct,
  type ScrapedCategory,
  type ScrapedAroma,
} from '../lib/scraper'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const TN_STORE_ID = process.env.TN_STORE_ID!
const TN_ACCESS_TOKEN = process.env.TN_ACCESS_TOKEN!
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Use service role if available, otherwise anon (tables have no RLS yet)
const SUPABASE_KEY = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY

const tn = axios.create({
  baseURL: `https://api.tiendanube.com/2025-03/${TN_STORE_ID}`,
  headers: {
    Authentication: `bearer ${TN_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': 'FidelaWeb/1.0 (daniel.quagliano@gmail.com)',
  },
})

const supabase = axios.create({
  baseURL: SUPABASE_URL,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
})

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function toTNPrice(raw: string): string {
  // Convert scraped Argentine price string to a clean decimal string for TN
  const stripped = (raw || '0').replace(/[^\d,.]/g, '').trim()
  if (!stripped) return '1000.00'
  let normalized: string
  if (stripped.includes(',')) {
    normalized = stripped.replace(/\./g, '').replace(',', '.')
  } else {
    normalized = stripped.replace(/\./g, '')
  }
  const num = parseFloat(normalized)
  if (isNaN(num) || num <= 0) return '1000.00'
  return num.toFixed(2)
}

// TN rate limit: 2 req/sec
async function tnPost(path: string, data: object): Promise<{ data: { id: number } }> {
  await sleep(600)
  return tn.post(path, data)
}

// ─────────────────────────────────────────────────────────────────────────────
// PASO A — Scraping
// ─────────────────────────────────────────────────────────────────────────────

async function stepA() {
  console.log('\n📦 PASO A — Scraping fidela.com.ar...\n')

  console.log('  → Scraping homepage...')
  const homepage = await scrapeHomepage()

  console.log('  → Scraping categories...')
  const categories = await scrapeCategories()
  console.log(`     ${categories.length} categories found`)

  console.log('  → Scraping aromas...')
  const aromas = await scrapeAromas()
  console.log(`     ${aromas.length} aromas found`)

  console.log('  → Scraping product list...')
  const productList = await scrapeProductList()
  console.log(`     ${productList.length} products found`)

  console.log('  → Scraping product details (this takes a while)...')
  const products: ScrapedProduct[] = []
  for (let i = 0; i < productList.length; i++) {
    const p = productList[i]
    process.stdout.write(`     [${i + 1}/${productList.length}] ${p.url}`)
    try {
      const detail = await scrapeProductDetail(p.url)
      // Mark as featured if in Más Vendidos
      detail.isFeatured = p.category === 'Más Vendidos' || detail.isFeatured
      if (!detail.categories.length) detail.categories = [p.category]
      products.push(detail)
      console.log(` ✓ (${detail.variants.length} variants, ${detail.images.length} images)`)
    } catch (err) {
      console.log(` ✗ ${(err as Error).message}`)
      // Add minimal entry so we don't lose the product
      products.push({
        name: p.name || p.url.split('/').filter(Boolean).pop() || 'Producto',
        slug: p.url.split('/').filter(Boolean).pop() || '',
        url: p.url,
        description: '',
        categories: [p.category],
        variants: [{ attributes: {}, price: p.price, stock: 10, images: [] }],
        images: [],
        price: p.price,
        isFeatured: p.category === 'Más Vendidos',
      })
    }
  }

  // Deduplicate by slug
  const seen = new Set<string>()
  const uniqueProducts = products.filter((p) => {
    if (seen.has(p.slug)) return false
    seen.add(p.slug)
    return true
  })

  const scraped = { homepage, categories, aromas, products: uniqueProducts, scrapedAt: new Date().toISOString() }

  const dataDir = path.resolve(__dirname, '../data')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(path.join(dataDir, 'fidela-scraped.json'), JSON.stringify(scraped, null, 2))
  console.log(`\n✅ Saved to data/fidela-scraped.json (${uniqueProducts.length} products)\n`)

  return scraped
}

// ─────────────────────────────────────────────────────────────────────────────
// PASO B — Carga en Tiendanube NUEVA
// ─────────────────────────────────────────────────────────────────────────────

async function loadCategoriesToTN(categories: ScrapedCategory[]): Promise<Map<string, number>> {
  const slugToId = new Map<string, number>()

  console.log('  → Loading categories to TN...')

  // Load parent categories first
  const parents = categories.filter((c) => !c.parentSlug)
  for (const cat of parents) {
    try {
      const res = await tnPost('/categories', { name: { es: cat.name } })
      slugToId.set(cat.slug, res.data.id)
      console.log(`     ✓ ${cat.name} → ${res.data.id}`)
    } catch (err: unknown) {
      const e = err as { response?: { data?: unknown } }
      console.warn(`     ✗ ${cat.name}: ${JSON.stringify(e.response?.data || (err as Error).message)}`)
    }
  }

  // Load child categories
  const children = categories.filter((c) => c.parentSlug)
  for (const cat of children) {
    const parentId = cat.parentSlug ? slugToId.get(cat.parentSlug) : undefined
    try {
      const res = await tnPost('/categories', {
        name: { es: cat.name },
        ...(parentId ? { parent: parentId } : {}),
      })
      slugToId.set(cat.slug, res.data.id)
      console.log(`     ✓ ${cat.name} (child of ${cat.parentSlug}) → ${res.data.id}`)
    } catch (err: unknown) {
      const e = err as { response?: { data?: unknown } }
      console.warn(`     ✗ ${cat.name}: ${JSON.stringify(e.response?.data || (err as Error).message)}`)
    }
  }

  return slugToId
}

async function loadProductToTN(
  product: ScrapedProduct,
  categoryIds: number[]
): Promise<number | null> {
  // Build variant list for TN
  type TNVariant = {
    price: string
    stock_management: boolean
    stock: number
    values?: string[]
    image_url?: string
  }
  const tnVariants: TNVariant[] = product.variants.map((v) => {
    const entry: TNVariant = {
      price: toTNPrice(v.price || product.price),
      stock_management: true,
      stock: v.stock,
    }
    const attrValues = Object.values(v.attributes)
    if (attrValues.length > 0) entry.values = attrValues
    if (v.images[0]) entry.image_url = v.images[0]
    return entry
  })

  // Build attributes list
  const attrKeys = new Set<string>()
  product.variants.forEach((v) => Object.keys(v.attributes).forEach((k) => attrKeys.add(k)))
  const attributes = Array.from(attrKeys).map((k) => ({ es: k }))

  const body: Record<string, unknown> = {
    name: { es: product.name },
    description: { es: product.description || '' },
    published: true,
    categories: categoryIds,
    variants: tnVariants,
  }

  if (attributes.length > 0) body.attributes = attributes

  // Images: pass src URLs, TN will re-host them
  // Only include CDN product images (not theme/logo images)
  const productImgs = product.images.filter(
    (src) =>
      src &&
      src.startsWith('http') &&
      !src.includes('/themes/') &&
      !src.includes('/common/') &&
      !src.includes('logo-')
  )
  if (productImgs.length > 0) {
    body.images = productImgs.slice(0, 10).map((src) => ({ src }))
  }

  try {
    const res = await tnPost('/products', body)
    return res.data.id
  } catch (err: unknown) {
    const e = err as { response?: { data?: unknown } }
    console.error(`     ✗ TN POST failed for ${product.name}:`, JSON.stringify(e.response?.data || (err as Error).message))
    return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PASO C — Carga en Supabase
// ─────────────────────────────────────────────────────────────────────────────

async function upsertToSupabase(table: string, data: object | object[]) {
  const rows = Array.isArray(data) ? data : [data]
  const res = await supabase.post(`/rest/v1/${table}?on_conflict=slug,id,key`, rows, {
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
  })
  return res.data
}

async function loadAromasToSupabase(aromas: ScrapedAroma[]) {
  console.log('  → Loading aromas to Supabase...')
  for (const aroma of aromas) {
    try {
      await supabase.post(`/rest/v1/aromas`, [aroma], {
        headers: { Prefer: 'resolution=merge-duplicates' },
      })
      console.log(`     ✓ ${aroma.name}`)
    } catch (err: unknown) {
      const e = err as { response?: { data?: unknown } }
      console.warn(`     ✗ ${aroma.name}: ${JSON.stringify(e.response?.data || (err as Error).message)}`)
    }
  }
}

async function loadProductsToSupabase(
  products: ScrapedProduct[],
  tnIdMap: Map<string, number>
) {
  console.log('  → Loading products to Supabase...')
  for (const p of products) {
    const tnId = tnIdMap.get(p.slug)
    if (!tnId) {
      console.warn(`     ⚠ Skipping ${p.slug} (no TN ID)`)
      continue
    }
    try {
      await supabase.post(
        `/rest/v1/products`,
        [
          {
            id: tnId,
            slug: p.slug,
            name: p.name,
            description: p.description,
            categories: p.categories.map((c) => ({ name: c, slug: c.toLowerCase().replace(/\s+/g, '-') })),
            variants: p.variants,
            images: p.images.map((src) => ({ src, alt: p.name })),
            blends: [],
            published: true,
          },
        ],
        { headers: { Prefer: 'resolution=merge-duplicates' } }
      )
      console.log(`     ✓ ${p.name} (TN ${tnId})`)
    } catch (err: unknown) {
      const e = err as { response?: { data?: unknown } }
      console.warn(`     ✗ ${p.name}: ${JSON.stringify(e.response?.data || (err as Error).message)}`)
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌿 Fidela scrape-and-load — Etapa 1\n')

  if (!TN_STORE_ID || !TN_ACCESS_TOKEN) {
    console.error('❌ Missing TN_STORE_ID or TN_ACCESS_TOKEN in .env.local')
    process.exit(1)
  }

  // Check if we already have scraped data
  const scrapedPath = path.resolve(__dirname, '../data/fidela-scraped.json')
  let scraped: Awaited<ReturnType<typeof stepA>>

  if (fs.existsSync(scrapedPath)) {
    const answer = process.argv.includes('--rescrape') ? 'y' : 'n'
    if (answer === 'n') {
      console.log('📂 Found existing data/fidela-scraped.json — loading from cache.')
      console.log('   (Use --rescrape to force a fresh scrape)\n')
      scraped = JSON.parse(fs.readFileSync(scrapedPath, 'utf-8'))
    } else {
      scraped = await stepA()
    }
  } else {
    scraped = await stepA()
  }

  const { categories, aromas, products } = scraped

  console.log('\n🏪 PASO B — Carga en Tiendanube nueva...\n')
  const catIdMap = await loadCategoriesToTN(categories)

  const tnIdMap = new Map<string, number>()
  console.log(`\n  → Loading ${products.length} products to TN (may take 20-40 min)...`)

  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    process.stdout.write(`  [${i + 1}/${products.length}] ${p.name}...`)

    // Get category IDs for this product
    const catIds: number[] = []
    for (const catName of p.categories) {
      const slug = catName.toLowerCase().replace(/\s+/g, '-')
      const id = catIdMap.get(slug)
      if (id) catIds.push(id)
    }

    const tnId = await loadProductToTN(p, catIds)
    if (tnId) {
      tnIdMap.set(p.slug, tnId)
      console.log(` ✓ TN ID: ${tnId}`)
    } else {
      console.log(' ✗')
    }
  }

  console.log('\n🗄️  PASO C — Carga en Supabase...\n')
  await loadAromasToSupabase(aromas)
  await loadProductsToSupabase(products, tnIdMap)

  // Save TN ID mapping
  const mapping = Object.fromEntries(tnIdMap)
  fs.writeFileSync(
    path.resolve(__dirname, '../data/tn-id-map.json'),
    JSON.stringify(mapping, null, 2)
  )

  console.log('\n✅ Etapa 1 completa!')
  console.log(`   Products scraped: ${products.length}`)
  console.log(`   Products loaded to TN: ${tnIdMap.size}`)
  console.log(`   Aromas loaded to Supabase: ${aromas.length}`)
  console.log('\nNext: Etapa 2 — Sitio web público\n')
}

main().catch((err) => {
  console.error('\n❌ Fatal error:', err.message)
  process.exit(1)
})
