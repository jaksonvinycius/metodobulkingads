import { Search, Lightbulb, Rocket, LineChart } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Entendo a tua realidade',
    body: 'Analisamos o teu momento, a tua região e o tipo de paciente que tu quer atender para montar um plano que faça sentido.',
    side: 'left' as const,
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Monto o plano completo',
    body: 'Crio toda a estratégia para tu começar a receber contatos de pessoas interessadas no teu acompanhamento.',
    side: 'right' as const,
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Os pacientes começam a chegar',
    body: 'Com tudo pronto, tu começa a receber mensagens de pessoas prontas para agendar consulta.',
    side: 'left' as const,
  },
  {
    number: '04',
    icon: LineChart,
    title: 'Melhoria contínua',
    body: 'Acompanho os resultados de perto e vou ajustando para tu receber cada vez mais pacientes pelo menor custo.',
    side: 'right' as const,
  },
]

export function ComoFuncionaSection() {
  return (
    <section id="como-funciona" className="relative py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-[hsl(30,50%,50%)] uppercase tracking-widest mb-4">
            Simples e direto
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(35,30%,90%)] max-w-3xl mx-auto">
            Como funciona na <span className="text-gradient">prática</span>
          </h2>
          <p className="mt-4 text-[hsl(30,15%,50%)] text-lg max-w-xl mx-auto">
            Sem complicação. tu foca nos pacientes, eu cuido da atração.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[hsl(30,50%,50%)]/20 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step) => {
              const Icon = step.icon
              const isLeft = step.side === 'left'

              return (
                <div
                  key={step.number}
                  className={`relative ${
                    isLeft
                      ? 'lg:pr-12 animate-on-scroll animate-from-left'
                      : 'lg:pl-12 lg:mt-16 animate-on-scroll animate-from-right'
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`hidden lg:flex absolute top-8 w-4 h-4 bg-[hsl(30,50%,50%)] rounded-full border-4 border-[hsl(20,10%,7%)] z-10 ${
                      isLeft ? '-right-2' : '-left-2'
                    }`}
                  />

                  <div className="bg-white/[0.03] border border-white/5 rounded-xl p-8 hover:bg-white/[0.06] transition-all duration-300 hover:border-[hsl(30,50%,50%)]/15">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[hsl(30,50%,50%)]/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[hsl(30,50%,55%)]" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-[hsl(30,50%,50%)]/60 uppercase tracking-widest">
                          Passo {step.number}
                        </span>
                        <h3 className="font-display font-bold text-lg text-[hsl(35,30%,88%)]">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[hsl(30,15%,48%)] text-sm leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
