import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProducts, type TNProduct } from '@/lib/tiendanube'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/site/ProductCard'
import { MapPin, Clock, MessageCircle } from 'lucide-react'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'FIDELA — Aromas con Historia',
  description:
    'Velas de soja, difusores y jabones naturales artesanales. Concept Store en Colegiales, Buenos Aires.',
  openGraph: { title: 'FIDELA — Aromas con Historia', description: 'Aromas naturales con identidad propia.' },
}

const CATEGORIES_GRID = [
  { name: 'Velas de Soja', href: '/velas', gradient: 'from-amber-900/60 to-amber-700/30' },
  { name: 'Difusores', href: '/aromatizantes', gradient: 'from-stone-800/60 to-stone-600/30' },
  { name: 'Boxes - Kits', href: '/boxes', gradient: 'from-neutral-800/60 to-neutral-600/30' },
  { name: 'Jabones', href: '/jabones-naturales', gradient: 'from-emerald-900/60 to-emerald-700/30' },
]

const AROMAS_GRID = [
  { number: 2, name: 'Verbena', family: 'Fresco', slug: 'verbena', color: '#A8C5A0' },
  { number: 5, name: 'Floral Velvet', family: 'Floral', slug: 'floral-velvet', color: '#D4A5C9' },
  { number: 17, name: 'Oud Imperial', family: 'Terra', slug: 'oud-imperial', color: '#8B6914' },
  { number: 46, name: 'Green Amber', family: 'Fresco', slug: 'green-amber', color: '#8BAF8B' },
]

async function getFeaturedProducts(): Promise<TNProduct[]> {
  try {
    const all = await getAllProducts()
    // Return up to 8 products sorted by id desc (newest)
    return all.slice(0, 8)
  } catch {
    return []
  }
}

async function getAromaDelMes() {
  try {
    const { data } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'aroma_del_mes_slug')
      .single()
    const slug = data?.value ?? 'floral-velvet'
    const { data: aroma } = await supabase.from('aromas').select('*').eq('slug', slug).single()
    return aroma
  } catch {
    return null
  }
}

export default async function HomePage() {
  const [products, aromaDelMes] = await Promise.all([getFeaturedProducts(), getAromaDelMes()])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[520px] bg-[var(--black)] flex items-end overflow-hidden">
        {/* Background image placeholder — replaced by real image in staging */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900" />
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-50" />

        <div className="relative container-site pb-16 md:pb-24 text-white">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold-light)] mb-4">
            Aromas Naturales · Colegiales, Buenos Aires
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-light leading-none mb-6">
            Aromas<br />con Historia
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-md mb-8 leading-relaxed">
            Velas de soja, difusores y jabones artesanales.<br />
            Ocho blends de autor que cuentan una historia.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/aromas" className="btn-gold inline-block px-8 py-4 text-xs tracking-widest uppercase rounded">
              Explorar aromas
            </Link>
            <Link href="/productos" className="inline-block px-8 py-4 text-xs tracking-widest uppercase border border-white/50 text-white hover:bg-white hover:text-[var(--black)] transition-colors rounded">
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* ── GRID DE CATEGORÍAS ───────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-center mb-10">
            Explorá por producto
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {CATEGORIES_GRID.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="relative aspect-square bg-[var(--black)] overflow-hidden rounded group"
              >
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`} />
                <div className="absolute inset-0 flex items-end p-4 md:p-6">
                  <span className="text-white text-sm md:text-base font-medium tracking-wide group-hover:text-[var(--gold-light)] transition-colors">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÁS VENDIDOS ─────────────────────────────────────────────────────── */}
      {products.length > 0 && (
        <section className="section-py">
          <div className="container-site">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-serif text-3xl md:text-4xl font-light">Más vendidos</h2>
              <Link href="/productos" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)]">
                Ver todos
              </Link>
            </div>
            {/* Scroll horizontal en mobile, grid en desktop */}
            <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-none">
              {products.map((p, i) => (
                <div key={p.id} className="min-w-[200px] md:min-w-0 snap-start">
                  <ProductCard product={p} priority={i < 4} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BANNER AROMA DEL MES ─────────────────────────────────────────────── */}
      {aromaDelMes && (
        <section className="bg-[var(--black)] text-white py-20 md:py-28">
          <div className="container-site text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
              Aroma del mes
            </p>
            <p className="text-xs tracking-widest uppercase text-white/40 mb-2">
              Blend N°{aromaDelMes.number}
            </p>
            <h2 className="font-serif text-5xl md:text-7xl font-light mb-6" style={{ color: aromaDelMes.color_hex ?? 'white' }}>
              {aromaDelMes.name}
            </h2>
            {aromaDelMes.tagline && (
              <p className="text-sm md:text-base text-white/60 max-w-lg mx-auto mb-8 italic font-serif">
                &ldquo;{aromaDelMes.tagline}&rdquo;
              </p>
            )}
            <Link
              href={`/aromas/${aromaDelMes.slug}`}
              className="inline-block border border-[var(--gold)] text-[var(--gold)] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[var(--gold)] hover:text-white transition-colors rounded"
            >
              Conocer el aroma
            </Link>
          </div>
        </section>
      )}

      {/* ── NUESTROS AROMAS ──────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">8 blends de autor</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light">Nuestros aromas</h2>
            </div>
            <Link href="/nuestros-aromas" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)] hidden md:block">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {AROMAS_GRID.map((a) => (
              <Link
                key={a.slug}
                href={`/aromas/${a.slug}`}
                className="group block rounded overflow-hidden border border-[var(--gray-200)] hover:border-[var(--gold)] transition-colors bg-white"
              >
                <div className="h-28 md:h-36" style={{ backgroundColor: a.color + '33' }} />
                <div className="p-4">
                  <p className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-1">
                    N°{a.number} · {a.family}
                  </p>
                  <p className="font-serif text-lg font-light group-hover:text-[var(--gold)] transition-colors">
                    {a.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/nuestros-aromas" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)]">
              Ver todos los aromas
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONCEPT STORE ────────────────────────────────────────────────────── */}
      <section className="section-py">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative aspect-[4/3] bg-[var(--cream)] rounded overflow-hidden order-2 md:order-1">
              <div className="absolute inset-0 bg-[url('/tiendas-bg.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-stone-800/20" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs tracking-widest uppercase mb-1">Concept Store</p>
                <p className="font-serif text-2xl font-light">Colegiales</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-3">
                Visitanos
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
                Nuestro Concept Store
              </h2>
              <p className="text-[var(--gray-600)] text-sm leading-relaxed mb-6">
                En el corazón de Colegiales encontrás nuestra tienda con todos los aromas para
                vivir en persona. También tenemos un espacio de café de especialidad para que
                la visita sea una experiencia completa.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin size={16} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                  <span>Teodoro García 2959, Colegiales, Buenos Aires</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <Clock size={16} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                  <span>Lunes a sábados · 10:00 – 19:00</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <MessageCircle size={16} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                  <a href="https://wa.me/5491163369052" className="hover:text-[var(--gold)]">
                    +54 9 11 6336-9052
                  </a>
                </li>
              </ul>
              <Link href="/tiendas" className="btn-outline inline-block px-8 py-3 text-xs tracking-widest uppercase rounded">
                Ver cómo llegar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM STRIP ──────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--gray-200)] py-10">
        <div className="container-site text-center">
          <a
            href="https://instagram.com/fidela.aromas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase hover:text-[var(--gold)] transition-colors"
          >
            <span>@fidela.aromas</span>
            <span className="text-[var(--gray-400)]">—</span>
            <span>Seguinos en Instagram</span>
          </a>
        </div>
      </section>
    </>
  )
}
