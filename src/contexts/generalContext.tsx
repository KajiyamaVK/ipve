'use client'

import { usePathname } from 'next/navigation'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'
import { getRouteData } from '@/utils/getRouteData'
import { TMenuDrawerItem } from '@/types/TMenuDrawerItem'

interface iGeneralContext {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>

  currentScreen: TMenuDrawerItem
}

export const generalContext = createContext({} as iGeneralContext)

export function GeneralContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentScreen, setCurrentScreen] = useState<TMenuDrawerItem>(
    {} as TMenuDrawerItem,
  )

  const path = usePathname()

  useEffect(() => {
    const pathnameParts = path.split('/').filter((part) => part !== '')
    if (pathnameParts.length > 0) {
      const currentScreenData = getRouteData(pathnameParts[0])
      if (!currentScreenData) throw new Error('Screen not found')
      setCurrentScreen(currentScreenData)
    } else {
      setCurrentScreen({} as TMenuDrawerItem)
    }
  }, [path])

  return (
    <generalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        currentScreen,
      }}
    >
      {children}
    </generalContext.Provider>
  )
}
