import type Anthropic from '@anthropic-ai/sdk'
import { getClient } from './client'
import { buildSystemPrompt, loadNichePrompt } from './system-prompt'
import { toolDefinitions } from './tools/definitions'
import { executeToolCall } from './tools/handlers'
import type { AgentInput, AgentOutput } from './types'

const MODEL = 'claude-opus-4-7'
const MAX_TOKENS = 16000
const MAX_TURNS = 20

export async function runPageAgent(input: AgentInput): Promise<AgentOutput> {
  const client = getClient()
  const filesChanged: string[] = []
  const errors: string[] = []

  const userContent: Anthropic.MessageParam['content'] = []

  if (input.screenshot) {
    userContent.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'image/png',
        data: input.screenshot,
      },
    })
  }

  userContent.push({
    type: 'text',
    text: [
      `Instrução: ${input.instruction}`,
      `Raiz do projeto: ${input.project_root}`,
      input.screenshot
        ? 'O screenshot acima é a referência visual para esta modificação. Analise o design detalhadamente antes de agir.'
        : '',
    ]
      .filter(Boolean)
      .join('\n'),
  })

  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userContent },
  ]

  let validationPassed = false

  for (let turn = 0; turn < MAX_TURNS; turn++) {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: buildSystemPrompt(input.niche_prompt ? loadNichePrompt(input.niche_prompt) : undefined),
      tools: toolDefinitions,
      messages,
    })

    messages.push({ role: 'assistant', content: response.content })

    if (response.stop_reason === 'end_turn') {
      const summary = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('\n')
        .trim()

      return {
        files_changed: [...new Set(filesChanged)],
        summary,
        validation_passed: validationPassed,
        errors: errors.length > 0 ? errors : undefined,
      }
    }

    if (response.stop_reason !== 'tool_use') break

    const toolUseBlocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
    )

    const toolResults: Anthropic.ToolResultBlockParam[] = []

    for (const block of toolUseBlocks) {
      const toolInput = block.input as Record<string, string>
      const result = executeToolCall(block.name, toolInput)

      if (block.name === 'write_file' || block.name === 'edit_file') {
        if (!result.startsWith('ERROR')) {
          filesChanged.push(toolInput.path)
        }
      }

      if (block.name === 'run_command') {
        const isTypeCheck =
          toolInput.command?.includes('tsc') && !result.startsWith('ERROR')
        if (isTypeCheck) {
          validationPassed = !result.toLowerCase().includes('error')
          if (!validationPassed) {
            errors.push(result)
          }
        }
      }

      toolResults.push({
        type: 'tool_result',
        tool_use_id: block.id,
        content: result,
      })
    }

    messages.push({ role: 'user', content: toolResults })
  }

  return {
    files_changed: [...new Set(filesChanged)],
    summary: 'Agent loop completed',
    validation_passed: validationPassed,
    errors: errors.length > 0 ? errors : undefined,
  }
}
