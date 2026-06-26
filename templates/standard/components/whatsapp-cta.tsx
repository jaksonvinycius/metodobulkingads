'use client'

import { cn } from '@/lib/utils'

const WA_BASE = 'https://wa.me/'

interface WhatsAppCTAProps {
  children: React.ReactNode
  variant?: 'primary' | 'header' | 'link'
  className?: string
  whatsapp: string   // digits only, e.g. "5511999999999"
}

const variantStyles: Record<NonNullable<WhatsAppCTAProps['variant']>, string> = {
  primary:
    'group flex items-center gap-3 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.25)]',
  header:
    'flex items-center gap-2 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-dark))] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105',
  link: 'flex items-center gap-2 text-[hsl(var(--primary-light))] hover:text-[hsl(var(--primary-lighter))] text-sm font-medium transition-colors',
}

export function WhatsAppCTA({ children, variant = 'primary', className, whatsapp }: WhatsAppCTAProps) {
  if (variant === 'header' || variant === 'link') {
    return (
      <a
        href={`${WA_BASE}${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(variantStyles[variant], className)}
      >
        {children}
      </a>
    )
  }

  const scrollToDiagnostico = () => {
    document.getElementById('diagnostico-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button onClick={scrollToDiagnostico} className={cn(variantStyles[variant], className)}>
      {children}
    </button>
  )
}
