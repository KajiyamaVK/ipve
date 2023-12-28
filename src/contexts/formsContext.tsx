'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

type TFormMode = 'add' | 'edit' | null

interface IFormsContext {
  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  currentSelectedItem?: string | null
  setCurrentSelectedItem: Dispatch<SetStateAction<string>>
  formMode: TFormMode
  setFormMode: Dispatch<SetStateAction<TFormMode>>
}

export const formsContext = createContext({} as IFormsContext)

export function FormsContextProvider({ children }: { children: ReactNode }) {
  const [formMode, setFormMode] = useState<TFormMode>('add')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [currentSelectedItem, setCurrentSelectedItem] = useState<string>('')

  return (
    <formsContext.Provider
      value={{
        formMode,
        setFormMode,
        isDialogOpen,
        setIsDialogOpen,
        currentSelectedItem,
        setCurrentSelectedItem,
      }}
    >
      {children}
    </formsContext.Provider>
  )
}
