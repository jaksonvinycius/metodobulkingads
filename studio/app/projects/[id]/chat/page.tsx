import { notFound } from 'next/navigation'
import { getProject } from '@root/lib/store'
import { ChatInterface } from '@/components/ChatInterface'

export const dynamic = 'force-dynamic'

export default async function ChatPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)
  if (!project) notFound()

  return (
    <div className="min-h-screen flex flex-col p-8">
      <header className="mb-6">
        <a href={`/projects/${project.id}`} className="text-sm text-[hsl(35,20%,50%)] hover:text-[hsl(35,30%,70%)] transition-colors">
          ← {project.client_name}
        </a>
        <h1 className="text-xl font-semibold mt-2">Corrigir com IA</h1>
        <p className="text-sm text-[hsl(35,20%,50%)] mt-1">
          O agente vai editar os arquivos do projeto e validar TypeScript automaticamente
        </p>
      </header>
      <ChatInterface projectId={project.id} />
    </div>
  )
}
