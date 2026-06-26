'use client'

import type { FormData } from './Container'

interface Props { data: FormData; onChange: (p: Partial<FormData>) => void }

function Field({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean
}) {
  const cls = "w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors"
  const style = { background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[hsl(35,30%,70%)]">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} style={{ ...style, resize: 'none', minHeight: 72 }} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} style={style} />
      }
    </div>
  )
}

export function Step3Content({ data, onChange }: Props) {
  const hero = data.hero!
  const problems = data.problems ?? []
  const solutions = data.solutions ?? []
  const steps = data.steps ?? []

  return (
    <div className="flex flex-col gap-6 max-h-[65vh] overflow-y-auto pr-1">
      <h2 className="text-lg font-semibold sticky top-0 py-1" style={{ background: 'hsl(20 10% 10%)' }}>Conteúdo das Seções</h2>

      {/* Hero */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[hsl(30,50%,60%)]">Hero</h3>
        <Field label="Badge (tag acima do título)" value={hero.badge} onChange={v => onChange({ hero: { ...hero, badge: v } })} placeholder="Nutricionista Especialista" />
        <Field label="Headline" value={hero.headline} onChange={v => onChange({ hero: { ...hero, headline: v } })} placeholder="Conquiste a saúde que você merece" />
        <Field label="Destaque do headline (substring exata)" value={hero.headline_highlight} onChange={v => onChange({ hero: { ...hero, headline_highlight: v } })} placeholder="saúde que você merece" />
        <Field label="Subtítulo" value={hero.subheadline} onChange={v => onChange({ hero: { ...hero, subheadline: v } })} multiline placeholder="Ajudo nutricionistas a atrair mais pacientes..." />
        <Field label="Texto do CTA principal" value={hero.cta_primary} onChange={v => onChange({ hero: { ...hero, cta_primary: v } })} placeholder="Diagnóstico gratuito" />
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[hsl(35,30%,70%)]">Estatísticas (3 itens)</label>
          {hero.stats.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <input value={s.title} onChange={e => {
                const stats = [...hero.stats]; stats[i] = { ...s, title: e.target.value }
                onChange({ hero: { ...hero, stats } })
              }} placeholder={`Número ${i + 1} (ex: +200)`} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }} />
              <input value={s.subtitle} onChange={e => {
                const stats = [...hero.stats]; stats[i] = { ...s, subtitle: e.target.value }
                onChange({ hero: { ...hero, stats } })
              }} placeholder={`Label ${i + 1} (ex: pacientes)`} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }} />
            </div>
          ))}
        </div>
      </section>

      {/* Problems */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[hsl(30,50%,60%)]">Problemas (4 itens)</h3>
        {problems.map((p, i) => (
          <div key={i} className="flex flex-col gap-2 p-3 rounded-lg" style={{ background: 'hsl(20 10% 7%)' }}>
            <input value={p.title} onChange={e => { const arr = [...problems]; arr[i] = { ...p, title: e.target.value }; onChange({ problems: arr }) }} placeholder={`Problema ${i + 1}`} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }} />
            <textarea value={p.description} onChange={e => { const arr = [...problems]; arr[i] = { ...p, description: e.target.value }; onChange({ problems: arr }) }} placeholder="Descrição breve..." className="px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)', minHeight: 60 }} />
          </div>
        ))}
      </section>

      {/* Solutions */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[hsl(30,50%,60%)]">Soluções (4 itens)</h3>
        {solutions.map((s, i) => (
          <div key={i} className="flex flex-col gap-2 p-3 rounded-lg" style={{ background: 'hsl(20 10% 7%)' }}>
            <input value={s.title} onChange={e => { const arr = [...solutions]; arr[i] = { ...s, title: e.target.value }; onChange({ solutions: arr }) }} placeholder={`Solução ${i + 1}`} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }} />
            <textarea value={s.description} onChange={e => { const arr = [...solutions]; arr[i] = { ...s, description: e.target.value }; onChange({ solutions: arr }) }} placeholder="Descrição breve..." className="px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)', minHeight: 60 }} />
          </div>
        ))}
      </section>

      {/* Steps */}
      <section className="flex flex-col gap-3">
        <h3 className="text-sm font-medium text-[hsl(30,50%,60%)]">Como funciona (3 passos)</h3>
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col gap-2 p-3 rounded-lg" style={{ background: 'hsl(20 10% 7%)' }}>
            <input value={s.title} onChange={e => { const arr = [...steps]; arr[i] = { ...s, title: e.target.value }; onChange({ steps: arr }) }} placeholder={`Passo ${i + 1}`} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }} />
            <textarea value={s.description} onChange={e => { const arr = [...steps]; arr[i] = { ...s, description: e.target.value }; onChange({ steps: arr }) }} placeholder="Descrição..." className="px-3 py-2 rounded-lg text-sm outline-none resize-none" style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)', minHeight: 60 }} />
          </div>
        ))}
      </section>
    </div>
  )
}
