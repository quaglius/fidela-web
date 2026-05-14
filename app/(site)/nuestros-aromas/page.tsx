import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Nuestros Aromas — Historia y filosofía',
  description: 'Los 8 blends de autor de FIDELA: historia, notas olfativas y propiedades de cada aroma.',
}

export default async function NuestrosAromasPage() {
  const { data: aromas } = await supabase
    .from('aromas')
    .select('*')
    .order('number', { ascending: true })

  const list = aromas ?? []

  return (
    <div>
      {/* Header */}
      <section className="bg-[var(--black)] text-white py-24 md:py-32">
        <div className="container-site text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">8 blends de autor</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light mb-6">Nuestros Aromas</h1>
          <p className="text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
            Cada aroma nació de una historia. Una memoria, un viaje, una sensación que queríamos
            capturar. Estos son los ocho blends que definen la identidad de Fidela.
          </p>
        </div>
      </section>

      {/* Aromas list */}
      <section className="section-py">
        <div className="container-site">
          <div className="flex flex-col gap-16 md:gap-24">
            {list.map((aroma, i) => (
              <div
                key={aroma.slug}
                className={`grid md:grid-cols-2 gap-10 md:gap-20 items-center ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Color block */}
                <div
                  className="aspect-square rounded-full mx-auto w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0"
                  style={{ backgroundColor: (aroma.color_hex ?? '#CCCCCC') + '44' }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <div
                      className="w-1/3 h-1/3 rounded-full"
                      style={{ backgroundColor: aroma.color_hex ?? '#CCCCCC' }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-2">
                    Blend N°{aroma.number} · {aroma.family}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light mb-3" style={{ color: aroma.color_hex ?? 'inherit' }}>
                    {aroma.name}
                  </h2>
                  {aroma.tagline && (
                    <p className="italic font-serif text-[var(--gray-600)] mb-4">&ldquo;{aroma.tagline}&rdquo;</p>
                  )}
                  {aroma.description && (
                    <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-6">{aroma.description}</p>
                  )}

                  {(aroma.notes_top || aroma.notes_heart || aroma.notes_base) && (
                    <div className="flex flex-col gap-2 mb-6 text-xs">
                      {aroma.notes_top && <p><span className="tracking-wider uppercase text-[var(--gold)]">Salida:</span> {aroma.notes_top}</p>}
                      {aroma.notes_heart && <p><span className="tracking-wider uppercase text-[var(--gold)]">Corazón:</span> {aroma.notes_heart}</p>}
                      {aroma.notes_base && <p><span className="tracking-wider uppercase text-[var(--gold)]">Fondo:</span> {aroma.notes_base}</p>}
                    </div>
                  )}

                  <Link
                    href={`/aromas/${aroma.slug}`}
                    className="inline-block text-xs tracking-widest uppercase border border-[var(--black)] px-6 py-3 hover:bg-[var(--black)] hover:text-white transition-colors rounded"
                  >
                    Ver productos
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
