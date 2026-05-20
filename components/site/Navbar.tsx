'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, ChevronDown, Search } from 'lucide-react'
import { useCart } from '@/lib/cart'
import dynamic from 'next/dynamic'

const SearchOverlay = dynamic(() => import('./SearchOverlay'), { ssr: false })


const CATEGORIES = [
  { name: 'Velas de Soja', href: '/velas-de-soja' },
  { name: 'Jabones Naturales', href: '/jabones-naturales' },
  { name: 'Aromatizantes', href: '/aromatizantes' },
  { name: 'Bienestar', href: '/bienestar' },
  { name: 'Boxes - Kits', href: '/boxes-kits' },
  { name: 'Cuidado Corporal', href: '/cuidado-corporal' },
]

const AROMAS = [
  { name: 'Velvet',  slug: 'velvet',  concept: 'Sofisticación', color: '#7E2738' },
  { name: 'Linaje',  slug: 'linaje',  concept: 'Magnetismo',    color: '#CB6F36' },
  { name: 'Roble',   slug: 'roble',   concept: 'Introspección', color: '#496130' },
  { name: 'Brisa',   slug: 'brisa',   concept: 'Renovación',    color: '#77C1EC' },
]

export default function Navbar({ announcement }: { announcement?: string }) {
  const { items, open } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const totalItems = items.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ─────────────────────────────────────────────── */}
      <div className="bg-[#C22020] py-2.5 px-4">
        <div className="flex items-center justify-center gap-3">
          <span className="text-white font-mono text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 border border-white/50">
            HOT SALE
          </span>
          <span className="text-white font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase">
            {announcement ?? '30% OFF en toda la tienda · hasta agotar stock'}
          </span>
        </div>
      </div>

      {/* ── MAIN NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-40 bg-[var(--blanco-fidela)] transition-shadow duration-200 ${
          scrolled ? 'shadow-sm' : 'border-b border-[var(--pantone-fidela)]'
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile: hamburger */}
            <button
              className="md:hidden p-2 -ml-2 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex-shrink-0">
              <Image
                src="/brand/logos/logotipo-dark.png"
                alt="FIDELA"
                width={120}
                height={48}
                className="h-9 md:h-11 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop nav — ALL UPPERCASE */}
            <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.15em] uppercase font-medium">
              {/* Por producto */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu('productos')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 py-6 hover:text-[var(--gold)] transition-colors duration-150 cursor-pointer uppercase">
                  POR PRODUCTO <ChevronDown size={11} />
                </button>
                {activeMenu === 'productos' && (
                  <div className="absolute top-full left-0 bg-white shadow-xl border-t-2 border-[var(--gold)] min-w-[210px] py-3 z-50">
                    <Link href="/productos" className="block px-6 py-2.5 text-[11px] tracking-widest uppercase font-semibold text-[var(--gold)] hover:bg-[var(--cream)] transition-colors duration-150 border-b border-gray-100 mb-1 whitespace-nowrap">
                      Todos los productos
                    </Link>
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-6 py-2.5 text-[11px] tracking-widest uppercase hover:bg-[var(--cream)] hover:text-[var(--gold)] transition-colors duration-150"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Por aroma */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu('aromas')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 py-6 hover:text-[var(--gold)] transition-colors duration-150 cursor-pointer uppercase">
                  POR AROMA <ChevronDown size={11} />
                </button>
                {activeMenu === 'aromas' && (
                  <div className="absolute top-full left-0 bg-white shadow-xl border-t-2 border-[var(--pantone-fidela)] min-w-[220px] py-3 z-50">
                    {AROMAS.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/aromas/${a.slug}`}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--blanco-fidela)] transition-colors duration-150 group"
                      >
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: a.color }} />
                        <span className="flex-1">
                          <span className="block text-[11px] tracking-widest uppercase text-[var(--negro-fidela)] group-hover:text-[var(--negro-fidela)]">{a.name}</span>
                          <span className="block text-[9px] tracking-[0.15em] uppercase text-[var(--gray-400)] mt-0.5">{a.concept}</span>
                        </span>
                      </Link>
                    ))}
                    <div className="mt-1 pt-2 border-t border-gray-100">
                      <Link href="/nuestros-aromas" className="block px-5 py-2 text-[10px] tracking-widest uppercase font-medium text-[var(--gray-400)] hover:text-[var(--negro-fidela)] transition-colors">
                        Colección completa →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/nosotros" className="hover:text-[var(--gold)] transition-colors duration-150 uppercase">
                NOSOTROS
              </Link>
              <Link href="/tiendas" className="hover:text-[var(--gold)] transition-colors duration-150 uppercase">
                TIENDAS
              </Link>
              <Link href="/empresas" className="hover:text-[var(--gold)] transition-colors duration-150 uppercase">
                EMPRESAS
              </Link>
            </div>

            {/* Search + Cart */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 cursor-pointer hover:text-[var(--gold)] transition-colors duration-150"
                aria-label="Buscar"
              >
                <Search size={20} />
              </button>
              <button
                onClick={open}
                className="relative p-2 -mr-2 cursor-pointer hover:text-[var(--gold)] transition-colors duration-150"
                aria-label="Carrito"
              >
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D62B2B] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white py-4">
            <div className="container-site flex flex-col gap-0.5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--gray-400)] px-2 pt-2 pb-1">
                POR PRODUCTO
              </p>
              <Link
                href="/productos"
                className="px-2 py-2.5 text-xs uppercase tracking-widest font-semibold text-[var(--gold)] hover:text-[var(--gold)] border-b border-gray-100 mb-1"
                onClick={() => setMobileOpen(false)}
              >
                Todos los productos →
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="px-2 py-2.5 text-xs uppercase tracking-widest hover:text-[var(--gold)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--gray-400)] px-2 pt-4 pb-1">
                POR AROMA
              </p>
              {AROMAS.map((a) => (
                <Link
                  key={a.slug}
                  href={`/aromas/${a.slug}`}
                  className="flex items-center gap-2.5 px-2 py-2.5 text-xs uppercase tracking-widest hover:text-[var(--negro-fidela)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: a.color }} />
                  {a.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-3 pt-3 flex flex-col gap-0.5">
                <Link href="/tiendas" className="px-2 py-2.5 text-xs uppercase tracking-widest" onClick={() => setMobileOpen(false)}>TIENDAS</Link>
                <Link href="/empresas" className="px-2 py-2.5 text-xs uppercase tracking-widest" onClick={() => setMobileOpen(false)}>EMPRESAS</Link>
                <Link href="/nosotros" className="px-2 py-2.5 text-xs uppercase tracking-widest" onClick={() => setMobileOpen(false)}>NOSOTROS</Link>
                <Link href="/contacto" className="px-2 py-2.5 text-xs uppercase tracking-widest" onClick={() => setMobileOpen(false)}>CONTACTO</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
    </>
  )
}
