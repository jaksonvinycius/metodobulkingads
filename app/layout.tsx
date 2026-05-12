import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vinycius Jakson | Atraia os Pacientes Certos - Método Bulking Ads',
  description:
    'Ajudo nutricionistas a atrair pacientes qualificados de forma previsível e a faturar mais. Diagnóstico gratuito.',
  keywords: 'nutricionistas,atrair pacientes,bulking ads,consultório nutrição,mais pacientes,faturar mais',
  openGraph: {
    title: 'Vinycius Jakson | Atraia os Pacientes Certos',
    description:
      'Ajudo nutricionistas a atrair pacientes qualificados de forma previsível e a faturar mais. Diagnóstico gratuito.',
    image: 'https://metodobulkingads.site/og-image.png',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinycius Jakson | Atraia os Pacientes Certos',
    description:
      'Ajudo nutricionistas a atrair pacientes qualificados de forma previsível e a faturar mais. Diagnóstico gratuito.',
    image: 'https://metodobulkingads.site/og-image.png',
  },
  icons: {
    shortcut: '/favicon.ico',
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans bg-[hsl(20,10%,7%)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
