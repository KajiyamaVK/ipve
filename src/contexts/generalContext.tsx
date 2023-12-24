'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface iGeneralContext {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>

  changeScreen: (screen: string) => void
  currentScreen: string
}

export const generalContext = createContext({} as iGeneralContext)

export function GeneralContextProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentScreen, setCurrentScreen] = useState('dashboard')

  function changeScreen(screen: string) {
    setCurrentScreen(screen)
  }

  return (
    <generalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        changeScreen,
        currentScreen,
      }}
    >
      {children}
    </generalContext.Provider>
  )
}
