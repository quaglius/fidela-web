export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FIDELA',
    alternateName: 'Fidela Aromas',
    url: 'https://fidela-web.netlify.app',
    logo: 'https://fidela-web.netlify.app/logo.png',
    description: 'Concept store de aromas naturales en Colegiales, Buenos Aires. Velas de soja, jabones artesanales y difusores.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teodoro García 2959',
      addressLocality: 'Colegiales',
      addressRegion: 'Buenos Aires',
      addressCountry: 'AR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+54-9-11-6336-9052',
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
    sameAs: [
      'https://www.instagram.com/fidela.aromas',
      'https://www.facebook.com/fidela.aromas',
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'FIDELA — Concept Store',
    image: 'https://fidela-web.netlify.app/og-image.jpg',
    url: 'https://fidela-web.netlify.app',
    telephone: '+54-9-11-6336-9052',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Teodoro García 2959',
      addressLocality: 'Colegiales',
      addressRegion: 'Buenos Aires',
      postalCode: 'C1426',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -34.5738,
      longitude: -58.4508,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '11:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  sku,
  url,
}: {
  name: string
  description?: string
  image?: string
  price: string
  sku: string
  url: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    brand: { '@type': 'Brand', name: 'FIDELA' },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'ARS',
      price,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'FIDELA' },
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
