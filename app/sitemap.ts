import type { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/tiendanube'
import { supabase } from '@/lib/supabase'

const BASE = 'https://fidela-web.netlify.app'

const STATIC_ROUTES = [
  { url: '/', priority: 1.0, changeFrequency: 'daily' as const },
  { url: '/productos', priority: 0.9, changeFrequency: 'daily' as const },
  { url: '/aromas', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/nuestros-aromas', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/velas', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/jabones-naturales', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/aromatizantes', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/bienestar', priority: 0.7, changeFrequency: 'weekly' as const },
  { url: '/boxes', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/cuidado-corporal', priority: 0.7, changeFrequency: 'weekly' as const },
  { url: '/nosotros', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/tiendas', priority: 0.6, changeFrequency: 'monthly' as const },
  { url: '/empresas', priority: 0.7, changeFrequency: 'monthly' as const },
  { url: '/contacto', priority: 0.5, changeFrequency: 'monthly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  let productEntries: MetadataRoute.Sitemap = []
  try {
    const products = await getAllProducts()
    productEntries = products.map((p) => ({
      url: `${BASE}/productos/${p.handle?.es ?? String(p.id)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch { /* skip */ }

  let aromaEntries: MetadataRoute.Sitemap = []
  try {
    const { data } = await supabase.from('aromas').select('blend')
    aromaEntries = (data ?? []).map((a) => ({
      url: `${BASE}/aromas/${a.blend}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch { /* skip */ }

  return [...staticEntries, ...productEntries, ...aromaEntries]
}
