'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { QualificationModal } from '@/components/qualification-modal'
import type { ClientConfig } from '@/lib/types'

interface Props { config: ClientConfig }

export function DiagnosticoSection({ config }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="diagnostico-section" className="relative py-20 sm:py-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[hsl(var(--primary)/0.05)] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[600px] mx-auto px-4 sm:px-6 text-center">
        <div className="animate-on-scroll">
          <span className="inline-block text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-4">
            Diagnóstico gratuito
          </span>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(35,30%,90%)] leading-[1.15] mb-4">
            {config.cta.diagnostic_title}
          </h2>

          <p className="text-[hsl(30,15%,50%)] text-base max-w-md mx-auto mb-10 leading-relaxed">
            {config.cta.diagnostic_subtitle}
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]"
          >
            <MessageCircle className="w-6 h-6" />
            Iniciar diagnóstico gratuito
          </button>

          <p className="text-[hsl(30,15%,35%)] text-xs mt-5 flex items-center justify-center gap-1.5">
            <MessageCircle className="w-3 h-3" />
            100% gratuito · Sem compromisso
          </p>
        </div>
      </div>

      <QualificationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        config={config}
      />
    </section>
  )
}
