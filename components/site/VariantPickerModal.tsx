'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ShoppingBag, Zap } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { formatPrice, getCheckoutUrl, type TNProduct } from '@/lib/tiendanube'

interface Props {
  product: TNProduct
  onClose: () => void
}

export default function VariantPickerModal({ product, onClose }: Props) {
  const { addItem } = useCart()
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null)
  const [added, setAdded] = useState(false)

  const img = product.images?.[0]?.src ?? null

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const selected = product.variants?.find((v) => v.id === selectedVariantId)
  const displayPrice = selected?.promotional_price ?? selected?.price ?? product.variants?.[0]?.promotional_price ?? product.variants?.[0]?.price ?? '0'
  const originalPrice = selected?.price ?? product.variants?.[0]?.price ?? '0'
  const hasPromo = !!(selected?.promotional_price ?? product.variants?.[0]?.promotional_price)

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!selected) return
    addItem({
      variantId: selected.id,
      productId: product.id,
      productName: product.name?.es ?? 'Producto',
      variantName: selected.values?.map((v) => v.es).join(' / ') ?? '',
      price: selected.promotional_price ?? selected.price,
      quantity: 1,
      image: img ?? '',
    })
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 1200)
  }

  function handleBuyNow(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!selected) return
    const url = getCheckoutUrl([{ variantId: selected.id, quantity: 1 }])
    window.location.href = url
  }

  const stopProp = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="relative w-full md:max-w-md bg-white rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={stopProp}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--cream)] hover:bg-[var(--gray-200)] transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>

        {/* Header con imagen + info */}
        <div className="flex gap-4 p-5 border-b border-[var(--gray-100)]">
          {img && (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--cream)]">
              <Image src={img} alt={product.name?.es ?? ''} fill className="object-cover" sizes="80px" />
            </div>
          )}
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-1">Elegí tu opción</p>
            <h3 className="font-serif text-lg font-light leading-tight line-clamp-2">{product.name?.es}</h3>
            <div className="flex items-baseline gap-2 mt-1.5">
              {hasPromo ? (
                <>
                  <span className="text-base font-semibold text-[#D62B2B]">{formatPrice(displayPrice)}</span>
                  <span className="text-xs text-[var(--gray-400)] line-through">{formatPrice(originalPrice)}</span>
                </>
              ) : (
                <span className="text-base font-medium">{formatPrice(displayPrice)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Variant selector */}
        <div className="p-5">
          <p className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-3">
            Elegí tu aroma
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {product.variants?.map((v) => {
              const label = v.values?.map((val) => val.es).join(' / ') || `Opción ${v.id}`
              const isSelected = v.id === selectedVariantId
              const inStock = !v.stock_management || v.stock > 0
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  disabled={!inStock}
                  className={`px-4 py-2 rounded-full text-xs tracking-wide border transition-all duration-150 cursor-pointer
                    ${isSelected
                      ? 'bg-[var(--black)] text-white border-[var(--black)] font-medium'
                      : inStock
                        ? 'bg-white text-[var(--black)] border-[var(--gray-200)] hover:border-[var(--black)]'
                        : 'bg-white text-[var(--gray-400)] border-[var(--gray-100)] line-through cursor-not-allowed'
                    }
                  `}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleAddToCart}
              disabled={!selected}
              className={`w-full flex items-center justify-center gap-2 py-3.5 text-xs tracking-[0.15em] uppercase rounded transition-all duration-150 cursor-pointer
                ${!selected
                  ? 'bg-[var(--gray-100)] text-[var(--gray-400)] cursor-not-allowed'
                  : added
                    ? 'bg-green-600 text-white'
                    : 'bg-[var(--black)] text-white hover:bg-[var(--gold)]'
                }
              `}
            >
              <ShoppingBag size={13} />
              {added ? 'Agregado al carrito ✓' : 'Agregar al carrito'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!selected}
              className={`w-full flex items-center justify-center gap-2 py-3.5 text-xs tracking-[0.15em] uppercase rounded border transition-all duration-150 cursor-pointer
                ${!selected
                  ? 'border-[var(--gray-100)] text-[var(--gray-400)] cursor-not-allowed'
                  : 'border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white'
                }
              `}
            >
              <Zap size={13} />
              Comprar ahora
            </button>
          </div>

          {!selected && (
            <p className="text-center text-[10px] text-[var(--gray-400)] mt-3 tracking-wide">
              Seleccioná una opción para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
