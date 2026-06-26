import Link from 'next/link'
import { listProjects } from '@root/lib/store'
import { ProjectCard } from '@/components/ProjectCard'
import { Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const projects = await listProjects()

  return (
    <div className="min-h-screen p-8">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gradient inline-block">Studio</h1>
          <p className="text-sm text-[hsl(35,20%,50%)] mt-1">Landing page generator</p>
        </div>
        <Link
          href="/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ background: 'hsl(30 50% 50%)', color: 'hsl(20 10% 7%)' }}
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
        </Link>
      </header>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="text-[hsl(35,20%,50%)] text-lg mb-4">Nenhum projeto ainda</p>
          <Link
            href="/new"
            className="text-sm underline underline-offset-4"
            style={{ color: 'hsl(30 50% 60%)' }}
          >
            Criar o primeiro projeto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
