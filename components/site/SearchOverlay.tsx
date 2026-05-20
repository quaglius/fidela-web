'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, X, ArrowRight } from 'lucide-react'

interface SearchResult {
  title: string
  href: string
  image: string
  price: string
  fragranceColor?: string
}

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      setResults(await res.json())
      setActiveIdx(-1)
    } finally {
      setLoading(false)
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => search(val), 250)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      const target = activeIdx >= 0 ? results[activeIdx]?.href : null
      if (target) { router.push(target); onClose() }
      else if (query.trim()) { router.push(`/productos?aroma=${encodeURIComponent(query)}`); onClose() }
    }
  }

  function navigate(href: string) {
    router.push(href)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white shadow-2xl">
        <div className="container-site py-5">
          {/* Input row */}
          <div className="flex items-center gap-4 border-b border-[var(--pantone-fidela)] pb-4">
            <Search size={20} className="text-[var(--negro-fidela)]/40 flex-shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Buscar productos, aromas..."
              className="flex-1 text-base md:text-lg font-light bg-transparent outline-none placeholder:text-[var(--gray-400)] text-[var(--negro-fidela)]"
            />
            <button
              onClick={onClose}
              className="p-1 hover:text-[var(--gold)] transition-colors cursor-pointer flex-shrink-0"
              aria-label="Cerrar búsqueda"
            >
              <X size={20} />
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <ul className="mt-1 divide-y divide-gray-50 max-h-[60vh] overflow-y-auto">
              {results.map((r, i) => (
                <li key={`${r.href}-${i}`}>
                  <button
                    onClick={() => navigate(r.href)}
                    className={`w-full flex items-center gap-4 py-3 text-left transition-colors rounded ${
                      activeIdx === i ? 'bg-[var(--cream)]' : 'hover:bg-[var(--cream)]'
                    }`}
                  >
                    <div className="relative w-11 h-11 flex-shrink-0 rounded overflow-hidden bg-[var(--cream)]">
                      <Image src={r.image} alt={r.title} fill className="object-cover" sizes="44px" />
                      {r.fragranceColor && (
                        <div
                          className="absolute bottom-0 inset-x-0 h-1/3 pointer-events-none"
                          style={{ background: `linear-gradient(to top, ${r.fragranceColor}55, transparent)` }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--negro-fidela)] truncate">{r.title}</p>
                      <p className="text-xs text-[var(--gray-400)] mt-0.5">{r.price}</p>
                    </div>
                    <ArrowRight size={13} className="text-[var(--gray-400)] flex-shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {loading && (
            <p className="mt-4 text-sm text-[var(--gray-400)]">Buscando...</p>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <p className="mt-4 text-sm text-[var(--gray-400)]">
              Sin resultados para &ldquo;{query}&rdquo;
            </p>
          )}

          {!query && (
            <p className="mt-4 text-xs text-[var(--gray-400)] tracking-widest uppercase">
              Escribí para buscar en el catálogo
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
