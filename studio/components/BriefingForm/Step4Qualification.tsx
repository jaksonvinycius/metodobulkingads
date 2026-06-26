'use client'

import type { FormData } from './Container'

interface Props { data: FormData; onChange: (p: Partial<FormData>) => void }

export function Step4Qualification({ data, onChange }: Props) {
  const q = data.qualification!

  function updateQuestion(idx: number, patch: Partial<{ label: string; options: string[] }>) {
    const questions = [...q.questions]
    questions[idx] = { ...questions[idx], ...patch }
    onChange({ qualification: { ...q, questions } })
  }

  function updateOption(qIdx: number, oIdx: number, value: string) {
    const questions = [...q.questions]
    const options = [...questions[qIdx].options]
    options[oIdx] = value
    questions[qIdx] = { ...questions[qIdx], options }
    onChange({ qualification: { ...q, questions } })
  }

  return (
    <div className="flex flex-col gap-5 max-h-[65vh] overflow-y-auto pr-1">
      <h2 className="text-lg font-semibold sticky top-0 py-1" style={{ background: 'hsl(20 10% 10%)' }}>Modal de Qualificação</h2>

      {q.questions.map((question, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 rounded-lg" style={{ background: 'hsl(20 10% 7%)', border: '1px solid hsl(30 50% 50% / 0.1)' }}>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[hsl(35,30%,70%)]">Pergunta {i + 1}</label>
            <input
              value={question.label}
              onChange={e => updateQuestion(i, { label: e.target.value })}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[hsl(35,20%,50%)]">Opções de resposta</label>
            {question.options.map((opt, j) => (
              <input
                key={j}
                value={opt}
                onChange={e => updateOption(i, j, e.target.value)}
                placeholder={`Opção ${j + 1}`}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.15)', color: 'hsl(35 30% 85%)' }}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[hsl(35,30%,80%)]">Resposta que desqualifica</label>
        <p className="text-xs text-[hsl(35,20%,45%)]">Cole aqui a opção que indica que o lead não está pronto</p>
        <input
          value={q.disqualifier_answer}
          onChange={e => onChange({ qualification: { ...q, disqualifier_answer: e.target.value } })}
          placeholder="Menos de 1 ano"
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(0 60% 50% / 0.3)', color: 'hsl(35 30% 90%)' }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[hsl(35,30%,80%)]">Webhook Google Sheets (opcional)</label>
        <p className="text-xs text-[hsl(35,20%,45%)]">URL do Apps Script para registrar leads automaticamente</p>
        <input
          value={q.google_sheets_webhook ?? ''}
          onChange={e => onChange({ qualification: { ...q, google_sheets_webhook: e.target.value || undefined } })}
          placeholder="https://script.google.com/macros/s/..."
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)' }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[hsl(35,30%,80%)]">Mensagem pré-preenchida no WhatsApp</label>
        <textarea
          value={data.cta?.whatsapp_message ?? ''}
          onChange={e => onChange({ cta: { ...data.cta!, whatsapp_message: e.target.value } })}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
          style={{ background: 'hsl(20 10% 13%)', border: '1px solid hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 90%)', minHeight: 72 }}
          placeholder="Olá! Vim pelo site e gostaria de saber mais..."
        />
      </div>
    </div>
  )
}
