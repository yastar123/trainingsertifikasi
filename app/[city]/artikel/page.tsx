import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { canonicalServiceArticles } from '@/data/articles/canonical-services'
import { cityBySlug, cities } from '@/data/cities'
import { slugify } from '@/lib/constants'
import { trainings } from '@/data/trainings'

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = cityBySlug.get(citySlug)
  return { title: city ? `Artikel K3 di ${city.name}` : 'Artikel K3' }
}

export default async function ArticlesIndex({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params
  const city = cityBySlug.get(citySlug)
  if (!city) return null

  const articles = Object.keys(canonicalServiceArticles)
    .map((serviceSlug) => ({ serviceSlug, service: trainings.find((training) => slugify(training.name) === serviceSlug) }))
    .filter((item): item is { serviceSlug: string; service: (typeof trainings)[number] } => Boolean(item.service))

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href={`/${city.slug}`} className="font-semibold">Training Sertifikasi</Link>
          <Link href={`/${city.slug}`} className="text-sm text-muted-foreground hover:text-foreground">Kembali ke beranda</Link>
        </div>
      </header>
      <section className="border-b border-border px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pusat artikel</p>
          <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">Panduan K3 untuk {city.name}.</h1>
          <p className="mt-6 max-w-2xl text-pretty leading-7 text-muted-foreground">Baca panduan praktis tentang kompetensi, keselamatan kerja, dan penerapan pelatihan K3 berdasarkan layanan yang Anda butuhkan.</p>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map(({ serviceSlug, service }) => (
            <Link key={serviceSlug} href={`/${city.slug}/artikel/${serviceSlug}`} className="group flex min-h-44 flex-col justify-between rounded-xl border border-border p-5 transition-colors hover:bg-secondary/50">
              <div><p className="text-xs text-muted-foreground">Artikel layanan</p><h2 className="mt-4 text-lg font-medium leading-6">{service.name}</h2></div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">Baca artikel <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
