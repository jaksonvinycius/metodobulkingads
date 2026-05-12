import { Crosshair, PanelsTopLeft, BarChart3, MessageCircle } from 'lucide-react'
import { WhatsAppCTA } from '@/components/whatsapp-cta'

const features = [
  {
    icon: Crosshair,
    title: 'Feito para Nutricionistas',
    body: 'Não é uma estratégia genérica. Tudo é pensado para o seu nicho, a sua região e o seu tipo de paciente.',
  },
  {
    icon: Crosshair,
    title: 'Pacientes Certos para Você',
    body: 'Atraia pessoas que já estão buscando acompanhamento nutricional — e não curiosos que nunca agendam.',
  },
  {
    icon: PanelsTopLeft,
    title: 'Você Cuida dos Pacientes, Eu Cuido do Resto',
    body: 'Toda a parte de atração de novos pacientes fica comigo. Você foca no que faz de melhor.',
  },
  {
    icon: BarChart3,
    title: 'Acompanhamento de Perto',
    body: 'Mais do que colocar anúncios no ar. Você recebe direcionamento estratégico para potencializar seus resultados.',
  },
]

export function SolucaoSection() {
  return (
    <section id="solucao" className="relative py-20 sm:py-28 bg-white/[0.02]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[hsl(30,50%,50%)]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-[hsl(30,50%,50%)] uppercase tracking-widest mb-4">
            A solução
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(35,30%,90%)] max-w-3xl mx-auto">
            Conheça o Método <span className="text-gradient">Bulking Ads</span>
          </h2>
          <p className="mt-4 text-[hsl(30,15%,50%)] text-lg max-w-2xl mx-auto">
            Um método criado para nutricionistas que querem atrair pacientes qualificados e parar de depender da sorte.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="animate-on-scroll group relative bg-white/[0.03] border border-white/5 rounded-xl p-7 hover:bg-white/[0.06] transition-all duration-300 hover:border-[hsl(30,50%,50%)]/20"
              >
                <div className="w-10 h-10 rounded-lg bg-[hsl(30,50%,50%)]/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[hsl(30,50%,55%)]" />
                </div>
                <h3 className="font-display font-bold text-[hsl(35,30%,88%)] text-base mb-2">
                  {feature.title}
                </h3>
                <p className="text-[hsl(30,15%,48%)] text-sm leading-relaxed">
                  {feature.body}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12 animate-on-scroll">
          <WhatsAppCTA variant="primary" className="px-7 py-3.5 hover:shadow-[0_0_25px_hsl(30,50%,50%,0.25)]">
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Quero meu diagnóstico gratuito
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  )
}
