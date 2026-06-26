import fs from 'fs/promises'
import path from 'path'
import type { ProjectRecord } from './types'

const DATA_FILE = path.join(process.cwd(), 'studio', 'data', 'projects.json')

async function ensureDataFile(): Promise<void> {
  const dir = path.dirname(DATA_FILE)
  await fs.mkdir(dir, { recursive: true })
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]), 'utf-8')
  }
}

async function readAll(): Promise<ProjectRecord[]> {
  await ensureDataFile()
  const raw = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(raw) as ProjectRecord[]
}

async function writeAll(records: ProjectRecord[]): Promise<void> {
  await ensureDataFile()
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8')
}

export async function listProjects(): Promise<ProjectRecord[]> {
  const records = await readAll()
  return records.sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export async function getProject(id: string): Promise<ProjectRecord | null> {
  const records = await readAll()
  return records.find(r => r.id === id) ?? null
}

export async function createProject(record: ProjectRecord): Promise<void> {
  const records = await readAll()
  records.push(record)
  await writeAll(records)
}

export async function updateProject(id: string, patch: Partial<ProjectRecord>): Promise<void> {
  const records = await readAll()
  const idx = records.findIndex(r => r.id === id)
  if (idx === -1) throw new Error(`Project ${id} not found`)
  records[idx] = { ...records[idx], ...patch, updated_at: new Date().toISOString() }
  await writeAll(records)
}

export async function deleteProject(id: string): Promise<void> {
  const records = await readAll()
  const filtered = records.filter(r => r.id !== id)
  await writeAll(filtered)
}
