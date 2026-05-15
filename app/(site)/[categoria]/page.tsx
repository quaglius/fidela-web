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

// Hero images por categoría — TN CDN
const CATEGORY_HERO: Record<string, { image: string; label: string; description: string }> = {
  'velas-de-soja': {
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8842-scaled-e1681317841299-1536x1536-62758a2ee6f417ab8417207386037479-480-0.webp',
    label: 'Velas de Soja',
    description: 'Cera 100% natural, mechas de algodón. Hasta 50 horas de quema limpia.',
  },
  'jabones-naturales': {
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8453-scaled-e1685916235552-1534x1536-0788f88e8f8219233017219543914857-480-0.webp',
    label: 'Jabones Naturales',
    description: 'Jabones artesanales con aceites esenciales y botanicals naturales.',
  },
  'aromatizantes': {
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_9339-scaled-e1696449873304-1536x1536-b7487dc550d9a95c5917209852352855-480-0.webp',
    label: 'Aromatizantes',
    description: 'Difusores y sprays para mantener tu hogar perfumado todo el día.',
  },
  'bienestar': {
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6420-scaled-e1696461568818-1536x1536-77992b0b0802559e1b17219546572465-480-0.webp',
    label: 'Bienestar',
    description: 'Rituales de autocuidado para el cuerpo y la mente.',
  },
  'cuidado-corporal': {
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6325-scaled-e1681511963528-1536x1536-63c86a7359b0c0a91a17219540086209-480-0.webp',
    label: 'Cuidado Corporal',
    description: 'Formulaciones naturales para una rutina de cuidado personal completa.',
  },
  'boxes-kits': {
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/lupe1-116177fdb85d6c531817662394131806-480-0.webp',
    label: 'Boxes & Kits',
    description: 'Sets regalo cuidadosamente curados. Perfectos para regalar o darse un capricho.',
  },
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
      <div className="relative h-[45vh] md:h-[55vh] min-h-[280px] overflow-hidden flex items-center">
        {hero && (
          <Image
            src={hero.image}
            alt={hero.label}
            fill
            className="object-cover object-center scale-[1.02]"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="relative container-site text-white">
          <nav className="flex items-center gap-1.5 text-[9px] text-white/40 tracking-widest uppercase mb-5">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/productos" className="hover:text-white transition-colors">Productos</Link>
            <span>/</span>
            <span className="text-white/70">{category.name?.es}</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-6xl font-light leading-none mb-3">
            {category.name?.es}
          </h1>
          {hero?.description && (
            <p className="text-sm text-white/60 max-w-md leading-relaxed mt-2">{hero.description}</p>
          )}
          <p className="text-[10px] tracking-widest uppercase text-[var(--gold)] mt-4">{products.length} productos · 30% OFF</p>
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
