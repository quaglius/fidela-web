import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllProducts, getProductByHandle, formatPrice, type TNProduct } from '@/lib/tiendanube'
import AddToCartSection from './AddToCartSection'
import ProductCard from '@/components/site/ProductCard'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const revalidate = 300

export async function generateStaticParams() {
  try {
    const products = await getAllProducts()
    return products.map((p) => ({ slug: p.handle?.es ?? String(p.id) }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductByHandle(params.slug)
  if (!product) return {}
  return {
    title: product.name?.es,
    description: product.description?.es?.slice(0, 160) ?? '',
    openGraph: {
      title: product.name?.es,
      images: product.images?.[0]?.src ? [{ url: product.images[0].src }] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductByHandle(params.slug)
  if (!product) notFound()

  // Related products (same category)
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
  const BASE = 'https://fidela-web.netlify.app'

  return (
    <div className="section-py">
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
      <div className="container-site">
        {/* Breadcrumb */}
        <nav className="text-xs text-[var(--gray-400)] tracking-wide mb-8">
          <a href="/" className="hover:text-[var(--gold)]">Inicio</a>
          <span className="mx-2">/</span>
          <a href="/productos" className="hover:text-[var(--gold)]">Productos</a>
          {product.categories?.[0] && (
            <>
              <span className="mx-2">/</span>
              <a href={`/productos`} className="hover:text-[var(--gold)] capitalize">
                {product.categories[0].name?.es}
              </a>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-[var(--black)]">{product.name?.es}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            {images.length > 0 ? (
              <div className="flex gap-3">
                {/* Thumbnails — hidden on mobile */}
                {images.length > 1 && (
                  <div className="hidden md:flex flex-col gap-2 w-16">
                    {images.slice(0, 5).map((img, i) => (
                      <div key={img.id} className="relative aspect-square bg-[var(--cream)] rounded overflow-hidden">
                        <Image src={img.src} alt={`${product.name?.es} ${i + 1}`} fill className="object-cover" sizes="64px" />
                      </div>
                    ))}
                  </div>
                )}
                {/* Main image */}
                <div className="flex-1 relative aspect-square bg-[var(--cream)] rounded overflow-hidden">
                  <Image
                    src={images[0].src}
                    alt={product.name?.es ?? 'Producto'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-[var(--cream)] rounded flex items-center justify-center">
                <span className="text-[var(--gray-400)] text-sm">Sin imagen</span>
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            {/* Category badge */}
            {product.categories?.[0] && (
              <a
                href="/productos"
                className="text-[10px] tracking-widest uppercase text-[var(--gold)] mb-3 hover:underline"
              >
                {product.categories[0].name?.es}
              </a>
            )}

            <h1 className="font-serif text-3xl md:text-4xl font-light mb-4">{product.name?.es}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              {promo ? (
                <>
                  <span className="text-2xl font-medium text-[var(--gold)]">{formatPrice(promo)}</span>
                  <span className="text-base text-[var(--gray-400)] line-through">{formatPrice(price)}</span>
                  <span className="text-xs bg-[var(--gold)] text-white px-2 py-0.5 rounded">OFERTA</span>
                </>
              ) : (
                <span className="text-2xl font-medium">{formatPrice(price)}</span>
              )}
            </div>

            {/* Variant selector + Add to cart */}
            <AddToCartSection product={product} />

            {/* Description */}
            {product.description?.es && (
              <div className="mt-8 pt-8 border-t border-[var(--gray-200)]">
                <h3 className="text-xs tracking-widest uppercase text-[var(--gray-400)] mb-3">Descripción</h3>
                <div
                  className="text-sm text-[var(--gray-600)] leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description.es }}
                />
              </div>
            )}

            {/* Meta */}
            <div className="mt-6 flex flex-col gap-2 text-xs text-[var(--gray-400)]">
              <p>✓ Envío a todo el país</p>
              <p>✓ Envío gratis CABA y GBA Norte +$200.000</p>
              <p>✓ Retiro en Teodoro García 2959, Colegiales</p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-2xl font-light mb-8">También te puede gustar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
