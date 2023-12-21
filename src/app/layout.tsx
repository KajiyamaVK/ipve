import { ReactNode } from 'react'
import { GeneralContextProvider } from '@/contexts/generalContext'
import '@/app/globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <GeneralContextProvider>
        <body suppressHydrationWarning={true}>{children}</body>
      </GeneralContextProvider>
    </html>
  )
}
