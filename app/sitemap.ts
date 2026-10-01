import type { MetadataRoute } from 'next'
import { cities } from '@/data/cities'
import { trainings } from '@/data/trainings'
import { slugify } from '@/lib/constants'

const siteDomain = 'trainingsertifikasi.id'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `https://www.${siteDomain}`,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  for (const city of cities) {
    const baseUrl = `https://${city.slug}.${siteDomain}`
    entries.push({ url: baseUrl, changeFrequency: 'weekly', priority: 0.9 })
    entries.push({ url: `${baseUrl}/artikel`, changeFrequency: 'weekly', priority: 0.8 })

    for (const training of trainings) {
      entries.push({
        url: `${baseUrl}/artikel/${slugify(training.name)}`,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
