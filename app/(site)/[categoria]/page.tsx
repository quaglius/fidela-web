import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategories, getAllProducts } from '@/lib/tiendanube'
import ProductCard from '@/components/site/ProductCard'
import Link from 'next/link'

export const revalidate = 300

const CATEGORY_SLUGS = [
  'velas', 'jabones-naturales', 'aromatizantes', 'bienestar',
  'cuidado-corporal', 'boxes', 'vidrio', 'vidrio-xl', 'aluminio',
]

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ categoria: slug }))
}

export async function generateMetadata({ params }: { params: { categoria: string } }): Promise<Metadata> {
  const categories = await getCategories()
  const cat = categories.find((c) => c.handle?.es === params.categoria)
  return {
    title: cat?.name?.es ?? params.categoria,
    description: `Explorá todos los productos de ${cat?.name?.es ?? params.categoria} de FIDELA.`,
  }
}

export default async function CategoriaPage({ params }: { params: { categoria: string } }) {
  // Guard: only render for known category slugs
  if (!CATEGORY_SLUGS.includes(params.categoria)) notFound()

  const [categories, allProducts] = await Promise.all([getCategories(), getAllProducts()])

  const category = categories.find((c) => c.handle?.es === params.categoria)
  if (!category) notFound()

  const products = allProducts.filter((p) =>
    p.categories?.some((c) => c.id === category.id)
  )

  return (
    <div className="section-py">
      <div className="container-site">
        {/* Breadcrumb */}
        <nav className="text-xs text-[var(--gray-400)] mb-8">
          <Link href="/" className="hover:text-[var(--gold)]">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/productos" className="hover:text-[var(--gold)]">Productos</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--black)]">{category.name?.es}</span>
        </nav>

        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-light">{category.name?.es}</h1>
          <p className="text-[var(--gray-600)] text-sm mt-2">{products.length} productos</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-[var(--gray-400)]">
            <p>No hay productos en esta categoría.</p>
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
  )
}
