'use client'
import { useRouter, usePathname } from 'next/navigation'
import { type TNCategory } from '@/lib/tiendanube'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const AROMAS_FILTER = [
  'Verbena', 'Floral Velvet', 'Oud Imperial', 'French Lavender',
  'Jengibre', 'Cardamom', 'Sándalo', 'Green Amber',
]

const SORT_OPTIONS = [
  { value: '', label: 'Más recientes' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
]

/** Deduplica categorías de TN (handles tipo aromatizantes / aromatizantes1 / aromatizantes2)
 *  y filtra las categorías con nombre "0" o vacío. */
function dedupeCategories(cats: TNCategory[]): TNCategory[] {
  const seen = new Set<string>()
  return cats
    .filter(c => c.name?.es && c.name.es !== '0')
    .sort((a, b) => a.id - b.id)
    .filter(c => {
      const base = (c.handle?.es ?? '').replace(/\d+$/, '')
      if (!base || seen.has(base)) return false
      seen.add(base)
      return true
    })
}

export default function CatalogFilters({
  categories,
  searchParams,
}: {
  categories: TNCategory[]
  searchParams: { categoria?: string; aroma?: string; orden?: string }
}) {
  const cleanCategories = dedupeCategories(categories.filter(c => !c.parent))
  const router = useRouter()
  const pathname = usePathname()
  // null = all collapsed (mobile default); desktop always shows via md:block
  const [openSection, setOpenSection] = useState<string | null>(null)

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`${pathname}?${params.toString()}`)
  }

  function clearAll() {
    router.push(pathname)
  }

  const hasFilters = searchParams.categoria || searchParams.aroma || searchParams.orden

  return (
    <div className="text-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-widest uppercase font-medium">Filtros</span>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-[var(--gray-400)] underline hover:text-[var(--error)]">
            Limpiar
          </button>
        )}
      </div>

      {/* Ordenar */}
      <div className="mb-5">
        <label className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] block mb-2">Ordenar</label>
        <select
          value={searchParams.orden ?? ''}
          onChange={(e) => setParam('orden', e.target.value)}
          className="w-full border border-[var(--gray-200)] rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--gold)]"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Categoría */}
      <div className="border-t border-[var(--gray-200)] pt-4 mb-4">
        <button
          onClick={() => setOpenSection(openSection === 'categoria' ? null : 'categoria')}
          className="flex items-center justify-between w-full text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-3 md:cursor-default"
        >
          Categoría
          <ChevronDown
            size={12}
            className={`md:hidden transition-transform duration-200 ${openSection === 'categoria' ? 'rotate-180' : ''}`}
          />
        </button>
        <ul className={`flex flex-col gap-1.5 ${openSection === 'categoria' ? 'block' : 'hidden'} md:block`}>
          {cleanCategories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setParam('categoria', cat.name?.es === searchParams.categoria ? '' : cat.name?.es ?? '')}
                className={`text-left w-full px-1 py-1 rounded transition-colors ${
                  searchParams.categoria === cat.name?.es
                    ? 'text-[var(--gold)] font-medium'
                    : 'hover:text-[var(--gold)]'
                }`}
              >
                {cat.name?.es}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Aroma */}
      <div className="border-t border-[var(--gray-200)] pt-4">
        <button
          onClick={() => setOpenSection(openSection === 'aroma' ? null : 'aroma')}
          className="flex items-center justify-between w-full text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-3 md:cursor-default"
        >
          Aroma
          <ChevronDown
            size={12}
            className={`md:hidden transition-transform duration-200 ${openSection === 'aroma' ? 'rotate-180' : ''}`}
          />
        </button>
        <ul className={`flex flex-col gap-1.5 ${openSection === 'aroma' ? 'block' : 'hidden'} md:block`}>
          {AROMAS_FILTER.map((a) => (
            <li key={a}>
              <button
                onClick={() => setParam('aroma', a === searchParams.aroma ? '' : a)}
                className={`text-left w-full px-1 py-1 rounded transition-colors ${
                  searchParams.aroma === a
                    ? 'text-[var(--gold)] font-medium'
                    : 'hover:text-[var(--gold)]'
                }`}
              >
                {a}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
