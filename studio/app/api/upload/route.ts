import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `upload-${Date.now()}.${ext}`
    const tempPath = path.join(os.tmpdir(), filename)

    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(tempPath, buffer)

    return NextResponse.json({ path: tempPath })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
