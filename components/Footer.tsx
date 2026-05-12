'use client'

import { MessageCircle, Instagram } from 'lucide-react'
import { WhatsAppCTA } from '@/components/whatsapp-cta'

const socialClass =
  'text-[hsl(30,15%,45%)] hover:text-[hsl(30,50%,55%)] transition-colors duration-200'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[hsl(20,10%,5%)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-[hsl(35,30%,90%)] text-lg">
              Vinycius <span className="text-gradient">Jakson</span>
            </p>
            <p className="text-[hsl(30,15%,45%)] text-sm mt-1">
              Tráfego Pago Estratégico para Nutricionistas
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#solucao"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#solucao')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-[hsl(30,15%,45%)] hover:text-[hsl(35,30%,80%)] text-sm transition-colors cursor-pointer"
            >
              Método
            </a>
            <a
              href="#como-funciona"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#como-funciona')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-[hsl(30,15%,45%)] hover:text-[hsl(35,30%,80%)] text-sm transition-colors cursor-pointer"
            >
              Processo
            </a>
            <a
              href="https://instagram.com/vinycius_jakson"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialClass}
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com/@euvinyciusjakson"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className={socialClass}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.83 1.54V6.78a4.85 4.85 0 0 1-1.06-.09z" />
              </svg>
            </a>
            <WhatsAppCTA variant="link">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </WhatsAppCTA>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[hsl(30,15%,30%)] text-xs">
            © {new Date().getFullYear()} Vinycius Jakson. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
