'use client'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { formatPrice, getCheckoutUrl, type TNProduct } from '@/lib/tiendanube'
import { ShoppingBag, Zap, CheckCircle2 } from 'lucide-react'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'
import { trackMetaEvent } from '@/components/analytics/MetaPixel'

export default function AddToCartSection({
  product,
  initialVariantId,
}: {
  product: TNProduct
  initialVariantId?: string
}) {
  const { addItem } = useCart()
  const variants = product.variants ?? []
  const attributes = product.attributes ?? []
  const hasVariants = variants.length > 1

  // Unique values per attribute index
  const attrValues: string[][] = attributes.map((_, attrIdx) => {
    const seen = new Set<string>()
    return variants
      .map((v) => v.values?.[attrIdx]?.es)
      .filter((v): v is string => !!v && !seen.has(v) && (seen.add(v), true))
  })

  const preselected = initialVariantId
    ? (variants.find((v) => String(v.id) === initialVariantId) ?? variants[0])
    : variants[0]

  const [selections, setSelections] = useState<string[]>(
    attributes.map((_, i) => preselected?.values?.[i]?.es ?? '')
  )
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)

  // Find variant matching current selections
  const selectedVariant = variants.find((v) =>
    selections.every((s, i) => !s || v.values?.[i]?.es === s)
  ) ?? variants[0]

  const itemPrice = selectedVariant?.promotional_price ?? selectedVariant?.price ?? '0'
  const inStock = !selectedVariant || selectedVariant.stock > 0

  function handleSelect(attrIdx: number, val: string) {
    const next = [...selections]
    next[attrIdx] = val
    setSelections(next)
  }

  // Check if a specific option combo is available
  function isOptionAvailable(attrIdx: number, val: string): boolean {
    const test = [...selections]
    test[attrIdx] = val
    return variants.some((v) =>
      test.every((s, i) => !s || v.values?.[i]?.es === s) && v.stock > 0
    )
  }

  function handleAdd() {
    if (!selectedVariant || !inStock) return
    for (let i = 0; i < qty; i++) {
      addItem({
        variantId: selectedVariant.id,
        productId: product.id,
        productName: product.name?.es ?? '',
        variantName: selectedVariant.values?.map((v) => v.es).join(' · ') ?? '',
        price: itemPrice,
        quantity: 1,
        image: product.images?.[0]?.src ?? '',
      })
    }
    trackEvent('add_to_cart', {
      currency: 'ARS',
      value: parseFloat(itemPrice) * qty,
      item_id: String(product.id),
      item_name: product.name?.es ?? '',
    })
    trackMetaEvent('AddToCart', {
      content_ids: [String(product.id)],
      content_name: product.name?.es ?? '',
      currency: 'ARS',
      value: parseFloat(itemPrice) * qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Selectores de variantes */}
      {hasVariants && attributes.length > 0 && (
        <div className="flex flex-col gap-5">
          {attributes.map((attr, attrIdx) => (
            <div key={attrIdx}>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--gray-400)] mb-2.5">
                Elegí tu aroma:{' '}
                <span className="text-[var(--black)] font-medium">{selections[attrIdx]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {attrValues[attrIdx].map((val) => {
                  const active = selections[attrIdx] === val
                  const available = isOptionAvailable(attrIdx, val)
                  return (
                    <button
                      key={val}
                      onClick={() => handleSelect(attrIdx, val)}
                      disabled={!available}
                      className={`px-3.5 py-2 text-xs rounded transition-all duration-150 relative ${
                        active
                          ? 'bg-[var(--black)] text-white border border-[var(--black)]'
                          : available
                          ? 'border border-[var(--gray-200)] hover:border-[var(--black)] bg-white'
                          : 'border border-[var(--gray-200)] text-[var(--gray-400)] bg-[var(--gray-100)] cursor-not-allowed line-through'
                      }`}
                    >
                      {val}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Precio de la variante seleccionada */}
      {hasVariants && selectedVariant && (
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-medium">
            {formatPrice(selectedVariant.promotional_price ?? selectedVariant.price)}
          </span>
          {selectedVariant.promotional_price && (
            <span className="text-sm text-[var(--gray-400)] line-through">
              {formatPrice(selectedVariant.price)}
            </span>
          )}
        </div>
      )}

      {/* Selector de cantidad */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--gray-400)]">Cantidad</span>
        <div className="flex items-center border border-[var(--gray-200)] rounded overflow-hidden">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center hover:bg-[var(--gray-100)] transition-colors text-lg leading-none"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-9 h-9 flex items-center justify-center hover:bg-[var(--gray-100)] transition-colors text-lg leading-none"
          >
            +
          </button>
        </div>
        {/* Stock indicator */}
        {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5 && (
          <span className="text-[11px] text-[var(--error)] tracking-wide">
            ¡Solo {selectedVariant.stock} disponibles!
          </span>
        )}
        {selectedVariant && selectedVariant.stock === 0 && (
          <span className="text-[11px] text-[var(--gray-400)] tracking-wide">Sin stock</span>
        )}
      </div>

      {/* Botones CTA */}
      <div className="flex flex-col gap-2.5">
        {/* Agregar al carrito */}
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className={`flex items-center justify-center gap-2.5 w-full py-4 text-sm tracking-[0.15em] uppercase font-medium rounded transition-all duration-200 ${
            added
              ? 'bg-[var(--success)] text-white'
              : !inStock
              ? 'bg-[var(--gray-200)] text-[var(--gray-400)] cursor-not-allowed'
              : 'btn-gold'
          }`}
        >
          {added ? (
            <>
              <CheckCircle2 size={16} />
              ¡Agregado al carrito!
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              {!inStock ? 'Sin stock' : 'Agregar al carrito'}
            </>
          )}
        </button>

        {/* Comprar ahora (directo a TN checkout) */}
        {inStock && selectedVariant && (
          <a
            href={getCheckoutUrl([{ variantId: selectedVariant.id, quantity: qty }])}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('begin_checkout', { currency: 'ARS', value: parseFloat(itemPrice) * qty })
              trackMetaEvent('InitiateCheckout', { value: parseFloat(itemPrice) * qty, currency: 'ARS' })
            }}
            className="flex items-center justify-center gap-2.5 w-full py-4 text-sm tracking-[0.15em] uppercase font-medium rounded btn-outline transition-all duration-200"
          >
            <Zap size={15} />
            Comprar ahora
          </a>
        )}
      </div>
    </div>
  )
}
