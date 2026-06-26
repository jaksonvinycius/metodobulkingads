'use client'

import type { FormData } from './Container'

interface Props { data: FormData; onChange: (p: Partial<FormData>) => void }

const TEMPLATES = [
  { id: 'premium-health', label: 'Premium Saúde', desc: 'Nutricionistas, médicos, psicólogos, fisioterapeutas' },
  { id: 'standard', label: 'Standard', desc: 'Advocacia, contabilidade, arquitetura, tecnologia...' },
] as const

export function Step2Brand({ data, onChange }: Props) {
  const primary = data.colors?.primary ?? '30 50% 50%'

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Marca e Template</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[hsl(35,30%,80%)]">Template</label>
        <div className="flex flex-col gap-2">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => onChange({ template: t.id })}
              className="text-left p-3 rounded-lg border transition-all"
              style={{
                borderColor: data.template === t.id ? 'hsl(30 50% 50% / 0.6)' : 'hsl(30 50% 50% / 0.15)',
                background: data.template === t.id ? 'hsl(30 50% 50% / 0.1)' : 'hsl(20 10% 13%)',
              }}
            >
              <p className="text-sm font-medium" style={{ color: data.template === t.id ? 'hsl(30 50% 65%)' : 'hsl(35 30% 80%)' }}>{t.label}</p>
              <p className="text-xs text-[hsl(35,20%,50%)] mt-0.5">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {data.template === 'standard' && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[hsl(35,30%,80%)]">Nicho (opcional)</label>
          <p className="text-xs text-[hsl(35,20%,45%)]">O agente usa isso para adaptar o copy. Ex: advocacia, contabilidade, arquitetura</p>
          <input
            value={data.niche ?? ''}
            onChange={e => onChange({ niche: e.target.value || undefined })}
            placeholder="advocacia"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[hsl(35,30%,80%)]">Cor primária (HSL)</label>
        <p className="text-xs text-[hsl(35,20%,45%)]">Formato: "30 50% 50%" (matiz saturação luminosidade)</p>
        <div className="flex gap-3 items-center">
          <input
            value={primary}
            onChange={e => onChange({ colors: { ...data.colors, primary: e.target.value } })}
            placeholder="30 50% 50%"
            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }}
          />
          <div
            className="w-10 h-10 rounded-lg shrink-0"
            style={{ background: `hsl(${primary})` }}
          />
        </div>
      </div>

      <div className="border-t border-[hsl(30,50%,50%,0.1)] pt-4">
        <h3 className="text-sm font-medium text-[hsl(35,20%,60%)] mb-4">SEO</h3>
        <div className="flex flex-col gap-4">
          {[
            { key: 'title', label: 'Título SEO', placeholder: 'Dra. Ana Lima | Nutricionista em SP' },
            { key: 'description', label: 'Descrição SEO', placeholder: 'Nutricionista especialista em emagrecimento e saúde metabólica em São Paulo' },
            { key: 'domain', label: 'Domínio (opcional)', placeholder: 'ananutri.com.br' },
          ].map(field => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[hsl(35,30%,80%)]">{field.label}</label>
              <input
                value={(data.seo as unknown as Record<string, string | undefined>)?.[field.key] ?? ''}
                onChange={e => onChange({ seo: { keywords: data.seo?.keywords ?? [], title: data.seo?.title ?? '', description: data.seo?.description ?? '', [field.key]: e.target.value } })}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
