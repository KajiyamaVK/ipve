import TopBar from '@/components/TopBar'
import { MenuDrawer } from '@/components/MenuDrawer'
import { ReactNode } from 'react'
import { FormsContextProvider } from '@/contexts/formsContext'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <FormsContextProvider>
      <div className="flex h-full w-full">
        <MenuDrawer />
        <div className="w-full h-full">
          <TopBar />
          {children}
        </div>
      </div>
    </FormsContextProvider>
  )
}
