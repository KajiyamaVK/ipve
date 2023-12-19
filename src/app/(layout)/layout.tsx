import TopBar from '@/components/TopBar'
import { MenuDrawer } from '@/components/MenuDrawer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full w-full">
      <MenuDrawer />
      <div className="w-full h-full">
        <TopBar />
        {children}
      </div>
    </div>
  )
}
