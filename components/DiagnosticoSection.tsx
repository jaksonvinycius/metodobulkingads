'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { QualificationModal } from '@/components/qualification-modal'

export function DiagnosticoSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section id="diagnostico-section" className="relative py-20 sm:py-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[hsl(30,50%,50%)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-[600px] mx-auto px-4 sm:px-6 text-center">
        <div className="animate-on-scroll">
          <span className="inline-block text-xs font-semibold text-[hsl(30,50%,50%)] uppercase tracking-widest mb-4">
            Diagnóstico gratuito
          </span>

          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(35,30%,90%)] leading-[1.15] mb-4">
            Responda 5 perguntas e receba uma{' '}
            <span className="text-gradient">estratégia personalizada</span>
          </h2>

          <p className="text-[hsl(30,15%,50%)] text-base max-w-md mx-auto mb-10 leading-relaxed">
            Menos de 3 minutos. Sem compromisso. No final tu sabe exatamente o que precisa para atrair mais pacientes.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-3 bg-[hsl(30,50%,50%)] hover:bg-[hsl(30,50%,45%)] text-white font-bold text-lg px-10 py-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(30,50%,50%,0.3)]"
          >
            <MessageCircle className="w-6 h-6" />
            Iniciar diagnóstico gratuito
          </button>

          <p className="text-[hsl(30,15%,35%)] text-xs mt-5 flex items-center justify-center gap-1.5">
            <MessageCircle className="w-3 h-3" />
            Resposta em até 24h · 100% gratuito · Sem compromisso
          </p>
        </div>
      </div>

      <QualificationModal open={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  )
}
