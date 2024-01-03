import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CRM IPVE',
  description:
    'Sistema de gestão da igreja presbiteriana da Vila Eutália, São Paulo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
