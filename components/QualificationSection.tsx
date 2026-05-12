'use client'

import { useState, useRef } from 'react'
import { MessageCircle, ArrowLeft, CheckCircle } from 'lucide-react'

const WA_BASE = 'https://wa.me/351912112456?text='
const TOTAL_STEPS = 5

const QUESTIONS = [
  {
    label: 'Qual o maior obstáculo que te impede de crescer hoje?',
    options: [
      'Não consigo atrair pacientes novos suficientes',
      'Minha agenda tem buracos e o faturamento oscila muito',
      'Dependo totalmente de indicações e não tenho controle',
      'Não sei como me posicionar ou divulgar meu trabalho',
    ],
  },
  {
    label: 'Quantos pacientes NOVOS você fecha por mês (em média)?',
    options: [
      'Menos de 3 pacientes novos',
      'Entre 3 e 8 pacientes novos',
      'Entre 8 e 15 pacientes novos',
      'Mais de 15 pacientes novos',
    ],
  },
  {
    label: 'Você já tentou atrair pacientes pela internet antes?',
    options: [
      'Nunca tentei, não sei por onde começar',
      'Já tentei sozinho(a) mas não funcionou',
      'Já investi em tráfego pago mas não trouxe retorno',
      'Sim, funciona mas quero resultados mais previsíveis',
    ],
  },
  {
    label: 'Se eu te mostrar como ter pacientes de forma previsível, você tem disponibilidade para investir em anúncios?',
    options: [
      'Sim, já tenho orçamento separado para crescer',
      'Sim, consigo investir se os resultados aparecerem',
      'Talvez, depende de entender melhor o investimento',
      'Não tenho como investir agora',
    ],
  },
]

interface ResultData {
  status: 'qualificado' | 'desqualificado'
  tags: string[]
}

export function QualificationSection() {
  const [step, setStep] = useState(0)
  const [nome, setNome] = useState('')
  const [nameError, setNameError] = useState(false)
  const [answers, setAnswers] = useState<string[]>(new Array(4).fill(''))
  const [result, setResult] = useState<ResultData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleNameSubmit = () => {
    if (nome.trim().length < 2) {
      setNameError(true)
      inputRef.current?.focus()
      return
    }
    setNameError(false)
    setStep(1)
  }

  const handleOption = async (option: string) => {
    const qIndex = step - 1
    const newAnswers = [...answers]
    newAnswers[qIndex] = option
    setAnswers(newAnswers)

    if (step < 4) {
      setStep(step + 1)
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          obstaculo: newAnswers[0],
          pacientes_novos: newAnswers[1],
          exp_internet: newAnswers[2],
          disponibilidade: newAnswers[3],
        }),
      })
      const data: ResultData = await res.json()
      setResult(data)
    } catch {
      const status = option.includes('Não tenho como investir') ? 'desqualificado' : 'qualificado'
      setResult({ status, tags: [] })
    }
    setIsLoading(false)
    setStep(5)
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const buildWAMessage = () =>
    encodeURIComponent(
      `Olá, Vinycius! Me chamo ${nome.trim()} e tenho interesse no diagnóstico gratuito.\n` +
        `Obstáculo: ${answers[0]}\n` +
        `Pacientes novos/mês: ${answers[1]}\n` +
        `Experiência online: ${answers[2]}\n` +
        `Disponibilidade: ${answers[3]}`
    )

  const resetForm = () => {
    setStep(0)
    setNome('')
    setAnswers(new Array(4).fill(''))
    setResult(null)
    setNameError(false)
  }

  /* ── Result screen ─────────────────────────────────────────── */
  if (step === 5 && result) {
    const isQualified = result.status === 'qualificado'
    return (
      <section id="qualificacao" className="relative py-20 sm:py-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[hsl(30,50%,50%)]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="relative max-w-[580px] mx-auto px-4 sm:px-6 text-center">
          <div className="animate-on-scroll bg-white/[0.03] border border-white/5 rounded-2xl p-10">
            <div className="w-14 h-14 rounded-full bg-[hsl(30,50%,50%)]/10 flex items-center justify-center mx-auto mb-6">
              {isQualified ? (
                <CheckCircle className="w-7 h-7 text-[hsl(30,50%,55%)]" />
              ) : (
                <MessageCircle className="w-7 h-7 text-[hsl(30,15%,45%)]" />
              )}
            </div>

            {isQualified ? (
              <>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[hsl(35,30%,90%)] mb-3">
                  Perfeito,{' '}
                  <span className="text-gradient">{nome.trim()}!</span>
                </h3>
                <p className="text-[hsl(30,15%,55%)] text-base mb-8 max-w-sm mx-auto leading-relaxed">
                  Com base nas suas respostas, consigo te ajudar a ter pacientes de forma previsível. Vamos conversar?
                </p>
                <a
                  href={`${WA_BASE}${buildWAMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[hsl(30,50%,50%)] hover:bg-[hsl(30,50%,45%)] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(30,50%,50%,0.25)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar com Vinycius agora
                </a>
                <p className="text-[hsl(30,15%,35%)] text-xs mt-4">
                  Resposta em até 24h · Diagnóstico 100% gratuito
                </p>
              </>
            ) : (
              <>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[hsl(35,30%,90%)] mb-3">
                  Entendido, {nome.trim()}!
                </h3>
                <p className="text-[hsl(30,15%,55%)] text-base mb-6 max-w-sm mx-auto leading-relaxed">
                  Faz sentido. Assim que você estiver pronto(a) para dar o próximo passo, o diagnóstico gratuito continua disponível aqui.
                </p>
                <button
                  onClick={resetForm}
                  className="text-[hsl(30,15%,45%)] hover:text-[hsl(30,50%,55%)] text-sm transition-colors underline underline-offset-4"
                >
                  Recomeçar quando estiver pronto
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    )
  }

  /* ── Form ──────────────────────────────────────────────────── */
  return (
    <section id="qualificacao" className="relative py-20 sm:py-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[hsl(30,50%,50%)]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[580px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-[hsl(30,50%,50%)] uppercase tracking-widest mb-4">
            Diagnóstico gratuito
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[hsl(35,30%,90%)]">
            Algumas perguntas rápidas antes de{' '}
            <span className="text-gradient">começar</span>
          </h2>
          <p className="mt-3 text-[hsl(30,15%,50%)] text-base max-w-sm mx-auto">
            Assim preparo uma estratégia específica para o seu caso.
          </p>
        </div>

        {/* Card */}
        <div className="animate-on-scroll bg-white/[0.03] border border-white/5 rounded-2xl p-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center gap-1.5 mb-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                    i < step ? 'bg-[hsl(30,50%,50%)]' : i === step ? 'bg-[hsl(30,50%,50%)]/50' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-[hsl(30,15%,40%)]">
                Pergunta {step + 1} de {TOTAL_STEPS}
              </p>
              {step > 0 && !isLoading && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1 text-xs text-[hsl(30,15%,45%)] hover:text-[hsl(30,50%,55%)] transition-colors duration-200"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar
                </button>
              )}
            </div>
          </div>

          {/* Step 0 — Name */}
          {step === 0 && (
            <div>
              <p className="text-[hsl(35,30%,88%)] font-medium text-base mb-5">
                Como você prefere ser chamado(a)?
              </p>
              <input
                ref={inputRef}
                type="text"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value)
                  setNameError(false)
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                placeholder="Digite seu nome"
                autoFocus
                style={nameError ? { borderColor: 'hsl(0 70% 55% / 0.5)' } : undefined}
                className="form-option placeholder:text-[hsl(30,15%,35%)] mb-3"
              />
              {nameError && (
                <p className="text-red-400/80 text-xs mb-4">
                  Por favor, insira seu nome (mínimo 2 caracteres).
                </p>
              )}
              <button
                onClick={handleNameSubmit}
                className="w-full bg-[hsl(30,50%,50%)] hover:bg-[hsl(30,50%,45%)] text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* Steps 1–4 — Questions */}
          {step >= 1 && step <= 4 && !isLoading && (
            <div>
              <p className="text-[hsl(35,30%,88%)] font-medium text-base mb-5 leading-snug">
                {QUESTIONS[step - 1].label}
              </p>
              <div className="flex flex-col gap-3">
                {QUESTIONS[step - 1].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOption(option)}
                    className="form-option"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {step === 4 && (
                <p className="text-[hsl(30,15%,35%)] text-xs mt-5 text-center flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[hsl(30,50%,45%)]" />
                  Última pergunta — seu resultado aparece em seguida
                </p>
              )}
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-[hsl(30,50%,50%)]/20 border-t-[hsl(30,50%,50%)] animate-spin" />
              <p className="text-[hsl(30,15%,50%)] text-sm">Preparando seu diagnóstico...</p>
            </div>
          )}
        </div>

        {/* Trust line */}
        <p className="text-center text-[hsl(30,15%,35%)] text-xs mt-6 flex items-center justify-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5" />
          Resposta em até 24h · 100% gratuito · Sem compromisso
        </p>
      </div>
    </section>
  )
}
