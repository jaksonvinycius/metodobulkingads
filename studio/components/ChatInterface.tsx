'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Wrench } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  tool?: string
}

interface Props { projectId: string }

export function ChatInterface({ projectId }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)

    let buffer = ''
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, message: text }),
      })

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No stream')
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))

        for (const line of lines) {
          const payload = line.slice(6)
          if (payload === '[DONE]') continue

          try {
            const event = JSON.parse(payload) as { type: string; content?: string; name?: string }
            if (event.type === 'text' && event.content) {
              buffer += event.content
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: buffer }
                return updated
              })
            } else if (event.type === 'tool' && event.name) {
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: buffer, tool: event.name }
                return updated
              })
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch (e) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: `Erro: ${e instanceof Error ? e.message : 'desconhecido'}` }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0" style={{ height: 'calc(100vh - 180px)' }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-[hsl(35,20%,40%)] py-16">
            Descreva o que você quer alterar no site do cliente
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[80%] rounded-xl px-4 py-3 text-sm whitespace-pre-wrap"
              style={{
                background: msg.role === 'user' ? 'hsl(30 50% 50% / 0.2)' : 'hsl(20 10% 12%)',
                border: '1px solid',
                borderColor: msg.role === 'user' ? 'hsl(30 50% 50% / 0.3)' : 'hsl(30 50% 50% / 0.1)',
                color: 'hsl(35 30% 85%)',
              }}
            >
              {msg.tool && (
                <div className="flex items-center gap-1.5 mb-2 text-xs text-[hsl(30,50%,55%)]">
                  <Wrench className="w-3 h-3" />
                  <span>Usando: {msg.tool}</span>
                </div>
              )}
              {msg.content || (loading && i === messages.length - 1 ? (
                <span className="inline-flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>·</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>·</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>·</span>
                </span>
              ) : '')}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex gap-2 p-3 rounded-xl border mt-auto"
        style={{ background: 'hsl(20 10% 10%)', borderColor: 'hsl(30 50% 50% / 0.2)' }}
      >
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          placeholder="Muda o headline para mais direto... (Enter para enviar)"
          disabled={loading}
          className="flex-1 bg-transparent text-sm outline-none resize-none text-[hsl(35,30%,85%)] placeholder:text-[hsl(35,20%,35%)] disabled:opacity-50"
          style={{ minHeight: 40, maxHeight: 120 }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-opacity disabled:opacity-30 self-end"
          style={{ background: 'hsl(30 50% 50%)', color: 'hsl(20 10% 7%)' }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
