import { NextResponse } from 'next/server'
import { listProjects } from '@root/lib/store'

export async function GET() {
  const projects = await listProjects()
  return NextResponse.json(projects)
}
