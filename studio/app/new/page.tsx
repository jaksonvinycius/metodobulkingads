import { BriefingFormContainer } from '@/components/BriefingForm/Container'

export default function NewProjectPage() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <a href="/" className="text-sm text-[hsl(35,20%,50%)] hover:text-[hsl(35,30%,70%)] transition-colors">
          ← Voltar ao dashboard
        </a>
        <h1 className="text-2xl font-semibold mt-3">Novo Projeto</h1>
        <p className="text-sm text-[hsl(35,20%,50%)] mt-1">Preencha o briefing do cliente para gerar a landing page</p>
      </header>
      <BriefingFormContainer />
    </div>
  )
}
