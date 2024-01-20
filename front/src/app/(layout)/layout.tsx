import { MenuDrawer } from '@/components/MenuDrawer'
import { ReactNode } from 'react'
import { FormsContextProvider } from '@/contexts/formsContext'
import { MainContent } from '@/components/MainContent'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <FormsContextProvider>
      <div className="flex h-full w-full overflow-hidden flex-1">
        <MenuDrawer />

        <MainContent>{children}</MainContent>
      </div>
    </FormsContextProvider>
  )
}
