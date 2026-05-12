'use client'

import { cn } from '@/lib/utils'

const WA_LINK = 'https://wa.me/351912112456'

interface WhatsAppCTAProps {
  children: React.ReactNode
  variant?: 'primary' | 'header' | 'link'
  className?: string
}

const variantStyles: Record<NonNullable<WhatsAppCTAProps['variant']>, string> = {
  primary:
    'group flex items-center gap-3 bg-[hsl(30,50%,50%)] hover:bg-[hsl(30,50%,45%)] text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(30,50%,50%,0.25)]',
  header:
    'flex items-center gap-2 bg-[hsl(30,50%,50%)] hover:bg-[hsl(30,50%,45%)] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105',
  link: 'flex items-center gap-2 text-[hsl(30,50%,55%)] hover:text-[hsl(30,50%,65%)] text-sm font-medium transition-colors',
}

export function WhatsAppCTA({
  children,
  variant = 'primary',
  className,
}: WhatsAppCTAProps) {
  // header and link variants go directly to WhatsApp
  if (variant === 'header' || variant === 'link') {
    return (
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(variantStyles[variant], className)}
      >
        {children}
      </a>
    )
  }

  // primary variant scrolls to the diagnostico section
  const scrollToDiagnostico = () => {
    document.getElementById('diagnostico-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToDiagnostico}
      className={cn(variantStyles[variant], className)}
    >
      {children}
    </button>
  )
}
