import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Nuestros Aromas — Blends de Autor | FIDELA',
  description:
    '8 blends únicos creados con materias primas certificadas ISO. Cada aroma nació de una historia: un viaje, una memoria, una sensación que queríamos preservar.',
}

/* ── Aromas data (with product images) ─────────────────────────────────────── */
const AROMAS = [
  {
    number: 2,  name: 'Verbena',              family: 'Fresco',  slug: 'verbena',
    color: '#8BAF8B',
    tagline: 'Frescura que despierta los sentidos',
    description: 'Notas vivas de verbena limón y hierbas del mediterráneo. Un aroma que evoca jardines en primavera y energía renovada.',
    notes: { top: 'Verbena, Limón', heart: 'Hierba verde, Hoja', base: 'Musgo blanco' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8842-scaled-e1681317841299-1536x1536-62758a2ee6f417ab8417207386037479-480-0.webp',
  },
  {
    number: 5,  name: 'Floral Velvet',        family: 'Floral',  slug: 'floral-velvet',
    color: '#C9A8C4',
    tagline: 'La suavidad hecha fragancia',
    description: 'Una composición floral envuelta en seda. Pétalos de rosa y peonía se entrelazan con un fondo suave de almizcle.',
    notes: { top: 'Rosa, Peonía', heart: 'Jazmín, Iris', base: 'Almizcle, Cedro' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8453-scaled-e1685916235552-1534x1536-0788f88e8f8219233017219543914857-480-0.webp',
  },
  {
    number: 17, name: 'Oud Imperial',         family: 'Terra',   slug: 'oud-imperial',
    color: '#9C7443',
    tagline: 'La profundidad del oriente',
    description: 'Inspirado en los perfumes de Medio Oriente. Oud, maderas preciosas y especias crean una experiencia olfativa de lujo atemporal.',
    notes: { top: 'Cardamomo, Azafrán', heart: 'Oud, Rosa', base: 'Ámbar, Pachuli' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/fidela_1500x1500-d6cea907ea13a1799e17662504066445-480-0.webp',
  },
  {
    number: 19, name: 'French Lavender',      family: 'Floral',  slug: 'french-lavander',
    color: '#A89BC9',
    tagline: 'Los campos de Provenza en tu hogar',
    description: 'Lavanda francesa de alta pureza con notas aromáticas herbáceas. Calma, equilibrio y la elegancia atemporal del sur de Francia.',
    notes: { top: 'Lavanda, Eucalipto', heart: 'Espliego, Romero', base: 'Almizcle, Cedro' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_8828-scaled-e1696446538937-1536x1536-b64c509761dbf2909f17219502779342-480-0.webp',
  },
  {
    number: 21, name: 'Jengibre & Té Blanco', family: 'Fresco',  slug: 'jengibre-te-blanco',
    color: '#C4B48A',
    tagline: 'Calidez especiada, frescura serena',
    description: 'El picante sutil del jengibre fresco encuentra la serenidad del té blanco. Un equilibrio sofisticado entre energía y calma.',
    notes: { top: 'Jengibre, Limón', heart: 'Té blanco, Jazmín', base: 'Vetiver, Cedro' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6420-scaled-e1696461568818-1536x1536-77992b0b0802559e1b17219546572465-480-0.webp',
  },
  {
    number: 27, name: 'Cardamom & Woods',     family: 'Terra',   slug: 'cardamom-woods',
    color: '#8C7060',
    tagline: 'Especias nobles sobre raíces antiguas',
    description: 'Cardamomo verde sobre un corazón de maderas oscuras. Evoca caravanas, biblioteca de viajero y la riqueza de lo auténtico.',
    notes: { top: 'Cardamomo, Pimienta', heart: 'Sándalo, Vetiver', base: 'Musgo, Cuero' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/lupe1-116177fdb85d6c531817662394131806-480-0.webp',
  },
  {
    number: 44, name: 'Sándalo & Pimienta Rosa', family: 'Terra', slug: 'sandalo-pimenta-rosa',
    color: '#C48A8A',
    tagline: 'El contraste que conquista',
    description: 'La cremosidad del sándalo indio con la vivacidad de la pimienta rosa. Una dualidad perfecta: suave y audaz al mismo tiempo.',
    notes: { top: 'Pimienta rosa, Bergamota', heart: 'Sándalo, Geranio', base: 'Vainilla, Ámbar' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_6325-scaled-e1681511963528-1536x1536-63c86a7359b0c0a91a17219540086209-480-0.webp',
  },
  {
    number: 46, name: 'Green Amber',          family: 'Fresco',  slug: 'green-amber',
    color: '#7A9E7A',
    tagline: 'Naturaleza viva, calidez dorada',
    description: 'Ámbar cálido con un corazón de hojas verdes y musgo. La fusión de lo orgánico y lo luminoso, como un bosque al amanecer.',
    notes: { top: 'Hojas verdes, Bergamota', heart: 'Musgo, Bambú', base: 'Ámbar, Pachuli' },
    image: 'https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_9339-scaled-e1696449873304-1536x1536-b7487dc550d9a95c5917209852352855-480-0.webp',
  },
]

export default function NuestrosAromasPage() {
  return (
    <div>
      {/* ── BANNER ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] md:h-[70vh] min-h-[420px] overflow-hidden flex items-center">
        <Image
          src="https://acdn-us.mitiendanube.com/stores/004/938/265/products/mg_9339-scaled-e1696449873304-1536x1536-b7487dc550d9a95c5917209852352855-480-0.webp"
          alt="Nuestros Aromas FIDELA"
          fill
          className="object-cover object-center scale-[1.02]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="relative container-site text-white">
          <p className="text-[10px] tracking-[0.45em] uppercase text-[var(--gold)] mb-4">8 blends de autor</p>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light leading-tight mb-4 max-w-2xl">
            Nuestros Aromas
          </h1>
          <p className="text-sm text-white/65 max-w-md tracking-wide leading-relaxed">
            Cada blend nació de una historia. Una memoria, un viaje, una sensación que queríamos preservar para siempre.
          </p>
        </div>
      </section>

      {/* ── INTRO + CERTIFICACIÓN ────────────────────────────────────────────── */}
      <section className="bg-[var(--cream)] section-py">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Texto */}
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">
                Proceso &amp; Filosofía
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-light mb-6 leading-snug">
                Fragancias creadas<br />con intención
              </h2>
              <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-5">
                En FIDELA cada aroma comienza con una idea: un recuerdo de viaje, un jardín al amanecer,
                la calidez de una biblioteca antigua. A partir de ahí trabajamos con materias primas de
                origen natural, destiladas y procesadas bajo estándares internacionales, para crear blends
                que cuenten una historia con cada encendido.
              </p>
              <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-8">
                Nuestras velas utilizan cera de soja 100% natural, mechas de algodón trenzado sin plomo
                y fragancias libres de ftalatos. El proceso de curado dura entre 48 y 72 horas para
                garantizar una liberación del aroma pareja y una quema limpia de hasta 50 horas.
              </p>

              {/* ISO badge */}
              <div className="inline-flex items-center gap-4 border border-[var(--gray-200)] rounded-lg px-5 py-4 bg-white">
                {/* ISO logo SVG simplified */}
                <svg viewBox="0 0 60 36" width="52" height="32" className="flex-shrink-0">
                  <rect width="60" height="36" rx="4" fill="#003087"/>
                  <text x="30" y="24" textAnchor="middle" fill="white" fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif">ISO</text>
                </svg>
                <div>
                  <p className="text-[11px] font-semibold tracking-wide uppercase text-[var(--black)]">
                    Certificación ISO 9001
                  </p>
                  <p className="text-[10px] text-[var(--gray-400)] mt-0.5">
                    Materias primas con trazabilidad certificada
                  </p>
                </div>
              </div>
            </div>

            {/* Visual — grid de 4 imágenes */}
            <div className="grid grid-cols-2 gap-2">
              {AROMAS.slice(0, 4).map((a) => (
                <div key={a.slug} className="relative aspect-square rounded-lg overflow-hidden group">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                    <p className="text-white text-[9px] tracking-widest uppercase">{a.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LISTADO DE AROMAS ─────────────────────────────────────────────────── */}
      <section className="section-py">
        <div className="container-site">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-3">Colección completa</p>
            <h2 className="font-serif text-2xl md:text-3xl font-light">Los 8 blends</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 divide-y divide-[var(--gray-100)]">
            {AROMAS.map((aroma, i) => (
              <Link
                key={aroma.slug}
                href={`/aromas/${aroma.slug}`}
                className={`group flex items-center gap-6 py-7 hover:bg-[var(--cream)] -mx-4 px-4 rounded-lg transition-colors duration-200 ${
                  i % 2 === 0 ? 'md:border-r md:border-[var(--gray-100)] md:pr-12' : 'md:pl-12'
                }`}
              >
                {/* Imagen circular */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-transparent group-hover:ring-[var(--gold)] transition-all duration-200">
                  <Image
                    src={aroma.image}
                    alt={aroma.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] tracking-widest text-[var(--gray-400)] uppercase font-light">
                      N°{aroma.number}
                    </span>
                    <span
                      className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: aroma.color + '30', color: aroma.color }}
                    >
                      {aroma.family}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-light group-hover:text-[var(--gold)] transition-colors duration-200 leading-tight">
                    {aroma.name}
                  </h3>
                  <p className="text-[11px] text-[var(--gray-400)] italic mt-0.5 truncate">
                    {aroma.tagline}
                  </p>
                  <p className="text-[10px] text-[var(--gray-400)] mt-1.5 tracking-wide">
                    <span className="text-[var(--gold)]">S:</span> {aroma.notes.top} &nbsp;
                    <span className="text-[var(--gold)]">C:</span> {aroma.notes.heart}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="w-4 h-4 text-[var(--gray-400)] group-hover:text-[var(--gold)] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="bg-[var(--black)] section-py text-white text-center">
        <div className="container-site max-w-xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-4">Hot Sale</p>
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-4">
            30% OFF en toda la tienda
          </h2>
          <p className="text-sm text-white/60 mb-8">
            Hasta agotar stock. Encontrá todos nuestros aromas en velas, difusores y más.
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
