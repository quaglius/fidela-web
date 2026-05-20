import type { Metadata } from 'next'
import { getAllProducts, getCategories, explodeByFragrance } from '@/lib/tiendanube'
import VariantCard from '@/components/site/VariantCard'
import CatalogFilters from './CatalogFilters'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catálogo de productos',
  description: 'Explorá nuestra colección completa de velas, difusores, jabones y más.',
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: { categoria?: string; aroma?: string; orden?: string }
}) {
  let products: Awaited<ReturnType<typeof getAllProducts>> = []
  let categories: Awaited<ReturnType<typeof getCategories>> = []
  try {
    ;[products, categories] = await Promise.all([getAllProducts(), getCategories()])
  } catch { /* render empty on API failure */ }

  // Filter
  let filtered = products
  if (searchParams.categoria) {
    filtered = filtered.filter((p) =>
      p.categories?.some((c) => c.name?.es?.toLowerCase().includes(searchParams.categoria!.toLowerCase()))
    )
  }
  if (searchParams.aroma) {
    const q = searchParams.aroma.toLowerCase()
    filtered = filtered.filter((p) => {
      const text = (p.name?.es + ' ' + (p.description?.es ?? '')).toLowerCase()
      const variantText = p.variants.flatMap((v) => v.values.map((val) => val.es)).join(' ').toLowerCase()
      return text.includes(q) || variantText.includes(q)
    })
  }

  const cards = explodeByFragrance(filtered)

  // Sort after exploding so each variant's actual price is used
  if (searchParams.orden === 'precio-asc') {
    cards.sort((a, b) =>
      parseFloat(a.variant.promotional_price ?? a.variant.price ?? '0') -
      parseFloat(b.variant.promotional_price ?? b.variant.price ?? '0')
    )
  } else if (searchParams.orden === 'precio-desc') {
    cards.sort((a, b) =>
      parseFloat(b.variant.promotional_price ?? b.variant.price ?? '0') -
      parseFloat(a.variant.promotional_price ?? a.variant.price ?? '0')
    )
  }

  return (
    <div className="section-py">
      <div className="container-site">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-light">Todos los productos</h1>
          <p className="text-[var(--gray-600)] text-sm mt-2">{cards.length} opciones disponibles</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="md:w-56 flex-shrink-0">
            <CatalogFilters categories={categories} searchParams={searchParams} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {cards.length === 0 ? (
              <div className="text-center py-20 text-[var(--gray-400)]">
                <p>No hay productos con esos filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                {cards.map((card, i) => (
                  <VariantCard
                    key={`${card.product.id}-${card.variant.id}`}
                    product={card.product}
                    variant={card.variant}
                    fragranceName={card.fragranceName}
                    fragranceColor={card.fragranceColor}
                    priority={i < 6}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
