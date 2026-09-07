import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Page from '@/app/page'
import { cities, cityBySlug } from '@/data/cities'

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params
  const city = cityBySlug.get(slug)
  if (!city) return { title: 'Training Sertifikasi K3' }
  return { title: `Pelatihan & Sertifikasi K3 di ${city.name} | Training Sertifikasi`, description: `Pelatihan dan sertifikasi K3 profesional untuk perusahaan dan individu di ${city.name} dan sekitarnya.` }
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params
  const city = cityBySlug.get(slug)
  if (!city) notFound()
  return <Page city={city.name} citySlug={city.slug} />
}
