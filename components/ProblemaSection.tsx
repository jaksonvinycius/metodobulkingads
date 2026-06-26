import { HeartCrack, CalendarX, TrendingDown, CircleDollarSign, Clock } from 'lucide-react'

const problems = [
  {
    icon: HeartCrack,
    title: 'Ainda não vive da nutrição',
    body: 'Formou, se dedicou, mas ainda não consegue viver só do consultório. Trabalha em outra coisa enquanto tenta fazer dar certo.',
  },
  {
    icon: CalendarX,
    title: 'Não sabe quanto vai faturar no próximo mês',
    body: 'Meses bons seguidos de meses ruins. tu nunca sabe quantos pacientes vai atender — e isso trava qualquer planejamento.',
  },
  {
    icon: TrendingDown,
    title: 'Depende de indicações para sobreviver',
    body: 'Quando alguém indica, ótimo. Mas e quando não indica? tu fica esperando, sem controle nenhum.',
  },
  {
    icon: CircleDollarSign,
    title: 'Acha que "não dá para ir além"',
    body: 'tu olha para outros profissionais crescendo e pensa que é sorte, ou que com tu é diferente. Não é.',
  },
]

export function ProblemaSection() {
  return (
    <section id="problema" className="relative py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-[hsl(30,50%,50%)] uppercase tracking-widest mb-4">
            Isso te parece familiar?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(35,30%,90%)] max-w-3xl mx-auto">
            tu sabe que pode <span className="text-gradient">mais</span>
          </h2>
          <p className="mt-4 text-[hsl(30,15%,50%)] text-lg max-w-2xl mx-auto">
            Mas algo está travando o teu crescimento.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem) => {
            const Icon = problem.icon
            return (
              <div
                key={problem.title}
                className="animate-on-scroll group relative bg-white/[0.03] border border-white/5 rounded-xl p-8 hover:bg-white/[0.06] transition-all duration-300 hover:border-[hsl(30,50%,50%)]/15"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[hsl(35,30%,88%)] mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-[hsl(30,15%,50%)] text-sm leading-relaxed">
                      {problem.body}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Fifth card — centered */}
        <div className="mt-6 max-w-xl mx-auto animate-on-scroll">
          <div className="group relative bg-white/[0.03] border border-white/5 rounded-xl p-8 hover:bg-white/[0.06] transition-all duration-300 hover:border-[hsl(30,50%,50%)]/15">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[hsl(35,30%,88%)] mb-2">
                  Sem tempo para cuidar disso
                </h3>
                <p className="text-[hsl(30,15%,50%)] text-sm leading-relaxed">
                  teu foco deveria ser nos pacientes, não tentando descobrir sozinha como atrair mais.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-12 text-[hsl(35,30%,75%)] text-lg max-w-2xl mx-auto font-display font-semibold animate-on-scroll">
          Dá para ir muito além do que tu imagina. E eu estou aqui para provar isso.
        </p>
      </div>
    </section>
  )
}
