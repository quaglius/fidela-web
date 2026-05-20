import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin, Clock, Phone, Coffee, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tiendas — Concept Store Colegiales',
  description: 'Visitá nuestro Concept Store en Teodoro García 2959, Colegiales, Buenos Aires.',
}

export default function TiendasPage() {
  return (
    <div>
      {/* ── HERO — foto full-bleed ───────────────────────────────────────────── */}
      <section className="relative h-[70vh] md:h-[80vh] min-h-[480px] overflow-hidden flex items-end">
        <Image
          src="/media/MG_9583-scaled.jpg"
          alt="Fidela Concept Store — Colegiales"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--negro-fidela)] via-[var(--negro-fidela)]/30 to-transparent" />

        <div className="relative container-site pb-16 md:pb-20 text-white">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--pantone-fidela)] mb-4">
            Buenos Aires · Colegiales
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-5">
            Concept Store
          </h1>
          <p className="text-sm text-white/55 max-w-md leading-relaxed">
            Un espacio de aromas, calma y café de especialidad en el corazón de Colegiales.
          </p>
        </div>
      </section>

      {/* ── FOTO STRIP — interior de la tienda ──────────────────────────────── */}
      <div className="grid grid-cols-3 h-[28vw] md:h-[22vw] max-h-[320px]">
        {['/media/MG_3585.jpg', '/media/MG_3586.jpg', '/media/MG_3587.jpg'].map((src, i) => (
          <div key={i} className="relative overflow-hidden border-r border-[var(--negro-fidela)]/10 last:border-r-0">
            <Image
              src={src}
              alt="Interior Fidela Concept Store"
              fill
              className="object-cover object-center hover:scale-[1.04] transition-transform duration-700"
              sizes="33vw"
            />
          </div>
        ))}
      </div>

      {/* ── INFO ─────────────────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--blanco-fidela)]">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Map */}
            <div className="aspect-[4/3] overflow-hidden relative shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.063!2d-58.4505!3d-34.5742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sTeodoro+Garc%C3%ADa+2959%2C+Colegiales%2C+Buenos+Aires!5e0!3m2!1ses!2sar!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fidela Concept Store"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Details */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-4">
                Cómo llegar
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--negro-fidela)] mb-3 leading-tight">
                Teodoro García 2959
              </h2>
              <p className="text-sm text-[var(--negro-fidela)]/50 mb-10 leading-relaxed max-w-sm">
                En el corazón de Colegiales encontrás todo el universo de Fidela:
                todos los aromas para oler en persona, el equipo para asesorarte,
                y un café de especialidad para que la visita sea una experiencia.
              </p>

              <ul className="flex flex-col gap-6 mb-10">
                <li className="flex items-start gap-4">
                  <MapPin size={16} className="text-[var(--negro-fidela)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--negro-fidela)]/40 mb-1">
                      Dirección
                    </p>
                    <p className="text-sm text-[var(--negro-fidela)] font-light">
                      Teodoro García 2959, Colegiales<br />Buenos Aires, Argentina
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock size={16} className="text-[var(--negro-fidela)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--negro-fidela)]/40 mb-1">
                      Horarios
                    </p>
                    <p className="text-sm text-[var(--negro-fidela)] font-light">
                      Lunes a Viernes: 10:00 – 19:00<br />
                      Sábados: 11:00 – 17:00
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone size={16} className="text-[var(--negro-fidela)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--negro-fidela)]/40 mb-1">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/5491163369052"
                      className="text-sm text-[var(--negro-fidela)] font-light hover:opacity-60 transition-opacity"
                    >
                      +54 9 11 6336-9052
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Coffee size={16} className="text-[var(--negro-fidela)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--negro-fidela)]/40 mb-1">
                      Café de Especialidad
                    </p>
                    <p className="text-sm text-[var(--negro-fidela)] font-light">
                      También servimos café de especialidad en el local.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://maps.google.com/?q=Teodoro+García+2959+Colegiales+Buenos+Aires"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 text-[10px] tracking-[0.2em] uppercase"
                >
                  Cómo llegar <ArrowRight size={11} />
                </a>
                <a
                  href="https://wa.me/5491163369052"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-[10px] tracking-[0.2em] uppercase"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL — quote oscuro ─────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <Image
          src="/media/MG_3669.jpg"
          alt="Fidela Concept Store"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--negro-fidela)]/78" />
        <div className="relative container-site text-center text-white">
          <p className="font-serif text-2xl md:text-4xl lg:text-5xl font-light leading-snug max-w-2xl mx-auto">
            &ldquo;Un espacio donde cada aroma<br />invita a quedarse un poco más.&rdquo;
          </p>
          <div className="mt-8 w-10 h-px bg-[var(--pantone-fidela)] mx-auto" />
          <p className="mt-5 font-mono text-[9px] tracking-[0.3em] uppercase text-white/35">
            Concept Store · Colegiales · Buenos Aires
          </p>
        </div>
      </section>

      {/* ── CTA ONLINE ───────────────────────────────────────────────────────── */}
      <section className="bg-[var(--pantone-fidela)]/30 py-16 border-t border-[var(--pantone-fidela)]">
        <div className="container-site text-center">
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--negro-fidela)]/40 mb-4">
            También online
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[var(--negro-fidela)] mb-4">
            ¿Preferís comprar desde casa?
          </h2>
          <p className="text-sm text-[var(--negro-fidela)]/50 mb-10 max-w-md mx-auto leading-relaxed">
            Todo nuestro catálogo disponible con envío a domicilio en todo el país.
          </p>
          <Link
            href="/productos"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-[10px] tracking-[0.2em] uppercase"
          >
            Ver catálogo <ArrowRight size={11} />
          </Link>
        </div>
      </section>
    </div>
  )
}
