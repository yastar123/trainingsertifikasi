'use client'

import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/constants'

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink('Halo, saya ingin berkonsultasi tentang layanan K3.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Konsultasi melalui WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span className="hidden sm:inline">Konsultasi WhatsApp</span>
    </a>
  )
}
