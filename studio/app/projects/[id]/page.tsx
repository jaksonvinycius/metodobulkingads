import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject } from '@root/lib/store'
import { DeployButton } from '@/components/DeployButton'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)
  if (!project) notFound()

  return (
    <div className="min-h-screen p-8">
      <header className="flex items-start justify-between mb-8">
        <div>
          <a href="/" className="text-sm text-[hsl(35,20%,50%)] hover:text-[hsl(35,30%,70%)] transition-colors">
            ← Dashboard
          </a>
          <h1 className="text-2xl font-semibold mt-3">{project.client_name}</h1>
          <p className="text-sm text-[hsl(35,20%,50%)] mt-1">{project.config.profession}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/projects/${project.id}/chat`}
            className="px-4 py-2 rounded-lg text-sm border transition-colors"
            style={{ borderColor: 'hsl(30 50% 50% / 0.3)', color: 'hsl(30 50% 65%)' }}
          >
            Corrigir com IA
          </Link>
          <DeployButton projectId={project.id} currentUrl={project.deployed_url} />
        </div>
      </header>

      {/* Preview */}
      <div
        className="rounded-xl border overflow-hidden mb-6"
        style={{ borderColor: 'hsl(30 50% 50% / 0.15)', height: '70vh' }}
      >
        {project.deployed_url ? (
          <iframe src={project.deployed_url} className="w-full h-full" title="Site preview" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: 'hsl(20 10% 10%)' }}>
            <p className="text-[hsl(35,20%,45%)]">Site não publicado ainda</p>
            <p className="text-xs text-[hsl(35,20%,35%)]">Clique em "Publicar" para fazer o deploy na Vercel</p>
          </div>
        )}
      </div>

      {/* Config summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'WhatsApp', value: project.config.whatsapp },
          { label: 'Template', value: project.template },
          { label: 'Status', value: project.status },
          { label: 'Criado em', value: new Date(project.created_at).toLocaleDateString('pt-BR') },
        ].map(item => (
          <div key={item.label} className="rounded-lg p-3" style={{ background: 'hsl(20 10% 10%)', border: '1px solid hsl(30 50% 50% / 0.1)' }}>
            <p className="text-xs text-[hsl(35,20%,45%)]">{item.label}</p>
            <p className="text-sm font-medium mt-0.5 truncate">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
