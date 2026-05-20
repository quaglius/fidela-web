import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nosotros — La historia de Fidela',
  description: 'La historia de Fidela: un legado familiar que comenzó en 1927 con Fidel Gabriele, transformado hoy en aromas artesanales por Mimi y Kari desde Buenos Aires.',
}

const VALORES = [
  {
    titulo: 'Exclusividad',
    texto: 'Creamos nuestros propios blends, con materias primas de primera calidad y procesos cuidados para lograr aromas duraderos y consistentes.',
  },
  {
    titulo: 'Calidad',
    texto: 'Cada instancia —desde la creación hasta el empaque— está pensada y ejecutada con dedicación.',
  },
  {
    titulo: 'Sensibilidad',
    texto: 'Creamos desde lo emocional. Cada producto busca generar una conexión real con quien lo usa.',
  },
  {
    titulo: 'Artesanía',
    texto: 'Lo hecho a mano no es un recurso, es nuestra filosofía y valor esencial. Cada pieza tiene tiempo, intención y cuidado.',
  },
  {
    titulo: 'Sustentable',
    texto: 'Elegimos materia prima y procesos que respetan el entorno y la naturaleza, entendiendo el bienestar de forma integral.',
  },
]

export default function NosotrosPage() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] md:h-[85vh] min-h-[520px] overflow-hidden flex items-end">
        <Image
          src="/media/MG_9612-scaled.jpg"
          alt="Fidela — Nuestra historia"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--negro-fidela)] via-[var(--negro-fidela)]/35 to-transparent" />

        <div className="relative container-site pb-16 md:pb-24 text-white">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/brand/logos/isologo-03.png"
              alt="Fidela"
              width={48}
              height={48}
              className="object-contain opacity-60"
            />
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--pantone-fidela)]">
              Nuestra historia
            </p>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-5">
            Un legado<br />hecho aroma.
          </h1>
          <p className="text-sm text-white/55 max-w-lg leading-relaxed">
            Desde 1927 hasta hoy. Una historia de familia, oficio y sensibilidad
            que se convirtió en Fidela.
          </p>
        </div>
      </section>

      {/* ── ORIGEN ───────────────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--blanco-fidela)]">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-5">
                01 — Origen
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--negro-fidela)] leading-snug mb-8">
                Fidel Gabriele,<br />Italia · 1927.
              </h2>
              <p className="text-sm text-[var(--negro-fidela)]/60 leading-relaxed mb-5">
                En 1927, Fidel Gabriele llegó desde Italia a Argentina y construyó su casa
                en Ciudadela. En el fondo, un taller. Alrededor, una vida donde los aromas
                formaban parte de lo cotidiano: cuero, madera, flores, comidas caseras.
              </p>
              <p className="text-sm text-[var(--negro-fidela)]/60 leading-relaxed">
                Ahí crecimos nosotras. Años después, decidimos volver a ese origen y
                transformarlo en algo propio. Fidela surge como una manera de honrar esa
                memoria, resignificarla y convertirla en aromas, objetos y experiencias
                que puedan seguir habitando nuevos espacios.
              </p>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/media/MG_9566-scaled.jpg"
                alt="Origen Fidela"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTRAS ───────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--negro-fidela)] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-start pl-10 pointer-events-none select-none opacity-[0.04]">
          <Image src="/brand/logos/isologo-03.png" alt="" width={480} height={480} className="object-contain" aria-hidden />
        </div>
        <div className="container-site relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            <div className="order-2 md:order-1 relative aspect-[4/5] overflow-hidden">
              <Image
                src="/media/MG_9578-scaled.jpg"
                alt="Mimi y Kari — Fidela"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--negro-fidela)]/50 to-transparent" />
            </div>

            <div className="order-1 md:order-2">
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--pantone-fidela)] mb-5">
                02 — Sobre nosotras
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--blanco-fidela)] leading-snug mb-8">
                Somos Mimi y Kari,<br />dos hermanas.
              </h2>
              <p className="text-sm text-white/55 leading-relaxed mb-5">
                Aunque cada una recorrió su propio camino, siempre compartimos una misma
                sensibilidad: la intuición, el cuidado por los detalles y una forma
                profundamente personal de entender la creación.
              </p>
              <p className="text-sm text-white/55 leading-relaxed mb-5">
                Mimi comenzó a explorar el mundo de los aromas como una manera de contar
                historias a través de lo sensorial. Kari, desde su mirada estratégica,
                aportó la proyección necesaria para transformar esa sensibilidad en un
                proyecto compartido.
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                Con el tiempo, decidimos unir esas dos fuerzas y dar forma a Fidela: un
                espacio donde nuestra historia familiar se proyecta hacia el presente a
                través de cada aroma, construyendo juntas cada detalle del proceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTESANÍA + EXPERIMENTACIÓN ─────────────────────────────────────── */}
      <section className="section-py bg-[var(--blanco-fidela)]">
        <div className="container-site">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">

            <div className="md:col-span-2 grid grid-cols-2 gap-3">
              {[
                '/media/_MG_3550.jpg',
                '/media/_MG_3556.jpg',
                '/media/_MG_3561.jpg',
                '/media/_MG_3563.jpg',
              ].map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden">
                  <Image
                    src={src}
                    alt="Artesanía Fidela"
                    fill
                    className="object-cover hover:scale-[1.04] transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-10 md:pt-4">
              <div>
                <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-4">
                  03 — Artesanía
                </p>
                <h3 className="font-serif text-2xl font-light text-[var(--negro-fidela)] mb-4 leading-snug">
                  Producimos a mano y en pequeñas tiradas.
                </h3>
                <p className="text-sm text-[var(--negro-fidela)]/55 leading-relaxed">
                  En un contexto donde todo tiende a acelerarse, elegimos trabajar de otra
                  manera: acompañando los tiempos del proceso. Lo artesanal no es una
                  estética. Es una forma de hacer. Creemos en hacer menos, pero mejor.
                </p>
              </div>

              <div>
                <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-4">
                  04 — Laboratorio
                </p>
                <h3 className="font-serif text-2xl font-light text-[var(--negro-fidela)] mb-4 leading-snug">
                  Del taller de aparado al laboratorio de aromas.
                </h3>
                <p className="text-sm text-[var(--negro-fidela)]/55 leading-relaxed">
                  El antiguo taller de Fidel hoy funciona como el laboratorio vivo de Fidela.
                  Probamos, mezclamos y ajustamos cada nota hasta encontrar los aromas que
                  realmente nos emocionan. Sin seguir tendencias ni fórmulas preestablecidas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOSTENIBILIDAD ───────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="/media/MG_9590-scaled.jpg"
          alt="Fórmulas conscientes"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(54,54,48,0.75)' }} />
        <div className="relative container-site text-white">
          <div className="max-w-2xl">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--pantone-fidela)] mb-5">
              05 — Sostenibilidad
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-snug mb-8">
              Fórmulas conscientes.
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Nuestra visión de bienestar está profundamente ligada al respeto por la
              naturaleza. Trabajamos con plantas, flores, esencias y extractos botánicos
              seleccionados con criterio, trazabilidad y respeto por el entorno.
            </p>
            <p className="text-sm text-white/60 leading-relaxed">
              Nuestras fórmulas son veganas, cruelty-free y desarrolladas desde una mirada
              consciente sobre bienestar, calidad y permanencia. Cada decisión responde a
              una misma filosofía: crear de forma responsable, honesta y sensorial.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALORES ──────────────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--blanco-fidela)]">
        <div className="container-site">
          <div className="mb-12">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-4">
              06 — Valores
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--negro-fidela)]">
              Lo que nos define.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[var(--pantone-fidela)]">
            {VALORES.map(({ titulo, texto }) => (
              <div
                key={titulo}
                className="p-8 border-b border-r border-[var(--pantone-fidela)] group hover:bg-[var(--negro-fidela)] transition-colors duration-300"
              >
                <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--negro-fidela)] group-hover:text-[var(--pantone-fidela)] mb-4 transition-colors">
                  {titulo}
                </h3>
                <p className="text-sm text-[var(--negro-fidela)]/55 group-hover:text-white/55 leading-relaxed transition-colors">
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--negro-fidela)] py-20">
        <div className="container-site text-center">
          <Image
            src="/brand/logos/isologo-03.png"
            alt="Fidela"
            width={56}
            height={56}
            className="object-contain opacity-50 mx-auto mb-8"
          />
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--blanco-fidela)] mb-4">
            Cada aroma cuenta una historia.
          </h2>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--pantone-fidela)] mb-10">
            Fidela · Buenos Aires · Hecho a mano
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/nuestros-aromas"
              className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-4 text-[10px] tracking-[0.2em] uppercase"
            >
              Nuestros aromas <ArrowRight size={11} />
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
