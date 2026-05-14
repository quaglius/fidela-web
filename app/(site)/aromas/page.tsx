import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Nuestros Aromas',
  description: 'Conocé los 8 blends de autor de FIDELA — aromas únicos con historia propia.',
}

export default async function AromasPage() {
  const { data: aromas } = await supabase
    .from('aromas')
    .select('*')
    .order('number', { ascending: true })

  const list = aromas ?? []

  return (
    <div className="section-py">
      <div className="container-site">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-3">
            Blends de autor
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-light">Nuestros Aromas</h1>
          <p className="mt-4 text-sm text-[var(--gray-600)] max-w-lg mx-auto leading-relaxed">
            Ocho fragancias únicas creadas con identidad propia. Cada blend es una historia,
            un estado de ánimo, una forma de habitar el espacio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((aroma) => (
            <Link
              key={aroma.slug}
              href={`/aromas/${aroma.slug}`}
              className="group block rounded overflow-hidden border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-md transition-all"
            >
              {/* Color block */}
              <div
                className="h-40 md:h-48 flex items-end p-5"
                style={{ backgroundColor: (aroma.color_hex ?? '#CCCCCC') + '33' }}
              >
                <div
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: aroma.color_hex ?? '#CCCCCC' }}
                />
              </div>
              <div className="p-5">
                <p className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-1">
                  N°{aroma.number} · {aroma.family}
                </p>
                <h2 className="font-serif text-xl font-light group-hover:text-[var(--gold)] transition-colors">
                  {aroma.name}
                </h2>
                {aroma.tagline && (
                  <p className="text-xs text-[var(--gray-600)] mt-2 leading-relaxed line-clamp-2 italic">
                    &ldquo;{aroma.tagline}&rdquo;
                  </p>
                )}
                <p className="text-xs tracking-widest uppercase text-[var(--gold)] mt-4 group-hover:underline">
                  Ver productos →
                </p>
              </div>
            </Link>
          ))}

          {list.length === 0 && (
            <p className="col-span-full text-center text-[var(--gray-400)] py-10">
              Cargando aromas…
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
