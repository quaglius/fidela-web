import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllProducts, getProductByHandle, formatPrice, type TNProduct } from '@/lib/tiendanube'
import AddToCartSection from './AddToCartSection'
import ProductGallery from './ProductGallery'
import ProductCard from '@/components/site/ProductCard'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Shield, Truck, RotateCcw, MapPin } from 'lucide-react'

export const revalidate = 300

export async function generateStaticParams() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const idMap = require('../../../../data/tn-id-map.json') as Record<string, number>
    return Object.keys(idMap).map((slug) => ({ slug }))
  } catch {
    const products = await getAllProducts()
    return products.map((p) => ({ slug: p.handle?.es ?? String(p.id) }))
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductByHandle(params.slug)
  if (!product) return {}
  const img = product.images?.[0]?.src
  return {
    title: product.name?.es,
    description: product.description?.es?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
    openGraph: {
      title: product.name?.es,
      images: img ? [{ url: img }] : [],
    },
  }
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { variant?: string }
}) {
  const product = await getProductByHandle(params.slug)
  if (!product) notFound()

  // Productos relacionados (misma categoría)
  let related: TNProduct[] = []
  try {
    const all = await getAllProducts()
    const catIds = product.categories?.map((c) => c.id) ?? []
    related = all
      .filter((p) => p.id !== product.id && p.categories?.some((c) => catIds.includes(c.id)))
      .slice(0, 4)
  } catch { /* skip */ }

  const price = product.variants?.[0]?.price ?? '0'
  const promo = product.variants?.[0]?.promotional_price
  const images = product.images ?? []
  const slug = product.handle?.es ?? String(product.id)
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.fidela.com.ar'
  const catName = product.categories?.[0]?.name?.es
  const catHref = catName
    ? `/${catName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
    : '/productos'

  return (
    <>
      <ProductJsonLd
        name={product.name?.es ?? ''}
        description={product.description?.es?.replace(/<[^>]+>/g, '').slice(0, 300)}
        image={images[0]?.src}
        price={promo ?? price}
        sku={String(product.id)}
        url={`${BASE}/productos/${slug}`}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Inicio', url: BASE },
        { name: 'Productos', url: `${BASE}/productos` },
        { name: product.name?.es ?? '', url: `${BASE}/productos/${slug}` },
      ]} />

      <div className="section-py">
        <div className="container-site">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[var(--gray-400)] tracking-wide mb-8 flex-wrap">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/productos" className="hover:text-[var(--gold)] transition-colors">Productos</Link>
            {catName && (
              <>
                <span>/</span>
                <Link href={catHref} className="hover:text-[var(--gold)] transition-colors capitalize">{catName}</Link>
              </>
            )}
            <span>/</span>
            <span className="text-[var(--black)] truncate max-w-[200px]">{product.name?.es}</span>
          </nav>

          {/* Grid principal */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-20">

            {/* ── GALERÍA ── */}
            <ProductGallery images={images} productName={product.name?.es ?? 'Producto'} />

            {/* ── INFO ── */}
            <div className="flex flex-col">

              {/* Categoría */}
              {catName && (
                <Link
                  href={catHref}
                  className="text-[10px] tracking-[0.25em] uppercase text-[var(--gold)] mb-3 hover:underline w-fit"
                >
                  {catName}
                </Link>
              )}

              {/* Nombre */}
              <h1 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light leading-tight mb-4">
                {product.name?.es}
              </h1>

              {/* Precio */}
              <div className="flex items-baseline gap-3 mb-6">
                {promo ? (
                  <>
                    <span className="text-2xl md:text-3xl font-medium text-[var(--gold)]">
                      {formatPrice(promo)}
                    </span>
                    <span className="text-base text-[var(--gray-400)] line-through">
                      {formatPrice(price)}
                    </span>
                    <span className="text-[10px] tracking-widest uppercase bg-[var(--gold)] text-white px-2.5 py-1 rounded">
                      Oferta
                    </span>
                  </>
                ) : (
                  <span className="text-2xl md:text-3xl font-medium">{formatPrice(price)}</span>
                )}
              </div>

              {/* Selector de variantes + carrito */}
              <AddToCartSection product={product} initialVariantId={searchParams?.variant} />

              {/* Garantías */}
              <div className="mt-6 pt-6 border-t border-[var(--gray-200)] grid grid-cols-2 gap-3">
                {[
                  { icon: Truck, text: 'Envío a todo el país' },
                  { icon: MapPin, text: 'Retiro en Colegiales' },
                  { icon: Shield, text: 'Compra 100% segura' },
                  { icon: RotateCcw, text: 'Cambios y devoluciones' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-[var(--gray-600)]">
                    <Icon size={14} className="text-[var(--gold)] flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Descripción */}
              {product.description?.es && (
                <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
                  <details className="group" open>
                    <summary className="flex items-center justify-between cursor-pointer list-none text-xs tracking-[0.2em] uppercase text-[var(--gray-400)] select-none">
                      <span>Descripción</span>
                      <span className="group-open:rotate-180 transition-transform duration-200">▾</span>
                    </summary>
                    <div
                      className="mt-4 text-sm text-[var(--gray-600)] leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.description.es }}
                    />
                  </details>
                </div>
              )}

              {/* Envío gratis */}
              <p className="mt-6 text-[11px] tracking-wide text-[var(--gray-400)] border border-[var(--gray-200)] rounded px-3 py-2">
                🚚 <strong className="text-[var(--black)]">Envío gratis</strong> en CABA y GBA Norte en compras +$200.000
              </p>
            </div>
          </div>

          {/* Productos relacionados */}
          {related.length > 0 && (
            <div className="mt-20 pt-16 border-t border-[var(--gray-200)]">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-light">También te puede gustar</h2>
                <Link href="/productos" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)] hidden md:block">
                  Ver todos
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
