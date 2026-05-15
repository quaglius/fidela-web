import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategories, getAllProducts } from '@/lib/tiendanube'
import ProductCard from '@/components/site/ProductCard'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 300

// Slugs canónicos (handles reales de TN)
const CATEGORY_SLUGS = [
  'velas-de-soja',
  'jabones-naturales',
  'aromatizantes',
  'bienestar',
  'cuidado-corporal',
  'boxes-kits',
]

// Hero images por categoría
const CATEGORY_HERO: Record<string, { image: string; label: string }> = {
  'velas-de-soja':    { image: '/cat-velas.jpg',    label: 'Velas de Soja' },
  'jabones-naturales':{ image: '/cat-jabones.jpg',  label: 'Jabones Naturales' },
  'aromatizantes':    { image: '/cat-difusores.jpg', label: 'Aromatizantes' },
  'bienestar':        { image: '/cat-boxes.jpg',     label: 'Bienestar' },
  'cuidado-corporal': { image: '/nosotros-bg.jpg',   label: 'Cuidado Corporal' },
  'boxes-kits':       { image: '/cat-boxes.jpg',     label: 'Boxes & Kits' },
}

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ categoria: slug }))
}

export async function generateMetadata({ params }: { params: { categoria: string } }): Promise<Metadata> {
  const hero = CATEGORY_HERO[params.categoria]
  return {
    title: hero?.label ?? params.categoria,
    description: `Explorá todos los productos de ${hero?.label ?? params.categoria} de FIDELA.`,
  }
}

// Deduplica categorías — descarta sufijos numéricos (aromatizantes1, velas-de-soja2…)
function dedupeCategories<T extends { handle?: { es?: string }; id: number }>(cats: T[]): T[] {
  const seen = new Set<string>()
  return cats
    .sort((a, b) => a.id - b.id) // priorizar los IDs más bajos (primera carga)
    .filter((c) => {
      const h = c.handle?.es ?? ''
      const base = h.replace(/\d+$/, '') // quitar sufijo numérico
      if (seen.has(base)) return false
      seen.add(base)
      return true
    })
}

export default async function CategoriaPage({ params }: { params: { categoria: string } }) {
  if (!CATEGORY_SLUGS.includes(params.categoria)) notFound()

  let categories: Awaited<ReturnType<typeof getCategories>> = []
  let allProducts: Awaited<ReturnType<typeof getAllProducts>> = []
  try {
    ;[categories, allProducts] = await Promise.all([getCategories(), getAllProducts()])
  } catch { notFound() }

  // Busca la categoría exacta por handle
  const cleanCats = dedupeCategories(categories)
  const category = cleanCats.find((c) => c.handle?.es === params.categoria)
  if (!category) notFound()

  // Filtra productos — también acepta productos en categorías duplicadas del mismo handle base
  const catIds = categories
    .filter((c) => c.handle?.es?.replace(/\d+$/, '') === params.categoria)
    .map((c) => c.id)

  const products = allProducts.filter((p) =>
    p.categories?.some((c) => catIds.includes(c.id))
  )

  const hero = CATEGORY_HERO[params.categoria]

  return (
    <div>
      {/* Hero de categoría */}
      <div className="relative h-52 md:h-72 overflow-hidden">
        {hero && (
          <Image
            src={hero.image}
            alt={category.name?.es ?? ''}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        <div className="absolute inset-0 flex items-end container-site pb-8 md:pb-12">
          <div>
            <nav className="flex items-center gap-1.5 text-xs text-white/60 tracking-wide mb-2">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/productos" className="hover:text-white transition-colors">Productos</Link>
              <span>/</span>
              <span className="text-white">{category.name?.es}</span>
            </nav>
            <h1 className="font-serif text-3xl md:text-5xl font-light text-white">
              {category.name?.es}
            </h1>
            <p className="text-white/60 text-sm mt-1">{products.length} productos</p>
          </div>
        </div>
      </div>

      <div className="section-py">
        <div className="container-site">
          {products.length === 0 ? (
            <div className="text-center py-20 text-[var(--gray-400)]">
              <p className="font-serif text-xl mb-3">No hay productos en esta categoría aún</p>
              <Link href="/productos" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)]">
                Ver todos los productos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
