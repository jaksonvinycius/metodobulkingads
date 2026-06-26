'use client'

import { useState } from 'react'
import { Globe, Loader2 } from 'lucide-react'

interface Props { projectId: string; currentUrl?: string }

export function DeployButton({ projectId, currentUrl }: Props) {
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState(currentUrl)
  const [error, setError] = useState<string | null>(null)

  async function handleDeploy() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId }),
      })
      const json = await res.json() as { url?: string; error?: string }
      if (!res.ok) throw new Error(json.error ?? 'Deploy failed')
      setUrl(json.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro no deploy')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleDeploy}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-opacity disabled:opacity-50"
        style={{ background: 'hsl(30 50% 50%)', color: 'hsl(20 10% 7%)' }}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
        {url ? 'Republicar' : 'Publicar'}
      </button>
      {url && !loading && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[hsl(30,50%,60%)] hover:underline">
          {url.replace('https://', '')}
        </a>
      )}
      {error && <p className="text-xs text-[hsl(0,70%,65%)]">{error}</p>}
    </div>
  )
}
