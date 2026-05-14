import type { Metadata } from 'next'
import { MapPin, MessageCircle } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactá a FIDELA por WhatsApp, Instagram o visitanos en Colegiales.',
}

export default function ContactoPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[var(--cream)] py-20 md:py-28">
        <div className="container-site text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-light">Contacto</h1>
          <p className="mt-4 text-sm text-[var(--gray-600)]">Estamos para ayudarte</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Contact methods */}
            <div className="flex flex-col gap-8">
              <a
                href="https://wa.me/5491163369052"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 p-6 border border-[var(--gray-200)] rounded hover:border-[var(--gold)] hover:shadow-sm transition-all group"
              >
                <MessageCircle size={24} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm mb-1">WhatsApp</h3>
                  <p className="text-sm text-[var(--gray-600)]">+54 9 11 6336-9052</p>
                  <p className="text-xs text-[var(--gray-400)] mt-1">Respondemos en menos de 24hs</p>
                </div>
              </a>

              <a
                href="https://instagram.com/fidela.aromas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 p-6 border border-[var(--gray-200)] rounded hover:border-[var(--gold)] hover:shadow-sm transition-all group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--gold)] mt-0.5 flex-shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                <div>
                  <h3 className="font-medium text-sm mb-1">Instagram</h3>
                  <p className="text-sm text-[var(--gray-600)]">@fidela.aromas</p>
                  <p className="text-xs text-[var(--gray-400)] mt-1">DMs abiertos</p>
                </div>
              </a>

              <div className="flex items-start gap-5 p-6 border border-[var(--gray-200)] rounded">
                <MapPin size={24} className="text-[var(--gold)] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm mb-1">Concept Store</h3>
                  <p className="text-sm text-[var(--gray-600)]">Teodoro García 2959</p>
                  <p className="text-sm text-[var(--gray-600)]">Colegiales, Buenos Aires</p>
                  <p className="text-xs text-[var(--gray-400)] mt-1">Lun–Vie 10–19 · Sáb 11–17</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl font-light mb-6">Mandanos un mensaje</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
