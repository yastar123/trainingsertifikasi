'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Flame,
  GraduationCap,
  HardHat,
  Menu,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { PHONE_DISPLAY, whatsappLink as createWhatsappLink } from '@/lib/constants'

const DEFAULT_CITY = 'Bandung'

const trainings = [
  ['Ahli K3 Umum', 'Pelatihan kompetensi dasar untuk pengelolaan K3 profesional.'],
  ['Operator Forklift', 'Tingkatkan kemampuan operator dan keselamatan operasional.'],
  ['SMK3', 'Bangun sistem manajemen keselamatan kerja yang terukur.'],
  ['K3 Kebakaran', 'Kesiapsiagaan menghadapi risiko kebakaran di tempat kerja.'],
  ['Petugas P3K', 'Respons pertama yang tepat untuk kondisi darurat kerja.'],
  ['K3 Konstruksi', 'Standar keselamatan untuk proyek dan area konstruksi.'],
  ['K3 Listrik', 'Identifikasi bahaya dan pengendalian risiko kelistrikan.'],
  ['Working at Height', 'Bekerja di ketinggian dengan prosedur yang aman.'],
  ['Rigger', 'Kompetensi juru ikat untuk aktivitas lifting dan rigging.'],
]

const benefits = [
  [ShieldCheck, 'Kepatuhan regulasi', 'Memenuhi kebutuhan regulasi K3 nasional dengan program yang terarah.'],
  [Award, 'Sertifikat resmi', 'Dokumen kompetensi yang mendukung kebutuhan personal dan perusahaan.'],
  [Users, 'Instruktur berpengalaman', 'Belajar dari praktisi tersertifikasi dengan pengalaman lapangan.'],
  [HardHat, 'Risiko lebih terkendali', 'Bangun budaya kerja aman dan kurangi potensi kecelakaan kerja.'],
  [Building2, 'Untuk perusahaan', 'Pilihan in-house training yang fleksibel sesuai kebutuhan tim.'],
  [Clock3, 'Jadwal fleksibel', 'Konsultasikan format, lokasi, dan jadwal pelatihan terbaik.'],
]

const yearlyData = [
  { year: '2021', peserta: 260 },
  { year: '2022', peserta: 410 },
  { year: '2023', peserta: 580 },
  { year: '2024', peserta: 760 },
  { year: '2025', peserta: 940 },
]
const categoryData = [
  { name: 'Pelatihan', value: 62 },
  { name: 'Kajian', value: 18 },
  { name: 'Jasa', value: 20 },
]
const faqs = [
  ['Apakah sertifikat pelatihan diakui secara resmi?', 'Kami membantu memilih program dan skema sertifikasi yang sesuai dengan kebutuhan kompetensi serta ketentuan yang berlaku. Detail pengakuan dapat dikonsultasikan sebelum pendaftaran.'],
  ['Apakah tersedia in-house training?', 'Tersedia. Pelatihan dapat diselenggarakan di lokasi perusahaan atau tempat yang disepakati, dengan materi dan jadwal yang disesuaikan.'],
  ['Apakah tersedia pelatihan online atau hybrid?', 'Beberapa program dapat dilakukan secara online atau hybrid. Tim kami akan merekomendasikan format terbaik berdasarkan jenis pelatihannya.'],
  ['Bagaimana cara mendaftar pelatihan di Bandung?', 'Klik tombol WhatsApp, sampaikan program yang diminati dan jumlah peserta. Tim kami akan mengirimkan jadwal serta penawaran yang sesuai.'],
  ['Apakah ada minimal peserta untuk in-house training?', 'Jumlah peserta bergantung pada program. Hubungi kami untuk mendapatkan opsi kelas publik maupun in-house.'],
]

function whatsappLink(message = `Halo, saya ingin bertanya tentang pelatihan K3 di ${DEFAULT_CITY}.`) {
  return createWhatsappLink(message)
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-pretty leading-7 text-muted-foreground">{description}</p>}
    </div>
  )
}

export default function Page({ city = DEFAULT_CITY }: { city?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const locationCity = city

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#beranda" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"><HardHat size={17} /></span>
            <span>Training Sertifikasi</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#beranda" className="transition-colors hover:text-foreground">Beranda</a>
            <a href="#pelatihan" className="transition-colors hover:text-foreground">Pelatihan</a>
            <a href="#tentang" className="transition-colors hover:text-foreground">Tentang</a>
            <a href="#kontak" className="transition-colors hover:text-foreground">Kontak</a>
          </nav>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 sm:block">Hubungi Kami</a>
          <button aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} onClick={() => setMenuOpen(!menuOpen)} className="rounded-md p-2 md:hidden">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm"><a href="#beranda" onClick={() => setMenuOpen(false)}>Beranda</a><a href="#pelatihan" onClick={() => setMenuOpen(false)}>Pelatihan</a><a href="#tentang" onClick={() => setMenuOpen(false)}>Tentang</a><a href="#kontak" onClick={() => setMenuOpen(false)}>Kontak</a><a href={whatsappLink()} target="_blank" rel="noreferrer" className="rounded-lg bg-primary px-4 py-3 text-center font-medium text-primary-foreground">Hubungi Kami</a></div></nav>}
      </header>

      <section id="beranda" className="border-b border-border px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground"><span className="size-1.5 rounded-full bg-emerald-600" /> Pelatihan K3 profesional di {locationCity}</div>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.065em] sm:text-6xl lg:text-7xl">Bangun tempat kerja yang <span className="text-muted-foreground">lebih aman.</span></h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">Pelatihan dan sertifikasi K3 yang relevan untuk individu maupun perusahaan. Melayani kebutuhan kompetensi di {locationCity} dan sekitarnya.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-85">Konsultasi via WhatsApp <ArrowUpRight size={16} /></a><a href="#pelatihan" className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3.5 text-sm font-medium hover:border-foreground">Lihat Daftar Pelatihan</a></div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-5 border-t border-border pt-6"><div><p className="text-xl font-semibold tracking-tight sm:text-2xl">500+</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Perusahaan terlayani</p></div><div><p className="text-xl font-semibold tracking-tight sm:text-2xl">200+</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Kota layanan</p></div><div><p className="text-xl font-semibold tracking-tight sm:text-2xl">Resmi</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Program tersertifikasi</p></div></div>
          </div>
          <div className="relative rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"><div className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full border border-border bg-background"><Check size={18} /></div><div className="flex min-h-72 flex-col justify-between"><div><p className="text-sm text-muted-foreground">Fokus utama kami</p><p className="mt-4 max-w-xs text-3xl font-semibold tracking-[-0.05em]">Kompetensi yang berdampak nyata.</p></div><div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-border bg-background p-4"><GraduationCap size={19} /><p className="mt-8 text-sm font-medium">Kompetensi</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Materi terstruktur</p></div><div className="rounded-xl border border-border bg-background p-4"><FileCheck2 size={19} /><p className="mt-8 text-sm font-medium">Sertifikasi</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Dokumen terpercaya</p></div></div></div></div>
        </div>
      </section>

      <section id="tentang" className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Mengapa kami" title="K3 bukan sekadar kewajiban. Ini investasi untuk masa depan." description="Kami membantu organisasi membangun pengetahuan, kebiasaan, dan sistem kerja yang lebih aman melalui pelatihan yang praktis dan mudah diterapkan." /><div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{benefits.map(([Icon, title, text]) => <div key={title as string} className="bg-background p-6 sm:p-7"><Icon size={21} strokeWidth={1.7} /><h3 className="mt-10 font-medium">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text as string}</p></div>)}</div></div></section>

      <section id="pelatihan" className="border-y border-border bg-secondary/35 px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><SectionHeading eyebrow="Katalog program" title="Pilih program yang sesuai kebutuhan." description="Dari kompetensi dasar hingga kebutuhan spesifik industri, konsultasikan program terbaik untuk tim Anda." /><span className="mb-10 hidden text-sm text-muted-foreground sm:block">{trainings.length}+ program tersedia</span></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{trainings.map(([title, text], index) => <div key={title} className="group flex min-h-48 flex-col justify-between rounded-xl border border-border bg-background p-5 transition-colors hover:border-foreground"><div><div className="mb-8 flex items-center justify-between"><span className="text-xs text-muted-foreground">0{index + 1}</span><ArrowUpRight size={17} className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><h3 className="font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div><a href={whatsappLink(`Halo, saya ingin bertanya tentang pelatihan ${title} di ${locationCity}.`)} target="_blank" rel="noreferrer" className="mt-5 text-xs font-medium underline underline-offset-4">Tanya via WhatsApp</a></div>)}</div></div></section>

      <section className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Data & kepercayaan" title="Dipercaya untuk terus belajar dan berkembang." description="Data berikut adalah ilustrasi presentasi dan dapat disesuaikan dengan laporan aktual perusahaan." /><div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]"><div className="rounded-xl border border-border p-4 sm:p-6"><div className="mb-6 flex items-center gap-2"><BarChart3 size={18} /><p className="text-sm font-medium">Peserta tersertifikasi per tahun</p></div><div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={yearlyData} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}><CartesianGrid vertical={false} stroke="#eaeaea" /><XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} /><YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} /><Tooltip cursor={{ fill: '#f5f5f5' }} /><Bar dataKey="peserta" fill="#111111" radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer></div></div><div className="rounded-xl border border-border p-4 sm:p-6"><p className="text-sm font-medium">Distribusi kategori program</p><div className="relative h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryData} innerRadius={62} outerRadius={88} dataKey="value" stroke="none">{categoryData.map((_, index) => <Cell key={index} fill={['#111111', '#8a8a8a', '#d4d4d4'][index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-semibold">100%</span><span className="text-xs text-muted-foreground">total program</span></div></div><div className="flex justify-center gap-4 text-xs text-muted-foreground">{categoryData.map((item, i) => <span key={item.name} className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ backgroundColor: ['#111111', '#8a8a8a', '#d4d4d4'][i] }} />{item.name}</span>)}</div></div></div></div></section>

      <section className="border-t border-border bg-secondary/35 px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeading eyebrow="Pertanyaan umum" title="Punya pertanyaan? Kami siap membantu." /><div className="divide-y divide-border border-y border-border">{faqs.map(([question, answer], index) => <div key={question}><button onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-medium"><span>{question}</span><ChevronDown size={18} className={`shrink-0 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} /></button>{activeFaq === index && <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-muted-foreground">{answer}</p>}</div>)}</div></div></section>

      <section id="kontak" className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Area layanan" title={`Pelatihan K3 di ${locationCity} dan sekitarnya.`} description={`Kami melayani kebutuhan pelatihan dan sertifikasi K3 untuk perusahaan, proyek, dan individu di ${locationCity}. Hubungi tim kami untuk mengetahui jadwal terdekat, program in-house, dan cakupan layanan yang tersedia.`} /><div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><div className="min-h-72 overflow-hidden rounded-xl border border-border bg-secondary"><iframe title={`Peta lokasi layanan ${locationCity}`} src={`https://www.google.com/maps?q=Training+Sertifikasi+${locationCity}&output=embed`} className="h-full min-h-72 w-full border-0 grayscale" loading="lazy" /></div><div className="rounded-xl border border-border p-6 sm:p-8"><MapPin size={21} /><p className="mt-12 text-sm text-muted-foreground">Area layanan</p><p className="mt-2 text-xl font-medium">{locationCity} dan sekitarnya</p><div className="my-7 border-t border-border" /><p className="text-sm text-muted-foreground">Alamat kantor/perwakilan</p><p className="mt-2 text-sm leading-6">Alamat menyusul — hubungi kami via WhatsApp untuk informasi lokasi dan jadwal.</p><a href={whatsappLink()} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4">Tanyakan jadwal <ArrowUpRight size={15} /></a></div></div></div></section>

      <footer className="border-t border-border bg-primary px-5 py-12 text-primary-foreground sm:px-8"><div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.6fr_0.8fr]"><div><div className="flex items-center gap-2 font-semibold"><span className="flex size-8 items-center justify-center rounded-md border border-primary-foreground/30"><HardHat size={17} /></span>Training Sertifikasi</div><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/60">Partner pelatihan dan sertifikasi K3 untuk membangun tempat kerja yang lebih aman dan kompeten.</p></div><div><p className="text-sm font-medium">Navigasi</p><div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/60"><a href="#beranda">Beranda</a><a href="#pelatihan">Pelatihan</a><a href="#tentang">Tentang kami</a></div></div><div><p className="text-sm font-medium">Hubungi kami</p><a href={whatsappLink()} target="_blank" rel="noreferrer" className="mt-5 block text-sm text-primary-foreground/60">{PHONE_DISPLAY}</a><p className="mt-2 text-sm text-primary-foreground/60">WhatsApp tersedia setiap hari</p></div></div><div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-primary-foreground/15 pt-5 text-xs text-primary-foreground/45 sm:flex-row sm:justify-between"><span>© 2026 Training Sertifikasi. Semua hak dilindungi.</span><span>trainingsertifikasi.id</span></div></footer>

      <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat WhatsApp" className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 sm:bottom-7 sm:right-7"><MessageCircle size={24} /></a>
    </main>
  )
}
