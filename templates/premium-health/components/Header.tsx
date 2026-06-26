'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { WhatsAppCTA } from '@/components/whatsapp-cta'
import type { ClientConfig } from '@/lib/types'

const navItems = [
  { label: 'Problema', href: '#problema' },
  { label: 'Solução', href: '#solucao' },
  { label: 'Como Funciona', href: '#como-funciona' },
]

interface Props { config: ClientConfig }

export function Header({ config }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
        scrolled
          ? 'bg-[hsl(20,10%,7%)]/95 backdrop-blur-sm border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-bold text-lg tracking-tight text-[hsl(35,30%,90%)]"
        >
          {config.name.split(' ')[0]}{' '}
          <span className="text-gradient">{config.name.split(' ').slice(1).join(' ')}</span>
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm text-[hsl(30,15%,55%)] hover:text-[hsl(35,30%,85%)] transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <WhatsAppCTA variant="header" whatsapp={config.whatsapp}>
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Falar no WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </WhatsAppCTA>
      </div>
    </header>
  )
}
