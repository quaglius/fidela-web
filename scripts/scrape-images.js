const https = require('https')

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchPage(res.headers.location))
      }
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(d))
    }).on('error', reject)
  })
}

async function main() {
  const pages = [
    'https://www.fidela.com.ar/',
    'https://www.fidela.com.ar/jabones-naturales',
    'https://www.fidela.com.ar/velas',
    'https://www.fidela.com.ar/nosotros',
    'https://www.fidela.com.ar/aromas',
    'https://www.fidela.com.ar/boxes',
  ]

  const allImgs = new Set()

  for (const page of pages) {
    try {
      const html = await fetchPage(page)
      // Match ALL image URLs including background-image in CSS
      const matches = html.match(/https?:\/\/[^\s"'<>)\]]+\.(jpg|jpeg|png|webp)/gi) || []
      matches.forEach(u => {
        const clean = u.split('?')[0]
        if (!clean.includes('logo') && !clean.includes('icon') && !clean.includes('favicon')) {
          // Upgrade to larger size
          const large = clean.replace(/-480-0\.(webp|jpg|jpeg|png)$/, '-1024-0.$1')
          allImgs.add(large)
        }
      })
      console.error('Scraped:', page, '— images so far:', allImgs.size)
    } catch (e) { console.error('Error:', page, e.message) }
  }

  const imgs = [...allImgs]

  // Separate editorial (theme) vs product images
  const theme = imgs.filter(u => u.includes('/themes/') || u.includes('/files/'))
  const products = imgs.filter(u => u.includes('/products/'))

  console.log('\n=== THEME / EDITORIAL IMAGES ===')
  theme.forEach(u => console.log(u))

  console.log('\n=== PRODUCT IMAGES (first 20) ===')
  products.slice(0, 20).forEach(u => console.log(u))

  console.log('\nTheme:', theme.length, '| Products:', products.length, '| Total:', imgs.length)
}

main()
