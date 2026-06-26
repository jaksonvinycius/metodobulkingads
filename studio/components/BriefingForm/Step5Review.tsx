'use client'

import { useRef } from 'react'
import type { FormData } from './Container'
import { Upload, Loader2, AlertCircle } from 'lucide-react'

interface Props {
  data: FormData
  onChange: (p: Partial<FormData>) => void
  onGenerate: () => void
  generating: boolean
  error: string | null
}

export function Step5Review({ data, onChange, onGenerate, generating, error }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const summary = [
    { label: 'Nome', value: data.name },
    { label: 'Profissão', value: data.profession },
    { label: 'WhatsApp', value: data.whatsapp },
    { label: 'Template', value: data.template },
    { label: 'Cor primária', value: data.colors?.primary },
    { label: 'Headline', value: data.hero?.headline },
    { label: 'Problemas', value: `${data.problems?.filter(p => p.title).length ?? 0} preenchidos` },
    { label: 'Soluções', value: `${data.solutions?.filter(s => s.title).length ?? 0} preenchidas` },
    { label: 'Perguntas', value: `${data.qualification?.questions.length ?? 0} perguntas` },
  ]

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold">Revisão e Geração</h2>

      {/* Summary */}
      <div className="flex flex-col gap-2">
        {summary.map(item => (
          <div key={item.label} className="flex justify-between text-sm py-1 border-b border-[hsl(30,50%,50%,0.08)]">
            <span className="text-[hsl(35,20%,50%)]">{item.label}</span>
            <span className="text-[hsl(35,30%,80%)] truncate max-w-[60%] text-right">{item.value || '—'}</span>
          </div>
        ))}
      </div>

      {/* Photo upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[hsl(35,30%,80%)]">Foto do cliente (opcional)</label>
        <p className="text-xs text-[hsl(35,20%,45%)]">JPG ou PNG, recomendado 400×500px, fundo neutro</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={e => onChange({ photo_file: e.target.files?.[0] })}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-4 py-3 rounded-lg border text-sm transition-colors"
          style={{ borderColor: 'hsl(30 50% 50% / 0.3)', color: 'hsl(35 30% 70%)', background: 'hsl(20 10% 13%)' }}
        >
          <Upload className="w-4 h-4" />
          {data.photo_file ? data.photo_file.name : 'Selecionar foto'}
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'hsl(0 50% 15%)', border: '1px solid hsl(0 60% 40% / 0.4)' }}>
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(0,70%,65%)]" />
          <p className="text-sm text-[hsl(0,70%,70%)]">{error}</p>
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={generating || !data.name || !data.whatsapp}
        className="w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-opacity disabled:opacity-40"
        style={{ background: 'hsl(30 50% 50%)', color: 'hsl(20 10% 7%)' }}
      >
        {generating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Gerando projeto...
          </>
        ) : 'Gerar Projeto'}
      </button>

      {!data.name && (
        <p className="text-xs text-center text-[hsl(35,20%,45%)]">Preencha pelo menos nome e WhatsApp para gerar</p>
      )}
    </div>
  )
}
