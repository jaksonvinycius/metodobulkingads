import { Shield, MessageCircle, ArrowRight } from 'lucide-react'
import { WhatsAppCTA } from '@/components/whatsapp-cta'
import type { ClientConfig } from '@/lib/types'

interface Props { config: ClientConfig }

export function CtaFinalSection({ config }: Props) {
  return (
    <section id="cta" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary)/0.05)] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[hsl(var(--primary)/0.06)] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 text-center">
        <div className="animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-[hsl(var(--primary)/0.10)] border border-[hsl(var(--primary)/0.20)] rounded-full px-4 py-1.5 mb-8">
            <Shield className="w-4 h-4 text-[hsl(var(--primary-light))]" />
            <span className="text-sm text-[hsl(var(--primary-light))] font-medium">
              Diagnóstico gratuito e sem compromisso
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(35,30%,90%)] leading-[1.15]">
            {config.cta.final_title.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="text-gradient">
              {config.cta.final_title.split(' ').slice(-2).join(' ')}
            </span>
          </h2>

          <p className="mt-6 text-[hsl(30,15%,50%)] text-lg max-w-xl mx-auto leading-relaxed">
            {config.cta.final_subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <WhatsAppCTA variant="primary" whatsapp={config.whatsapp} className="text-lg px-10 py-5 hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]">
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              {config.hero.cta_primary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </WhatsAppCTA>
            <p className="text-[hsl(30,15%,40%)] text-sm">
              Vagas limitadas por região — resposta em até 24h
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
