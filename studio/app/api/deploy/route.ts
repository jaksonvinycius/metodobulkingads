import { NextRequest, NextResponse } from 'next/server'
import { deployToVercel } from '@root/lib/deployer'
import { getProject, updateProject } from '@root/lib/store'
import type { DeployerInput } from '@root/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { project_id, domain } = await req.json() as { project_id: string; domain?: string }

    const project = await getProject(project_id)
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 })

    await updateProject(project_id, { status: 'generating' })

    const input: DeployerInput = {
      project_path: project.project_path,
      project_name: project_id,
      env_vars: project.config.qualification.google_sheets_webhook
        ? { GOOGLE_SHEETS_WEBHOOK_URL: project.config.qualification.google_sheets_webhook }
        : {},
      domain,
    }

    const result = await deployToVercel(input)

    await updateProject(project_id, {
      status: 'deployed',
      deployed_url: result.url,
      vercel_project_id: result.vercel_project_id,
    })

    return NextResponse.json(result)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Deploy failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
