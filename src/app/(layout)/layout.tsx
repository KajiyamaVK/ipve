import TopBar from '@/components/TopBar'
import { MenuDrawer } from '@/components/MenuDrawer'
import { ReactNode } from 'react'
import { FormsContextProvider } from '@/contexts/formsContext'
import { OpenDrawerButton } from '@/components/openDrawerButton'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <FormsContextProvider>
      <div className="flex h-full w-full">
        <OpenDrawerButton />
        <MenuDrawer />
        <div className=" mx-10 lg:ml-96 flex-1  h-full">
          <TopBar />
          {children}
        </div>
      </div>
    </FormsContextProvider>
  )
}
