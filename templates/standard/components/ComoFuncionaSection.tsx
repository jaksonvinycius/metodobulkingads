import type { ClientConfig } from '@/lib/types'

interface Props { config: ClientConfig }

export function ComoFuncionaSection({ config }: Props) {
  return (
    <section id="como-funciona" className="relative py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-4">
            O processo
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(35,30%,90%)]">
            Como funciona na{' '}
            <span className="text-gradient">prática</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {config.steps.map((step, i) => (
            <div key={i} className="animate-on-scroll flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[hsl(var(--primary)/0.10)] border border-[hsl(var(--primary)/0.20)] flex items-center justify-center">
                <span className="text-[hsl(var(--primary))] font-bold text-sm">{i + 1}</span>
              </div>
              <div>
                <h3 className="font-semibold text-[hsl(35,30%,88%)] mb-2">{step.title}</h3>
                <p className="text-[hsl(30,15%,45%)] text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
