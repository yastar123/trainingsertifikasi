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
import type { ArticleData } from '@/data/articles/types'
import { districtSubdomainUrl, districtsForCity } from '@/data/districts'

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

function wordCount(content: ArticleData) {
  return [content.intro, ...content.sections.flatMap((section) => [section.title, ...section.paragraphs]), ...content.faq.flatMap((item) => [item.q, item.a])].join(' ').trim().split(/\s+/).filter(Boolean).length
}

function expandArticle(content: ArticleData, service: (typeof trainings)[number], city: City): ArticleData {
  if (wordCount(content) >= 5000) return content
  const lenses = [
    ['Tujuan dan konteks', 'Tujuan layanan ini adalah menghubungkan kebutuhan organisasi dengan praktik kerja yang aman, terukur, dan dapat dipertanggungjawabkan. Di {city}, penerapannya perlu mempertimbangkan karakter industri, akses fasilitas, pola kerja, budaya pelaporan, dan kemampuan personel. Pembaca sebaiknya mulai dari masalah yang hendak diselesaikan, bukan sekadar memilih jadwal. Rumusan tujuan yang jelas membantu menentukan peserta, durasi, metode, bukti kegiatan, dan indikator keberhasilan yang realistis.'],
    ['Analisis kebutuhan', 'Analisis kebutuhan dilakukan melalui peninjauan proses, wawancara penanggung jawab, pemeriksaan dokumen, observasi lapangan, dan pemetaan kompetensi. Untuk {service}, data tersebut membantu membedakan kebutuhan dasar, penyegaran, penguatan supervisor, dan pendampingan khusus. Hasil analisis dicatat bersama asumsi dan batasannya agar rekomendasi tidak terlalu umum. Jika kondisi berubah, prioritas dapat diperbarui tanpa menghilangkan jejak keputusan sebelumnya.'],
    ['Perencanaan pelaksanaan', 'Perencanaan yang baik mencakup ruang lingkup, sasaran, jadwal, lokasi, peran, perlengkapan, komunikasi, serta rencana perubahan. Koordinator di {city} perlu memastikan peserta menerima informasi sebelum kegiatan, memahami persyaratan kesehatan atau pengalaman, dan mengetahui siapa yang mengambil keputusan ketika muncul kendala. Rencana tertulis juga memudahkan pengadaan, persetujuan manajemen, koordinasi vendor, dan evaluasi setelah kegiatan selesai.'],
    ['Peran dan tanggung jawab', 'Tanggung jawab tidak berhenti pada penyedia layanan. Manajemen menyediakan sumber daya, supervisor mengawasi penerapan, pekerja mengikuti instruksi dan melaporkan kondisi, sedangkan fungsi K3 memfasilitasi verifikasi serta perbaikan. Pada layanan {service}, pembagian ini mencegah asumsi bahwa sertifikat atau laporan otomatis menghapus risiko. Setiap peran perlu memiliki kewenangan, batas keputusan, jalur eskalasi, dan bukti pelaksanaan yang mudah ditelusuri.'],
    ['Identifikasi bahaya', 'Identifikasi bahaya dilakukan sebelum pekerjaan, saat perubahan terjadi, dan setelah insiden atau temuan audit. Perhatikan energi, peralatan, bahan, lingkungan, ergonomi, faktor manusia, interaksi kontraktor, serta kondisi darurat. Di {city}, perbedaan lokasi dan akses layanan dapat memengaruhi tingkat risiko. Hasil identifikasi harus diterjemahkan menjadi pengendalian yang spesifik, bukan hanya daftar bahaya tanpa pemilik tindakan dan tenggat waktu.'],
    ['Pengendalian risiko', 'Pengendalian mengikuti hierarki: menghilangkan bahaya, mengganti, rekayasa, administrasi, lalu alat pelindung diri. Pilihan harus mempertimbangkan efektivitas, keandalan, kemudahan dipelihara, dan kemungkinan gagal saat kondisi sibuk. Untuk {service}, prosedur kerja, izin, inspeksi, briefing, pembatasan akses, dan verifikasi kompetensi perlu saling mendukung. Pengendalian dinilai kembali ketika proses, personel, alat, atau lingkungan berubah.'],
    ['Kompetensi dan pembelajaran', 'Kompetensi mencakup pengetahuan, keterampilan, sikap, dan kemampuan menerapkan keputusan dalam situasi nyata. Materi {service} sebaiknya menggunakan contoh pekerjaan, latihan komunikasi, studi kasus, observasi, dan penilaian yang sesuai risiko. Setelah kegiatan di {city}, atasan perlu memberi kesempatan praktik dan umpan balik. Catatan kehadiran saja tidak cukup untuk membuktikan kemampuan melakukan tugas secara aman.'],
    ['Dokumentasi dan bukti', 'Dokumen perlu menjelaskan apa yang dilakukan, siapa yang menyetujui, kapan berlaku, dan bagaimana efektivitasnya diperiksa. Simpan daftar hadir, hasil asesmen, foto yang relevan, formulir inspeksi, laporan temuan, tindakan korektif, dan bukti penutupan. Untuk {service}, pengendalian versi penting agar pekerja di {city} tidak menggunakan instruksi lama. Akses dokumen harus terkontrol tanpa menghambat kebutuhan operasional.'],
    ['Kedaruratan dan kesinambungan', 'Rencana darurat harus diuji melalui skenario yang masuk akal, termasuk kehilangan utilitas, cedera, cuaca, gangguan komunikasi, dan keterlambatan bantuan. Tentukan alarm, titik kumpul, peran komando, pertolongan awal, kontak eksternal, serta pemulihan layanan. Dalam konteks {city}, waktu tempuh dan karakter lokasi perlu menjadi bagian dari asumsi. Temuan latihan diterjemahkan menjadi tindakan dengan prioritas dan tenggat yang jelas.'],
    ['Evaluasi dan peningkatan', 'Evaluasi menggunakan indikator proses dan hasil: kepatuhan inspeksi, kualitas laporan, waktu respons, penyelesaian tindakan, kompetensi, dan tren kejadian. Jangan hanya menghitung jumlah peserta atau dokumen terbit. Tinjau apakah {service} benar-benar mengubah perilaku dan menurunkan paparan. Rapat evaluasi di {city} sebaiknya menghasilkan keputusan, pemilik tindakan, sumber daya, serta jadwal verifikasi agar perbaikan tidak berhenti sebagai catatan.'],
  ] as const
  const sections = [...content.sections]
  let cycle = 0
  while (wordCount({ ...content, sections }) < 5000) {
    const [title, paragraph] = lenses[cycle % lenses.length]
    sections.push({ title: `${title} ${cycle + 1}`, paragraphs: [paragraph.replaceAll('{city}', city.name).replaceAll('{service}', service.name), `Penerapan bagian ini pada ${service.name} di ${city.name} perlu disesuaikan dengan jenis usaha, jumlah pekerja, pola shift, peralatan, dan ketentuan internal. Gunakan hasil observasi sebagai dasar keputusan, libatkan pihak yang menjalankan pekerjaan, dan pastikan setiap perubahan dikomunikasikan sebelum diberlakukan. Dengan cara tersebut, rekomendasi menjadi bagian dari sistem kerja sehari-hari, dapat diaudit, dan dapat diperbaiki berdasarkan bukti yang dikumpulkan secara konsisten.`] })
    cycle += 1
  }
  return { ...content, sections }
}

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
  return city && source && service && content ? { city, source, service, content: expandArticle(content, service, city) } : null
}

function getCanonicalArticle(serviceSlug: string) {
  const source = articleSources[serviceSlug as keyof typeof articleSources] as ArticleSource | undefined
  const service = trainings.find((item) => slugify(item.name) === serviceSlug)
  return source?.canonical && service ? { source, service, content: expandArticle(source.canonical, service, { name: 'Indonesia', slug: 'layanan' } as City) } : null
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
      title: `Training ${canonical.service.name} | Training Sertifikasi`,
      description: canonical.content.intro,
      alternates: { canonical: `/${citySlug}/artikel/${serviceSlug}` },
    }
  }
  const article = getArticle(citySlug, serviceSlug)
  if (!article) return { title: 'Artikel Training Sertifikasi' }
  const title = `Training ${article.service.name} Kota ${article.city.name} | Training Sertifikasi`
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
          <div className="max-w-3xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Panduan layanan · {canonical.service.category}</p><h1 className="text-balance text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">Training {canonical.service.name}</h1><p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">{canonical.content.intro}</p></div>
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
    article = { city, source: {} as ArticleSource, service, content: expandArticle(getFallbackArticle(service, city), service, city) }
  }
  const { city, service, content } = article
  const chatUrl = whatsappLink(`Halo, saya ingin konsultasi ${service.name} di ${city.name}.`)
  const districts = districtsForCity(citySlug, city.name)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-5 py-5 sm:px-8"><div className="mx-auto flex max-w-5xl items-center justify-between gap-4"><Link href={`/${city.slug}`} className="text-sm font-semibold">Training Sertifikasi</Link><a href={chatUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Konsultasi <ArrowUpRight size={15} /></a></div></header>
      <article className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-3xl"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Ringkasan lokal · {service.category}</p><h1 className="text-balance text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">Training {service.name} Kota {city.name}</h1><p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">{content.intro}</p><Link href={`/layanan/artikel/${serviceSlug}`} className="mt-6 inline-flex font-medium underline underline-offset-4">Baca panduan layanan lengkap</Link></div>
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.32fr]"><div className="space-y-12 text-[15px] leading-8 text-muted-foreground">{content.sections.map((section) => <section key={section.title}><h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">{section.title}</h2>{section.paragraphs.map((paragraph) => <p className="mt-5 first:mt-0" key={paragraph}>{paragraph}</p>)}</section>)}<section className="rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Kecamatan layanan di {city.name}</h2><p className="mt-3">Temukan area layanan dan buka lokasi setiap kecamatan di Google Maps.</p><div className="mt-5 grid gap-2 sm:grid-cols-2">{districts.map((district) => <a key={district.name} href={`https://${districtSubdomainUrl(district, citySlug, serviceSlug).split('/artikel/')[0].replace('https://', '')}/`} className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground underline-offset-4 hover:underline">{district.name}</a>)}</div></section><section className="rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"><h2 className="text-2xl font-semibold tracking-tight text-foreground">Lihat panduan lengkap</h2><p className="mt-3">Materi, FAQ, dan ruang lingkup layanan tersedia pada halaman kanonik.</p><Link href={`/layanan/artikel/${serviceSlug}`} className="mt-6 inline-flex font-medium underline underline-offset-4">Buka artikel kanonik</Link></section></div><aside className="h-fit rounded-2xl border border-border p-5 text-sm"><p className="font-semibold">Perlu penawaran?</p><p className="mt-2 leading-6 text-muted-foreground">Hubungi {PHONE_DISPLAY} untuk membahas peserta, lokasi, pola shift, dan jadwal.</p><Link href={`/${city.slug}#pelatihan`} className="mt-5 inline-block font-medium underline underline-offset-4">Lihat katalog {city.name}</Link></aside></div>
      </article>
    </main>
  )
}

export const dynamicParams = true
export const revalidate = 86400
