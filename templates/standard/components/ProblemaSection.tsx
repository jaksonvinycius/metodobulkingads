import type { ClientConfig } from '@/lib/types'

interface Props { config: ClientConfig }

export function ProblemaSection({ config }: Props) {
  return (
    <section id="problema" className="relative py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-4">
            O problema
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(35,30%,90%)]">
            Reconhece alguma{' '}
            <span className="text-gradient">dessas situações?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.problems.map((problem, i) => (
            <div
              key={i}
              className="animate-on-scroll bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary)/0.10)] flex items-center justify-center mb-4">
                <span className="text-[hsl(var(--primary))] font-bold text-sm">{i + 1}</span>
              </div>
              <h3 className="font-semibold text-[hsl(35,30%,88%)] text-sm mb-2">{problem.title}</h3>
              <p className="text-[hsl(30,15%,45%)] text-xs leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
