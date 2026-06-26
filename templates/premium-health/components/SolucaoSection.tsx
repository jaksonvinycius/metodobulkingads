import { WhatsAppCTA } from '@/components/whatsapp-cta'
import { MessageCircle } from 'lucide-react'
import type { ClientConfig } from '@/lib/types'

interface Props { config: ClientConfig }

export function SolucaoSection({ config }: Props) {
  return (
    <section id="solucao" className="relative py-20 sm:py-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[hsl(var(--primary)/0.04)] rounded-full blur-[150px] pointer-events-none" />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-4">
            {config.method_name ?? 'A solução'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(35,30%,90%)]">
            Como eu ajudo você a{' '}
            <span className="text-gradient">crescer de forma previsível</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {config.solutions.map((solution, i) => (
            <div
              key={i}
              className="animate-on-scroll bg-white/[0.03] border border-white/[0.06] rounded-xl p-7 hover:bg-white/[0.05] hover:border-[hsl(var(--primary)/0.15)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary)/0.10)] flex items-center justify-center mb-5">
                <span className="text-[hsl(var(--primary))] font-bold">{i + 1}</span>
              </div>
              <h3 className="font-semibold text-[hsl(35,30%,88%)] mb-2">{solution.title}</h3>
              <p className="text-[hsl(30,15%,45%)] text-sm leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll text-center">
          <WhatsAppCTA variant="primary" whatsapp={config.whatsapp} className="text-lg px-8 py-4 mx-auto">
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            {config.hero.cta_primary}
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  )
}
