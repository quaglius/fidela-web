'use client'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { formatPrice, type TNProduct } from '@/lib/tiendanube'
import { ShoppingBag } from 'lucide-react'

export default function AddToCartSection({ product }: { product: TNProduct }) {
  const { addItem } = useCart()
  const variants = product.variants ?? []
  const attributes = product.attributes ?? []

  const [selectedVariantId, setSelectedVariantId] = useState<number>(variants[0]?.id ?? 0)
  const [added, setAdded] = useState(false)

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) ?? variants[0]
  const hasVariants = variants.length > 1

  function handleAdd() {
    if (!selectedVariant) return
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name?.es ?? '',
      variantName: selectedVariant.values?.map((v) => v.es).join(' · ') ?? '',
      price: selectedVariant.promotional_price ?? selectedVariant.price,
      quantity: 1,
      image: product.images?.[0]?.src ?? '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // Group variants by first attribute value to build selector chips

  // Unique values for each attribute position
  const attrValues: string[][] = attributes.map((_, attrIdx) => {
    const seen = new Set<string>()
    return variants
      .map((v) => v.values?.[attrIdx]?.es)
      .filter((v): v is string => !!v && !seen.has(v) && seen.add(v) !== undefined)
  })

  // Current selections state
  const [selections, setSelections] = useState<string[]>(
    attributes.map((_, i) => variants[0]?.values?.[i]?.es ?? '')
  )

  function handleSelect(attrIdx: number, val: string) {
    const newSel = [...selections]
    newSel[attrIdx] = val
    setSelections(newSel)
    // Find matching variant
    const match = variants.find((v) =>
      newSel.every((s, i) => !s || v.values?.[i]?.es === s)
    )
    if (match) setSelectedVariantId(match.id)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Variant selectors */}
      {hasVariants && attributes.length > 0 && (
        <div className="flex flex-col gap-4">
          {attributes.map((attr, attrIdx) => (
            <div key={attrIdx}>
              <p className="text-xs tracking-widest uppercase text-[var(--gray-400)] mb-2">
                {attr.es}: <span className="text-[var(--black)] font-medium">{selections[attrIdx]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {attrValues[attrIdx].map((val) => {
                  const active = selections[attrIdx] === val
                  return (
                    <button
                      key={val}
                      onClick={() => handleSelect(attrIdx, val)}
                      className={`px-3 py-1.5 text-xs border rounded transition-colors ${
                        active
                          ? 'border-[var(--black)] bg-[var(--black)] text-white'
                          : 'border-[var(--gray-200)] hover:border-[var(--black)]'
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

      {/* Price for selected variant */}
      {hasVariants && selectedVariant && (
        <p className="text-lg font-medium">
          {formatPrice(selectedVariant.promotional_price ?? selectedVariant.price)}
        </p>
      )}

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        disabled={!selectedVariant || selectedVariant.stock === 0}
        className={`flex items-center justify-center gap-3 w-full py-4 text-sm tracking-widest uppercase font-medium rounded transition-all ${
          added
            ? 'bg-[var(--success)] text-white'
            : selectedVariant?.stock === 0
            ? 'bg-[var(--gray-200)] text-[var(--gray-400)] cursor-not-allowed'
            : 'btn-gold'
        }`}
      >
        <ShoppingBag size={16} />
        {added ? '¡Agregado!' : selectedVariant?.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>

      {/* Checkout directo */}
      {selectedVariant && selectedVariant.stock > 0 && (
        <a
          href={`https://${process.env.NEXT_PUBLIC_TN_STORE_ID ?? '7699826'}.mitiendanube.com/checkout/v3/start?items[0][variant_id]=${selectedVariant.id}&items[0][quantity]=1`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-center w-full py-4 text-sm tracking-widest uppercase font-medium rounded"
        >
          Comprar ahora
        </a>
      )}
    </div>
  )
}
