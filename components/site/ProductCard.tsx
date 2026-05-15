'use client'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, type TNProduct } from '@/lib/tiendanube'
import { useCart } from '@/lib/cart'
import { ShoppingBag, ArrowRight } from 'lucide-react'

interface Props {
  product: TNProduct
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: Props) {
  const { addItem } = useCart()
  const mainImg = product.images?.[0]?.src ?? null
  const secondImg = product.images?.[1]?.src ?? null
  const handle = product.handle?.es ?? String(product.id)
  const price = product.variants?.[0]?.price ?? '0'
  const promoPrice = product.variants?.[0]?.promotional_price
  const hasVariants = product.variants?.length > 1
  const discountPct = promoPrice
    ? Math.round((1 - parseFloat(promoPrice) / parseFloat(price)) * 100)
    : null

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (hasVariants) return
    const variant = product.variants[0]
    if (!variant) return
    addItem({
      variantId: variant.id,
      productId: product.id,
      productName: product.name?.es ?? 'Producto',
      variantName: '',
      price: variant.promotional_price ?? variant.price,
      quantity: 1,
      image: mainImg ?? '',
    })
  }

  return (
    <Link href={`/productos/${handle}`} className="group block">
      {/* Imagen */}
      <div className="product-img-wrap relative aspect-square bg-[var(--cream)] rounded-lg overflow-hidden">
        {mainImg ? (
          <>
            {/* Imagen principal */}
            <Image
              src={mainImg}
              alt={product.name?.es ?? 'Producto'}
              fill
              className={`object-cover transition-all duration-500 ${
                secondImg ? 'group-hover:opacity-0' : 'group-hover:scale-[1.04]'
              }`}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              priority={priority}
            />
            {/* Segunda imagen en hover */}
            {secondImg && (
              <Image
                src={secondImg}
                alt={`${product.name?.es ?? 'Producto'} — vista 2`}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-[1.04]"
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={32} className="text-[var(--gray-300)]" />
          </div>
        )}

        {/* Descuento badge */}
        {discountPct && discountPct > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-[var(--gold)] text-white text-[9px] tracking-wider uppercase px-2 py-1 rounded font-medium">
            −{discountPct}%
          </span>
        )}

        {/* CTA overlay en hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          {hasVariants ? (
            <div className="bg-[var(--black)] text-white text-[10px] tracking-widest uppercase py-3 text-center flex items-center justify-center gap-2">
              Ver opciones <ArrowRight size={12} />
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-[var(--black)] text-white text-[10px] tracking-widest uppercase py-3 hover:bg-[var(--gold)] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={12} />
              Agregar al carrito
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <h3 className="text-sm font-medium leading-snug group-hover:text-[var(--gold)] transition-colors line-clamp-2">
          {product.name?.es}
        </h3>
        <div className="flex items-baseline gap-2 mt-1.5">
          {promoPrice ? (
            <>
              <span className="text-sm font-semibold text-[var(--gold)]">{formatPrice(promoPrice)}</span>
              <span className="text-xs text-[var(--gray-400)] line-through">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="text-sm font-medium">{formatPrice(price)}</span>
          )}
        </div>
        {hasVariants && (
          <p className="text-[10px] text-[var(--gray-400)] mt-0.5 tracking-wide">
            {product.variants.length} opciones disponibles
          </p>
        )}
      </div>
    </Link>
  )
}
