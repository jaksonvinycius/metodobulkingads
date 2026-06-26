import clientConfig from '@/client.config'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { ProblemaSection } from '@/components/ProblemaSection'
import { SolucaoSection } from '@/components/SolucaoSection'
import { ComoFuncionaSection } from '@/components/ComoFuncionaSection'
import { CtaFinalSection } from '@/components/CtaFinalSection'
import { DiagnosticoSection } from '@/components/DiagnosticoSection'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { ScrollObserver } from '@/components/ScrollObserver'

export default function Home() {
  return (
    <main className="bg-[hsl(20,10%,7%)]">
      <ScrollObserver />
      <Header config={clientConfig} />
      <HeroSection config={clientConfig} />
      <ProblemaSection config={clientConfig} />
      <SolucaoSection config={clientConfig} />
      <ComoFuncionaSection config={clientConfig} />
      <CtaFinalSection config={clientConfig} />
      <DiagnosticoSection config={clientConfig} />
      <Footer config={clientConfig} />
      <WhatsAppFloat config={clientConfig} />
    </main>
  )
}
