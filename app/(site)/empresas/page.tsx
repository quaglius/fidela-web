import type { Metadata } from 'next'
import { Gift, Package, Users, CheckCircle } from 'lucide-react'
import EmpresasForm from './EmpresasForm'

export const metadata: Metadata = {
  title: 'Ventas a Empresas — Gifting Corporativo',
  description: 'Regalos corporativos y ventas B2B de aromas naturales. Boxes personalizados para empresas.',
}

const BENEFICIOS = [
  { icon: Gift, title: 'Packaging personalizado', desc: 'Boxes con tu logo, colores y mensaje de marca.' },
  { icon: Package, title: 'Pedidos desde x10 unidades', desc: 'Sin mínimo elevado. Nos adaptamos a tu presupuesto.' },
  { icon: Users, title: 'Asesoramiento personalizado', desc: 'Te ayudamos a elegir los aromas ideales para tu empresa.' },
  { icon: CheckCircle, title: 'Factura A y B', desc: 'Facturación para empresas de cualquier tamaño.' },
]

const PRODUCTOS_B2B = [
  'Boxes regalo con velas de soja',
  'Kits de difusor + home spray',
  'Sets de jabones artesanales',
  'Velas personalizadas con aroma',
  'Kits wellness para equipos',
  'Boxes de temporada / fin de año',
]

export default function EmpresasPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--black)] text-white py-24 md:py-32">
        <div className="container-site">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Ventas corporativas</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light max-w-2xl">
            Regalos que se recuerdan
          </h1>
          <p className="mt-4 text-sm text-white/60 max-w-lg leading-relaxed">
            Gifting corporativo con identidad. Aromas naturales, packaging elegante,
            y la posibilidad de personalizar cada detalle.
          </p>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-py">
        <div className="container-site">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-center mb-12">
            ¿Por qué elegir Fidela para tu empresa?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFICIOS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 border border-[var(--gray-200)] rounded hover:border-[var(--gold)] transition-colors">
                <Icon size={28} className="text-[var(--gold)] mx-auto mb-4" />
                <h3 className="font-medium text-sm mb-2">{title}</h3>
                <p className="text-xs text-[var(--gray-600)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos disponibles */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-3">Catálogo B2B</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                Productos disponibles para empresas
              </h2>
              <ul className="flex flex-col gap-3">
                {PRODUCTOS_B2B.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-square bg-[var(--black)] rounded flex items-center justify-center">
              <div className="text-center text-white p-8">
                <p className="font-serif text-5xl font-light text-[var(--gold)] mb-2">+50</p>
                <p className="text-sm tracking-widest uppercase text-white/60">empresas confían en Fidela</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="section-py" id="contacto-b2b">
        <div className="container-site max-w-2xl">
          <h2 className="font-serif text-3xl font-light text-center mb-4">Contactanos</h2>
          <p className="text-sm text-[var(--gray-600)] text-center mb-10">
            Completá el formulario y te respondemos en menos de 24hs.
          </p>
          <EmpresasForm />
        </div>
      </section>
    </div>
  )
}
