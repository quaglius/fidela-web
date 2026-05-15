import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts, type TNProduct } from '@/lib/tiendanube'
import ProductCard from '@/components/site/ProductCard'
import FadeUp from '@/components/ui/FadeUp'
import { MapPin, Clock, MessageCircle, ArrowRight, Zap, Tag } from 'lucide-react'

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

/* ── Category grid — real product representative images ──────────────────── */
const CATEGORIES_GRID = [
  {
    name: 'Velas de Soja',
    href: '/velas-de-soja',
    // Vela Lupe — product shot
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/lupe1-116177fdb85d6c531817662394131806-480-0.webp',
  },
  {
    name: 'Difusores',
    href: '/aromatizantes',
    // Home spray / difusor
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6325-scaled-e1681511963528-1536x1536-63c86a7359b0c0a91a17219540086209-480-0.webp',
  },
  {
    name: 'Boxes - Kits',
    href: '/boxes-kits',
    // Box regalo
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_9339-scaled-e1696449873304-1536x1536-b7487dc550d9a95c5917209852352855-480-0.webp',
  },
  {
    name: 'Jabones',
    href: '/jabones-naturales',
    // Jabón flor
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/flor-e1701974637186-699f7d0d30eb9c43e717206293620302-480-0.webp',
  },
]

/* ── Aromas grid — 8 blends with product photos ──────────────────────────── */
const AROMAS_GRID = [
  {
    number: 2,
    name: 'Verbena',
    family: 'Fresco',
    slug: 'verbena',
    color: '#8BAF8B',
    // Use a green-toned aceite / aromatizante shot
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8842-scaled-e1681317841299-1536x1536-62758a2ee6f417ab8417207386037479-480-0.webp',
  },
  {
    number: 5,
    name: 'Floral Velvet',
    family: 'Floral',
    slug: 'floral-velvet',
    color: '#C9A8C4',
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8453-scaled-e1685916235552-1534x1536-0788f88e8f8219233017219543914857-480-0.webp',
  },
  {
    number: 17,
    name: 'Oud Imperial',
    family: 'Terra',
    slug: 'oud-imperial',
    color: '#9C7443',
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/fidela_1500x1500-d6cea907ea13a1799e17662504066445-480-0.webp',
  },
  {
    number: 19,
    name: 'French Lavender',
    family: 'Floral',
    slug: 'french-lavander',
    color: '#A89BC9',
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8828-scaled-e1696446538937-1536x1536-b64c509761dbf2909f17219502779342-480-0.webp',
  },
  {
    number: 21,
    name: 'Jengibre & Té Blanco',
    family: 'Fresco',
    slug: 'jengibre-te-blanco',
    color: '#C4B48A',
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6420-scaled-e1696461568818-1536x1536-77992b0b0802559e1b17219546572465-480-0.webp',
  },
  {
    number: 27,
    name: 'Cardamom & Woods',
    family: 'Terra',
    slug: 'cardamom-woods',
    color: '#8C7060',
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/lupe1-116177fdb85d6c531817662394131806-480-0.webp',
  },
  {
    number: 44,
    name: 'Sándalo & Pimienta Rosa',
    family: 'Terra',
    slug: 'sandalo-pimenta-rosa',
    color: '#C48A8A',
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6325-scaled-e1681511963528-1536x1536-63c86a7359b0c0a91a17219540086209-480-0.webp',
  },
  {
    number: 46,
    name: 'Green Amber',
    family: 'Fresco',
    slug: 'green-amber',
    color: '#7A9E7A',
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_9339-scaled-e1696449873304-1536x1536-b7487dc550d9a95c5917209852352855-480-0.webp',
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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

        <div className="relative container-site pb-16 md:pb-28 text-white w-full">
          <p className="hero-badge text-[10px] tracking-[0.5em] uppercase text-[var(--gold-light)] mb-5">
            Aromas Naturales · Colegiales, Buenos Aires
          </p>
          <h1 className="hero-title font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6 max-w-2xl">
            Aromas<br />con Historia
          </h1>
          <p className="hero-sub text-sm md:text-base text-white/70 max-w-sm mb-10 leading-relaxed">
            Ocho blends de autor. Velas de soja, difusores y jabones artesanales hechos en Buenos Aires.
          </p>
          <div className="hero-ctas flex gap-3 flex-wrap">
            <Link
              href="/aromas"
              className="btn-gold cta-pulse inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase rounded"
            >
              Explorar aromas <ArrowRight size={14} />
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-[0.2em] uppercase border border-white/50 text-white hover:bg-white hover:text-[var(--black)] transition-colors duration-200 rounded"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOT SALE BANNER ──────────────────────────────────────────────────── */}
      <section className="bg-[var(--gold)] relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
            backgroundSize: '8px 8px',
          }}
        />
        <div className="relative container-site py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left — badge + title */}
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-14 h-14 bg-[var(--black)] rounded-full flex items-center justify-center">
                <Zap size={22} className="text-[var(--gold)]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-black/60 font-medium">Hot Sale Extendido</span>
                </div>
                <p className="font-serif text-3xl md:text-4xl font-light text-[var(--black)] leading-none">
                  30% <span className="font-medium">OFF</span>
                </p>
                <p className="text-xs tracking-widest uppercase text-black/70 mt-1">en toda la tienda</p>
              </div>
            </div>

            {/* Center — detail */}
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center mb-2">
                <Tag size={13} className="text-black/60" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-black/60">Hasta agotar stock</span>
              </div>
              <p className="font-serif text-xl md:text-2xl font-light text-[var(--black)]">
                Usá el código al checkout
              </p>
              <div className="mt-2 inline-block bg-[var(--black)] text-[var(--gold)] px-4 py-1.5 text-sm tracking-[0.3em] uppercase font-medium rounded">
                HOTSALE30
              </div>
            </div>

            {/* Right — CTA */}
            <div className="flex-shrink-0">
              <Link
                href="/productos"
                className="inline-flex items-center gap-2 bg-[var(--black)] text-white px-7 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[var(--gray-800)] transition-colors duration-200 rounded"
              >
                Aprovechar oferta <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID DE CATEGORÍAS ───────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <FadeUp className="flex items-end justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-light">Explorá por producto</h2>
            <Link href="/productos" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)] transition-colors hidden md:block">
              Ver todo
            </Link>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 stagger">
            {CATEGORIES_GRID.map((cat, i) => (
              <FadeUp key={cat.href} delay={i * 80}>
                <Link
                  href={cat.href}
                  className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-lg group block cursor-pointer"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Dark overlay — lifts on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
                  {/* Gold border on hover */}
                  <div className="absolute inset-0 rounded-lg ring-0 ring-[var(--gold)] transition-all duration-300 group-hover:ring-1" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <span className="text-white text-sm md:text-base font-medium tracking-wide group-hover:text-[var(--gold-light)] transition-colors duration-200">
                      {cat.name}
                    </span>
                    <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-1 group-hover:translate-y-0">
                      <span className="text-white/60 text-[10px] tracking-widest uppercase">Ver productos</span>
                      <ArrowRight size={10} className="text-white/60" />
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
        <section className="section-py">
          <div className="container-site">
            <FadeUp className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-1">Lo más elegido</p>
                <h2 className="font-serif text-3xl md:text-4xl font-light">Más vendidos</h2>
              </div>
              <Link href="/productos" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)] transition-colors hidden md:block">
                Ver todos
              </Link>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-none">
                {products.map((p, i) => (
                  <div key={p.id} className="min-w-[200px] md:min-w-0 snap-start flex-shrink-0 md:flex-shrink">
                    <ProductCard product={p} priority={i < 4} />
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── NUESTROS AROMAS ──────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <FadeUp className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">8 blends propios</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light">Nuestros aromas</h2>
            </div>
            <Link href="/nuestros-aromas" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)] transition-colors hidden md:block">
              Ver todos
            </Link>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {AROMAS_GRID.map((a, i) => (
              <FadeUp key={a.slug} delay={i * 60}>
                <Link
                  href={`/aromas/${a.slug}`}
                  className="group block rounded-lg overflow-hidden bg-white border border-[var(--gray-200)] hover:border-[var(--gold)] hover:shadow-lg transition-all duration-250 cursor-pointer"
                >
                  {/* Product image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={a.image}
                      alt={a.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Color tint overlay */}
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-20 transition-opacity duration-300 group-hover:opacity-10"
                      style={{ backgroundColor: a.color }}
                    />
                    {/* Number badge */}
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[9px] tracking-widest uppercase px-2 py-1 rounded backdrop-blur-sm">
                      N°{a.number}
                    </div>
                    {/* Family badge */}
                    <div
                      className="absolute top-3 right-3 text-white text-[9px] tracking-widest uppercase px-2 py-1 rounded"
                      style={{ backgroundColor: a.color + 'CC' }}
                    >
                      {a.family}
                    </div>
                  </div>
                  {/* Name */}
                  <div className="p-4">
                    <p className="font-serif text-base md:text-lg font-light group-hover:text-[var(--gold)] transition-colors duration-200 leading-tight">
                      {a.name}
                    </p>
                    <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-[10px] tracking-widest uppercase text-[var(--gray-400)]">Ver blend</span>
                      <ArrowRight size={10} className="text-[var(--gray-400)]" />
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/nuestros-aromas" className="text-xs tracking-widest uppercase underline hover:text-[var(--gold)] transition-colors">
              Ver todos los aromas
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONCEPT STORE ────────────────────────────────────────────────────── */}
      <section className="section-py">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Image */}
            <FadeUp className="relative aspect-[4/3] rounded-lg overflow-hidden order-2 md:order-1 group">
              <Image
                src="/tiendas-bg.jpg"
                alt="Concept Store Fidela — Colegiales"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-10" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1 text-white/70">Concept Store</p>
                <p className="font-serif text-2xl font-light">Colegiales</p>
              </div>
            </FadeUp>

            {/* Text */}
            <FadeUp className="order-1 md:order-2" delay={150}>
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
                  <li key={text} className="flex items-start gap-3 text-sm text-[var(--gray-800)] group/item">
                    <Icon size={15} className="text-[var(--gold)] mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover/item:scale-110" />
                    {href ? (
                      <a href={href} className="hover:text-[var(--gold)] transition-colors duration-200">{text}</a>
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
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── NUESTROS AROMAS DARK BANNER ──────────────────────────────────────── */}
      <FadeUp>
        <section className="bg-[var(--black)] text-white py-24 md:py-32">
          <div className="container-site text-center">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">8 blends de autor</p>
            <h2 className="font-serif text-5xl md:text-7xl font-light mb-6 text-white/90">Nuestros Aromas</h2>
            <p className="text-sm text-white/50 max-w-md mx-auto mb-10 leading-relaxed">
              Cada blend cuenta una historia. Verbena, Floral Velvet, Oud Imperial y más.
              Encontrá tu aroma.
            </p>
            <Link
              href="/aromas"
              className="inline-flex items-center gap-2 border border-[var(--gold)] text-[var(--gold)] px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[var(--gold)] hover:text-white transition-colors duration-200 rounded"
            >
              Explorar aromas <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      </FadeUp>

      {/* ── INSTAGRAM STRIP ──────────────────────────────────────────────────── */}
      <section className="border-t border-[var(--gray-200)] py-12 bg-[var(--gray-100)]">
        <div className="container-site text-center">
          <FadeUp>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gray-400)] mb-3">Seguinos</p>
            <a
              href="https://instagram.com/fidela.aromas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-serif text-2xl md:text-3xl font-light hover:text-[var(--gold)] transition-colors duration-200"
            >
              @fidela.aromas
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
