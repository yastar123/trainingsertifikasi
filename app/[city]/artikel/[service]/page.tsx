import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import type { City } from '@/data/cities'
import { cityBySlug } from '@/data/cities'
import { trainingForCity, trainings } from '@/data/trainings'
import { k3ListrikArticles } from '@/data/articles/k3-listrik'
import { smk3Articles } from '@/data/articles/smk3'
import { canonicalServiceArticles } from '@/data/articles/canonical-services'
import { TIER1_CITY_SLUGS } from '@/data/tier1-cities'
import { PHONE_DISPLAY, slugify, whatsappLink } from '@/lib/constants'
import { isThinCityArticle } from '@/data/articles/thin-page-rules'

const articleSources = {
  [slugify('Operator Lifter Manlift Boomlift Scissor Lift')]: { serviceName: 'Operator Lifter, Manlift, Boomlift, Scissor Lift', articles: {}, canonical: canonicalServiceArticles[slugify('Operator Lifter, Manlift, Boomlift, Scissor Lift')] },
  [slugify('Operator Pallet Mover Liftstacker Reachstacker')]: { serviceName: 'Operator Pallet Mover, Liftstacker, Reachstacker', articles: {}, canonical: canonicalServiceArticles[slugify('Operator Pallet Mover, Liftstacker, Reachstacker')] },
  [slugify('Operator Tower Crane')]: { serviceName: 'Operator Tower Crane', articles: {}, canonical: canonicalServiceArticles[slugify('Operator Tower Crane')] },
  [slugify('Operator Overhead Crane Mobile Crane Pedestal Crane')]: { serviceName: 'Operator Overhead Crane Mobile Crane Pedestal Crane', articles: {}, canonical: canonicalServiceArticles[slugify('Operator Overhead Crane Mobile Crane Pedestal Crane')] },
  [slugify('Operator Pita Transport Conveyor Kompressor')]: { serviceName: 'Operator Pita Transport (Conveyor) Kompressor', articles: {}, canonical: canonicalServiceArticles[slugify('Operator Pita Transport (Conveyor) Kompressor')] },
  [slugify('Rigger Juru Ikat')]: { serviceName: 'Rigger (Juru Ikat)', articles: {}, canonical: canonicalServiceArticles[slugify('Rigger (Juru Ikat)')] },
  [slugify('Operator K3 Cargo Hoist Crane Kelas 3 Lift Barang')]: { serviceName: 'Operator K3 Cargo Hoist Crane Kelas 3 (Lift Barang)', articles: {}, canonical: canonicalServiceArticles[slugify('Operator K3 Cargo Hoist Crane Kelas 3 (Lift Barang)')] },
  [slugify('Lift Eskalator')]: { serviceName: 'Lift & Eskalator', articles: {}, canonical: canonicalServiceArticles[slugify('Lift & Eskalator')] },
  [slugify('Operator Genset')]: { serviceName: 'Operator Genset', articles: {}, canonical: canonicalServiceArticles[slugify('Operator Genset')] },
  [slugify('Teknisi Bejana Tekan & Tangki Timbun')]: { serviceName: 'Teknisi Bejana Tekan & Tangki Timbun', articles: {}, canonical: canonicalServiceArticles[slugify('Teknisi Bejana Tekan & Tangki Timbun')] },
  [slugify('Petugas P3K')]: { serviceName: 'Petugas P3K', articles: {}, canonical: canonicalServiceArticles[slugify('Petugas P3K')] },
  [slugify('K3 Rumah Sakit')]: { serviceName: 'K3 Rumah Sakit', articles: {}, canonical: canonicalServiceArticles[slugify('K3 Rumah Sakit')] },
  [slugify('Hiperkes Paramedic / Perawat')]: { serviceName: 'Hiperkes Paramedic / Perawat', articles: {}, canonical: canonicalServiceArticles[slugify('Hiperkes Paramedic / Perawat')] },
  [slugify('HIPERKES DOKTER')]: { serviceName: 'HIPERKES DOKTER', articles: {}, canonical: canonicalServiceArticles[slugify('HIPERKES DOKTER')] },
  [slugify('Operator Alat Berat Excavator Bulldozer Vibro Dump Truck Wheel Loader')]: {
    serviceName: 'Operator Alat Berat Excavator Bulldozer Vibro Dump Truck Wheel Loader',
    articles: {},
    canonical: canonicalServiceArticles[slugify('Operator Alat Berat Excavator Bulldozer Vibro Dump Truck Wheel Loader')],
  },
  [slugify('Operator Gondola')]: {
    serviceName: 'Operator Gondola',
    articles: {},
    canonical: canonicalServiceArticles[slugify('Operator Gondola')],
  },
  [slugify('Operator Forklift')]: {
    serviceName: 'Operator Forklift',
    articles: {},
    canonical: canonicalServiceArticles[slugify('Operator Forklift')],
  },
  [slugify('K3 Listrik')]: {
    serviceName: 'K3 Listrik',
    articles: k3ListrikArticles,
    canonical: canonicalServiceArticles[slugify('K3 Listrik')],
  },
  [slugify('SMK3')]: {
    serviceName: 'SMK3',
    articles: smk3Articles,
    canonical: canonicalServiceArticles[slugify('SMK3')],
  },
} as const

const canonicalServiceSlugs = Object.keys(canonicalServiceArticles)

type ArticleSource = (typeof articleSources)[keyof typeof articleSources]

function getFallbackArticle(service: (typeof trainings)[number], city: City) {
  return {
    intro: `${service.name} untuk ${city.name} membantu organisasi memenuhi kebutuhan kompetensi, keselamatan, kajian, atau kepatuhan sesuai karakter pekerjaan dan lokasi operasional.`,
    sections: [
      { title: 'Ruang lingkup layanan', paragraphs: [`Program ${service.name} disusun untuk kebutuhan perusahaan di ${city.name}, dengan pembahasan yang menyesuaikan kategori ${service.category.toLowerCase()}, profil peserta, risiko kerja, dan target organisasi.`, 'Pelaksanaan diawali dengan pemetaan kebutuhan, kondisi lapangan, persyaratan dokumen, serta koordinasi jadwal dan personel terkait.'] },
      { title: 'Penerapan di tempat kerja', paragraphs: [`Materi atau pendampingan ${service.name} diarahkan agar dapat diterapkan pada proses kerja nyata di ${city.name}. Hasilnya dapat digunakan untuk memperkuat kompetensi, pengendalian risiko, dokumentasi, dan pengambilan keputusan.`, 'Ruang lingkup akhir dikonfirmasi berdasarkan jenis usaha, jumlah peserta, lokasi, peralatan, pola shift, dan kebutuhan kepatuhan perusahaan.'] },
      { title: 'Konsultasi dan tindak lanjut', paragraphs: [`Tim dapat membantu membahas kebutuhan ${trainingForCity(service.name, city.name)}, pilihan jadwal, persiapan peserta, serta dokumen pendukung. Evaluasi tindak lanjut dilakukan agar rekomendasi atau kompetensi tidak berhenti pada kegiatan satu kali.`] },
    ],
    faq: [
      { q: `Siapa yang membutuhkan ${service.name}?`, a: `Perusahaan dan personel yang memiliki kebutuhan terkait ${service.category.toLowerCase()} sesuai jenis pekerjaan dan risiko operasionalnya.` },
      { q: `Apakah layanan tersedia di ${city.name}?`, a: `Kebutuhan lokasi, jadwal, peserta, dan ruang lingkup dapat dikonsultasikan untuk pelaksanaan di ${city.name} atau lokasi kerja yang ditentukan.` },
    ],
  }
}

function getArticle(citySlug: string, serviceSlug: string) {
  const city = cityBySlug.get(citySlug)
  const source = articleSources[serviceSlug as keyof typeof articleSources] as ArticleSource | undefined
  const service = trainings.find((item) => slugify(item.name) === serviceSlug)
  const content = source?.articles[citySlug]
  return city && source && service && content ? { city, source, service, content } : null
}

function getCanonicalArticle(serviceSlug: string) {
  const source = articleSources[serviceSlug as keyof typeof articleSources] as ArticleSource | undefined
  const service = trainings.find((item) => slugify(item.name) === serviceSlug)
  return source?.canonical && service ? { source, service, content: source.canonical } : null
}

export function generateStaticParams() {
  return [
    ...TIER1_CITY_SLUGS.flatMap((city) => trainings.map((service) => ({ city, service: slugify(service.name) }))),
    ...canonicalServiceSlugs.map((service) => ({ city: 'layanan', service })),
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; service: string }> }): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params
  const canonical = citySlug === 'layanan' ? getCanonicalArticle(serviceSlug) : null
  if (canonical) {
    return {
      title: `${canonical.service.name} | Training Sertifikasi`,
      description: canonical.content.intro,
      alternates: { canonical: `/${citySlug}/artikel/${serviceSlug}` },
    }
  }
  const article = getArticle(citySlug, serviceSlug)
  if (!article) return { title: 'Artikel Training Sertifikasi' }
  const title = `${article.service.name} Kota ${article.city.name} | Training Sertifikasi`
  return { title, description: `Ringkasan lokal ${article.service.name} di ${article.city.name} dan tautan ke panduan layanan lengkap.` }
}

export default async function ServiceArticlePage({ params }: { params: Promise<{ city: string; service: string }> }) {
  const { city: citySlug, service: serviceSlug } = await params
  const canonical = citySlug === 'layanan' ? getCanonicalArticle(serviceSlug) : null
  if (canonical) {
    const chatUrl = whatsappLink(`Halo, saya ingin konsultasi ${canonical.service.name}.`)
    return (
      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border px-5 py-5 sm:px-8"><div className="mx-auto flex max-w-5xl items-center justify-between gap-4"><Link href="/" className="text-sm font-semibold">Training Sertifikasi</Link><a href={chatUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Konsultasi <ArrowUpRight size={15} /></a></div></header>
        <article className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="max-w-3xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Panduan layanan · {canonical.service.category}</p><h1 className="text-balance text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">{canonical.service.name}</h1><p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">{canonical.content.intro}</p></div>
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.32fr]"><div className="space-y-12 text-[15px] leading-8 text-muted-foreground">{canonical.content.sections.map((section) => <section key={section.title}><h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">{section.title}</h2>{section.paragraphs.map((paragraph) => <p className="mt-5 first:mt-0" key={paragraph}>{paragraph}</p>)}</section>)}<section><h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Pertanyaan umum</h2><div className="space-y-6">{canonical.content.faq.map((item) => <div key={item.q}><h3 className="font-semibold text-foreground">{item.q}</h3><p className="mt-2">{item.a}</p></div>)}</div></section><section className="rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Konsultasikan kebutuhan Anda</h2><p className="mt-3">Sampaikan jenis pekerjaan, jumlah peserta, lokasi, pola shift, dan target pelatihan.</p><a href={chatUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground">Chat WhatsApp <ArrowUpRight size={16} /></a></section></div><aside className="h-fit rounded-2xl border border-border p-5 text-sm"><p className="font-semibold">Butuh penyesuaian?</p><p className="mt-2 leading-6 text-muted-foreground">Bahas peserta, lokasi, pola kerja, jadwal, dan ruang lingkup bersama tim kami.</p><Link href="/" className="mt-5 inline-block font-medium underline underline-offset-4">Kembali ke katalog</Link></aside></div>
        </article>
      </main>
    )
  }
  let article = getArticle(citySlug, serviceSlug)
  if (!article) {
    const city = cityBySlug.get(citySlug)
    const service = trainings.find((item) => slugify(item.name) === serviceSlug)
    if (!city || !service) notFound()
    article = { city, source: {} as ArticleSource, service, content: getFallbackArticle(service, city) }
  }
  const { city, service, content } = article
  const chatUrl = whatsappLink(`Halo, saya ingin konsultasi ${service.name} di ${city.name}.`)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-5 py-5 sm:px-8"><div className="mx-auto flex max-w-5xl items-center justify-between gap-4"><Link href={`/${city.slug}`} className="text-sm font-semibold">Training Sertifikasi</Link><a href={chatUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Konsultasi <ArrowUpRight size={15} /></a></div></header>
      <article className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-3xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Ringkasan lokal · {service.category}</p><h1 className="text-balance text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">{service.name} Kota {city.name}</h1><p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">{content.intro}</p><Link href={`/${city.slug}/artikel/${serviceSlug}`} className="mt-6 inline-flex font-medium underline underline-offset-4">Baca panduan layanan lengkap</Link></div>
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.32fr]"><div className="space-y-12 text-[15px] leading-8 text-muted-foreground">{content.sections.slice(0, 2).map((section) => <section key={section.title}><h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">{section.title}</h2>{section.paragraphs.map((paragraph) => <p className="mt-5 first:mt-0" key={paragraph}>{paragraph}</p>)}</section>)}<section className="rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Lihat panduan lengkap</h2><p className="mt-3">Materi, FAQ, dan ruang lingkup layanan tersedia pada halaman kanonik.</p><Link href={`/layanan/artikel/${serviceSlug}`} className="mt-6 inline-flex font-medium underline underline-offset-4">Buka artikel kanonik</Link></section></div><aside className="h-fit rounded-2xl border border-border p-5 text-sm"><p className="font-semibold">Perlu penawaran?</p><p className="mt-2 leading-6 text-muted-foreground">Hubungi {PHONE_DISPLAY} untuk membahas peserta, lokasi, pola shift, dan jadwal.</p><Link href={`/${city.slug}#pelatihan`} className="mt-5 inline-block font-medium underline underline-offset-4">Lihat katalog {city.name}</Link></aside></div>
      </article>
    </main>
  )
}

export const dynamicParams = true
export const revalidate = 86400
