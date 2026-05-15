import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nosotros — La historia de FIDELA',
  description: 'Conocé la historia de FIDELA, nuestra filosofía y el origen de nuestros blends de autor.',
}

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--black)] text-white py-24 md:py-32">
        <div className="container-site">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
            Nuestra historia
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-light max-w-xl">
            Aromas con Historia
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-py">
        <div className="container-site max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="font-serif text-xl md:text-2xl font-light text-[var(--gray-800)] leading-relaxed mb-8">
              Fidela nació de una pregunta simple: ¿por qué los aromas que más nos gustan
              no cuentan una historia?
            </p>
            <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-6">
              Empezamos en un pequeño taller en Colegiales, Buenos Aires, experimentando con
              cera de soja, aceites esenciales y la convicción de que cada fragancia podía ser
              algo más que un producto: podía ser una experiencia, un recuerdo, un estado de ánimo.
            </p>
            <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-6">
              Así nacieron los ocho Blends de Autor — fragancias únicas creadas en casa, cada
              una con un número, un nombre y una historia propia. Verbena, Oud Imperial, Floral
              Velvet... cada uno evoca un lugar, una sensación, una manera de estar en el mundo.
            </p>
            <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-6">
              Hoy Fidela es un Concept Store en el corazón de Colegiales donde podés oler en
              persona todos nuestros aromas, tomar un café de especialidad, y llevarte a casa
              una pieza artesanal hecha con cuidado.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py bg-[var(--cream)]">
        <div className="container-site">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-center mb-12">
            Lo que nos mueve
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Natural',
                desc: 'Usamos cera de soja pura, aceites esenciales y materiales naturales. Sin parafina, sin artificiales.',
              },
              {
                title: 'Artesanal',
                desc: 'Cada pieza se hace a mano en nuestro taller de Colegiales. La escala pequeña es intencional.',
              },
              {
                title: 'Identidad propia',
                desc: 'Los Blends de Autor son exclusivos de Fidela. No van a encontrar estas fragancias en ningún otro lugar.',
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <h3 className="font-serif text-2xl font-light mb-3 text-[var(--gold)]">{v.title}</h3>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py">
        <div className="container-site text-center">
          <h2 className="font-serif text-3xl font-light mb-4">Conocé nuestros aromas</h2>
          <p className="text-sm text-[var(--gray-600)] mb-8 max-w-md mx-auto">
            Cada blend tiene una historia. Encontrá el tuyo.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/nuestros-aromas" className="btn-gold inline-block px-8 py-4 text-xs tracking-widest uppercase rounded">
              Nuestros aromas
            </Link>
            <Link href="/tiendas" className="btn-outline inline-block px-8 py-4 text-xs tracking-widest uppercase rounded">
              Visitanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
