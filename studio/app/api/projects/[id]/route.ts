import { NextRequest, NextResponse } from 'next/server'
import { getProject, deleteProject } from '@root/lib/store'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const project = await getProject(params.id)
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(project)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await deleteProject(params.id)
  return NextResponse.json({ ok: true })
}
