import type { Metadata } from 'next'
import Image from 'next/image'
import { Gift, Package, Users, CheckCircle, Star, Building2 } from 'lucide-react'
import EmpresasForm from './EmpresasForm'

export const metadata: Metadata = {
  title: 'Ventas a Empresas — Gifting Corporativo | FIDELA',
  description: 'Regalos corporativos de lujo con identidad. Aromas naturales, packaging premium y personalización total para empresas.',
}

const BENEFICIOS = [
  { icon: Gift,       title: 'Packaging personalizado', desc: 'Boxes con tu logo, colores y mensaje de marca. Cada detalle pensado para tu empresa.' },
  { icon: Package,    title: 'Desde 10 unidades',       desc: 'Sin mínimo elevado. Adaptamos el pedido a tu presupuesto y necesidad.' },
  { icon: Users,      title: 'Asesoramiento',           desc: 'Un equipo que te guía en la selección de aromas, formatos y presentación.' },
  { icon: CheckCircle,title: 'Factura A y B',           desc: 'Facturación para empresas de cualquier tamaño, con todos los comprobantes.' },
]

const CASOS = [
  { icon: Building2, label: 'Hoteles & Hospitality',   desc: 'Ambientadores premium para recepción, habitaciones y spa.' },
  { icon: Star,      label: 'Gifting fin de año',       desc: 'Kits personalizados con tu marca para empleados y clientes.' },
  { icon: Gift,      label: 'Eventos corporativos',     desc: 'Regalos memorables que refuerzan la identidad de tu empresa.' },
  { icon: Users,     label: 'Welness programs',         desc: 'Sets de bienestar para programas internos de RRHH.' },
]

const GALLERY = [
  '/media/MG_9534-scaled.jpg',
  '/media/MG_9538-scaled.jpg',
  '/media/MG_9551-scaled.jpg',
  '/media/MG_9555-scaled.jpg',
  '/media/MG_9578-scaled.jpg',
  '/media/MG_9594-scaled.jpg',
]

const PRODUCTOS_B2B = [
  'Boxes regalo con velas de soja',
  'Kits difusor + home spray',
  'Sets de jabones artesanales',
  'Velas personalizadas con aroma',
  'Kits wellness para equipos',
  'Boxes de temporada / fin de año',
  'Ambientadores para espacios',
  'Sets de bienvenida para hoteles',
]

export default function EmpresasPage() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] md:h-[80vh] min-h-[500px] overflow-hidden flex items-center">
        <Image
          src="/media/MG_9566-scaled.jpg"
          alt="FIDELA Empresas"
          fill
          className="object-cover object-center scale-[1.03]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative container-site text-white">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[var(--gold)] mb-5">Ventas corporativas</p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light leading-none mb-5 max-w-2xl">
            Regalos que<br />se recuerdan
          </h1>
          <p className="text-sm text-white/65 max-w-lg leading-relaxed mb-8">
            Gifting corporativo con identidad. Aromas naturales, packaging elegante
            y la posibilidad de personalizar cada detalle de la experiencia.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto-b2b"
              className="inline-flex items-center gap-2 bg-[var(--gold)] text-white px-7 py-3.5 text-xs tracking-[0.2em] uppercase rounded hover:bg-[var(--gold-dark)] transition-colors"
            >
              Cotizar ahora
            </a>
            <a
              href="https://wa.me/5491163369052?text=Hola%2C%20me%20interesa%20el%20gifting%20corporativo%20de%20FIDELA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-7 py-3.5 text-xs tracking-[0.2em] uppercase rounded hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Stat strip bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm border-t border-white/10">
          <div className="container-site py-4 grid grid-cols-3 gap-4 text-center">
            {[
              { num: '+50',   label: 'Empresas' },
              { num: '100%',  label: 'Natural' },
              { num: '48hs',  label: 'Entrega rápida' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-serif text-xl md:text-2xl font-light text-[var(--gold)]">{num}</p>
                <p className="text-[9px] tracking-widest uppercase text-white/50 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA DE PRODUCTOS ─────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-3">Nuestros productos</p>
            <h2 className="font-serif text-2xl md:text-3xl font-light">Una colección diseñada para impresionar</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {GALLERY.map((src, i) => (
              <div key={i} className={`relative overflow-hidden rounded-lg group ${i === 0 ? 'row-span-2' : ''}`}>
                <div className={`relative ${i === 0 ? 'aspect-[3/4] h-full' : 'aspect-square'} overflow-hidden`}>
                  <Image
                    src={src}
                    alt="FIDELA producto corporativo"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASOS DE USO ─────────────────────────────────────────────────────── */}
      <section className="section-py">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Casos de uso</p>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-6 leading-snug">
                Cada empresa tiene<br />su propia historia
              </h2>
              <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-8">
                Trabajamos con hoteles boutique, agencias creativas, firmas legales y empresas tech
                que entienden que un regalo bien elegido es una declaración de valores.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CASOS.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex gap-3 items-start p-4 border border-[var(--gray-200)] rounded-lg hover:border-[var(--gold)] transition-colors">
                    <Icon size={18} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium tracking-wide mb-1">{label}</p>
                      <p className="text-[10px] text-[var(--gray-400)] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagen + quote */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/media/MG_9590-scaled.jpg"
                  alt="Box corporativo FIDELA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-serif text-base font-light italic leading-snug">
                    &ldquo;El regalo perfecto no se olvida. Se recuerda cada vez que se enciende.&rdquo;
                  </p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-[var(--gold)] text-white w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg">
                <p className="font-serif text-xl font-light leading-none">ISO</p>
                <p className="text-[8px] tracking-widest uppercase mt-0.5">9001</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ───────────────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--black)] text-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-3">Por qué elegirnos</p>
            <h2 className="font-serif text-2xl md:text-3xl font-light">Lo que nos hace distintos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFICIOS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 border border-white/10 rounded-lg hover:border-[var(--gold)] transition-colors group">
                <Icon size={24} className="text-[var(--gold)] mb-4" />
                <h3 className="text-sm font-medium tracking-wide mb-2 group-hover:text-[var(--gold)] transition-colors">{title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATÁLOGO + FORM ──────────────────────────────────────────────────── */}
      <section className="section-py">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Lista de productos */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Catálogo B2B</p>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-6">
                Productos disponibles
              </h2>
              <ul className="flex flex-col gap-3 mb-8">
                {PRODUCTOS_B2B.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm border-b border-[var(--gray-100)] pb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/5491163369052?text=Hola%2C%20quiero%20pedir%20un%20cat%C3%A1logo%20corporativo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded text-xs tracking-widest uppercase hover:bg-[#1ebe5d] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Pedí tu catálogo por WhatsApp
              </a>
            </div>

            {/* Formulario */}
            <div id="contacto-b2b" className="bg-[var(--cream)] rounded-2xl p-8">
              <h2 className="font-serif text-2xl font-light mb-2">Hablemos</h2>
              <p className="text-sm text-[var(--gray-600)] mb-6">Te respondemos en menos de 24hs.</p>
              <EmpresasForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
