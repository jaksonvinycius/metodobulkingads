import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getProject } from '@root/lib/store'
import { loadNichePrompt } from '@root/agent/system-prompt'
import { toolDefinitions } from '@root/agent/tools/definitions'
import { executeToolCall } from '@root/agent/tools/handlers'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const { project_id, message } = await req.json() as { project_id: string; message: string }

  const project = await getProject(project_id)
  if (!project) {
    return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 })
  }

  const correctionPrompt = loadNichePrompt('correction')
  const systemText = [
    `# Projeto: ${project.client_name}`,
    `Caminho: ${project.project_path}`,
    `Template: ${project.template}`,
    `\n---\n`,
    correctionPrompt,
  ].join('\n')

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messages: Anthropic.MessageParam[] = [
          { role: 'user', content: `Instrução: ${message}\nRaiz do projeto: ${project.project_path}` },
        ]

        for (let turn = 0; turn < 20; turn++) {
          const response = await client.messages.create({
            model: 'claude-opus-4-7',
            max_tokens: 8192,
            system: systemText,
            tools: toolDefinitions,
            messages,
          })

          messages.push({ role: 'assistant', content: response.content })

          for (const block of response.content) {
            if (block.type === 'text') {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text', content: block.text })}\n\n`))
            }
          }

          if (response.stop_reason === 'end_turn') break

          if (response.stop_reason === 'tool_use') {
            const toolBlocks = response.content.filter((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use')
            const results: Anthropic.ToolResultBlockParam[] = []

            for (const block of toolBlocks) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'tool', name: block.name })}\n\n`))
              const result = executeToolCall(block.name, block.input as Record<string, string>)
              results.push({ type: 'tool_result', tool_use_id: block.id, content: result })
            }

            messages.push({ role: 'user', content: results })
          }
        }

        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Error'
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', content: msg })}\n\n`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
