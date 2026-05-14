import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'FIDELA — Aromas con Historia', template: '%s | FIDELA' },
  description:
    'Velas de soja, aromatizantes y jabones naturales artesanales. Concept Store en Colegiales, Buenos Aires.',
  keywords: ['velas de soja', 'aromas naturales', 'jabones artesanales', 'difusores', 'Colegiales'],
  openGraph: {
    siteName: 'FIDELA',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
