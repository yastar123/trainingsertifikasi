import { mkdir, writeFile } from 'node:fs/promises'
import { cities } from '../data/cities.ts'
import { slugify } from '../lib/constants.ts'
import { TIER1_CITY_SLUGS } from '../data/tier1-cities.ts'
import { isThinCityArticle } from '../data/articles/thin-page-rules.ts'

const DOMAIN = 'https://trainingsertifikasi.id'
const LAST_MODIFIED = new Date().toISOString().slice(0, 10)

const entries = [
  {
    loc: `${DOMAIN}/`,
    lastmod: LAST_MODIFIED,
    changefreq: 'monthly',
    priority: '1.0',
  },
  ...cities.map(({ name }) => ({
    loc: `https://${slugify(name)}.trainingsertifikasi.id/`,
    lastmod: LAST_MODIFIED,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...['operator-lifter-manlift-boomlift-scissor-lift', 'operator-pallet-mover-liftstacker-reachstacker', 'operator-tower-crane', 'operator-overhead-crane-mobile-crane-pedestal-crane', 'operator-pita-transport-conveyor-kompressor', 'operator-gondola', 'operator-alat-berat-excavator-bulldozer-vibro-dump-truck-wheel-loader', 'operator-forklift', 'k3-listrik', 'smk3'].map((service) => ({
    loc: `${DOMAIN}/layanan/artikel/${service}`,
    lastmod: LAST_MODIFIED,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  ...TIER1_CITY_SLUGS.flatMap((city) => ['operator-lifter-manlift-boomlift-scissor-lift', 'operator-pallet-mover-liftstacker-reachstacker', 'operator-tower-crane', 'operator-overhead-crane-mobile-crane-pedestal-crane', 'operator-pita-transport-conveyor-kompressor', 'operator-gondola', 'operator-alat-berat-excavator-bulldozer-vibro-dump-truck-wheel-loader', 'operator-forklift', 'k3-listrik', 'smk3'].filter((service) => !isThinCityArticle(city, service)).map((service) => ({
    loc: `${DOMAIN}/${city}/artikel/${service}`,
    lastmod: LAST_MODIFIED,
    changefreq: 'monthly',
    priority: '0.5',
  }))),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ loc, lastmod, changefreq, priority }) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`

await mkdir('public', { recursive: true })
await writeFile('public/sitemap.xml', xml, 'utf8')
console.log(`Generated ${entries.length} sitemap URLs for ${cities.length} cities.`)
