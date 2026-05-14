import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'

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

const BASE_URL = 'https://fidela-web.netlify.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: 'FIDELA — Aromas con Historia', template: '%s | FIDELA' },
  description:
    'Velas de soja, aromatizantes y jabones naturales artesanales. Concept Store en Colegiales, Buenos Aires.',
  keywords: ['velas de soja', 'aromas naturales', 'jabones artesanales', 'difusores', 'Colegiales', 'Buenos Aires'],
  authors: [{ name: 'FIDELA' }],
  openGraph: {
    siteName: 'FIDELA',
    locale: 'es_AR',
    type: 'website',
    url: BASE_URL,
    title: 'FIDELA — Aromas con Historia',
    description: 'Velas de soja, aromatizantes y jabones naturales artesanales. Concept Store en Colegiales, Buenos Aires.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'FIDELA — Aromas con Historia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIDELA — Aromas con Historia',
    description: 'Velas de soja, aromatizantes y jabones naturales artesanales.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: BASE_URL },
}

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID ?? ''
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <OrganizationJsonLd />
        {children}
        {GA_ID && (
          <Suspense fallback={null}>
            <GoogleAnalytics gaId={GA_ID} />
          </Suspense>
        )}
        {PIXEL_ID && <MetaPixel pixelId={PIXEL_ID} />}
      </body>
    </html>
  )
}
