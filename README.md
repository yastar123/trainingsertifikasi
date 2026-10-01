# Training Sertifikasi

Company profile statis untuk layanan pelatihan dan sertifikasi K3 berbasis Next.js App Router.

## Deploy wildcard subdomain

1. Deploy project ke Vercel.
2. Tambahkan `trainingsertifikasi.id` di Project Settings → Domains.
3. Tambahkan wildcard domain `*.trainingsertifikasi.id`.
4. Arahkan nameserver domain ke `ns1.vercel-dns.com` dan `ns2.vercel-dns.com`.
5. Setiap subdomain yang tersedia akan dirender dari data lokal, misalnya `bandung.trainingsertifikasi.id` atau `jakarta.trainingsertifikasi.id`.

Data kota ada di `data/cities.ts`, katalog program di `data/trainings.ts`, dan nomor WhatsApp terpusat di `lib/constants.ts`.
