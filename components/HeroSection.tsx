'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WhatsAppCTA } from '@/components/whatsapp-cta'

const stats = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[hsl(30,50%,55%)]">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: 'Exclusivo para nutricionistas',
    subtitle: 'Estratégia feita sob medida',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[hsl(30,50%,55%)]">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: 'Pacientes qualificados',
    subtitle: 'De forma previsível e constante',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[hsl(30,50%,55%)]">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Resultados reais',
    subtitle: 'Sem depender de indicações',
  },
]

export function HeroSection() {
  const [photoError, setPhotoError] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const glowY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const indicatorY = useTransform(scrollYProgress, [0, 0.5], [0, -20])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient glow — parallax */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[hsl(30,50%,50%)]/6 rounded-full blur-[140px] z-0 pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(30,50%,50%)]/15 to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="animate-fade-in-up inline-flex items-center gap-2 bg-[hsl(30,50%,50%)]/8 border border-[hsl(30,50%,50%)]/15 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-[hsl(30,50%,50%)] rounded-full animate-pulse" />
              <span className="text-sm text-[hsl(35,30%,75%)]">Método Bulking Ads</span>
            </div>

            <h1 className="animate-fade-in-up anim-delay-100 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[hsl(35,30%,90%)] leading-[1.1]">
              Atraia os{' '}
              <span className="text-gradient">pacientes certos</span>{' '}
              todos os meses
            </h1>

            <p className="animate-fade-in-up anim-delay-200 mt-6 text-lg sm:text-xl text-[hsl(30,15%,55%)] max-w-xl leading-relaxed">
              Ajudo nutricionistas a atrair pacientes qualificados de forma previsível e a faturar mais — sem depender de indicações ou sorte.
            </p>

            <div className="animate-fade-in-up anim-delay-300 mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <WhatsAppCTA variant="primary" className="text-lg px-8 py-4">
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Diagnóstico gratuito
              </WhatsAppCTA>
              <button
                onClick={() => scrollTo('#como-funciona')}
                className="text-[hsl(30,15%,50%)] hover:text-[hsl(35,30%,80%)] text-sm transition-colors duration-200 underline underline-offset-4"
              >
                Como funciona?
              </button>
            </div>
          </div>

          {/* Photo */}
          <div className="animate-fade-in anim-delay-400 flex-shrink-0 relative">
            {!photoError ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,10%,7%)] via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-r from-[hsl(20,10%,7%)]/30 via-transparent to-[hsl(20,10%,7%)]/30 z-10 pointer-events-none" />
                <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] lg:w-[360px] lg:h-[480px]">
                  <Image
                    src="/vinycius.webp"
                    alt="Vinycius Jakson - Especialista em atrair pacientes para nutricionistas"
                    fill
                    priority
                    quality={95}
                    onError={() => setPhotoError(true)}
                    className="object-cover object-top opacity-90 brightness-105 contrast-[1.02]"
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 360px"
                  />
                </div>
              </>
            ) : (
              <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[380px] lg:w-[360px] lg:h-[460px] rounded-2xl overflow-hidden bg-gradient-to-b from-[hsl(30,50%,50%)]/10 to-[hsl(20,10%,7%)] border border-white/5 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[hsl(30,50%,50%)]/20 border border-[hsl(30,50%,50%)]/30 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-[hsl(30,50%,60%)]">VJ</span>
                </div>
                <p className="text-[hsl(30,15%,40%)] text-xs text-center px-6">
                  Adicione a foto em <code className="text-[hsl(30,50%,50%)]">public/vinycius.webp</code>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up anim-delay-600 mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto lg:mx-0">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex flex-col items-center lg:items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-6 hover:bg-white/[0.06] transition-colors duration-300"
            >
              {stat.icon}
              <p className="font-semibold text-[hsl(35,30%,88%)] text-sm">{stat.title}</p>
              <p className="text-[hsl(30,15%,45%)] text-xs">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — parallax */}
      <motion.div
        style={{ y: indicatorY, opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[hsl(30,15%,30%)] rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-[hsl(30,50%,50%)] rounded-full mt-2 animate-bounce-scroll" />
        </div>
      </motion.div>
    </section>
  )
}
