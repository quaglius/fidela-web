import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, explodeByFragrance, getVariantImage, formatPrice } from '@/lib/tiendanube'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.toLowerCase().trim() ?? ''

  if (q.length < 2) return NextResponse.json([])

  try {
    const products = await getAllProducts()
    const cards = explodeByFragrance(products)

    const results = cards
      .filter((card) => {
        const name = (card.product.name?.es ?? '').toLowerCase()
        const variant = card.fragranceName.toLowerCase()
        return name.includes(q) || variant.includes(q)
      })
      .slice(0, 8)
      .map((card) => ({
        title: card.fragranceName
          ? `${card.product.name?.es} — ${card.fragranceName}`
          : (card.product.name?.es ?? ''),
        href: `/productos/${card.product.handle?.es ?? card.product.id}?variant=${card.variant.id}`,
        image: getVariantImage(card.product, card.variant),
        price: formatPrice(card.variant.promotional_price ?? card.variant.price),
        fragranceColor: card.fragranceColor,
      }))

    return NextResponse.json(results)
  } catch {
    return NextResponse.json([])
  }
}
