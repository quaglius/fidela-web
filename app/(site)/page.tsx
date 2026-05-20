import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts, type TNProduct } from '@/lib/tiendanube'
import ProductCard from '@/components/site/ProductCard'
import FadeUp from '@/components/ui/FadeUp'
import { MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'FIDELA — Cada aroma cuenta una historia',
  description:
    'Perfumes artesanales elaborados en Buenos Aires. Veganos, sin ftalatos, producidos a mano. Concept Store en Colegiales.',
  openGraph: {
    title: 'FIDELA — Cada aroma cuenta una historia',
    description: 'Perfumes artesanales elaborados en Buenos Aires. Veganos, sin ftalatos, producidos a mano.',
    images: [{ url: '/media/MG_9566-scaled.jpg', width: 1200, height: 800 }],
  },
}

/* ── Categorías ──────────────────────────────────────────────────────────── */
const CATEGORIES_GRID = [
  { name: 'Velas de Soja',    href: '/velas-de-soja',      image: '/media/globo-brillante-1024x1024.jpg' },
  { name: 'Difusores',        href: '/aromatizantes',       image: '/media/difusor-varillas-onduladas.jpg' },
  { name: 'Boxes · Kits',     href: '/boxes-kits',          image: '/media/caja-jabones-tres.jpg' },
  { name: 'Jabones',          href: '/jabones-naturales',   image: '/media/flor.jpg' },
]

/* ── 4 Fragancias 2026 ───────────────────────────────────────────────────── */
const FRAGANCIAS = [
  {
    name: 'Velvet',
    concept: 'Sofisticación',
    color: '#7E2738',
    ingredients: 'Rosa Búlgara · Peonías · Higo · Muguet',
    slug: 'velvet',
    photo: '/media/_MG_3566.jpg',
  },
  {
    name: 'Linaje',
    concept: 'Magnetismo',
    color: '#CB6F36',
    ingredients: 'Sándalo · Pimienta Rosa · Ámbar · Frambuesa',
    slug: 'linaje',
    photo: '/media/_MG_3545.jpg',
  },
  {
    name: 'Roble',
    concept: 'Introspección',
    color: '#496130',
    ingredients: 'Cardamomo · Vetiver · Cedro · White Musk',
    slug: 'roble',
    photo: '/media/_MG_3533.jpg',
  },
  {
    name: 'Brisa',
    concept: 'Renovación',
    color: '#77C1EC',
    ingredients: 'Verbena · Lima Ácida · Pomelo Rosado · Higo',
    slug: 'brisa',
    photo: '/media/_MG_3521.jpg',
  },
]

async function getFeaturedProducts(): Promise<TNProduct[]> {
  try {
    const all = await getAllProducts()
    return all.slice(0, 8)
  } catch { return [] }
}

export default async function HomePage() {
  const products = await getFeaturedProducts()

  return (
    <>
      {/* ── HERO — editorial split ────────────────────────────────────────────
          Izquierda: blanco-fidela + claim Garamond
          Derecha: foto editorial full-bleed
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row min-h-[92vh]">

        {/* Izquierda — contenido de marca */}
        <div className="flex flex-col justify-center bg-[var(--blanco-fidela)] px-8 py-16 md:px-14 lg:px-20 md:w-[45%] lg:w-[42%] z-10">

          {/* Hot Sale — discreto, on-brand */}
          <div className="flex items-center gap-3 mb-12">
            <span className="bg-[var(--negro-fidela)] text-[var(--blanco-fidela)] text-[8px] font-mono tracking-[0.25em] uppercase px-3 py-1.5">
              HOT SALE
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--negro-fidela)]/40">
              30% off · toda la tienda
            </span>
          </div>

          {/* Claim — Garamond grande */}
          <h1 className="font-serif text-[52px] md:text-[58px] lg:text-[72px] font-light leading-[1.05] text-[var(--negro-fidela)] mb-8">
            Cada aroma<br />
            cuenta una<br />
            historia.
          </h1>

          <div className="w-10 h-px bg-[var(--negro-fidela)]/25 mb-8" />

          <p className="text-sm text-[var(--negro-fidela)]/55 leading-relaxed mb-12 max-w-[340px]">
            Blends artesanales elaborados en Buenos Aires.
            Veganos · Sin ftalatos · Producidos a mano.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/productos"
              className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] tracking-[0.2em] uppercase"
            >
              Ver catálogo <ArrowRight size={12} />
            </Link>
            <Link
              href="/nuestros-aromas"
              className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] tracking-[0.2em] uppercase"
            >
              Nuestros aromas
            </Link>
          </div>

          {/* Isologo pequeño al pie */}
          <div className="mt-auto pt-16 flex items-center gap-3 opacity-30">
            <Image src="/brand/logos/isologo-01.png" alt="Fidela" width={28} height={28} className="object-contain" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--negro-fidela)]">
              Hecho a mano · Buenos Aires
            </span>
          </div>
        </div>

        {/* Derecha — foto editorial apilada */}
        <div className="relative flex-1 h-[55vw] md:h-auto overflow-hidden">
          {/* Foto principal */}
          <Image
            src="/media/MG_9566-scaled.jpg"
            alt="Fidela — Aromas artesanales"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          {/* Overlay sutil — gradiente izquierda para fusionar con el blanco */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--blanco-fidela)] to-transparent hidden md:block" />

          {/* Badge año sobre la foto */}
          <div className="absolute top-6 right-6 border border-white/30 bg-black/20 backdrop-blur-sm px-4 py-2.5 text-white">
            <p className="font-mono text-[8px] tracking-[0.35em] uppercase">Colección</p>
            <p className="font-serif text-xl font-light leading-none">2026</p>
          </div>
        </div>
      </section>

      {/* ── 4 FRAGANCIAS 2026 ────────────────────────────────────────────────── */}
      <section className="bg-[var(--negro-fidela)] overflow-hidden">

        <div className="container-site py-6 md:py-10 border-b border-white/8">
          <FadeUp className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--pantone-fidela)]">
                Colección 2026
              </span>
              <span className="text-white/15 text-lg">—</span>
              <span className="font-serif text-lg font-light text-[var(--blanco-fidela)]">
                4 blends propios
              </span>
            </div>
            <Link
              href="/nuestros-aromas"
              className="hidden md:flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors duration-200"
            >
              Ver todos <ArrowRight size={10} />
            </Link>
          </FadeUp>
        </div>

        {/* Grid de fragancias */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {FRAGANCIAS.map((f, i) => (
            <FadeUp key={f.slug} delay={i * 80}>
              <Link
                href={`/aromas/${f.slug}`}
                className="group relative flex flex-col overflow-hidden border-r border-b border-white/8 last:border-r-0 lg:last:border-r-0"
                style={{ '--fragrance-color': f.color } as React.CSSProperties}
              >
                {/* Foto editorial */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={f.photo}
                    alt={f.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Overlay degradado inferior siempre visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--negro-fidela)] via-transparent to-transparent opacity-80" />
                  {/* Overlay de color de fragancia en hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: f.color }}
                  />
                  {/* Línea de color superior */}
                  <div className="absolute top-0 inset-x-0 h-0.5" style={{ backgroundColor: f.color }} />
                </div>

                {/* Info card */}
                <div className="relative bg-[var(--negro-fidela)] px-5 py-6 flex-1 group-hover:bg-white/4 transition-colors duration-300">
                  {/* Concepto */}
                  <p
                    className="font-mono text-[9px] tracking-[0.35em] uppercase mb-3 transition-colors duration-300"
                    style={{ color: f.color }}
                  >
                    {f.concept}
                  </p>

                  {/* Nombre Garamond grande */}
                  <h3 className="font-serif text-3xl font-light text-[var(--blanco-fidela)] mb-4 leading-none">
                    {f.name}
                  </h3>

                  {/* Ingredientes en Chivo Mono */}
                  <p className="font-mono text-[9px] tracking-wide text-white/35 leading-relaxed">
                    {f.ingredients}
                  </p>

                  {/* CTA hover */}
                  <div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/50">
                      Explorar
                    </span>
                    <ArrowRight size={10} className="text-white/50" />
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CATEGORÍAS ───────────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--blanco-fidela)]">
        <div className="container-site">
          <FadeUp className="flex items-end justify-between mb-10">
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-3">
                Toda la línea
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--negro-fidela)]">
                Explorá por producto
              </h2>
            </div>
            <Link
              href="/productos"
              className="hidden md:flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--negro-fidela)]/40 hover:text-[var(--negro-fidela)] transition-colors"
            >
              Ver todo <ArrowRight size={10} />
            </Link>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {CATEGORIES_GRID.map((cat, i) => (
              <FadeUp key={cat.href} delay={i * 80}>
                <Link
                  href={cat.href}
                  className="relative overflow-hidden group block bg-[var(--pantone-fidela)]"
                  style={{ aspectRatio: i === 0 ? '2/3' : '3/4' }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--negro-fidela)]/80 via-[var(--negro-fidela)]/15 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="font-serif text-base md:text-lg font-light text-white leading-tight mb-1">
                      {cat.name}
                    </p>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/60">
                        Ver productos
                      </span>
                      <ArrowRight size={9} className="text-white/60" />
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÁS VENDIDOS ─────────────────────────────────────────────────────── */}
      {products.length > 0 && (
        <section className="section-py bg-white border-t border-[var(--pantone-fidela)]/40">
          <div className="container-site">
            <FadeUp className="flex items-end justify-between mb-10">
              <div>
                <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-3">
                  Lo más elegido
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--negro-fidela)]">
                  Más vendidos
                </h2>
              </div>
              <Link
                href="/productos"
                className="hidden md:flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--negro-fidela)]/40 hover:text-[var(--negro-fidela)] transition-colors"
              >
                Ver todos <ArrowRight size={10} />
              </Link>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-none">
                {products.map((p, i) => (
                  <div key={p.id} className="min-w-[170px] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink">
                    <ProductCard product={p} priority={i < 4} />
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── CONCEPT STORE — foto-driven ──────────────────────────────────────── */}
      <section className="bg-[var(--negro-fidela)] overflow-hidden">

        {/* Grid de fotos — full width */}
        <div className="grid grid-cols-3 md:grid-cols-4 h-[60vw] md:h-[50vh] lg:h-[65vh]">
          {[
            { src: '/media/MG_3585.jpg', span: 'col-span-2 md:col-span-2' },
            { src: '/media/MG_3587.jpg', span: 'col-span-1' },
            { src: '/media/MG_3669.jpg', span: 'col-span-1 hidden md:block' },
          ].map((photo, i) => (
            <div key={i} className={`relative overflow-hidden ${photo.span}`}>
              <Image
                src={photo.src}
                alt="Fidela Concept Store"
                fill
                className="object-cover object-center hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 768px) 66vw, 33vw"
              />
              <div className="absolute inset-0 bg-[var(--negro-fidela)]/10" />
            </div>
          ))}
        </div>

        {/* Info section */}
        <div className="container-site py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            <FadeUp>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--pantone-fidela)] mb-5">
                Visitanos
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[var(--blanco-fidela)] leading-[1.05] mb-8">
                Nuestro<br />Concept Store
              </h2>
              <p className="text-sm text-white/45 leading-relaxed max-w-sm">
                En el corazón de Colegiales encontrás nuestra tienda con todos
                los aromas para vivir en persona. Un espacio de calma, café de
                especialidad y rituales cotidianos.
              </p>
            </FadeUp>

            <FadeUp delay={150} className="flex flex-col gap-6 md:pt-16">
              {[
                { icon: MapPin,        text: 'Teodoro García 2959, Colegiales, Buenos Aires' },
                { icon: Clock,         text: 'Lunes a sábados · 10:00 – 19:00' },
                { icon: MessageCircle, text: '+54 9 11 6336-9052', href: 'https://wa.me/5491163369052' },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-start gap-4 group/item">
                  <Icon size={15} className="text-[var(--pantone-fidela)] mt-0.5 flex-shrink-0" />
                  {href
                    ? <a href={href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-light">{text}</a>
                    : <span className="text-sm text-white/60 font-light">{text}</span>
                  }
                </div>
              ))}

              <div className="pt-4">
                <Link
                  href="/tiendas"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/60 hover:border-white hover:text-white transition-all duration-200 px-8 py-3.5 font-mono text-[10px] tracking-[0.2em] uppercase"
                >
                  Ver cómo llegar <ArrowRight size={11} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Segunda fila de fotos */}
        <div className="grid grid-cols-4 h-[25vw] md:h-[22vh] border-t border-white/8">
          {[
            '/media/MG_3586.jpg',
            '/media/MG_3280.jpg',
            '/media/MG_3264.jpg',
            '/media/MG_3743.jpg',
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden border-r border-white/8 last:border-r-0">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover object-center hover:scale-[1.05] transition-transform duration-700"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-[var(--negro-fidela)]/20" />
            </div>
          ))}
        </div>
      </section>

      {/* ── INSTAGRAM ────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[var(--blanco-fidela)] border-t border-[var(--pantone-fidela)]/50">
        <div className="container-site">
          <FadeUp className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-3">
                Seguinos
              </p>
              <a
                href="https://instagram.com/fidela.aromas"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-3xl md:text-4xl font-light text-[var(--negro-fidela)] hover:opacity-60 transition-opacity duration-200"
              >
                @fidela.aromas
              </a>
            </div>
            <Image
              src="/brand/logos/isologo-01.png"
              alt="Fidela"
              width={56}
              height={56}
              className="object-contain opacity-20"
            />
          </FadeUp>
        </div>
      </section>
    </>
  )
}
