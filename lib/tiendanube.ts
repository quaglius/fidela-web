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

/** TiendaNube stores prices in centavos (×100). Divide before displaying. */
export function formatPrice(price: string | number): string {
  const raw = typeof price === 'number' ? price : parseFloat(price)
  if (isNaN(raw)) return String(price)
  const num = raw / 100
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(num)
}

export function getProductMainImage(product: TNProduct): string {
  return product.images?.[0]?.src ?? '/placeholder-product.jpg'
}
