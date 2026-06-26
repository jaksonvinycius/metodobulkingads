import { NextRequest, NextResponse } from 'next/server'
import { generateProject } from '@root/lib/generator'
import { createProject } from '@root/lib/store'
import type { ClientConfig, GeneratorInput } from '@root/lib/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as GeneratorInput

    const result = await generateProject(body)

    const record = {
      id: body.config.id,
      client_name: body.config.name,
      template: body.config.template,
      niche: body.config.niche,
      status: result.validation_passed ? 'ready' as const : 'error' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      project_path: result.project_path,
      config: body.config,
    }

    await createProject(record)

    return NextResponse.json({
      id: body.config.id,
      validation_passed: result.validation_passed,
      errors: result.errors,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
