'use client'

import { MessageCircle } from 'lucide-react'
import type { ClientConfig } from '@/lib/types'

interface Props { config: ClientConfig }

export function WhatsAppFloat({ config }: Props) {
  return (
    <a
      href={`https://wa.me/${config.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)]"
      style={{ background: 'linear-gradient(135deg,#25d366 0%,#128c4a 100%)' }}
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  )
}
