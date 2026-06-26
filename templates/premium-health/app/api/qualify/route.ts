import { NextRequest, NextResponse } from 'next/server'

interface LeadPayload {
  nome: string
  answers: string[]
  disqualifier_answer: string
}

export async function POST(req: NextRequest) {
  try {
    const data: LeadPayload = await req.json()
    const status = data.answers.includes(data.disqualifier_answer) ? 'desqualificado' : 'qualificado'

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          nome: data.nome,
          answers: data.answers.join(' | '),
          status,
        }),
      })
    }

    return NextResponse.json({ status })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
