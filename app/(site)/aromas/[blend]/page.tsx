import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { AROMAS, getAllAromas, getAromaBySlug } from '@/lib/aromas-data'
import { getAllProducts } from '@/lib/tiendanube'
import ProductCard from '@/components/site/ProductCard'

export const revalidate = 3600

export function generateStaticParams() {
  return getAllAromas().map((a) => ({ blend: a.slug }))
}

export function generateMetadata({ params }: { params: { blend: string } }): Metadata {
  const aroma = getAromaBySlug(params.blend)
  if (!aroma) return {}
  return {
    title: `${aroma.name} — ${aroma.concept} | FIDELA`,
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

  const allAromas = getAllAromas()
  const siblings = allAromas.filter((a) => a.family === aroma.family && a.slug !== aroma.slug).slice(0, 3)

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
  const aromaIndex = allAromas.findIndex((a) => a.slug === aroma.slug)
  const prevAroma = allAromas[aromaIndex - 1] ?? null
  const nextAroma = allAromas[aromaIndex + 1] ?? null

  const hasGraphics = !!(aroma.trama && aroma.icon)

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative h-[75vh] md:h-[85vh] min-h-[520px] overflow-hidden flex items-center"
        style={{ backgroundColor: aroma.color }}
      >
        {/* Trama de fragancia como fondo */}
        {aroma.trama ? (
          <Image
            src={aroma.trama}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
            aria-hidden
          />
        ) : (
          <Image
            src={aroma.image}
            alt={aroma.name}
            fill
            className="object-cover object-center scale-[1.02]"
            priority
            sizes="100vw"
          />
        )}

        {/* Ilustración botánica decorativa — multiply hace desaparecer el fondo blanco */}
        {aroma.icon && (
          <div
            className="absolute right-[-6%] bottom-0 w-[62%] h-[110%] pointer-events-none select-none"
            style={{ mixBlendMode: 'multiply', opacity: 0.32 }}
            aria-hidden
          >
            <Image
              src={aroma.icon}
              alt=""
              fill
              className="object-contain object-right-bottom"
              sizes="62vw"
            />
          </div>
        )}

        {/* Gradient para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 container-site">
          <nav className="flex items-center gap-2 text-[9px] tracking-widest uppercase text-white/40">
            <Link href="/nuestros-aromas" className="hover:text-white/70 transition-colors">Aromas</Link>
            <span>/</span>
            <span className="text-white/60">{aroma.name}</span>
          </nav>
        </div>

        {/* Contenido principal */}
        <div className="relative container-site text-white">
          <div className="max-w-xl">
            {/* Concepto */}
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/50 mb-4">
              {aroma.concept}
            </p>

            {/* Nombre */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-5 tracking-tight">
              {aroma.name}
            </h1>

            {/* Tagline */}
            <p className="text-sm md:text-base text-white/60 leading-relaxed italic mb-8">
              &ldquo;{aroma.tagline}&rdquo;
            </p>

            {/* Packaging label */}
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
              {aroma.notes.heart}
            </p>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="absolute bottom-6 left-0 right-0 container-site flex justify-between items-center">
          {prevAroma ? (
            <Link
              href={`/aromas/${prevAroma.slug}`}
              className="text-[9px] tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              {prevAroma.name}
            </Link>
          ) : <span />}
          {nextAroma ? (
            <Link
              href={`/aromas/${nextAroma.slug}`}
              className="text-[9px] tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-2"
            >
              {nextAroma.name}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
          ) : <span />}
        </div>
      </section>

      {/* ── COMPOSICIÓN — descripción + notas olfativas ─────────────────────── */}
      <section className="section-py bg-[var(--blanco-fidela)] relative overflow-hidden">
        {/* Ilustración botánica sutil de fondo */}
        {aroma.icon && (
          <div
            className="absolute right-[-4%] top-[-10%] w-[45%] h-[130%] pointer-events-none select-none"
            style={{ mixBlendMode: 'multiply', opacity: 0.055 }}
            aria-hidden
          >
            <Image src={aroma.icon} alt="" fill className="object-contain object-right-top" sizes="45vw" />
          </div>
        )}

        <div className="container-site relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">

            {/* Texto */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-5">
                Composición
              </p>
              <p className="font-serif text-2xl md:text-3xl font-light leading-snug mb-8 text-[var(--negro-fidela)]">
                {aroma.description}
              </p>

              {/* Notas olfativas */}
              <div className="border-t border-[var(--pantone-fidela)] pt-6">
                <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/35 mb-5">
                  Pirámide olfativa
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Salida', notes: aroma.notes.top },
                    { label: 'Corazón', notes: aroma.notes.heart },
                    { label: 'Fondo', notes: aroma.notes.base },
                  ].map(({ label, notes }) => (
                    <div key={label} className="flex gap-5 items-baseline">
                      <span
                        className="font-mono text-[9px] tracking-widest uppercase w-16 flex-shrink-0"
                        style={{ color: aroma.color }}
                      >
                        {label}
                      </span>
                      <span className="text-sm text-[var(--negro-fidela)]/60">{notes}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div className="relative aspect-square overflow-hidden">
              {aroma.tramaLight ? (
                <>
                  <Image
                    src={aroma.tramaLight}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    aria-hidden
                  />
                  {/* Packaging label overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <div
                      className="w-1 h-12 mb-6"
                      style={{ backgroundColor: aroma.color }}
                    />
                    <p className="font-serif text-3xl md:text-4xl font-light text-center leading-tight"
                       style={{ color: aroma.color }}
                    >
                      {aroma.name}
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase mt-3 text-center opacity-60"
                       style={{ color: aroma.color }}
                    >
                      {aroma.concept}
                    </p>
                    <p className="font-mono text-[9px] tracking-[0.15em] text-center mt-6 leading-relaxed opacity-50"
                       style={{ color: aroma.color }}
                    >
                      {aroma.notes.heart}
                    </p>
                    <div
                      className="w-1 h-12 mt-6"
                      style={{ backgroundColor: aroma.color }}
                    />
                  </div>
                </>
              ) : (
                <Image
                  src={aroma.images[0] ?? aroma.image}
                  alt={aroma.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── HISTORIA ────────────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--negro-fidela)] relative overflow-hidden">
        {/* Trama light como fondo sutil oscurecido */}
        {aroma.trama && (
          <Image
            src={aroma.trama}
            alt=""
            fill
            className="object-cover opacity-[0.12]"
            sizes="100vw"
            aria-hidden
          />
        )}

        <div className="container-site relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">

            {/* Imagen izquierda */}
            <div className="relative aspect-[4/5] overflow-hidden order-2 md:order-1">
              {aroma.images[1] ? (
                <Image
                  src={aroma.images[1]}
                  alt={`${aroma.name} detalle`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: aroma.color + '22' }}
                >
                  <span
                    className="font-serif text-[100px] font-light opacity-15 select-none"
                    style={{ color: aroma.color }}
                  >
                    {aroma.name[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Texto derecha */}
            <div className="order-1 md:order-2">
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-white/30 mb-5">
                Origen &amp; inspiración
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-snug mb-8">
                La historia detrás del aroma.
              </h2>
              <p className="text-sm text-white/55 leading-relaxed mb-8">
                {aroma.story}
              </p>

              {/* Properties */}
              <div className="flex flex-wrap gap-2">
                {aroma.properties.map((prop) => (
                  <span
                    key={prop}
                    className="px-3 py-1.5 font-mono text-[9px] tracking-widest uppercase border capitalize"
                    style={{ borderColor: aroma.color + '60', color: aroma.color }}
                  >
                    {prop}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RITUAL — ambientes + familia ─────────────────────────────────────── */}
      <section className="section-py relative overflow-hidden bg-[var(--blanco-fidela)]">
        {/* Trama light como fondo */}
        {aroma.tramaLight && (
          <Image
            src={aroma.tramaLight}
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            aria-hidden
          />
        )}

        <div className="container-site relative z-10">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">

            {/* Ambientes */}
            <div className="md:col-span-2">
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-4">
                Espacios rituales
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[var(--negro-fidela)] mb-8">
                ¿Dónde habitarlo?
              </h3>
              <div className="flex flex-wrap gap-3">
                {aroma.environments.map((env) => (
                  <div
                    key={env}
                    className="flex items-center gap-2.5 bg-white/80 border border-[var(--pantone-fidela)] px-4 py-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: aroma.color }} />
                    <span className="text-xs capitalize text-[var(--negro-fidela)]/70">{env}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Familia + detalle */}
            <div className="border-t md:border-t-0 md:border-l border-[var(--pantone-fidela)] pt-8 md:pt-0 md:pl-10">
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-4">
                Familia olfativa
              </p>
              <div
                className="w-10 h-10 mb-5"
                style={{ backgroundColor: aroma.color }}
              />
              <h3 className="font-serif text-xl font-light text-[var(--negro-fidela)] mb-3">{familyLabel}</h3>
              <p className="text-xs text-[var(--negro-fidela)]/50 leading-relaxed">
                {aroma.family === 'Fresco' && 'Notas limpias, herbáceas y cítricas. Energizantes y vigorizantes.'}
                {aroma.family === 'Floral' && 'Pétalos, flores y botanicals. Románticos y delicados.'}
                {aroma.family === 'Terra' && 'Maderas, especias y resinas. Cálidos y envolventes.'}
              </p>
              <Link
                href="/nuestros-aromas"
                className="inline-flex items-center gap-2 mt-6 font-mono text-[9px] tracking-widest uppercase text-[var(--negro-fidela)]/40 hover:text-[var(--negro-fidela)] transition-colors"
              >
                Ver colección →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AROMAS RELACIONADOS ──────────────────────────────────────────────── */}
      {siblings.length > 0 && (
        <section className="section-py border-t border-[var(--pantone-fidela)] bg-[var(--blanco-fidela)]">
          <div className="container-site">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-2">
              Misma familia
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-[var(--negro-fidela)] mb-10">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--pantone-fidela)]">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  href={`/aromas/${s.slug}`}
                  className="group bg-[var(--blanco-fidela)] p-6 md:p-8 hover:bg-white transition-colors"
                >
                  {s.trama ? (
                    <div className="relative w-full aspect-[3/2] overflow-hidden mb-5">
                      <Image src={s.trama} alt={s.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" sizes="33vw" />
                      {s.icon && (
                        <div className="absolute inset-0" style={{ mixBlendMode: 'multiply', opacity: 0.2 }} aria-hidden>
                          <Image src={s.icon} alt="" fill className="object-contain" sizes="33vw" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mb-5">
                      <Image src={s.image} alt={s.name} fill className="object-cover" sizes="64px" />
                    </div>
                  )}
                  <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--negro-fidela)]/35 mb-1">{s.concept || s.family}</p>
                  <h3 className="font-serif text-xl font-light text-[var(--negro-fidela)] group-hover:opacity-60 transition-opacity">{s.name}</h3>
                  <p className="text-[10px] text-[var(--negro-fidela)]/40 mt-1 italic truncate">{s.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 font-mono text-[9px] tracking-widest uppercase text-[var(--negro-fidela)]/35 group-hover:text-[var(--negro-fidela)] transition-colors">
                    Descubrir
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRODUCTOS RELACIONADOS ───────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="section-py bg-[var(--blanco-fidela)]">
          <div className="container-site">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-2">
              Disponibles en
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-[var(--negro-fidela)] mb-8">
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
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: aroma.color }}>
        {aroma.trama && (
          <Image src={aroma.trama} alt="" fill className="object-cover opacity-50" sizes="100vw" aria-hidden />
        )}
        {aroma.icon && (
          <div
            className="absolute left-[-5%] bottom-[-10%] w-[40%] h-[130%] pointer-events-none select-none"
            style={{ mixBlendMode: 'multiply', opacity: 0.2 }}
            aria-hidden
          >
            <Image src={aroma.icon} alt="" fill className="object-contain object-left-bottom" sizes="40vw" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container-site text-center text-white z-10">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/50 mb-4">
            {aroma.name} · Hecho a mano en Buenos Aires
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4 leading-snug">
            Llevate {aroma.name}<br />a tu espacio.
          </h2>
          <p className="text-sm text-white/50 mb-10 leading-relaxed max-w-sm mx-auto">
            Disponible en velas, difusores y spray. 30% OFF con Hot Sale activo.
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 border border-white/40 text-white px-8 py-4 font-mono text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--negro-fidela)] transition-all duration-200"
          >
            Ver productos
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
