import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

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
    images: ['https://metodobulkingads.site/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vinycius Jakson | Atraia os Pacientes Certos',
    description:
      'Ajudo nutricionistas a atrair pacientes qualificados de forma previsível e a faturar mais. Diagnóstico gratuito.',
    images: ['https://metodobulkingads.site/og-image.png'],
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
      lang="pt-PT"
      className="dark"
      suppressHydrationWarning
    >
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PR3F9SWJ');`,
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} font-sans bg-[hsl(20,10%,7%)]`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PR3F9SWJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
          <Analytics />
      </body>
    </html>
  )
}
