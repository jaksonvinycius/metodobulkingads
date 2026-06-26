'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, ArrowLeft, CheckCircle, X } from 'lucide-react'
import type { ClientConfig } from '@/lib/types'

const WA_BASE = 'https://wa.me/'

interface Props {
  open: boolean
  onClose: () => void
  config: ClientConfig
}

export function QualificationModal({ open, onClose, config }: Props) {
  const { questions, disqualifier_answer } = config.qualification
  const TOTAL_STEPS = questions.length + 1  // +1 for name step

  const [step, setStep] = useState(0)
  const [nome, setNome] = useState('')
  const [nameError, setNameError] = useState(false)
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))
  const [result, setResult] = useState<{ status: 'qualificado' | 'desqualificado' } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setStep(0); setNome(''); setNameError(false)
      setAnswers(new Array(questions.length).fill(''))
      setResult(null); setIsLoading(false)
    }
  }, [open, questions.length])

  useEffect(() => {
    if (open && step === 0) {
      const t = setTimeout(() => inputRef.current?.focus(), 80)
      return () => clearTimeout(t)
    }
  }, [open, step])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const handleNameSubmit = () => {
    if (nome.trim().length < 2) { setNameError(true); inputRef.current?.focus(); return }
    setNameError(false); setStep(1)
  }

  const handleOption = async (option: string) => {
    const qIndex = step - 1
    const newAnswers = [...answers]
    newAnswers[qIndex] = option
    setAnswers(newAnswers)

    if (step < questions.length) { setStep(step + 1); return }

    setStep(TOTAL_STEPS); setIsLoading(true)
    try {
      const res = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          answers: newAnswers,
          disqualifier_answer,
        }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      const status = option === disqualifier_answer ? 'desqualificado' : 'qualificado'
      setResult({ status })
    } finally {
      setIsLoading(false)
    }
  }

  const buildWAMessage = () => {
    const lines = [`Olá, ${config.name.split(' ')[0]}! Me chamo ${nome.trim()} e tenho interesse no diagnóstico gratuito.`]
    questions.forEach((q, i) => { if (answers[i]) lines.push(`${q.label}: ${answers[i]}`) })
    return encodeURIComponent(lines.join('\n'))
  }

  const isQualified = result?.status === 'qualificado'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px) saturate(0.8)', WebkitBackdropFilter: 'blur(12px)', transition: 'all 300ms ease' }}
        onClick={onClose}
      />

      <div
        className="relative z-10 w-full max-w-[520px] rounded-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: 'hsl(20,10%,10%)', border: '1px solid hsl(30 50% 50% / 0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[hsl(30,15%,40%)] hover:text-[hsl(35,30%,80%)] transition-colors" aria-label="Fechar">
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-7">
            <span className="inline-block text-xs font-semibold text-[hsl(var(--primary))] uppercase tracking-widest mb-2">Diagnóstico gratuito</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(35,30%,90%)]">
              {step === TOTAL_STEPS ? (isLoading ? 'Processando...' : isQualified ? 'Perfeito!' : 'Entendido!') : 'Algumas perguntas rápidas'}
            </h2>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="w-9 h-9 rounded-full border-2 border-[hsl(var(--primary)/0.20)] border-t-[hsl(var(--primary))] animate-spin" />
              <p className="text-[hsl(30,15%,50%)] text-sm">Preparando seu diagnóstico...</p>
            </div>
          )}

          {step === TOTAL_STEPS && result && !isLoading && (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[hsl(var(--primary)/0.10)] flex items-center justify-center mx-auto mb-6">
                {isQualified ? <CheckCircle className="w-7 h-7 text-[hsl(var(--primary-light))]" /> : <MessageCircle className="w-7 h-7 text-[hsl(30,15%,45%)]" />}
              </div>
              {isQualified ? (
                <>
                  <h3 className="font-display text-xl font-bold text-[hsl(35,30%,90%)] mb-3">Perfeito, <span className="text-gradient">{nome.trim()}!</span></h3>
                  <p className="text-[hsl(30,15%,55%)] text-sm mb-8 max-w-sm mx-auto leading-relaxed">Com base nas suas respostas, posso te ajudar. Vamos conversar?</p>
                  <a href={`${WA_BASE}${config.whatsapp}?text=${buildWAMessage()}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
                    <MessageCircle className="w-5 h-5" />Falar com {config.name.split(' ')[0]} agora
                  </a>
                  <p className="text-[hsl(30,15%,35%)] text-xs mt-4">Resposta em até 24h · 100% gratuito</p>
                </>
              ) : (
                <>
                  <h3 className="font-display text-xl font-bold text-[hsl(35,30%,90%)] mb-3">Entendido, {nome.trim()}!</h3>
                  <p className="text-[hsl(30,15%,55%)] text-sm mb-8 max-w-sm mx-auto leading-relaxed">Faz sentido. Quando estiver pronto(a), o diagnóstico continua disponível aqui.</p>
                  <button onClick={onClose} className="text-[hsl(30,15%,45%)] hover:text-[hsl(var(--primary-light))] text-sm transition-colors underline underline-offset-4">Fechar</button>
                </>
              )}
            </div>
          )}

          {step < TOTAL_STEPS && (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-1.5 mb-2">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < step ? 'bg-[hsl(var(--primary))]' : i === step ? 'bg-[hsl(var(--primary)/0.50)]' : 'bg-white/10'}`} />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-[hsl(30,15%,40%)]">Pergunta {step + 1} de {TOTAL_STEPS}</p>
                  {step > 0 && (
                    <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-xs text-[hsl(30,15%,45%)] hover:text-[hsl(var(--primary-light))] transition-colors duration-200">
                      <ArrowLeft className="w-3.5 h-3.5" />Voltar
                    </button>
                  )}
                </div>
              </div>

              {step === 0 && (
                <div>
                  <p className="text-[hsl(35,30%,88%)] font-medium text-base mb-5">Como você prefere ser chamado(a)?</p>
                  <input ref={inputRef} type="text" value={nome} onChange={(e) => { setNome(e.target.value); setNameError(false) }} onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()} placeholder="Digite seu nome" style={nameError ? { borderColor: 'hsl(0 70% 55% / 0.5)' } : undefined} className="form-option placeholder:text-[hsl(30,15%,35%)] mb-3" />
                  {nameError && <p className="text-red-400/80 text-xs mb-4">Por favor, insira seu nome (mínimo 2 caracteres).</p>}
                  <button onClick={handleNameSubmit} className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]">Continuar →</button>
                </div>
              )}

              {step >= 1 && step <= questions.length && (
                <div>
                  <p className="text-[hsl(35,30%,88%)] font-medium text-base mb-5 leading-snug">{questions[step - 1].label}</p>
                  <div className="flex flex-col gap-3">
                    {questions[step - 1].options.map((option) => (
                      <button key={option} onClick={() => handleOption(option)} className="form-option">{option}</button>
                    ))}
                  </div>
                  {step === questions.length && (
                    <p className="text-[hsl(30,15%,35%)] text-xs mt-5 text-center flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[hsl(var(--primary-dark))]" />Última pergunta — seu resultado aparece em seguida
                    </p>
                  )}
                </div>
              )}

              <p className="text-center text-[hsl(30,15%,35%)] text-xs mt-6 flex items-center justify-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />100% gratuito · Sem compromisso
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
