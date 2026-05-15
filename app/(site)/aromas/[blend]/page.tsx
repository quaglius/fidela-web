import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AROMAS, getAromaBySlug } from '@/lib/aromas-data'
import { getAllProducts } from '@/lib/tiendanube'
import ProductCard from '@/components/site/ProductCard'

export const revalidate = 3600

export function generateStaticParams() {
  return AROMAS.map((a) => ({ blend: a.slug }))
}

export function generateMetadata({ params }: { params: { blend: string } }): Metadata {
  const aroma = getAromaBySlug(params.blend)
  if (!aroma) return {}
  return {
    title: `${aroma.name} — Aroma FIDELA`,
    description: aroma.tagline,
  }
}

const FAMILY_LABELS: Record<string, string> = {
  Fresco: 'Familia Fresca',
  Floral: 'Familia Floral',
  Terra: 'Familia Terra',
}

export default async function BlendPage({ params }: { params: { blend: string } }) {
  const aroma = getAromaBySlug(params.blend)
  if (!aroma) notFound()

  // Sibling aromas (same family, different slug)
  const siblings = AROMAS.filter((a) => a.family === aroma.family && a.slug !== aroma.slug).slice(0, 3)

  // Related TN products
  let relatedProducts: Awaited<ReturnType<typeof getAllProducts>> = []
  try {
    const all = await getAllProducts()
    const keywords = aroma.name.split(/[\s&]+/).map((k) => k.toLowerCase()).filter((k) => k.length > 3)
    relatedProducts = all
      .filter((p) => {
        const text = ((p.name?.es ?? '') + ' ' + (p.description?.es ?? '')).toLowerCase()
        return keywords.some((k) => text.includes(k))
      })
      .slice(0, 4)
  } catch { /* skip */ }

  const familyLabel = FAMILY_LABELS[aroma.family] ?? aroma.family
  const prevAroma = AROMAS[AROMAS.findIndex((a) => a.slug === aroma.slug) - 1] ?? null
  const nextAroma = AROMAS[AROMAS.findIndex((a) => a.slug === aroma.slug) + 1] ?? null

  return (
    <div>
      {/* ── BANNER ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] md:h-[75vh] min-h-[460px] overflow-hidden flex items-center">
        <Image
          src={aroma.image}
          alt={aroma.name}
          fill
          className="object-cover object-center scale-[1.02]"
          priority
          sizes="100vw"
        />
        {/* Left-to-right gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 container-site">
          <nav className="flex items-center gap-2 text-[9px] tracking-widest uppercase text-white/40">
            <Link href="/aromas" className="hover:text-[var(--gold)] transition-colors">Aromas</Link>
            <span>/</span>
            <span className="text-white/60">{aroma.name}</span>
          </nav>
        </div>

        {/* Copy */}
        <div className="relative container-site text-white">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/40">N°{aroma.number}</span>
              <span
                className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: aroma.color + 'BB', color: '#fff' }}
              >
                {familyLabel}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-none mb-4 tracking-tight">
              {aroma.name}
            </h1>
            <p className="text-sm md:text-base italic text-white/65 leading-relaxed">
              &ldquo;{aroma.tagline}&rdquo;
            </p>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="absolute bottom-6 left-0 right-0 container-site flex justify-between items-center">
          {prevAroma ? (
            <Link
              href={`/aromas/${prevAroma.slug}`}
              className="text-[9px] tracking-widest uppercase text-white/40 hover:text-[var(--gold)] transition-colors flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              {prevAroma.name}
            </Link>
          ) : <span />}
          {nextAroma ? (
            <Link
              href={`/aromas/${nextAroma.slug}`}
              className="text-[9px] tracking-widest uppercase text-white/40 hover:text-[var(--gold)] transition-colors flex items-center gap-2"
            >
              {nextAroma.name}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
          ) : <span />}
        </div>
      </section>

      {/* ── INTRO — descripción corta + notas olfativas ─────────────────────── */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Texto */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">El aroma</p>
              <p className="font-serif text-2xl md:text-3xl font-light leading-snug mb-6 text-[var(--black)]">
                {aroma.description}
              </p>

              {/* Notas olfativas */}
              <div className="border-t border-[var(--gray-200)] pt-6 mt-6">
                <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--gray-400)] mb-4">Notas olfativas</p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Salida', notes: aroma.notes.top },
                    { label: 'Corazón', notes: aroma.notes.heart },
                    { label: 'Fondo', notes: aroma.notes.base },
                  ].map(({ label, notes }) => (
                    <div key={label} className="flex gap-4 items-baseline">
                      <span className="text-[9px] tracking-widest uppercase text-[var(--gold)] w-16 flex-shrink-0">{label}</span>
                      <span className="text-sm text-[var(--gray-600)]">{notes}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={aroma.images[0] ?? aroma.image}
                alt={aroma.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Color accent overlay */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-20"
                style={{ backgroundColor: aroma.color }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORIA ────────────────────────────────────────────────────────── */}
      <section className="section-py">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Imagen izquierda */}
            {aroma.images[1] ? (
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden order-2 md:order-1 shadow-lg">
                <Image
                  src={aroma.images[1]}
                  alt={`${aroma.name} detalle`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              /* Fallback: color block con número */
              <div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden order-2 md:order-1 flex items-center justify-center"
                style={{ backgroundColor: aroma.color + '22' }}
              >
                <span
                  className="font-serif text-[120px] font-light opacity-20 select-none"
                  style={{ color: aroma.color }}
                >
                  {aroma.number}
                </span>
              </div>
            )}

            {/* Texto derecha */}
            <div className="order-1 md:order-2">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Origen &amp; inspiración</p>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-6 leading-snug">
                La historia detrás del aroma
              </h2>
              <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-8">
                {aroma.story}
              </p>

              {/* Properties */}
              <div className="flex flex-wrap gap-2">
                {aroma.properties.map((prop) => (
                  <span
                    key={prop}
                    className="px-3 py-1.5 text-[9px] tracking-widest uppercase rounded-full border font-medium capitalize"
                    style={{ borderColor: aroma.color + '80', color: aroma.color }}
                  >
                    {prop}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AMBIENTES + FAMILIA ──────────────────────────────────────────────── */}
      <section className="section-py" style={{ backgroundColor: aroma.color + '12' }}>
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Ambientes */}
            <div className="md:col-span-2">
              <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Ambientes ideales</p>
              <h3 className="font-serif text-2xl font-light mb-6">¿Dónde usarlo?</h3>
              <div className="flex flex-wrap gap-3">
                {aroma.environments.map((env) => (
                  <div
                    key={env}
                    className="flex items-center gap-2 bg-white border border-[var(--gray-200)] rounded-full px-4 py-2 shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: aroma.color }} />
                    <span className="text-xs capitalize text-[var(--gray-600)]">{env}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Familia */}
            <div className="border-t md:border-t-0 md:border-l border-[var(--gray-200)] pt-8 md:pt-0 md:pl-12">
              <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Familia olfativa</p>
              <div
                className="w-12 h-12 rounded-full mb-4"
                style={{ backgroundColor: aroma.color }}
              />
              <h3 className="font-serif text-2xl font-light mb-2">{familyLabel}</h3>
              <p className="text-xs text-[var(--gray-400)] leading-relaxed">
                {aroma.family === 'Fresco' && 'Notas limpias, herbáceas y cítricas. Energizantes y vigorizantes.'}
                {aroma.family === 'Floral' && 'Pétalos, flores y botanicals. Románticos y delicados.'}
                {aroma.family === 'Terra' && 'Maderas, especias y resinas. Cálidos y envolventes.'}
              </p>
              <Link
                href="/nuestros-aromas"
                className="inline-flex items-center gap-2 mt-4 text-[9px] tracking-widest uppercase text-[var(--gold)] hover:underline"
              >
                Ver todos los aromas
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AROMAS RELACIONADOS (misma familia) ─────────────────────────────── */}
      {siblings.length > 0 && (
        <section className="section-py border-t border-[var(--gray-100)]">
          <div className="container-site">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--gold)] mb-2">Misma familia</p>
            <h2 className="font-serif text-2xl md:text-3xl font-light mb-8">Otros aromas {aroma.family === 'Terra' ? 'Terra' : aroma.family === 'Floral' ? 'Florales' : 'Frescos'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/aromas/${s.slug}`}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--gray-200)] hover:border-[var(--gold)] hover:bg-[var(--cream)] transition-all duration-200"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={s.image} alt={s.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-widest uppercase text-[var(--gray-400)] mb-0.5">N°{s.number}</p>
                    <h3 className="font-serif text-base font-light group-hover:text-[var(--gold)] transition-colors leading-tight">{s.name}</h3>
                    <p className="text-[10px] text-[var(--gray-400)] mt-0.5 truncate italic">{s.tagline}</p>
                  </div>
                  <svg className="w-4 h-4 text-[var(--gray-400)] group-hover:text-[var(--gold)] transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUCTOS RELACIONADOS ───────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="section-py bg-[var(--cream)]">
          <div className="container-site">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--gold)] mb-2">Disponibles en</p>
            <h2 className="font-serif text-2xl md:text-3xl font-light mb-8">
              Productos con {aroma.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--black)] section-py text-white text-center">
        <div className="container-site max-w-lg mx-auto">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Hot Sale · 30% OFF</p>
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">
            Llevate {aroma.name}
          </h2>
          <p className="text-sm text-white/50 mb-8 leading-relaxed">
            Disponible en velas, difusores y spray de telas. Descuento aplicado automáticamente.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 bg-[var(--gold)] text-white px-8 py-4 text-xs tracking-[0.2em] uppercase rounded hover:bg-[var(--gold-dark)] transition-colors duration-200"
          >
            Ver todos los productos
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
