import { MenuDrawer } from '@/components/MenuDrawer'
import { ReactNode } from 'react'
import { FormsContextProvider } from '@/contexts/formsContext'
import { MainContent } from '@/components/MainContent'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <FormsContextProvider>
      <div className="flex size-full flex-1 overflow-hidden">
        <MenuDrawer />

        <MainContent>{children}</MainContent>
      </div>
    </FormsContextProvider>
  )
}
