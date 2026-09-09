import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'

export const metadata: Metadata = {
  title: 'Pelatihan & Sertifikasi K3 di Bandung | Training Sertifikasi',
  description: 'Pelatihan dan sertifikasi K3 profesional untuk perusahaan dan individu di Bandung dan sekitarnya.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="bg-background">
      <body className="antialiased">
        {children}
        <FloatingWhatsApp />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
