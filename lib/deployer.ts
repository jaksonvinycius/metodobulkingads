import fs from 'fs/promises'
import path from 'path'
import type { DeployerInput, DeployerOutput } from './types'

const VERCEL_API = 'https://api.vercel.com'

async function vercelRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'DELETE',
  body?: unknown
): Promise<T> {
  const token = process.env.VERCEL_TOKEN
  if (!token) throw new Error('VERCEL_TOKEN env var is not set')

  const teamId = process.env.VERCEL_TEAM_ID
  const url = new URL(`${VERCEL_API}${endpoint}`)
  if (teamId) url.searchParams.set('teamId', teamId)

  const res = await fetch(url.toString(), {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Vercel API ${method} ${endpoint} → ${res.status}: ${text}`)
  }

  return res.json() as Promise<T>
}

interface VercelProject { id: string; name: string }
interface VercelDeployment { id: string; url: string; readyState: string }
interface VercelFile { file: string; data: string; encoding: 'base64' }

async function collectFiles(dir: string, base = ''): Promise<VercelFile[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files: VercelFile[] = []

  const IGNORE = new Set(['.next', 'node_modules', '.git'])

  for (const entry of entries) {
    if (IGNORE.has(entry.name)) continue
    const fullPath = path.join(dir, entry.name)
    const relPath = base ? `${base}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath, relPath)))
    } else {
      const data = await fs.readFile(fullPath)
      files.push({ file: relPath, data: data.toString('base64'), encoding: 'base64' })
    }
  }

  return files
}

async function waitForDeployment(deploymentId: string, maxWaitMs = 300_000): Promise<string> {
  const interval = 5_000
  const deadline = Date.now() + maxWaitMs

  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, interval))
    const dep = await vercelRequest<VercelDeployment>(`/v13/deployments/${deploymentId}`, 'GET')
    if (dep.readyState === 'READY') return `https://${dep.url}`
    if (dep.readyState === 'ERROR') throw new Error(`Deployment ${deploymentId} failed`)
  }

  throw new Error(`Deployment ${deploymentId} timed out after ${maxWaitMs / 1000}s`)
}

export async function deployToVercel(input: DeployerInput): Promise<DeployerOutput> {
  const { project_path, project_name, env_vars = {}, domain } = input

  // 1. Create or get Vercel project
  let project: VercelProject
  try {
    project = await vercelRequest<VercelProject>(`/v9/projects/${project_name}`, 'GET')
  } catch {
    project = await vercelRequest<VercelProject>('/v9/projects', 'POST', {
      name: project_name,
      framework: 'nextjs',
    })
  }

  // 2. Set env vars
  const envEntries = Object.entries(env_vars)
  if (envEntries.length > 0) {
    await vercelRequest(`/v9/projects/${project.id}/env`, 'POST',
      envEntries.map(([key, value]) => ({
        key,
        value,
        type: 'encrypted',
        target: ['production', 'preview'],
      }))
    )
  }

  // 3. Collect project files
  const files = await collectFiles(project_path)

  // 4. Create deployment
  const deployment = await vercelRequest<VercelDeployment>('/v13/deployments', 'POST', {
    name: project_name,
    project: project.id,
    files,
    target: 'production',
  })

  // 5. Wait for ready
  const url = await waitForDeployment(deployment.id)

  // 6. Attach custom domain if provided
  if (domain) {
    try {
      await vercelRequest(`/v10/projects/${project.id}/domains`, 'POST', { name: domain })
    } catch {
      // Domain attachment is best-effort; DNS may need manual config
    }
  }

  return {
    url,
    deployment_id: deployment.id,
    vercel_project_id: project.id,
  }
}
