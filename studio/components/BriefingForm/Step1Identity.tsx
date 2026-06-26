'use client'

import type { FormData } from './Container'

interface Props { data: FormData; onChange: (p: Partial<FormData>) => void }

function Field({ label, value, onChange, placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[hsl(35,30%,80%)]">{label}</label>
      {hint && <p className="text-xs text-[hsl(35,20%,45%)]">{hint}</p>}
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors"
        style={{
          background: 'hsl(20 10% 13%)',
          border: '1px solid hsl(30 50% 50% / 0.2)',
          color: 'hsl(35 30% 90%)',
        }}
      />
    </div>
  )
}

export function Step1Identity({ data, onChange }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">Identidade do Cliente</h2>

      <Field label="Nome completo" value={data.name ?? ''} onChange={v => onChange({ name: v })} placeholder="Dra. Ana Lima" />
      <Field label="Profissão" value={data.profession ?? ''} onChange={v => onChange({ profession: v })} placeholder="Nutricionista Clínica" />
      <Field label="Nome do método (opcional)" value={data.method_name ?? ''} onChange={v => onChange({ method_name: v || undefined })} placeholder="Método NutriCode" />
      <Field label="Localização (opcional)" value={data.location ?? ''} onChange={v => onChange({ location: v || undefined })} placeholder="São Paulo, SP" />

      <div className="border-t border-[hsl(30,50%,50%,0.1)] pt-4">
        <h3 className="text-sm font-medium text-[hsl(35,20%,60%)] mb-4">Contato</h3>
        <div className="flex flex-col gap-4">
          <Field
            label="WhatsApp"
            hint="Formato: 5511999999999 (sem + ou espaços)"
            value={data.whatsapp ?? ''}
            onChange={v => onChange({ whatsapp: v })}
            placeholder="5511999999999"
          />
          <Field label="Instagram (opcional)" value={data.instagram ?? ''} onChange={v => onChange({ instagram: v || undefined })} placeholder="ana.lima.nutri" />
          <Field label="TikTok (opcional)" value={data.tiktok ?? ''} onChange={v => onChange({ tiktok: v || undefined })} placeholder="ananutri" />
        </div>
      </div>
    </div>
  )
}
