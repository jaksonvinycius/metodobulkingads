'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ClientConfig } from '@root/lib/types'
import { Step1Identity } from './Step1Identity'
import { Step2Brand } from './Step2Brand'
import { Step3Content } from './Step3Content'
import { Step4Qualification } from './Step4Qualification'
import { Step5Review } from './Step5Review'

export type FormData = Partial<ClientConfig> & { photo_file?: File }

const STEPS = ['Identidade', 'Marca', 'Conteúdo', 'Qualificação', 'Revisão']

export function BriefingFormContainer() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>({
    template: 'premium-health',
    colors: { primary: '30 50% 50%', background: '20 10% 7%' },
    hero: {
      badge: '',
      headline: '',
      headline_highlight: '',
      subheadline: '',
      cta_primary: 'Diagnóstico gratuito',
      stats: [
        { title: '', subtitle: '' },
        { title: '', subtitle: '' },
        { title: '', subtitle: '' },
      ],
    },
    problems: Array(4).fill({ title: '', description: '' }),
    solutions: Array(4).fill({ title: '', description: '' }),
    steps: Array(3).fill({ title: '', description: '' }),
    qualification: {
      questions: [
        { label: 'Há quanto tempo você está na profissão?', options: ['Menos de 1 ano', '1 a 3 anos', '3 a 5 anos', 'Mais de 5 anos'] },
        { label: 'Qual é seu faturamento médio mensal atual?', options: ['Menos de R$3.000', 'R$3.000 a R$8.000', 'R$8.000 a R$15.000', 'Acima de R$15.000'] },
        { label: 'Você já investiu em tráfego pago antes?', options: ['Nunca investi', 'Investi mas sem resultado', 'Sim, com resultado parcial', 'Sim, com bom resultado'] },
        { label: 'Qual é o maior desafio hoje no seu negócio?', options: ['Conseguir novos pacientes', 'Agenda com horários vagos', 'Faturamento irregular', 'Dependo de indicações'] },
      ],
      disqualifier_answer: 'Menos de 1 ano',
      google_sheets_webhook: '',
    },
    cta: {
      final_title: 'Pronto para dar o próximo passo?',
      final_subtitle: 'Agende um diagnóstico gratuito e descubra como atrair mais pacientes qualificados.',
      diagnostic_title: 'Responda 4 perguntas e receba um diagnóstico gratuito',
      diagnostic_subtitle: 'Leva menos de 2 minutos. Sem compromisso.',
      whatsapp_message: 'Olá! Vim pelo site e gostaria de saber mais sobre como atrair mais pacientes.',
    },
    seo: {
      title: '',
      description: '',
      keywords: [],
      domain: '',
    },
  })
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update(patch: Partial<FormData>) {
    setData(prev => ({ ...prev, ...patch }))
  }

  async function handleGenerate() {
    setGenerating(true)
    setError(null)

    try {
      let photo_temp_path: string | undefined

      if (data.photo_file) {
        const fd = new FormData()
        fd.append('file', data.photo_file)
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        if (!res.ok) throw new Error('Upload da foto falhou')
        const json = await res.json() as { path: string }
        photo_temp_path = json.path
      }

      const config: ClientConfig = {
        id: (data.name ?? 'client').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString(36),
        template: data.template ?? 'premium-health',
        niche: data.niche,
        name: data.name ?? '',
        profession: data.profession ?? '',
        method_name: data.method_name,
        location: data.location,
        whatsapp: data.whatsapp ?? '',
        instagram: data.instagram,
        tiktok: data.tiktok,
        photo_filename: data.photo_file ? `photo-${Date.now()}.webp` : undefined,
        favicon_initials: (data.name ?? 'AB').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase(),
        colors: data.colors ?? { primary: '30 50% 50%' },
        seo: data.seo ?? { title: '', description: '', keywords: [] },
        hero: data.hero!,
        problems: data.problems ?? [],
        solutions: data.solutions ?? [],
        steps: data.steps ?? [],
        qualification: data.qualification!,
        cta: data.cta!,
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, photo_temp_path }),
      })

      if (!res.ok) {
        const json = await res.json() as { error?: string }
        throw new Error(json.error ?? 'Geração falhou')
      }

      const json = await res.json() as { id: string }
      router.push(`/projects/${json.id}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro desconhecido')
      setGenerating(false)
    }
  }

  const stepComponents = [
    <Step1Identity key={0} data={data} onChange={update} />,
    <Step2Brand    key={1} data={data} onChange={update} />,
    <Step3Content  key={2} data={data} onChange={update} />,
    <Step4Qualification key={3} data={data} onChange={update} />,
    <Step5Review   key={4} data={data} onChange={update} onGenerate={handleGenerate} generating={generating} error={error} />,
  ]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((label, i) => (
          <button
            key={i}
            onClick={() => i < step && setStep(i)}
            className="flex-1 text-xs py-2 rounded-lg border transition-all"
            style={{
              borderColor: i <= step ? 'hsl(30 50% 50% / 0.5)' : 'hsl(30 50% 50% / 0.15)',
              background: i === step ? 'hsl(30 50% 50% / 0.15)' : 'transparent',
              color: i <= step ? 'hsl(30 50% 65%)' : 'hsl(35 20% 40%)',
              cursor: i < step ? 'pointer' : 'default',
            }}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div
        className="rounded-xl p-6 border mb-6"
        style={{ background: 'hsl(20 10% 10%)', borderColor: 'hsl(30 50% 50% / 0.15)' }}
      >
        {stepComponents[step]}
      </div>

      {/* Navigation */}
      {step < STEPS.length - 1 && (
        <div className="flex justify-between">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-4 py-2 rounded-lg text-sm border transition-colors disabled:opacity-30"
            style={{ borderColor: 'hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 70%)' }}
          >
            Voltar
          </button>
          <button
            onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: 'hsl(30 50% 50%)', color: 'hsl(20 10% 7%)' }}
          >
            Próximo →
          </button>
        </div>
      )}
    </div>
  )
}
