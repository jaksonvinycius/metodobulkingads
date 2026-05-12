import { NextRequest, NextResponse } from 'next/server'

interface LeadData {
  nome: string
  obstaculo: string
  pacientes_novos: string
  exp_internet: string
  disponibilidade: string
}

function getStatus(data: LeadData): 'qualificado' | 'desqualificado' {
  if (data.disponibilidade === 'Não tenho como investir agora') return 'desqualificado'
  return 'qualificado'
}

function getTags(data: LeadData): string[] {
  const tags: string[] = []

  if (data.pacientes_novos.includes('Menos de 3')) tags.push('urgente_baixo_volume')
  else if (data.pacientes_novos.includes('3 e 8')) tags.push('crescimento_ideal')
  else if (data.pacientes_novos.includes('8 e 15')) tags.push('escala_intermediaria')
  else if (data.pacientes_novos.includes('15 pacientes')) tags.push('otimizacao_avancada')

  if (data.exp_internet.includes('Nunca tentei')) tags.push('iniciante_digital')
  else if (data.exp_internet.includes('sozinho')) tags.push('precisa_direcao')
  else if (data.exp_internet.includes('sem retorno')) tags.push('reconquista_confianca')
  else if (data.exp_internet.includes('mais previsíveis')) tags.push('otimizacao')

  if (data.disponibilidade.includes('Talvez')) tags.push('educacao_roi')

  return tags
}

export async function POST(req: NextRequest) {
  try {
    const data: LeadData = await req.json()
    const status = getStatus(data)
    const tags = getTags(data)

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          nome: data.nome,
          obstaculo: data.obstaculo,
          pacientes_novos: data.pacientes_novos,
          exp_internet: data.exp_internet,
          disponibilidade: data.disponibilidade,
          status,
          tags: tags.join(','),
        }),
      })
    }

    return NextResponse.json({ status, tags })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
