import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getAllProducts } from '@/lib/tiendanube'
import ProductCard from '@/components/site/ProductCard'
import Link from 'next/link'

export const revalidate = 3600

export async function generateStaticParams() {
  const { data } = await supabase.from('aromas').select('slug')
  return (data ?? []).map((a) => ({ blend: a.slug }))
}

export async function generateMetadata({ params }: { params: { blend: string } }): Promise<Metadata> {
  const { data } = await supabase.from('aromas').select('name,tagline').eq('slug', params.blend).single()
  if (!data) return {}
  return {
    title: `${data.name} — Aroma FIDELA`,
    description: data.tagline ?? '',
  }
}

export default async function BlendPage({ params }: { params: { blend: string } }) {
  const { data: aroma } = await supabase.from('aromas').select('*').eq('slug', params.blend).single()
  if (!aroma) notFound()

  // Find products mentioning this aroma in name/description
  let relatedProducts: Awaited<ReturnType<typeof getAllProducts>> = []
  try {
    const all = await getAllProducts()
    const keywords = [aroma.name, ...aroma.name.split(' ')].map((k: string) => k.toLowerCase())
    relatedProducts = all.filter((p) => {
      const text = ((p.name?.es ?? '') + ' ' + (p.description?.es ?? '')).toLowerCase()
      return keywords.some((k) => k.length > 3 && text.includes(k))
    })
  } catch { /* skip */ }

  return (
    <div>
      {/* Hero del aroma */}
      <section
        className="py-24 md:py-32"
        style={{ backgroundColor: (aroma.color_hex ?? '#CCCCCC') + '22' }}
      >
        <div className="container-site">
          <Link href="/aromas" className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] hover:text-[var(--gold)] mb-6 inline-block">
            ← Todos los aromas
          </Link>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-2">
            Blend N°{aroma.number} · {aroma.family}
          </p>
          <h1
            className="font-serif text-5xl md:text-7xl font-light mb-4"
            style={{ color: aroma.color_hex ?? 'var(--black)' }}
          >
            {aroma.name}
          </h1>
          {aroma.tagline && (
            <p className="text-base md:text-lg italic font-serif text-[var(--gray-600)] max-w-xl">
              &ldquo;{aroma.tagline}&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* Info del aroma */}
      <section className="section-py">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              {aroma.description && (
                <>
                  <h2 className="font-serif text-2xl font-light mb-4">El aroma</h2>
                  <p className="text-sm text-[var(--gray-600)] leading-relaxed">{aroma.description}</p>
                </>
              )}

              {/* Notas */}
              {(aroma.notes_top || aroma.notes_heart || aroma.notes_base) && (
                <div className="mt-8">
                  <h3 className="text-xs tracking-widest uppercase text-[var(--gray-400)] mb-4">
                    Notas olfativas
                  </h3>
                  <div className="flex flex-col gap-3">
                    {aroma.notes_top && (
                      <div>
                        <span className="text-[10px] tracking-widest uppercase text-[var(--gold)]">Salida</span>
                        <p className="text-sm mt-0.5">{aroma.notes_top}</p>
                      </div>
                    )}
                    {aroma.notes_heart && (
                      <div>
                        <span className="text-[10px] tracking-widest uppercase text-[var(--gold)]">Corazón</span>
                        <p className="text-sm mt-0.5">{aroma.notes_heart}</p>
                      </div>
                    )}
                    {aroma.notes_base && (
                      <div>
                        <span className="text-[10px] tracking-widest uppercase text-[var(--gold)]">Fondo</span>
                        <p className="text-sm mt-0.5">{aroma.notes_base}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              {aroma.properties?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs tracking-widest uppercase text-[var(--gray-400)] mb-3">Propiedades</h3>
                  <ul className="flex flex-wrap gap-2">
                    {aroma.properties.map((p: string) => (
                      <li key={p} className="px-3 py-1 border border-[var(--gray-200)] rounded text-xs capitalize">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {aroma.environments?.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-[var(--gray-400)] mb-3">Ambientes ideales</h3>
                  <ul className="flex flex-wrap gap-2">
                    {aroma.environments.map((e: string) => (
                      <li key={e} className="px-3 py-1 bg-[var(--cream)] rounded text-xs capitalize">
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      {relatedProducts.length > 0 && (
        <section className="section-py bg-[var(--cream)]">
          <div className="container-site">
            <h2 className="font-serif text-3xl font-light mb-8">Productos con {aroma.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
