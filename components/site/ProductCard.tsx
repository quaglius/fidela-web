'use client'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, type TNProduct } from '@/lib/tiendanube'
import { useCart } from '@/lib/cart'
import { ShoppingBag, Plus, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface Props {
  product: TNProduct
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const mainImg    = product.images?.[0]?.src ?? null
  // secondImg removed — hover always zooms main image to avoid Pinterest/watermark secondary photos
  const handle     = product.handle?.es ?? String(product.id)
  const price      = product.variants?.[0]?.price ?? '0'
  const promoPrice = product.variants?.[0]?.promotional_price   // set in TN admin
  const hasVariants = product.variants?.length > 1

  // Real discount % from TN promotional_price (or null)
  const discountPct = promoPrice
    ? Math.round((1 - parseFloat(promoPrice) / parseFloat(price)) * 100)
    : null

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
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
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={`/productos/${handle}`} className="group block cursor-pointer">
      {/* ── IMAGE ─────────────────────────────────────────────────────────── */}
      <div className="product-img-wrap relative aspect-square bg-[var(--cream)] rounded-lg overflow-hidden">
        {mainImg ? (
          <Image
            src={mainImg}
            alt={product.name?.es ?? 'Producto'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={32} className="text-[var(--gray-400)]" />
          </div>
        )}

        {/* ── HOT SALE BADGE — marketing, top-right ────────────────────── */}
        <div className="absolute top-2.5 right-2.5 bg-[#D62B2B] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded leading-none shadow-lg">
          {discountPct ? `−${discountPct}%` : '30% OFF'}
        </div>

        {/* ── QUICK-ADD ROUND BUTTON — desktop only ────────────────────── */}
        {!hasVariants && (
          <button
            onClick={handleQuickAdd}
            aria-label="Agregar al carrito"
            className={`
              hidden md:flex
              absolute bottom-2.5 right-2.5 z-10
              w-9 h-9 rounded-full shadow-lg
              items-center justify-center
              transition-all duration-200 cursor-pointer
              opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
              ${added
                ? 'bg-green-600 text-white scale-110'
                : 'bg-[var(--black)] text-white hover:bg-[var(--gold)] hover:scale-110'
              }
            `}
          >
            {added
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              : <Plus size={14} strokeWidth={2.5} />
            }
          </button>
        )}

        {/* ── CTA BAR — mobile: always visible · desktop: slide up on hover ── */}
        <div className="absolute inset-x-0 bottom-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-200">
          {hasVariants ? (
            <div className="bg-[var(--black)] text-white text-[10px] tracking-widest uppercase py-2.5 md:py-3 text-center flex items-center justify-center gap-2">
              Ver opciones <ArrowRight size={12} />
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
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

      {/* ── INFO ──────────────────────────────────────────────────────────── */}
      <div className="mt-3 px-0.5">
        <h3 className="text-sm font-medium leading-snug group-hover:text-[var(--gold)] transition-colors duration-150 line-clamp-2 uppercase tracking-wide">
          {product.name?.es}
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
        {hasVariants && (
          <p className="text-[10px] text-[var(--gray-400)] mt-0.5 tracking-wide">
            {product.variants.length} opciones disponibles
          </p>
        )}
      </div>
    </Link>
  )
}
