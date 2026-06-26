import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Studio — Landing Page Generator',
  description: 'Internal production tool for generating client landing pages',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased bg-[hsl(20,10%,7%)] text-[hsl(35,30%,90%)] min-h-screen">
        {children}
      </body>
    </html>
  )
}
