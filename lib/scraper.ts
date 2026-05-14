import axios from 'axios'
import * as cheerio from 'cheerio'

const BASE_URL = 'https://www.fidela.com.ar'
const DELAY_MS = 1000

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'es-AR,es;q=0.9',
  },
  timeout: 15000,
})

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchHtml(path: string): Promise<cheerio.CheerioAPI> {
  await sleep(DELAY_MS)
  const { data } = await http.get(path)
  return cheerio.load(data)
}

export interface ScrapedVariant {
  attributes: Record<string, string>
  price: string
  stock: number
  images: string[]
}

export interface ScrapedProduct {
  name: string
  slug: string
  url: string
  description: string
  categories: string[]
  variants: ScrapedVariant[]
  images: string[]
  price: string
  isFeatured: boolean
}

export interface ScrapedCategory {
  name: string
  slug: string
  url: string
  parentSlug?: string
}

export interface ScrapedAroma {
  slug: string
  number: number
  name: string
  family: string
  tagline: string
  description: string
  notes_top: string
  notes_heart: string
  notes_base: string
  properties: string[]
  environments: string[]
  color_hex: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function extractSlug(url: string): string {
  return url.replace(/^\/+|\/+$/g, '').split('/').pop() || ''
}

function normalizePrice(raw: string): string {
  // Argentine format: $35.000,00 → 35000.00  |  $35.000 → 35000
  const stripped = raw.replace(/[^\d,.]/g, '').trim()
  if (!stripped) return '0'
  if (stripped.includes(',')) {
    // comma is decimal separator: remove dots, replace comma with dot
    return stripped.replace(/\./g, '').replace(',', '.')
  }
  // No comma: dots are thousands separators only, remove them
  return stripped.replace(/\./g, '')
}

function absoluteImg(src: string): string {
  if (!src) return ''
  if (src.startsWith('http')) return src
  if (src.startsWith('//')) return `https:${src}`
  return `${BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`
}

function isProductImage(url: string): boolean {
  if (!url) return false
  // Reject theme images (logos, icons, etc.)
  if (url.includes('/themes/') || url.includes('/theme/')) return false
  if (url.includes('/common/')) return false
  if (url.includes('logo-')) return false
  // Accept CDN product images
  return url.includes('mitiendanube.com') || url.includes('acdn') || url.includes('.jpg') || url.includes('.webp') || url.includes('.png')
}

function productImages($: cheerio.CheerioAPI): string[] {
  const imgs: string[] = []
  const addImg = (src: string) => {
    if (!src) return
    const url = absoluteImg(src)
    if (url && isProductImage(url) && !imgs.includes(url)) imgs.push(url)
  }

  $('img[data-image], .product-gallery img, .product-photo img, img.product-image').each((_, el) => {
    addImg($(el).attr('data-zoom-image') || $(el).attr('data-original') || $(el).attr('data-src') || $(el).attr('src') || '')
  })

  // Fallback: any CDN image that looks like a product photo
  if (imgs.length === 0) {
    $('img').each((_, el) => {
      const src =
        $(el).attr('data-zoom-image') ||
        $(el).attr('data-original') ||
        $(el).attr('data-src') ||
        $(el).attr('src') ||
        ''
      addImg(src)
    })
  }
  return imgs
}

// ─────────────────────────────────────────────────────────────────────────────
// scrapeProductList — recorre /productos/ y categorías conocidas
// ─────────────────────────────────────────────────────────────────────────────

export async function scrapeProductList(): Promise<
  Array<{ name: string; url: string; price: string; category: string }>
> {
  const categoryPaths = [
    { path: '/aromatizantes/', category: 'Aromatizantes' },
    { path: '/velas/', category: 'Velas de Soja' },
    { path: '/velas/vidrio/', category: 'Clásicas' },
    { path: '/velas/vidrio-xl/', category: 'XL' },
    { path: '/velas/aluminio/', category: 'Ediciones Especiales' },
    { path: '/jabones-naturales/', category: 'Jabones Naturales' },
    { path: '/bienestar/', category: 'Bienestar' },
    { path: '/cuidado-corporal/', category: 'Cuidado Corporal' },
    { path: '/boxes/', category: 'Boxes - Kits' },
    { path: '/mas-vendidos/', category: 'Más Vendidos' },
  ]

  // Known product URLs from the plan (ensures we don't miss any)
  const knownUrls = [
    { url: '/productos/home-spray/', category: 'Aromatizantes' },
    { url: '/productos/difusor/', category: 'Aromatizantes' },
    { url: '/productos/refill-difusor-500cc/', category: 'Aromatizantes' },
    { url: '/productos/vela-de-soja-sofi-edicion-limitada/', category: 'Ediciones Especiales' },
    { url: '/productos/vela-de-soja-luz/', category: 'Clásicas' },
    { url: '/productos/luxury-black/', category: 'Clásicas' },
    { url: '/productos/vela-de-soja-lupe/', category: 'Clásicas' },
    { url: '/productos/jabon-handmade-glicerina/', category: 'Jabones Naturales' },
    { url: '/productos/jabon-handmade/', category: 'Jabones Naturales' },
    { url: '/productos/jabon-handmade-cuadrado-s/', category: 'Jabones Naturales' },
    { url: '/productos/jabon-liquido/', category: 'Jabones Naturales' },
    { url: '/productos/jabon-handmade-flor/', category: 'Jabones Naturales' },
    { url: '/productos/box-jabones-rosas/', category: 'Boxes - Kits' },
    { url: '/productos/jabon-handmade-carbon-activado/', category: 'Jabones Naturales' },
    { url: '/productos/aceites-aromatizantes/', category: 'Bienestar' },
    { url: '/productos/hornito-aromatizante/', category: 'Bienestar' },
    { url: '/productos/crema-de-cuerpo-y-manos/', category: 'Cuidado Corporal' },
    { url: '/productos/crema-jabon-liquido/', category: 'Boxes - Kits' },
  ]

  const seen = new Set<string>()
  const results: Array<{ name: string; url: string; price: string; category: string }> = []

  // Add known URLs first
  for (const k of knownUrls) {
    if (!seen.has(k.url)) {
      seen.add(k.url)
      results.push({ name: extractSlug(k.url), url: k.url, price: '0', category: k.category })
    }
  }

  // Discover additional products from category pages
  for (const { path, category } of categoryPaths) {
    try {
      const $ = await fetchHtml(path)
      $('a[href*="/productos/"]').each((_, el) => {
        const href = $(el).attr('href') || ''
        const url = href.startsWith('http') ? new URL(href).pathname : href
        if (url && url.startsWith('/productos/') && !seen.has(url)) {
          const name =
            $(el).find('h3, .product-name, .item-name').text().trim() ||
            $(el).attr('title') ||
            extractSlug(url)
          const priceEl = $(el).closest('.item, .product').find('.price, .item-price').first()
          const price = normalizePrice(priceEl.text())
          seen.add(url)
          results.push({ name, url, price, category })
        }
      })
    } catch (err) {
      console.warn(`[scraper] Could not fetch ${path}:`, (err as Error).message)
    }
  }

  return results
}

// ─────────────────────────────────────────────────────────────────────────────
// scrapeProductDetail — visita la PDP de cada producto
// ─────────────────────────────────────────────────────────────────────────────

export async function scrapeProductDetail(url: string): Promise<ScrapedProduct> {
  const $ = await fetchHtml(url)

  const name =
    $('h1.product-name, h1[itemprop="name"], h1').first().text().trim() || extractSlug(url)

  const slug = extractSlug(url)

  // Description
  const description = $('[itemprop="description"], .product-description, #description')
    .first()
    .text()
    .trim()

  // Main price
  const rawPrice = $('[itemprop="price"], .product-price .price, .js-price-display')
    .first()
    .text()
    .trim()
  const price = normalizePrice(rawPrice)

  // Images
  const images = productImages($)

  // Categories from breadcrumb
  const categories: string[] = []
  $('nav.breadcrumb a, ol.breadcrumb a, .breadcrumb-item a').each((_, el) => {
    const txt = $(el).text().trim()
    if (txt && txt.toLowerCase() !== 'inicio' && txt.toLowerCase() !== 'home') {
      categories.push(txt)
    }
  })

  // Variants — TN renders variant selectors as <select> or <ul> with data attrs
  const variants: ScrapedVariant[] = []

  // Strategy 1: data-variants JSON embedded in page (TN standard)
  const scriptTags = $('script:not([src])').toArray()
  for (const script of scriptTags) {
    const content = $(script).html() || ''
    // TN often has window.LS = { ... variants: [...] }
    const variantMatch =
      content.match(/"variants"\s*:\s*(\[[\s\S]*?\])\s*[,}]/) ||
      content.match(/variants\s*=\s*(\[[\s\S]*?\])/)
    if (variantMatch) {
      try {
        const raw = JSON.parse(variantMatch[1])
        for (const v of raw) {
          const attrs: Record<string, string> = {}
          if (v.values && Array.isArray(v.values)) {
            v.values.forEach((val: { name: string; value: string }) => {
              if (val.name && val.value) attrs[val.name] = val.value
            })
          }
          variants.push({
            attributes: attrs,
            price: v.price ? String(v.price) : price,
            stock: v.stock ?? 10,
            images: v.image ? [absoluteImg(v.image)] : images.slice(0, 1),
          })
        }
        if (variants.length > 0) break
      } catch {
        // keep trying
      }
    }
  }

  // Strategy 2: parse <select> / <ul> option elements
  if (variants.length === 0) {
    const attrGroups: Record<string, string[]> = {}

    $('select[name*="variant"], .js-product-variants select').each((_, sel) => {
      const label =
        $(sel).closest('.product-option, .variant-picker').find('label').first().text().trim() ||
        $(sel).attr('name') ||
        'variant'
      const values: string[] = []
      $(sel)
        .find('option')
        .each((__, opt) => {
          const val = $(opt).text().trim()
          if (val && val.toLowerCase() !== 'elegir') values.push(val)
        })
      if (values.length) attrGroups[label] = values
    })

    // If no <select>, try <ul class="variant-list"> or similar
    if (Object.keys(attrGroups).length === 0) {
      $('[data-attribute], [data-option]').each((_, el) => {
        const label = $(el).attr('data-attribute') || $(el).attr('data-option') || 'variant'
        const val = $(el).text().trim()
        if (val) {
          if (!attrGroups[label]) attrGroups[label] = []
          if (!attrGroups[label].includes(val)) attrGroups[label].push(val)
        }
      })
    }

    if (Object.keys(attrGroups).length > 0) {
      // Create a variant for each combination (simplified: just list each value)
      const keys = Object.keys(attrGroups)
      const firstKey = keys[0]
      for (const val of attrGroups[firstKey]) {
        const attrs: Record<string, string> = { [firstKey]: val }
        // Add remaining attribute groups if only 1 value each
        for (let i = 1; i < keys.length; i++) {
          if (attrGroups[keys[i]].length === 1) attrs[keys[i]] = attrGroups[keys[i]][0]
        }
        variants.push({ attributes: attrs, price, stock: 10, images: images.slice(0, 1) })
      }
    }
  }

  // Fallback: single no-variant product
  if (variants.length === 0) {
    variants.push({ attributes: {}, price, stock: 10, images })
  }

  const isFeatured = url.includes('mas-vendidos')

  return { name, slug, url, description, categories, variants, images, price, isFeatured }
}

// ─────────────────────────────────────────────────────────────────────────────
// scrapeCategories
// ─────────────────────────────────────────────────────────────────────────────

export async function scrapeCategories(): Promise<ScrapedCategory[]> {
  const $ = await fetchHtml('/')

  const cats: ScrapedCategory[] = []
  const seen = new Set<string>()

  // TN nav usually has links with category paths
  $('nav a[href], header a[href]').each((_, el) => {
    const href = $(el).attr('href') || ''
    const url = href.startsWith('http') ? new URL(href).pathname : href
    // Category URLs: not /productos/, not / itself
    if (
      url &&
      url !== '/' &&
      !url.includes('/productos/') &&
      !url.includes('/checkout') &&
      !url.includes('/cuenta') &&
      !seen.has(url)
    ) {
      const name = $(el).text().trim()
      if (name && name.length < 60) {
        seen.add(url)
        const slug = extractSlug(url)
        cats.push({ name, slug, url })
      }
    }
  })

  // Ensure our known categories are present
  const knownCats: ScrapedCategory[] = [
    { name: 'Aromatizantes', slug: 'aromatizantes', url: '/aromatizantes/' },
    { name: 'Velas de Soja', slug: 'velas', url: '/velas/' },
    { name: 'Clásicas', slug: 'vidrio', url: '/velas/vidrio/', parentSlug: 'velas' },
    { name: 'XL', slug: 'vidrio-xl', url: '/velas/vidrio-xl/', parentSlug: 'velas' },
    {
      name: 'Ediciones Especiales',
      slug: 'aluminio',
      url: '/velas/aluminio/',
      parentSlug: 'velas',
    },
    { name: 'Jabones Naturales', slug: 'jabones-naturales', url: '/jabones-naturales/' },
    { name: 'Bienestar', slug: 'bienestar', url: '/bienestar/' },
    { name: 'Cuidado Corporal', slug: 'cuidado-corporal', url: '/cuidado-corporal/' },
    { name: 'Boxes - Kits', slug: 'boxes', url: '/boxes/' },
  ]

  for (const kc of knownCats) {
    if (!seen.has(kc.url)) {
      seen.add(kc.url)
      cats.push(kc)
    }
  }

  return cats
}

// ─────────────────────────────────────────────────────────────────────────────
// scrapeAromas — /nuestros-aromas/
// ─────────────────────────────────────────────────────────────────────────────

const AROMA_META: Record<
  string,
  { number: number; family: string; color_hex: string }
> = {
  verbena: { number: 2, family: 'Fresco', color_hex: '#A8C5A0' },
  'floral-velvet': { number: 5, family: 'Floral', color_hex: '#D4A5C9' },
  'oud-imperial': { number: 17, family: 'Terra', color_hex: '#8B6914' },
  'french-lavander': { number: 19, family: 'Floral', color_hex: '#9B8EC4' },
  'jengibre-te-blanco': { number: 21, family: 'Especiado', color_hex: '#C4A882' },
  'cardamom-woods': { number: 27, family: 'Terra', color_hex: '#7D6B4F' },
  'sandalo-pimenta-rosa': { number: 44, family: 'Terra', color_hex: '#C4907A' },
  'green-amber': { number: 46, family: 'Fresco', color_hex: '#8BAF8B' },
}

export async function scrapeAromas(): Promise<ScrapedAroma[]> {
  const aromas: ScrapedAroma[] = []

  // Scrape the main aromas page
  try {
    const $ = await fetchHtml('/nuestros-aromas/')

    // TN pages often render each aroma as a section or article
    const aromaEls = $('[data-aroma], section.aroma, article.aroma, .aroma-block').toArray()

    if (aromaEls.length === 0) {
      // Fallback: look for headings that match aroma names
      $('h2, h3, h4').each((_, el) => {
        const text = $(el).text().trim().toUpperCase()
        for (const slug of Object.keys(AROMA_META)) {
          const name = slug.replace(/-/g, ' ').toUpperCase()
          if (text.includes(name) || text.includes(name.replace(' ', '&'))) {
            // get surrounding block
            const block = $(el).parent()
            const description = block.find('p').text().trim()
            const { number, family, color_hex } = AROMA_META[slug]
            aromas.push({
              slug,
              number,
              name: text,
              family,
              tagline: '',
              description,
              notes_top: '',
              notes_heart: '',
              notes_base: '',
              properties: [],
              environments: [],
              color_hex,
            })
          }
        }
      })
    }
  } catch (err) {
    console.warn('[scraper] Could not fetch /nuestros-aromas/:', (err as Error).message)
  }

  // Scrape each individual aroma page
  const aromaSlugs = [
    { slug: 'verbena', path: '/aromas/verbena/' },
    { slug: 'floral-velvet', path: '/aromas/floral-velvet/' },
    { slug: 'oud-imperial', path: '/aromas/oud-imperial/' },
    { slug: 'french-lavander', path: '/aromas/french-lavander/' },
    { slug: 'jengibre-te-blanco', path: '/aromas/jengibre-te-blanco/' },
    { slug: 'cardamom-woods', path: '/aromas/cardamom-woods/' },
    { slug: 'sandalo-pimenta-rosa', path: '/aromas/sandalo-pimenta-rosa/' },
    { slug: 'green-amber', path: '/aromas/green-amber/' },
  ]

  for (const { slug, path } of aromaSlugs) {
    // Skip if already scraped
    if (aromas.find((a) => a.slug === slug)) continue

    try {
      const $ = await fetchHtml(path)
      const meta = AROMA_META[slug] || { number: 0, family: '', color_hex: '#CCCCCC' }

      const name =
        $('h1').first().text().trim().toUpperCase() ||
        slug.replace(/-/g, ' ').toUpperCase()

      const tagline = $('h2, .tagline, .subtitle').first().text().trim()
      const description = $('[class*="description"], [class*="desc"], p').first().text().trim()

      // Look for notes sections
      const allText = $('body').text()
      const extractNotes = (label: string) => {
        const regex = new RegExp(`${label}[:\\s]+([^\\n]+)`, 'i')
        return allText.match(regex)?.[1]?.trim() || ''
      }

      aromas.push({
        slug,
        number: meta.number,
        name,
        family: meta.family,
        tagline,
        description,
        notes_top: extractNotes('salida|top'),
        notes_heart: extractNotes('corazón|corazon|heart|medio'),
        notes_base: extractNotes('fondo|base|fond'),
        properties: [],
        environments: [],
        color_hex: meta.color_hex,
      })
    } catch (err) {
      console.warn(`[scraper] Could not fetch aroma ${slug}:`, (err as Error).message)
      // Insert with defaults so the slug exists
      const meta = AROMA_META[slug] || { number: 0, family: '', color_hex: '#CCCCCC' }
      aromas.push({
        slug,
        number: meta.number,
        name: slug.replace(/-/g, ' ').toUpperCase(),
        family: meta.family,
        tagline: '',
        description: '',
        notes_top: '',
        notes_heart: '',
        notes_base: '',
        properties: [],
        environments: [],
        color_hex: meta.color_hex,
      })
    }
  }

  return aromas
}

// ─────────────────────────────────────────────────────────────────────────────
// scrapeHomepage — banners y textos del home
// ─────────────────────────────────────────────────────────────────────────────

export async function scrapeHomepage(): Promise<{ banners: string[]; texts: string[] }> {
  const $ = await fetchHtml('/')
  const banners: string[] = []
  const texts: string[] = []

  $('img[src], img[data-src]').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || ''
    const url = absoluteImg(src)
    if (
      url &&
      (url.includes('mitiendanube') || url.includes('acdn')) &&
      !banners.includes(url)
    ) {
      banners.push(url)
    }
  })

  $('h1, h2, h3, .hero-title, .banner-title').each((_, el) => {
    const t = $(el).text().trim()
    if (t && t.length > 3) texts.push(t)
  })

  return { banners, texts }
}
