import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts, type TNProduct } from '@/lib/tiendanube'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/site/ProductCard'
import { MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'FIDELA — Aromas con Historia',
  description:
    'Velas de soja, difusores y jabones naturales artesanales. Concept Store en Colegiales, Buenos Aires.',
  openGraph: {
    title: 'FIDELA — Aromas con Historia',
    description: 'Aromas naturales con identidad propia. Colegiales, Buenos Aires.',
    images: [{ url: '/hero-bg.jpg', width: 1200, height: 800 }],
  },
}

const CATEGORIES_GRID = [
  { name: 'Velas de Soja', href: '/velas-de-soja', image: '/cat-velas.jpg' },
  { name: 'Difusores', href: '/aromatizantes', image: '/cat-difusores.jpg' },
  { name: 'Boxes - Kits', href: '/boxes-kits', image: '/cat-boxes.jpg' },
  { name: 'Jabones', href: '/jabones-naturales', image: '/cat-jabones.jpg' },
]

const AROMAS_GRID = [
  { number: 2,  name: 'Verbena',               family: 'Fresco',  slug: 'verbena',            color: '#8BAF8B' },
  { number: 5,  name: 'Floral Velvet',          family: 'Floral',  slug: 'floral-velvet',      color: '#C9A8C4' },
  { number: 17, name: 'Oud Imperial',           family: 'Terra',   slug: 'oud-imperial',       color: '#9C7443' },
  { number: 19, name: 'French Lavender',        family: 'Floral',  slug: 'french-lavander',    color: '#A89BC9' },
  { number: 21, name: 'Jengibre & Té Blanco',   family: 'Fresco',  slug: 'jengibre-te-blanco', color: '#C4B48A' },
  { number: 27, name: 'Cardamom & Woods',       family: 'Terra',   slug: 'cardamom-woods',     color: '#8C7060' },
  { number: 44, name: 'Sándalo & Pimienta Rosa',family: 'Terra',   slug: 'sandalo-pimenta-rosa',color: '#C48A8A' },
  { number: 46, name: 'Green Amber',            family: 'Fresco',  slug: 'green-amber',        color: '#7A9E7A' },
]

async function getFeaturedProducts(): Promise<TNProduct[]> {
  try {
    const all = await getAllProducts()
    return all.slice(0, 8)
  } catch { return [] }
}

async function getAromaDelMes() {
  try {
    const { data } = await supabase
      .from('site_config').select('value').eq('key', 'aroma_del_mes_slug').single()
    const slug = data?.value ?? 'floral-velvet'
    const { data: aroma } = await supabase.from('aromas').select('*').eq('slug', slug).single()
    return aroma
  } catch { return null }
}

export default async function HomePage() {
  const [products, aromaDelMes] = await Promise.all([getFeaturedProducts(), getAromaDelMes()])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-[92vh] min-h-[600px] flex items-end overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="FIDELA — Aromas con Historia"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Gradiente overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        <div className="relative container-site pb-16 md:pb-28 text-white w-full">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold-light)] mb-5">
            Aromas Naturales · Colegiales, Buenos Aires
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6 max-w-2xl">
            Aromas<br />con Historia
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-sm mb-10 leading-relaxed">
            Ocho blends de autor. Velas de soja, difusores y jabones artesanales hechos en Buenos Aires.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/aromas"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase rounded"
            >
              Explorar aromas <ArrowRight size={14} />
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase border border-white/50 text-white hover:bg-white hover:text-[var(--black)] transition-colors rounded"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* ── GRID DE CATEGORÍAS ───────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-light">Explorá por producto</h2>
            <Link href="/productos" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)] hidden md:block">
              Ver todo
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {CATEGORIES_GRID.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-lg group"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
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
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-1">Lo más elegido</p>
                <h2 className="font-serif text-3xl md:text-4xl font-light">Más vendidos</h2>
              </div>
              <Link href="/productos" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)] hidden md:block">
                Ver todos
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-none">
              {products.map((p, i) => (
                <div key={p.id} className="min-w-[200px] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink">
                  <ProductCard product={p} priority={i < 4} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BANNER AROMA DEL MES ─────────────────────────────────────────────── */}
      {aromaDelMes ? (
        <section className="bg-[var(--black)] text-white py-24 md:py-32">
          <div className="container-site text-center">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">Aroma del mes</p>
            <p className="text-xs tracking-widest uppercase text-white/30 mb-3">
              Blend N°{aromaDelMes.number}
            </p>
            <h2
              className="font-serif text-6xl md:text-8xl font-light mb-6 leading-none"
              style={{ color: aromaDelMes.color_hex ?? '#C8975A' }}
            >
              {aromaDelMes.name}
            </h2>
            {aromaDelMes.tagline && (
              <p className="text-sm md:text-base text-white/50 max-w-md mx-auto mb-10 italic font-serif leading-relaxed">
                &ldquo;{aromaDelMes.tagline}&rdquo;
              </p>
            )}
            <Link
              href={`/aromas/${aromaDelMes.slug}`}
              className="inline-flex items-center gap-2 border border-[var(--gold)] text-[var(--gold)] px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[var(--gold)] hover:text-white transition-colors rounded"
            >
              Conocer el aroma <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      ) : (
        /* Fallback si Supabase no tiene datos */
        <section className="bg-[var(--black)] text-white py-24 md:py-32">
          <div className="container-site text-center">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">8 blends de autor</p>
            <h2 className="font-serif text-6xl md:text-7xl font-light mb-6 text-white/90">Nuestros Aromas</h2>
            <p className="text-sm text-white/50 max-w-md mx-auto mb-10">
              Cada blend cuenta una historia. Verbena, Floral Velvet, Oud Imperial y más.
            </p>
            <Link
              href="/aromas"
              className="inline-flex items-center gap-2 border border-[var(--gold)] text-[var(--gold)] px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[var(--gold)] hover:text-white transition-colors rounded"
            >
              Explorar aromas <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      )}

      {/* ── NUESTROS AROMAS ──────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">8 blends propios</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light">Nuestros aromas</h2>
            </div>
            <Link href="/nuestros-aromas" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)] hidden md:block">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {AROMAS_GRID.map((a) => (
              <Link
                key={a.slug}
                href={`/aromas/${a.slug}`}
                className="group block rounded-lg overflow-hidden bg-white border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-md transition-all duration-200"
              >
                <div
                  className="h-24 md:h-32 transition-all duration-300 group-hover:opacity-90"
                  style={{ backgroundColor: a.color + '40', backgroundImage: `radial-gradient(circle at 30% 70%, ${a.color}60, transparent 70%)` }}
                />
                <div className="p-4">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[var(--gray-400)] mb-1">
                    N°{a.number} · {a.family}
                  </p>
                  <p className="font-serif text-base md:text-lg font-light group-hover:text-[var(--gold)] transition-colors leading-tight">
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
            {/* Imagen */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden order-2 md:order-1">
              <Image
                src="/tiendas-bg.jpg"
                alt="Concept Store Fidela — Colegiales"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/15" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1 text-white/70">Concept Store</p>
                <p className="font-serif text-2xl font-light">Colegiales</p>
              </div>
            </div>

            {/* Texto */}
            <div className="order-1 md:order-2">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Visitanos</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-5 leading-tight">
                Nuestro<br />Concept Store
              </h2>
              <p className="text-[var(--gray-600)] text-sm leading-relaxed mb-8">
                En el corazón de Colegiales encontrás nuestra tienda con todos los aromas para vivir en persona.
                También tenemos un espacio de café de especialidad para que la visita sea una experiencia completa.
              </p>
              <ul className="flex flex-col gap-4 mb-10">
                {[
                  { icon: MapPin,        text: 'Teodoro García 2959, Colegiales, Buenos Aires' },
                  { icon: Clock,         text: 'Lunes a sábados · 10:00 – 19:00' },
                  { icon: MessageCircle, text: '+54 9 11 6336-9052', href: 'https://wa.me/5491163369052' },
                ].map(({ icon: Icon, text, href }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-[var(--gray-800)]">
                    <Icon size={15} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                    {href ? (
                      <a href={href} className="hover:text-[var(--gold)] transition-colors">{text}</a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </li>
                ))}
              </ul>
              <Link
                href="/tiendas"
                className="inline-flex items-center gap-2 btn-outline px-8 py-3.5 text-xs tracking-[0.2em] uppercase rounded"
              >
                Ver cómo llegar <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM STRIP ──────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--gray-200)] py-12 bg-[var(--gray-100)]">
        <div className="container-site text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gray-400)] mb-3">Seguinos</p>
          <a
            href="https://instagram.com/fidela.aromas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-serif text-2xl md:text-3xl font-light hover:text-[var(--gold)] transition-colors"
          >
            @fidela.aromas
          </a>
        </div>
      </section>
    </>
  )
}
