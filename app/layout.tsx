import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import './globals.css'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'

// Semplicita Pro — tipografía principal (todos los pesos y cuerpo)
const sans = localFont({
  src: [
    { path: '../public/fonts/SemplicitaPro-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/SemplicitaPro-Bold.otf',    weight: '700', style: 'normal' },
    { path: '../public/fonts/SemplicitaPro-Italic.otf',  weight: '400', style: 'italic' },
  ],
  variable: '--font-sans',
  display: 'swap',
})

// Chivo Mono — etiquetas, datos técnicos y mono
const mono = localFont({
  src: [
    { path: '../public/fonts/ChivoMono-Variable.ttf',        weight: '100 900', style: 'normal' },
    { path: '../public/fonts/ChivoMono-Variable-Italic.ttf', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-mono',
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.fidela.com.ar'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: 'FIDELA — Aromas con Historia', template: '%s | FIDELA' },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon.png',
  },
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
    images: [{ url: '/hero-bg.jpg', width: 1200, height: 630, alt: 'FIDELA — Aromas con Historia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIDELA — Aromas con Historia',
    description: 'Velas de soja, aromatizantes y jabones naturales artesanales.',
    images: ['/hero-bg.jpg'],
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
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
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
