'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WhatsAppCTA } from '@/components/whatsapp-cta'
import type { ClientConfig } from '@/lib/types'

interface Props { config: ClientConfig }

export function HeroSection({ config }: Props) {
  const [photoError, setPhotoError] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const initials = config.favicon_initials

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

  // Render headline with highlight span
  const renderHeadline = () => {
    const { headline, headline_highlight } = config.hero
    if (!headline_highlight || !headline.includes(headline_highlight)) {
      return <span>{headline}</span>
    }
    const [before, after] = headline.split(headline_highlight)
    return (
      <>
        {before}
        <span className="text-gradient">{headline_highlight}</span>
        {after}
      </>
    )
  }

  const stats = config.hero.stats

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[hsl(var(--primary)/0.06)] rounded-full blur-[140px] z-0 pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.15)] to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="animate-fade-in-up inline-flex items-center gap-2 bg-[hsl(var(--primary)/0.08)] border border-[hsl(var(--primary)/0.15)] rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full animate-pulse" />
              <span className="text-sm text-[hsl(35,30%,75%)]">{config.hero.badge}</span>
            </div>

            <h1 className="animate-fade-in-up anim-delay-100 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[hsl(35,30%,90%)] leading-[1.1]">
              {renderHeadline()}
            </h1>

            <p className="animate-fade-in-up anim-delay-200 mt-6 text-lg sm:text-xl text-[hsl(30,15%,55%)] max-w-xl leading-relaxed">
              {config.hero.subheadline}
            </p>

            <div className="animate-fade-in-up anim-delay-300 mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <WhatsAppCTA variant="primary" whatsapp={config.whatsapp} className="text-lg px-8 py-4">
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                {config.hero.cta_primary}
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
            {config.photo_filename && !photoError ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(20,10%,7%)] via-transparent to-transparent z-10 pointer-events-none" />
                <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] lg:w-[360px] lg:h-[480px]">
                  <Image
                    src={`/${config.photo_filename}`}
                    alt={`${config.name} — ${config.profession}`}
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
              <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[380px] lg:w-[360px] lg:h-[460px] rounded-2xl overflow-hidden bg-gradient-to-b from-[hsl(var(--primary)/0.10)] to-[hsl(20,10%,7%)] border border-white/5 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[hsl(var(--primary)/0.20)] border border-[hsl(var(--primary)/0.30)] flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-[hsl(var(--primary-light))]">{initials}</span>
                </div>
                <p className="text-[hsl(30,15%,40%)] text-xs text-center px-6">{config.name}</p>
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
              <p className="font-semibold text-[hsl(35,30%,88%)] text-sm">{stat.title}</p>
              <p className="text-[hsl(30,15%,45%)] text-xs">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        style={{ y: indicatorY, opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[hsl(30,15%,30%)] rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-[hsl(var(--primary))] rounded-full mt-2 animate-bounce-scroll" />
        </div>
      </motion.div>
    </section>
  )
}
