'use client'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, type TNProduct } from '@/lib/tiendanube'
import { useCart } from '@/lib/cart'
import { ShoppingBag } from 'lucide-react'

interface Props {
  product: TNProduct
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: Props) {
  const { addItem } = useCart()
  const mainImg = product.images?.[0]?.src ?? null
  const handle = product.handle?.es ?? String(product.id)
  const price = product.variants?.[0]?.price ?? '0'
  const promoPrice = product.variants?.[0]?.promotional_price

  const hasVariants = product.variants?.length > 1

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (hasVariants) return // redirect to PDP
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
      {/* Image */}
      <div className="product-img-wrap relative aspect-square bg-[var(--cream)] rounded overflow-hidden">
        {mainImg ? (
          <Image
            src={mainImg}
            alt={product.name?.es ?? 'Producto'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={32} className="text-[var(--gray-300)]" />
          </div>
        )}

        {/* Quick add overlay — solo si no tiene variantes */}
        {!hasVariants && (
          <button
            onClick={handleAddToCart}
            className="absolute inset-x-0 bottom-0 bg-[var(--black)] text-white text-[10px] tracking-widest uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200"
          >
            Agregar al carrito
          </button>
        )}

        {/* Promo badge */}
        {promoPrice && (
          <span className="absolute top-2 left-2 bg-[var(--gold)] text-white text-[9px] tracking-wider uppercase px-2 py-0.5 rounded">
            Oferta
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="text-sm font-medium leading-snug group-hover:text-[var(--gold)] transition-colors line-clamp-2">
          {product.name?.es}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          {promoPrice ? (
            <>
              <span className="text-sm font-medium text-[var(--gold)]">{formatPrice(promoPrice)}</span>
              <span className="text-xs text-[var(--gray-400)] line-through">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="text-sm font-medium">{formatPrice(price)}</span>
          )}
        </div>
        {product.variants?.length > 1 && (
          <p className="text-[10px] text-[var(--gray-400)] mt-0.5 tracking-wide">
            {product.variants.length} opciones
          </p>
        )}
      </div>
    </Link>
  )
}
