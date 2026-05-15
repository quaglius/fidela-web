import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[var(--black)] text-white">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image src="/logo.png" alt="FIDELA" width={100} height={40} className="h-9 w-auto object-contain brightness-0 invert mb-1" />
            <p className="mt-3 text-xs text-[var(--gray-400)] leading-relaxed">
              Aromas con Historia.<br />
              Concept Store en Colegiales,<br />
              Buenos Aires.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="https://instagram.com/fidela.aromas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[var(--gray-400)] hover:text-white transition-colors"
              >
                {/* Instagram */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://www.facebook.com/fidela.aromas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[var(--gray-400)] hover:text-white transition-colors"
              >
                {/* Facebook */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://wa.me/5491163369052"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-[var(--gray-400)] hover:text-white transition-colors"
              >
                {/* WhatsApp */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Productos */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-4">
              Productos
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                ['Velas de Soja', '/velas-de-soja'],
                ['Jabones Naturales', '/jabones-naturales'],
                ['Aromatizantes', '/aromatizantes'],
                ['Bienestar', '/bienestar'],
                ['Boxes - Kits', '/boxes-kits'],
                ['Cuidado Corporal', '/cuidado-corporal'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--gray-400)] hover:text-white transition-colors text-xs">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aromas */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-4">
              Nuestros Aromas
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                ['N°2 Verbena', 'verbena'],
                ['N°5 Floral Velvet', 'floral-velvet'],
                ['N°17 Oud Imperial', 'oud-imperial'],
                ['N°19 French Lavender', 'french-lavander'],
                ['N°21 Jengibre & Té', 'jengibre-te-blanco'],
                ['N°27 Cardamom & Woods', 'cardamom-woods'],
                ['N°44 Sándalo & Pimienta', 'sandalo-pimenta-rosa'],
                ['N°46 Green Amber', 'green-amber'],
              ].map(([label, slug]) => (
                <li key={slug}>
                  <Link
                    href={`/aromas/${slug}`}
                    className="text-[var(--gray-400)] hover:text-white transition-colors text-xs"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-4">
              Info
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                ['Nosotros', '/nosotros'],
                ['Tiendas', '/tiendas'],
                ['Empresas', '/empresas'],
                ['Contacto', '/contacto'],
                ['Nuestros Aromas', '/nuestros-aromas'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-[var(--gray-400)] hover:text-white transition-colors text-xs">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-[10px] tracking-widest uppercase text-[var(--gray-400)] mb-3">
                Concept Store
              </h4>
              <address className="not-italic text-xs text-[var(--gray-400)] leading-relaxed">
                Teodoro García 2959<br />
                Colegiales, Buenos Aires<br />
                <a
                  href="https://wa.me/5491163369052"
                  className="hover:text-white transition-colors"
                >
                  +54 9 11 6336-9052
                </a>
              </address>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--gray-800)] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-[var(--gray-400)] tracking-wider">
            © {new Date().getFullYear()} FIDELA — Aromas con Historia
          </p>
          <p className="text-[10px] text-[var(--gray-400)]">
            Hecho con ♥ en Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  )
}
