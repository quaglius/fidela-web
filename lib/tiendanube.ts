const TN_BASE = `https://api.tiendanube.com/2025-03/${process.env.TN_STORE_ID}`
const TN_STORE_ID = process.env.TN_STORE_ID!

const headers = {
  Authentication: `bearer ${process.env.TN_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
  'User-Agent': 'FidelaWeb/1.0 (daniel.quagliano@gmail.com)',
}

export interface TNVariant {
  id: number
  price: string
  promotional_price: string | null
  stock_management: boolean
  stock: number
  values: Array<{ es: string }>
  image_id: number | null
}

export interface TNImage {
  id: number
  src: string
  position: number
}

export interface TNProduct {
  id: number
  name: { es: string }
  description: { es: string }
  handle: { es: string }
  published: boolean
  categories: Array<{ id: number; name: { es: string } }>
  variants: TNVariant[]
  images: TNImage[]
  attributes: Array<{ es: string }>
  tags: string
}

export interface TNCategory {
  id: number
  name: { es: string }
  handle: { es: string }
  parent: number | null
  subcategories: TNCategory[]
}

async function tnFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${TN_BASE}${path}`, {
    ...options,
    headers: { ...headers, ...(options?.headers as Record<string, string>) },
    next: { revalidate: 300 }, // ISR 5 min
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`TN ${path} → ${res.status}: ${text}`)
  }
  return res.json()
}

export async function getProducts(page = 1, perPage = 50): Promise<TNProduct[]> {
  return tnFetch<TNProduct[]>(`/products?page=${page}&per_page=${perPage}&published=true`)
}

export async function getAllProducts(): Promise<TNProduct[]> {
  const all: TNProduct[] = []
  let page = 1
  while (true) {
    const batch = await getProducts(page, 50)
    if (!batch.length) break
    all.push(...batch)
    if (batch.length < 50) break
    page++
  }
  return all
}

export async function getProduct(id: number): Promise<TNProduct> {
  return tnFetch<TNProduct>(`/products/${id}`)
}

export async function getProductByHandle(handle: string): Promise<TNProduct | null> {
  // Fast path: use local ID map for direct lookup
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const idMap = require('../data/tn-id-map.json') as Record<string, number>
    const id = idMap[handle]
    if (id) return await getProduct(id)
  } catch { /* fallback to search */ }

  // Fallback: text search (less reliable)
  try {
    const products = await tnFetch<TNProduct[]>(`/products?q=${encodeURIComponent(handle)}&published=true&per_page=10`)
    return products.find((p) => p.handle?.es === handle) ?? null
  } catch {
    return null
  }
}

export async function getCategories(): Promise<TNCategory[]> {
  return tnFetch<TNCategory[]>('/categories')
}

export async function getProductsByCategory(categoryId: number): Promise<TNProduct[]> {
  return tnFetch<TNProduct[]>(`/products?category_id=${categoryId}&published=true&per_page=50`)
}

export function getCheckoutUrl(items: Array<{ variantId: number; quantity: number }>): string {
  const params = items
    .map((item, i) => `items[${i}][variant_id]=${item.variantId}&items[${i}][quantity]=${item.quantity}`)
    .join('&')
  return `https://${TN_STORE_ID}.mitiendanube.com/checkout/v3/start?${params}`
}

/**
 * TN price normalizer — auto-detects correct divisor so all prices render
 * as 5-digit ARS amounts (10.000 – 99.999):
 *   raw >= 1.000.000  →  ÷ 100   (e.g. 3.500.000 → $35.000)
 *   raw <  1.000.000  →  ÷ 10    (e.g.   900.000 → $90.000)
 */
export function formatPrice(price: string | number): string {
  const raw = typeof price === 'number' ? price : parseFloat(price)
  if (isNaN(raw)) return String(price)
  const divisor = raw >= 1_000_000 ? 100 : 10
  const num = raw / divisor
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(num)
}

export function getProductMainImage(product: TNProduct): string {
  return product.images?.[0]?.src ?? '/placeholder-product.jpg'
}

// ── Fragrance variant utilities ───────────────────────────────────────────────

const FRAGRANCE_KNOWN_COLORS: Record<string, string> = {
  'velvet':           '#7E2738',
  'linaje':           '#CB6F36',
  'roble':            '#496130',
  'brisa':            '#77C1EC',
  'floral velvet':    '#C4879C',
  'menta negra':      '#2E6B56',
  'french lavender':  '#7B6BA8',
  'vainilla ambar':   '#C49A44',
  'vainilla ámbar':   '#C49A44',
  'té negro':         '#8B5E3C',
  'te negro':         '#8B5E3C',
  'ámbar oud':        '#9B4E1A',
  'ambar oud':        '#9B4E1A',
  'cedro marino':     '#4A7B8C',
  'bosque y papiro':  '#5B6B3A',
}

const FRAGRANCE_PALETTE = [
  '#7E2738', '#CB6F36', '#496130', '#77C1EC',
  '#7B6BA8', '#2E6B56', '#C4879C', '#8B5E3C',
  '#9B4E1A', '#4A7B8C', '#5B6B3A', '#C49A44',
]

export function getVariantColor(name: string): string {
  const lower = name.toLowerCase().trim()
  // Exact match
  if (FRAGRANCE_KNOWN_COLORS[lower]) return FRAGRANCE_KNOWN_COLORS[lower]
  // Substring match (e.g. "Blend 5 Floral Velvet" → "floral velvet")
  for (const [key, color] of Object.entries(FRAGRANCE_KNOWN_COLORS)) {
    if (lower.includes(key)) return color
  }
  // Fallback: hash name to palette for a consistent earthy color
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
  }
  return FRAGRANCE_PALETTE[Math.abs(hash) % FRAGRANCE_PALETTE.length]
}

export function getVariantImage(product: TNProduct, variant: TNVariant): string {
  if (variant.image_id) {
    const img = product.images.find((i) => i.id === variant.image_id)
    if (img) return img.src
  }
  return product.images?.[0]?.src ?? '/placeholder-product.jpg'
}

export interface FlatCard {
  product: TNProduct
  variant: TNVariant
  fragranceName: string
  fragranceColor: string | undefined
}

export function explodeByFragrance(products: TNProduct[]): FlatCard[] {
  const result: FlatCard[] = []
  for (const product of products) {
    if (product.variants.length > 1) {
      for (const variant of product.variants) {
        const fragranceName = variant.values.map((v) => v.es).filter(Boolean).join(' / ')
        result.push({
          product,
          variant,
          fragranceName,
          fragranceColor: getVariantColor(fragranceName),
        })
      }
    } else {
      const variant = product.variants[0]
      if (variant) {
        result.push({ product, variant, fragranceName: '', fragranceColor: undefined })
      }
    }
  }
  return result
}
