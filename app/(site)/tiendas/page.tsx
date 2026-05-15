import type { Metadata } from 'next'
import { MapPin, Clock, Phone, Coffee } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tiendas — Concept Store Colegiales',
  description: 'Visitá nuestro Concept Store en Teodoro García 2959, Colegiales, Buenos Aires.',
}

export default function TiendasPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--black)] text-white py-24 md:py-32">
        <div className="container-site text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Buenos Aires</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light">Concept Store</h1>
          <p className="mt-4 text-sm text-white/60">Colegiales</p>
        </div>
      </section>

      {/* Info */}
      <section className="section-py">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Map placeholder */}
            <div className="aspect-[4/3] bg-[var(--cream)] rounded overflow-hidden relative">
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
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-6">
                Teodoro García 2959
              </h2>
              <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-8">
                En el corazón de Colegiales encontrás todo el universo de Fidela: todos nuestros
                aromas para oler en persona, el equipo para asesorarte, y un café de especialidad
                para que la visita sea una experiencia completa.
              </p>

              <ul className="flex flex-col gap-5 mb-8">
                <li className="flex items-start gap-4">
                  <MapPin size={18} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Dirección</p>
                    <p className="text-sm text-[var(--gray-600)]">
                      Teodoro García 2959, Colegiales<br />Buenos Aires, Argentina
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock size={18} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Horarios</p>
                    <p className="text-sm text-[var(--gray-600)]">
                      Lunes a Viernes: 10:00 – 19:00<br />
                      Sábados: 11:00 – 17:00
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone size={18} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">WhatsApp</p>
                    <a
                      href="https://wa.me/5491163369052"
                      className="text-sm text-[var(--gray-600)] hover:text-[var(--gold)]"
                    >
                      +54 9 11 6336-9052
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Coffee size={18} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Café de Especialidad</p>
                    <p className="text-sm text-[var(--gray-600)]">
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
                  className="btn-gold inline-block px-6 py-3 text-xs tracking-widest uppercase rounded"
                >
                  Cómo llegar
                </a>
                <a
                  href="https://wa.me/5491163369052"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-block px-6 py-3 text-xs tracking-widest uppercase rounded"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cream)] py-16">
        <div className="container-site text-center">
          <h2 className="font-serif text-3xl font-light mb-4">¿Preferís comprar online?</h2>
          <p className="text-sm text-[var(--gray-600)] mb-8">
            Todo nuestro catálogo disponible con envío a domicilio.
          </p>
          <Link href="/productos" className="btn-gold inline-block px-8 py-4 text-xs tracking-widest uppercase rounded">
            Ver catálogo
          </Link>
        </div>
      </section>
    </div>
  )
}
