import { runPageAgent } from './index'
import type { AntigravityEvent, AgentOutput } from './types'

export async function handler(event: AntigravityEvent): Promise<AgentOutput> {
  if (!event.env?.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY não configurada nas variáveis de ambiente do Antigravity')
  }

  if (!event.env?.PROJECT_ROOT) {
    throw new Error('PROJECT_ROOT não configurada nas variáveis de ambiente do Antigravity')
  }

  if (!event.body?.instruction) {
    throw new Error('Campo "instruction" é obrigatório no body da requisição')
  }

  process.env.ANTHROPIC_API_KEY = event.env.ANTHROPIC_API_KEY

  return runPageAgent({
    instruction: event.body.instruction,
    screenshot: event.body.screenshot,
    project_root: event.env.PROJECT_ROOT,
  })
}
