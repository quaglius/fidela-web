'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, ChevronDown, Truck } from 'lucide-react'
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

  return (
    <>
      {/* ── ANNOUNCEMENT BAR — always visible, red bg ─────────────────────── */}
      <div className="announcement-bar-promo">
        <div className="announcement-bar-inner">
          <span className="announcement-bar-promo-pill">HOT SALE</span>
          <span className="mx-3 font-medium tracking-widest">
            {announcement ?? '30% OFF EN TODA LA TIENDA · CÓDIGO: HOTSALE30'}
          </span>
          <span className="mx-2 opacity-40">·</span>
          <Truck size={11} className="inline-block mr-1.5 opacity-70" />
          <span className="tracking-wider opacity-85">
            ENVÍO GRATIS CABA Y GBA NORTE EN COMPRAS +$35.000
          </span>
        </div>
      </div>

      {/* ── MAIN NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-sm' : 'border-b border-[var(--gray-200)]'
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
                src="/logo.png"
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
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-6 py-2.5 text-[11px] tracking-widest uppercase hover:bg-[var(--cream)] hover:text-[var(--gold)] transition-colors duration-150"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <Link href="/productos" className="block px-6 py-2 text-[11px] tracking-widest uppercase font-semibold hover:text-[var(--gold)] transition-colors">
                        Ver todo →
                      </Link>
                    </div>
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
                  <div className="absolute top-full left-0 bg-white shadow-xl border-t-2 border-[var(--gold)] min-w-[230px] py-3 z-50">
                    {AROMAS.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/aromas/${a.slug}`}
                        className="flex items-center gap-3 px-6 py-2.5 text-[11px] tracking-widest uppercase hover:bg-[var(--cream)] hover:text-[var(--gold)] transition-colors duration-150"
                      >
                        <span className="text-[var(--gray-400)] font-light w-6">N°{a.number}</span>
                        {a.name}
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <Link href="/nuestros-aromas" className="block px-6 py-2 text-[11px] tracking-widest uppercase font-semibold hover:text-[var(--gold)] transition-colors">
                        Todos los aromas →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/tiendas" className="hover:text-[var(--gold)] transition-colors duration-150 uppercase">
                TIENDAS
              </Link>
              <Link href="/empresas" className="hover:text-[var(--gold)] transition-colors duration-150 uppercase">
                EMPRESAS
              </Link>
            </div>

            {/* Cart icon */}
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white py-4">
            <div className="container-site flex flex-col gap-0.5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--gray-400)] px-2 pt-2 pb-1">
                POR PRODUCTO
              </p>
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
                  className="px-2 py-2.5 text-xs uppercase tracking-widest hover:text-[var(--gold)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
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
    </>
  )
}
