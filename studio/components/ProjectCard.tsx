'use client'

import Link from 'next/link'
import type { ProjectRecord } from '@root/lib/types'
import { ExternalLink, MessageSquare, Globe } from 'lucide-react'

interface Props { project: ProjectRecord }

const STATUS_STYLES: Record<string, string> = {
  draft:      'bg-[hsl(35,20%,20%)] text-[hsl(35,30%,70%)]',
  generating: 'bg-[hsl(200,60%,20%)] text-[hsl(200,60%,70%)]',
  ready:      'bg-[hsl(30,50%,20%)] text-[hsl(30,50%,70%)]',
  deployed:   'bg-[hsl(140,40%,15%)] text-[hsl(140,50%,60%)]',
  error:      'bg-[hsl(0,50%,18%)] text-[hsl(0,70%,65%)]',
}

const STATUS_LABELS: Record<string, string> = {
  draft:      'Rascunho',
  generating: 'Gerando...',
  ready:      'Pronto',
  deployed:   'Ao vivo',
  error:      'Erro',
}

export function ProjectCard({ project }: Props) {
  const date = new Date(project.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })

  return (
    <div
      className="rounded-xl p-5 border flex flex-col gap-4 transition-colors hover:border-[hsl(30,50%,40%)]"
      style={{ background: 'hsl(20 10% 10%)', borderColor: 'hsl(30 50% 50% / 0.15)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-semibold truncate">{project.client_name}</h2>
          <p className="text-xs text-[hsl(35,20%,50%)] mt-0.5">{project.config.profession}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap shrink-0 ${STATUS_STYLES[project.status] ?? STATUS_STYLES.draft}`}>
          {STATUS_LABELS[project.status] ?? project.status}
        </span>
      </div>

      <div className="text-xs text-[hsl(35,20%,45%)] space-y-1">
        <p>Template: <span className="text-[hsl(35,30%,70%)]">{project.template}</span></p>
        <p>Criado: <span className="text-[hsl(35,30%,70%)]">{date}</span></p>
        {project.deployed_url && (
          <a
            href={project.deployed_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[hsl(30,50%,60%)] transition-colors"
          >
            <Globe className="w-3 h-3" />
            {project.deployed_url.replace('https://', '')}
          </a>
        )}
      </div>

      <div className="flex gap-2 mt-auto">
        <Link
          href={`/projects/${project.id}`}
          className="flex-1 text-center text-xs py-2 rounded-lg border transition-colors hover:border-[hsl(30,50%,40%)]"
          style={{ borderColor: 'hsl(30 50% 50% / 0.2)', color: 'hsl(35 30% 75%)' }}
        >
          <ExternalLink className="w-3 h-3 inline mr-1" />
          Ver projeto
        </Link>
        <Link
          href={`/projects/${project.id}/chat`}
          className="flex-1 text-center text-xs py-2 rounded-lg transition-colors"
          style={{ background: 'hsl(30 50% 50% / 0.15)', color: 'hsl(30 50% 65%)' }}
        >
          <MessageSquare className="w-3 h-3 inline mr-1" />
          Corrigir com IA
        </Link>
      </div>
    </div>
  )
}
