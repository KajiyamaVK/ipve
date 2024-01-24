'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

type TFormMode = 'add' | 'edit' | 'view' | null

interface IFormsContext {
  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  isSkeletonOpen: boolean
  setIsSkeletonOpen: Dispatch<SetStateAction<boolean>>
  currentSelectedItem?: number | undefined
  setCurrentSelectedItem: Dispatch<SetStateAction<number>>
  formMode: TFormMode
  setFormMode: Dispatch<SetStateAction<TFormMode>>
}

export const formsContext = createContext({} as IFormsContext)

export function FormsContextProvider({ children }: { children: ReactNode }) {
  const [formMode, setFormMode] = useState<TFormMode>('add')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isSkeletonOpen, setIsSkeletonOpen] = useState<boolean>(false)
  const [currentSelectedItem, setCurrentSelectedItem] = useState<number>(0)

  return (
    <formsContext.Provider
      value={{
        formMode,
        setFormMode,
        isDialogOpen,
        setIsDialogOpen,
        currentSelectedItem,
        setCurrentSelectedItem,
        isSkeletonOpen,
        setIsSkeletonOpen,
      }}
    >
      {children}
    </formsContext.Provider>
  )
}
