import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AROMAS, AROMAS_LEGACY } from '@/lib/aromas-data'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Nuestros Aromas — Colección 2026 | FIDELA',
  description:
    'Conocé la nueva colección 2026 de FIDELA: Velvet, Linaje, Roble y Brisa. Cuatro fragancias artesanales creadas con intención, materias primas de primer nivel y un relato propio.',
}

export default function NuestrosAromasPage() {
  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] md:h-[80vh] min-h-[500px] overflow-hidden flex items-end">
        <Image
          src="/media/MG_9583-scaled.jpg"
          alt="Nuestros Aromas FIDELA"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--negro-fidela)] via-[var(--negro-fidela)]/40 to-transparent" />

        <div className="relative container-site pb-16 md:pb-24 text-white">
          <Image
            src="/brand/logos/isologo-03.png"
            alt="Fidela"
            width={40}
            height={40}
            className="object-contain opacity-50 mb-6"
          />
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--pantone-fidela)] mb-4">
            Colección 2026
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-none mb-5">
            Nuestros Aromas
          </h1>
          <p className="text-sm text-white/55 max-w-lg leading-relaxed">
            Cuatro fragancias artesanales creadas con intención. Cada una nació de una historia,
            un estado de ánimo, una forma de habitar el espacio.
          </p>
        </div>
      </section>

      {/* ── COLECCIÓN 2026 ────────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--blanco-fidela)]">
        <div className="container-site">
          <div className="mb-12">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-4">
              01 — Nueva colección
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--negro-fidela)]">
              Los 4 aromas 2026
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--pantone-fidela)]">
            {AROMAS.map((aroma) => (
              <Link
                key={aroma.slug}
                href={`/aromas/${aroma.slug}`}
                className="group relative overflow-hidden bg-[var(--blanco-fidela)] flex flex-col"
              >
                {/* Foto */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={aroma.image}
                    alt={aroma.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Color tint overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-multiply"
                    style={{ backgroundColor: aroma.color }}
                  />
                </div>

                {/* Info */}
                <div className="p-7 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--negro-fidela)]/40 mb-1">
                        {aroma.concept}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl font-light text-[var(--negro-fidela)] group-hover:opacity-70 transition-opacity">
                        {aroma.name}
                      </h3>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: aroma.color }}
                    />
                  </div>

                  <p className="text-sm text-[var(--negro-fidela)]/55 leading-relaxed mb-5 flex-1">
                    {aroma.description}
                  </p>

                  {/* Notas */}
                  <div className="border-t border-[var(--pantone-fidela)] pt-4 mt-auto">
                    <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--negro-fidela)]/35 mb-2">
                      Notas principales
                    </p>
                    <p className="text-xs text-[var(--negro-fidela)]/55">
                      {aroma.notes.heart}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[10px] tracking-widest uppercase text-[var(--negro-fidela)]/40 group-hover:text-[var(--negro-fidela)] transition-colors">
                    <span>Descubrir</span>
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILOSOFÍA ─────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--negro-fidela)] relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 flex items-center justify-end pr-10 pointer-events-none select-none opacity-[0.04]">
          <Image src="/brand/logos/isologo-03.png" alt="" width={400} height={400} className="object-contain" aria-hidden />
        </div>
        <div className="relative container-site">
          <div className="max-w-2xl">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--pantone-fidela)] mb-5">
              02 — Filosofía
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--blanco-fidela)] leading-snug mb-8">
              Fragancias creadas<br />con intención.
            </h2>
            <p className="text-sm text-white/55 leading-relaxed mb-5">
              En FIDELA cada aroma comienza con una idea: un recuerdo de viaje, un jardín al amanecer,
              la calidez de una biblioteca antigua. A partir de ahí trabajamos con materias primas de
              origen natural para crear blends que cuenten una historia con cada encendido.
            </p>
            <p className="text-sm text-white/55 leading-relaxed">
              Veganas, cruelty-free y desarrolladas desde una mirada consciente sobre bienestar,
              calidad y permanencia. Nuestras fórmulas son una declaración de cómo elegimos crear.
            </p>
          </div>
        </div>
      </section>

      {/* ── COLECCIÓN ORIGINAL ────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--blanco-fidela)] relative overflow-hidden">
        <Image
          src="/brand/graphics/trama-neutral-rosas.png"
          alt=""
          fill
          className="object-cover opacity-[0.15] pointer-events-none select-none"
          sizes="100vw"
          aria-hidden
        />
        <div className="container-site relative z-10">
          <div className="mb-12">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-4">
              03 — Colección original
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--negro-fidela)] mb-2">
              Los aromas que nos dieron origen.
            </h2>
            <p className="text-sm text-[var(--negro-fidela)]/50 max-w-lg leading-relaxed">
              Antes de la colección 2026, estos ocho blends construyeron la identidad aromática de FIDELA.
              Siguen disponibles para quienes los conocen y los eligen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 divide-y divide-[var(--pantone-fidela)]">
            {AROMAS_LEGACY.map((aroma, i) => (
              <Link
                key={aroma.slug}
                href={`/aromas/${aroma.slug}`}
                className={`group flex items-center gap-5 py-6 hover:bg-[var(--pantone-fidela)]/20 -mx-3 px-3 transition-colors duration-200 ${
                  i % 2 === 0 ? 'md:border-r md:border-[var(--pantone-fidela)] md:pr-10' : 'md:pl-10'
                }`}
              >
                {/* Imagen circular */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={aroma.image}
                    alt={aroma.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                    sizes="64px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] tracking-widest text-[var(--negro-fidela)]/35 uppercase">
                      N°{aroma.number}
                    </span>
                    <span
                      className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: aroma.color + '25', color: aroma.color }}
                    >
                      {aroma.family}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-light text-[var(--negro-fidela)] group-hover:opacity-60 transition-opacity leading-tight">
                    {aroma.name}
                  </h3>
                  <p className="text-[10px] text-[var(--negro-fidela)]/40 mt-0.5 truncate italic">
                    {aroma.tagline}
                  </p>
                </div>

                <svg
                  className="w-4 h-4 text-[var(--negro-fidela)]/25 group-hover:text-[var(--negro-fidela)]/60 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                  fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--negro-fidela)] py-20">
        <div className="container-site text-center">
          <Image
            src="/brand/logos/isologo-03.png"
            alt="Fidela"
            width={52}
            height={52}
            className="object-contain opacity-40 mx-auto mb-8"
          />
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--blanco-fidela)] mb-4">
            Cada aroma cuenta una historia.
          </h2>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--pantone-fidela)] mb-10">
            Fidela · Buenos Aires · Hecho a mano
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 text-[10px] tracking-[0.2em] uppercase"
            >
              Ver productos
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/tiendas"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[10px] tracking-[0.2em] uppercase border border-white/20 text-white/60 hover:border-white hover:text-white transition-all duration-200"
            >
              Visitanos en Colegiales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
