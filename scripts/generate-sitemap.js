import { mkdir, writeFile } from 'node:fs/promises'
import { cities } from '../data/cities.ts'
import { slugify } from '../lib/constants.ts'
import { trainings } from '../data/trainings.ts'
import { districtsForCity, districtSlug } from '../data/districts.ts'

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
  ...cities.flatMap(({ slug: city }) => [
    {
      loc: `https://${city}.trainingsertifikasi.id/artikel`,
      lastmod: LAST_MODIFIED,
      changefreq: 'weekly',
      priority: '0.8',
    },
    ...trainings.map((training) => ({
      loc: `https://${city}.trainingsertifikasi.id/artikel/${slugify(training.name)}`,
      lastmod: LAST_MODIFIED,
      changefreq: 'monthly',
      priority: '0.7',
    })),
    ...districtsForCity(city, cities.find((item) => item.slug === city)?.name ?? city).flatMap((district) => trainings.map((training) => ({
      loc: `https://${districtSlug(district)}.${city}.trainingsertifikasi.id/artikel/${slugify(training.name)}`,
      lastmod: LAST_MODIFIED,
      changefreq: 'monthly',
      priority: '0.5',
    }))),
  ]),
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
