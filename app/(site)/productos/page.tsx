import type { Metadata } from 'next'
import { getAllProducts, getCategories } from '@/lib/tiendanube'
import ProductCard from '@/components/site/ProductCard'
import CatalogFilters from './CatalogFilters'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Catálogo de productos',
  description: 'Explorá nuestra colección completa de velas, difusores, jabones y más.',
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: { categoria?: string; aroma?: string; orden?: string }
}) {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()])

  // Filter
  let filtered = products
  if (searchParams.categoria) {
    filtered = filtered.filter((p) =>
      p.categories?.some((c) => c.name?.es?.toLowerCase().includes(searchParams.categoria!.toLowerCase()))
    )
  }
  if (searchParams.aroma) {
    filtered = filtered.filter((p) => {
      const text = (p.name?.es + ' ' + (p.description?.es ?? '')).toLowerCase()
      return text.includes(searchParams.aroma!.toLowerCase())
    })
  }

  // Sort
  if (searchParams.orden === 'precio-asc') {
    filtered = [...filtered].sort((a, b) => parseFloat(a.variants[0]?.price ?? '0') - parseFloat(b.variants[0]?.price ?? '0'))
  } else if (searchParams.orden === 'precio-desc') {
    filtered = [...filtered].sort((a, b) => parseFloat(b.variants[0]?.price ?? '0') - parseFloat(a.variants[0]?.price ?? '0'))
  }

  return (
    <div className="section-py">
      <div className="container-site">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-light">Todos los productos</h1>
          <p className="text-[var(--gray-600)] text-sm mt-2">{filtered.length} productos</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="md:w-56 flex-shrink-0">
            <CatalogFilters categories={categories} searchParams={searchParams} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-[var(--gray-400)]">
                <p>No hay productos con esos filtros.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} priority={i < 6} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
