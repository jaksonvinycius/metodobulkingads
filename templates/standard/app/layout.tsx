import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import clientConfig from '@/client.config'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: clientConfig.seo.title,
  description: clientConfig.seo.description,
  keywords: clientConfig.seo.keywords.join(','),
  openGraph: {
    title: clientConfig.seo.title,
    description: clientConfig.seo.description,
    images: clientConfig.seo.domain ? [`https://${clientConfig.seo.domain}/og-image.png`] : [],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: clientConfig.seo.title,
    description: clientConfig.seo.description,
    images: clientConfig.seo.domain ? [`https://${clientConfig.seo.domain}/og-image.png`] : [],
  },
  icons: {
    shortcut: '/favicon.ico',
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
