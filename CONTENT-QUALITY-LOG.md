# Content Quality Log — Batch 1

Batch 1 covers one service, K3 Listrik, for 20 selected cities with broad economic visibility and established industrial, logistics, commercial, energy, education, tourism, or public-service activity.

| City | Service | Status | Basis |
|---|---|---|---|
| Jakarta | K3 Listrik | kontekstual-generik | Pemerintahan, perkantoran, gedung komersial, pusat data, infrastruktur |
| Surabaya | K3 Listrik | kontekstual-generik | Manufaktur, pelabuhan, logistik, perdagangan |
| Medan | K3 Listrik | kontekstual-generik | Perdagangan, industri pengolahan, distribusi |
| Semarang | K3 Listrik | kontekstual-generik | Manufaktur, pelabuhan, kawasan industri, logistik |
| Palembang | K3 Listrik | kontekstual-generik | Energi, industri pengolahan, utilitas |
| Balikpapan | K3 Listrik | kontekstual-generik | Energi, migas, konstruksi, jasa industri |
| Makassar | K3 Listrik | kontekstual-generik | Pelabuhan, perdagangan, logistik, perikanan |
| Bandung | K3 Listrik | kontekstual-generik | Industri pengolahan, pendidikan, kesehatan, perdagangan |
| Batam | K3 Listrik | kontekstual-generik | Manufaktur, galangan kapal, kawasan industri |
| Pekanbaru | K3 Listrik | kontekstual-generik | Energi, perkebunan, perdagangan, konstruksi |
| Yogyakarta | K3 Listrik | kontekstual-generik | Pendidikan, pariwisata, hotel, layanan publik |
| Bogor | K3 Listrik | kontekstual-generik | Manufaktur, pendidikan, perdagangan, kesehatan |
| Bekasi | K3 Listrik | kontekstual-generik | Manufaktur, otomotif, pergudangan, pusat data |
| Tangerang | K3 Listrik | kontekstual-generik | Manufaktur, distribusi, penerbangan, komersial |
| Cilegon | K3 Listrik | kontekstual-generik | Industri baja, kimia, manufaktur, pelabuhan, energi, konstruksi |
| Samarinda | K3 Listrik | kontekstual-generik | Pertambangan, energi, konstruksi, perdagangan |
| Pontianak | K3 Listrik | kontekstual-generik | Perdagangan, pengolahan pangan, distribusi |
| Banjarmasin | K3 Listrik | kontekstual-generik | Perdagangan, logistik, pengolahan, jasa |
| Manado | K3 Listrik | kontekstual-generik | Pariwisata, hotel, perdagangan, perikanan |
| Denpasar | K3 Listrik | kontekstual-generik | Pariwisata, hotel, restoran, utilitas |

Status “kontekstual-generik” berarti artikel memakai konteks kota yang masuk akal dan terdiferensiasi berdasarkan pengetahuan umum sektor kota; klaim angka, regulasi spesifik, atau data temporal tidak dibuat tanpa sumber terverifikasi.

## Permanent two-tier policy

Mulai sekarang, seluruh layanan memakai registry `data/tier1-cities.ts` yang sama.

| Tier | Cakupan | Perlakuan |
|---|---|---|
| Tier 1 | 20 kota besar/terkenal | Artikel penuh yang ditulis dan direview per kota |
| Tier 2 | 188 kota lainnya | Tidak memiliki URL artikel; redirect 308 ke `/{city}#pelatihan` |

Keputusan ini dibuat setelah similarity Batch 2 gagal memenuhi batas maksimal 40%: sampel pekerjaan lapangan mencapai 92,59% dan sampel operasi harian 88,46%. Artikel Tier 2 K3 Listrik dinonaktifkan dari static params dan sitemap agar tidak menjadi halaman SEO terpisah yang repetitif. Tier 1 K3 Listrik kini ditulis sebagai objek bespoke per kota tanpa fungsi generator bersama; spot-check tiga pasangan menghasilkan 0 kalimat identik pada setiap pasangan yang diuji.

## Canonical migration audit — 2026-09-07

Audit dilakukan pada teks yang benar-benar dirender halaman kota: intro dan dua section pertama. Tidak ada sumber CMS/database, jadwal training konkret, alamat venue/cabang, nomor kontak khusus kota, atau testimoni peserta yang direferensikan oleh data artikel. Karena itu, seluruh 20 kota untuk K3 Listrik dan seluruh 20 kota untuk SMK3 diklasifikasikan `kontekstual-generik`, bukan `riset-kuat`.

Similarity exact format ringkas (kalimat identik / total kalimat pasangan; persentase dihitung terhadap masing-masing halaman):

| Layanan | Pasangan | Identik | Persentase |
|---|---|---:|---:|
| K3 Listrik | Medan–Pontianak | 4 / 8 | 50% / 50% |
| K3 Listrik | Medan–Banjarmasin | 4 / 8 | 50% / 50% |
| K3 Listrik | Pontianak–Banjarmasin | 4 / 8 | 50% / 50% |
| K3 Listrik | Jakarta–Surabaya | 4 / 9 | 44,444444% / 50% |
| K3 Listrik | Bekasi–Tangerang | 4 / 8 | 50% / 50% |
| SMK3 | Medan–Pontianak | 0 / 8 | 0% / 0% |
| SMK3 | Medan–Banjarmasin | 0 / 8 | 0% / 0% |
| SMK3 | Pontianak–Banjarmasin | 5 / 6 | 83,333333% / 83,333333% |
| SMK3 | Jakarta–Surabaya | 4 / 12 | 33,333333% / 50% |
| SMK3 | Bekasi–Tangerang | 5 / 6 | 83,333333% / 83,333333% |

Penyebab utama similarity tinggi adalah paragraf verifikasi/tindak lanjut yang sama pada ringkasan kota. Tidak ada perbaikan konten dilakukan dalam audit ini.

## Duplicate paragraph removal — 2026-09-07

Atas persetujuan, dua paragraf generik K3 Listrik dan empat paragraf generik SMK3 dihapus dari seluruh data artikel kota. Informasi umum yang masih berguna dipindahkan ke masing-masing artikel canonical; halaman kota tidak diisi paragraf pengganti.

Post-removal spot-check menggunakan intro dan dua section pertama yang dirender: K3 Listrik menghasilkan 0 kalimat identik pada seluruh 8 pasangan; SMK3 menghasilkan 0 kalimat identik pada 5 pasangan, dan 1 kalimat identik pada Pontianak–Banjarmasin, Bekasi–Tangerang, serta Cilegon–Samarinda (50% / 50% karena halaman yang tersisa hanya dua kalimat). Pasangan lain: Medan–Pontianak 0% / 0%, Medan–Banjarmasin 0% / 0%, Jakarta–Surabaya 0% / 0%, Palembang–Balikpapan 5% / 4%, Makassar–Bandung 4,761905% / 4,545455%.

Build berhasil: 253 static pages. Sitemap menghasilkan 251 URL.

## Bagian 2 — Batch 2 layanan 6–10

Keputusan halaman-kota diambil sebelum penulisan: tidak ditemukan data lokal terverifikasi untuk kelima layanan ini, sehingga masing-masing dari 20 kota Tier 1 diarahkan HTTP 308 ke canonical. Tidak ada halaman kota lokal yang dibuat.

| Layanan | Kota lokal | Redirect canonical | Target | Canonical source |
|---|---:|---:|---|---:|
| Operator Lifter, Manlift, Boomlift, Scissor Lift | 0 | 20 | 1.200–2.000 | dicatat setelah validasi |
| Operator Pallet Mover, Liftstacker, Reachstacker | 0 | 20 | 1.800–2.500 karena entri gabungan | dicatat setelah validasi |
| Operator Tower Crane | 0 | 20 | 1.200–2.000 | dicatat setelah validasi |
| Operator Overhead Crane Mobile Crane Pedestal Crane | 0 | 20 | 1.800–2.500 karena entri gabungan | dicatat setelah validasi |
| Operator Pita Transport (Conveyor) Kompressor | 0 | 20 | 1.800–2.500 karena entri gabungan | dicatat setelah validasi |

Regulasi spesifik hanya dipakai pada layanan crane melalui Permenaker No. 8 Tahun 2020 yang sudah diverifikasi pada Batch 1. Layanan lain menggunakan bahasa umum dan tetap memerlukan verifikasi manual untuk klasifikasi, lisensi, pemeriksaan, serta dokumen kompetensi.

## Bagian 2 — Batch 1 layanan 3–5

### Verifikasi regulasi Operator Forklift

Pemeriksaan sumber resmi yang tersedia mengonfirmasi bahwa Peraturan Menteri Ketenagakerjaan Nomor 8 Tahun 2020 berjudul **Keselamatan dan Kesehatan Kerja Pesawat Angkat dan Pesawat Angkut** dan berstatus berlaku. Referensi pada canonical diperjelas. Penerapan terhadap tipe operator, klasifikasi, SIO/Lisensi K3, masa berlaku, dan dokumen kompetensi tetap perlu diverifikasi manual oleh pemilik bisnis atau penyelenggara berwenang sebelum publikasi sebagai nasihat kepatuhan.

PP Nomor 50 Tahun 2012 tentang Penerapan SMK3 teridentifikasi berstatus berlaku dari hasil pencarian sumber resmi. Canonical SMK3 belum menampilkan nomor tersebut, sehingga tidak ada klaim nomor baru yang ditambahkan.

Untuk K3 Listrik, pencarian sumber resmi mengindikasikan Permenaker Nomor 12 Tahun 2015 tentang K3 Listrik di Tempat Kerja dan perubahan melalui Permenaker Nomor 33 Tahun 2015. Karena detail penerapan dan status perubahan perlu pemeriksaan dokumen resmi penuh, nomor tersebut tidak ditambahkan ke canonical; pemilik bisnis tetap perlu verifikasi manual sebelum menambahkan klaim regulasi.

### Operator Alat Berat dan Operator Gondola

Keputusan diambil di depan: tidak ditemukan data lokal terverifikasi untuk 20 kota Tier 1, sehingga seluruh varian kota diarahkan melalui HTTP 308 ke canonical. Tidak ada halaman kota pengganti, venue, jadwal, kontak regional, atau testimoni yang dibuat. Kedua canonical menggunakan bahasa umum untuk lisensi dan regulasi; tidak ada nomor peraturan spesifik yang dikarang.

Canonical Operator Alat Berat mencakup tipe excavator, bulldozer, vibro, dump truck, wheel loader, risiko spesifik, checklist, zona kerja, skenario kegagalan, kompetensi, dan FAQ.

Canonical Operator Gondola mencakup sistem suspended access, komponen, checklist, cuaca, perlindungan jatuh, komunikasi, penyelamatan, kompetensi, dan FAQ.

## Bagian 2 — Operator Forklift

Urutan layanan mengikuti `data/trainings.ts`; Operator Forklift adalah layanan berikutnya setelah SMK3 dan K3 Listrik. Audit keputusan dilakukan sebelum penulisan: belum tersedia data artikel lokal terverifikasi untuk 20 kota, sehingga semua varian kota diarahkan melalui HTTP 308 ke canonical `/layanan/artikel/operator-forklift`. Tidak ada halaman kota tipis baru dibuat.

Canonical memuat ruang lingkup, jenis forklift dan risiko spesifik, checklist pra-operasi, pengendalian beban dan area, skenario kegagalan umum, kompetensi dan lisensi, peserta, penerapan, serta 8 FAQ. Tidak ada nama kota, venue, tanggal, kontak regional, atau testimoni yang ditambahkan. Setelah pendalaman, canonical berisi 1.733 kata pada source article dan tetap netral-kota.

## Thin-content threshold audit — 2026-09-07

Official threshold: fewer than 60 words of real local content, excluding FAQ and CTA/canonical links, redirects to the service canonical with HTTP 308. Counts below use the intro and the first two rendered local sections.

| Service | Above threshold | Redirect-canonical |
|---|---|---|
| K3 Listrik | Jakarta 76, Surabaya 65, Medan 63, Semarang 64, Bandung 62, Pekanbaru 61, Cilegon 60 | Palembang 58, Balikpapan 59, Makassar 57, Batam 53, Yogyakarta 56, Bogor 56, Bekasi 57, Tangerang 55, Samarinda 53, Pontianak 53, Banjarmasin 56, Manado 54, Denpasar 59 |
| SMK3 | Semarang 67, Medan 73, Surabaya 72, Jakarta 150, Palembang 326, Balikpapan 384, Makassar 308, Bandung 388, Batam 216, Pekanbaru 101, Yogyakarta 200, Bogor 203 | Bekasi 18, Tangerang 18, Cilegon 17, Samarinda 16, Pontianak 17, Banjarmasin 17, Manado 17, Denpasar 19 |

All retained city content was checked as local context rather than FAQ. Redirected city article params are excluded from static generation and sitemap; middleware returns 308 to `/layanan/artikel/[service]`.

## Canonical migration — SMK3 and K3 Listrik

Panduan utama dipusatkan pada `/layanan/artikel/smk3` dan `/layanan/artikel/k3-listrik`. Halaman kota Tier 1 hanya memuat ringkasan lokal singkat dan tautan ke panduan kanonik; FAQ lengkap tidak diulang pada halaman kota. Metadata kanonik membedakan halaman layanan netral-kota dari ringkasan lokal.

## SMK3 — single-service batch

SMK3 dikerjakan sebagai satu layanan penuh sebelum layanan berikutnya dimulai. Tier 1 berisi 20 artikel bespoke per kota; Tier 2 tetap diarahkan ke landing page kota dan tidak dimasukkan sebagai halaman artikel. Setiap artikel SMK3 menggunakan konteks sektor kota, peserta, risiko koordinasi, dan pola penerapan yang ditulis khusus per kota.

## Batch 2 — final canonical review — 2026-09-07

Atas review manual, target word count kaku sebelumnya diturunkan menjadi standar **cukup secara substansi**. Lima canonical Batch 2 dinilai memadai karena memuat checklist pra-operasi, risiko spesifik per varian, skenario kegagalan, kompetensi, penerapan, dan FAQ. Tidak ada ekspansi teks lanjutan setelah keputusan ini.

| Layanan | Word count final | Status |
|---|---:|---|
| Operator Lifter, Manlift, Boomlift, Scissor Lift | 1.682 | cukup secara substansi |
| Operator Pallet Mover, Liftstacker, Reachstacker | 1.754 | cukup secara substansi |
| Operator Tower Crane | 1.181 | cukup secara substansi |
| Operator Overhead Crane, Mobile Crane, Pedestal Crane | 1.530 | cukup secara substansi |
| Operator Pita Transport (Conveyor), Kompressor | 1.538 | cukup secara substansi |

Validasi final: syntax `data/articles/canonical-services.ts` valid; `pnpm build` sukses dengan 240 halaman statis; sitemap menghasilkan 238 URL untuk 208 kota; seluruh 100 kombinasi URL kota Tier 1 × lima layanan merespons HTTP 308; dan tidak ada URL kota untuk lima layanan tersebut di sitemap. Tidak ada halaman kota baru dibuat.

## Batch 3 — final review — 2026-09-07

Empat layanan Batch 3 ditulis sebagai canonical nasional. Word count menggunakan intro, judul dan isi section, serta FAQ. Batas maksimal tiga percobaan ekspansi per canonical diterapkan. Hasil manual masih harus dibaca sesuai karakter layanan; angka di bawah dicatat apa adanya dan tidak dipaksa mencapai target bila substansi sudah mencukupi.

| Layanan | Klasifikasi | Word count final | Status |
|---|---|---:|---|
| Rigger (Juru Ikat) | tunggal | 757 | draft substansial, di bawah target awal |
| Operator K3 Cargo Hoist Crane Kelas 3 (Lift Barang) | tunggal | 1.388 | target 1.200–2.000 tercapai setelah batas ekspansi di-reset secara eksplisit |
| Lift & Eskalator | gabungan | 1.979 | target 1.800–2.500 tercapai setelah batas ekspansi di-reset secara eksplisit |
| Operator Genset | tunggal | 1.479 | target 1.200–2.000 tercapai setelah batas ekspansi di-reset secara eksplisit |

`Pesawat Angkat & Pesawat Angkut` tidak ditulis. Audit katalog dan regulasi menunjukkan nama tersebut berfungsi sebagai kategori payung yang tumpang tindih dengan operator forklift, alat berat, crane, lifter, dan rigger yang sudah memiliki canonical spesifik. Tidak ditemukan bukti proyek bahwa item ini dijual sebagai sertifikasi lintas-alat atau kelas supervisor/pengawas K3 yang terpisah. Keputusan ini menunggu konfirmasi bisnis sebelum dapat diposisikan ulang.

Validasi Batch 3: syntax canonical valid; route registry menambahkan empat canonical; `pnpm build` sukses dengan 244 halaman statis; sitemap tetap menghasilkan 238 URL untuk 208 kota; seluruh 80 kombinasi URL kota Tier 1 × empat layanan merespons HTTP 308; dan tidak ada halaman kota baru untuk layanan tersebut. `Pesawat Angkat & Pesawat Angkut` tidak memiliki canonical atau redirect baru.

Lift & Eskalator kemudian mendapat reset batas ekspansi secara eksplisit. Tujuh celah substansi ditambahkan satu per satu dengan validasi syntax setelah setiap section: perbandingan risiko lift/eskalator, checklist inspeksi berkala, decision tree evakuasi lift macet, matriks layanan dan kewenangan, checklist eskalator periodik, skenario kebakaran/gempa/banjir/disabilitas/multi-vendor, serta panduan regulasi dan dokumen. Word count final Lift & Eskalator: 1.979.
