import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { ProblemaSection } from '@/components/ProblemaSection'
import { SolucaoSection } from '@/components/SolucaoSection'
import { ComoFuncionaSection } from '@/components/ComoFuncionaSection'
import { CtaFinalSection } from '@/components/CtaFinalSection'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { ScrollObserver } from '@/components/ScrollObserver'

export default function Home() {
  return (
    <main className="bg-[hsl(20,10%,7%)]">
      <ScrollObserver />
      <Header />
      <HeroSection />
      <ProblemaSection />
      <SolucaoSection />
      <ComoFuncionaSection />
      <CtaFinalSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
