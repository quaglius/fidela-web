'use client'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, getVariantImage, type TNProduct, type TNVariant } from '@/lib/tiendanube'
import { useCart } from '@/lib/cart'
import { ShoppingBag } from 'lucide-react'
import { useState } from 'react'

interface Props {
  product: TNProduct
  variant: TNVariant
  fragranceName?: string
  fragranceColor?: string
  priority?: boolean
}

export default function VariantCard({
  product,
  variant,
  fragranceName = '',
  fragranceColor,
  priority = false,
}: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const img = getVariantImage(product, variant)
  const handle = product.handle?.es ?? String(product.id)
  const href = `/productos/${handle}?variant=${variant.id}`
  const price = variant.price
  const promoPrice = variant.promotional_price
  const outOfStock = variant.stock_management && variant.stock <= 0

  const discountPct = promoPrice
    ? Math.round((1 - parseFloat(promoPrice) / parseFloat(price)) * 100)
    : null

  const title = fragranceName
    ? `${product.name?.es ?? ''} — ${fragranceName}`
    : (product.name?.es ?? '')

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (outOfStock) return
    addItem({
      variantId: variant.id,
      productId: product.id,
      productName: product.name?.es ?? 'Producto',
      variantName: fragranceName,
      price: variant.promotional_price ?? variant.price,
      quantity: 1,
      image: img,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={href} className="group block cursor-pointer">
      {/* IMAGE */}
      <div className="relative aspect-square bg-[var(--cream)] rounded-lg overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          priority={priority}
        />

        {/* Fragrance color gradient at bottom */}
        {fragranceColor && (
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${fragranceColor}40, transparent)` }}
          />
        )}

        {/* HOT SALE badge */}
        <div className="absolute top-2.5 right-2.5 bg-[#D62B2B] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded leading-none shadow-lg">
          {discountPct ? `−${discountPct}%` : '30% OFF'}
        </div>

        {/* Fragrance color dot — top-left */}
        {fragranceColor && (
          <div
            className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full ring-1 ring-white/50 shadow"
            style={{ backgroundColor: fragranceColor }}
          />
        )}

        {/* CTA bar — mobile always / desktop hover */}
        <div className="absolute inset-x-0 bottom-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-200">
          {outOfStock ? (
            <div className="w-full bg-gray-400 text-white text-[10px] tracking-widest uppercase py-2.5 md:py-3 flex items-center justify-center">
              Sin stock
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className={`w-full text-[10px] tracking-widest uppercase py-2.5 md:py-3 flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer ${
                added ? 'bg-green-600 text-white' : 'bg-[var(--black)] text-white hover:bg-[var(--gold)]'
              }`}
            >
              <ShoppingBag size={12} />
              {added ? 'Agregado ✓' : 'Agregar al carrito'}
            </button>
          )}
        </div>
      </div>

      {/* INFO */}
      <div className="mt-3 px-0.5">
        <h3 className="text-sm font-medium leading-snug group-hover:text-[var(--gold)] transition-colors duration-150 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-baseline gap-2 mt-1.5">
          {promoPrice ? (
            <>
              <span className="text-sm font-semibold text-[#D62B2B]">{formatPrice(promoPrice)}</span>
              <span className="text-xs text-[var(--gray-400)] line-through">{formatPrice(price)}</span>
            </>
          ) : (
            <span className="text-sm font-medium">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
