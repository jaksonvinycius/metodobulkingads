import { Shield, MessageCircle, ArrowRight } from 'lucide-react'
import { WhatsAppCTA } from '@/components/whatsapp-cta'

export function CtaFinalSection() {
  return (
    <section id="cta" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(30,50%,50%)]/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[hsl(30,50%,50%)]/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 text-center">
        <div className="animate-on-scroll">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[hsl(30,50%,50%)]/10 border border-[hsl(30,50%,50%)]/20 rounded-full px-4 py-1.5 mb-8">
            <Shield className="w-4 h-4 text-[hsl(30,50%,55%)]" />
            <span className="text-sm text-[hsl(30,50%,55%)] font-medium">
              Diagnóstico gratuito e sem compromisso
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(35,30%,90%)] leading-[1.15]">
            Pronto para dar o{' '}
            <span className="text-gradient">próximo passo</span>?
          </h2>

          <p className="mt-6 text-[hsl(30,15%,50%)] text-lg max-w-xl mx-auto leading-relaxed">
            Vamos analisar juntos o potencial do seu consultório. Descubra como atrair os pacientes certos e transformar seus resultados.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <WhatsAppCTA variant="primary" className="text-lg px-10 py-5 hover:shadow-[0_0_40px_hsl(30,50%,50%,0.3)]">
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Agendar diagnóstico gratuito
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
