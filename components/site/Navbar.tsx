'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import { useCart } from '@/lib/cart'

const CATEGORIES = [
  { name: 'Velas de Soja', href: '/velas-de-soja' },
  { name: 'Jabones Naturales', href: '/jabones-naturales' },
  { name: 'Aromatizantes', href: '/aromatizantes' },
  { name: 'Bienestar', href: '/bienestar' },
  { name: 'Boxes - Kits', href: '/boxes-kits' },
  { name: 'Cuidado Corporal', href: '/cuidado-corporal' },
]

const AROMAS = [
  { name: 'Verbena', slug: 'verbena', number: 2 },
  { name: 'Floral Velvet', slug: 'floral-velvet', number: 5 },
  { name: 'Oud Imperial', slug: 'oud-imperial', number: 17 },
  { name: 'French Lavender', slug: 'french-lavander', number: 19 },
  { name: 'Jengibre & Té Blanco', slug: 'jengibre-te-blanco', number: 21 },
  { name: 'Cardamom & Woods', slug: 'cardamom-woods', number: 27 },
  { name: 'Sándalo & Pimienta Rosa', slug: 'sandalo-pimenta-rosa', number: 44 },
  { name: 'Green Amber', slug: 'green-amber', number: 46 },
]

export default function Navbar({ announcement }: { announcement?: string }) {
  const { items, open } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const totalItems = items.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bar = announcement ?? 'Envío gratis CABA y GBA Norte en compras +$200.000'

  return (
    <>
      {/* Announcement bar */}
      <div className="announcement-bar text-xs tracking-widest uppercase">
        {bar}
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile: hamburger */}
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
              <span className="font-serif text-2xl md:text-3xl tracking-widest font-light uppercase">
                Fidela
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-medium">
              {/* Por producto */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveMenu('productos')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 py-6 hover:text-[var(--gold)] transition-colors">
                  Por producto <ChevronDown size={12} />
                </button>
                {activeMenu === 'productos' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg border-t border-gray-100 min-w-[200px] py-4 z-50">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-6 py-2 text-xs hover:bg-[var(--cream)] hover:text-[var(--gold)] transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <Link href="/productos" className="block px-6 py-2 text-xs font-semibold hover:text-[var(--gold)]">
                        Ver todo →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Por aroma */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveMenu('aromas')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 py-6 hover:text-[var(--gold)] transition-colors">
                  Por aroma <ChevronDown size={12} />
                </button>
                {activeMenu === 'aromas' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg border-t border-gray-100 min-w-[220px] py-4 z-50">
                    {AROMAS.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/aromas/${a.slug}`}
                        className="flex items-center gap-3 px-6 py-2 text-xs hover:bg-[var(--cream)] hover:text-[var(--gold)] transition-colors"
                      >
                        <span className="text-[var(--gray-400)] font-light">N°{a.number}</span>
                        {a.name}
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <Link href="/nuestros-aromas" className="block px-6 py-2 text-xs font-semibold hover:text-[var(--gold)]">
                        Nuestros aromas →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/tiendas" className="hover:text-[var(--gold)] transition-colors">
                Tiendas
              </Link>
              <Link href="/empresas" className="hover:text-[var(--gold)] transition-colors">
                Empresas
              </Link>
            </div>

            {/* Cart icon */}
            <button
              onClick={open}
              className="relative p-2 -mr-2"
              aria-label="Carrito"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--gold)] text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white py-4">
            <div className="container-site flex flex-col gap-0.5 text-sm">
              <p className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] px-2 pt-2 pb-1">
                Por producto
              </p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="px-2 py-2.5 hover:text-[var(--gold)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <p className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] px-2 pt-4 pb-1">
                Por aroma
              </p>
              {AROMAS.map((a) => (
                <Link
                  key={a.slug}
                  href={`/aromas/${a.slug}`}
                  className="px-2 py-2.5 hover:text-[var(--gold)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {a.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-3 pt-3 flex flex-col gap-0.5">
                <Link href="/tiendas" className="px-2 py-2.5" onClick={() => setMobileOpen(false)}>Tiendas</Link>
                <Link href="/empresas" className="px-2 py-2.5" onClick={() => setMobileOpen(false)}>Empresas</Link>
                <Link href="/nosotros" className="px-2 py-2.5" onClick={() => setMobileOpen(false)}>Nosotros</Link>
                <Link href="/contacto" className="px-2 py-2.5" onClick={() => setMobileOpen(false)}>Contacto</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
