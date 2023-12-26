'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { generalContext } from './generalContext'
import { menuItems } from '@/data/menuItems'

type TFormsRegisterType = 'dialog' | 'page'
type TFormMode = 'add' | 'edit'

interface IFormsContext {
  formMode: TFormMode
  formType: TFormsRegisterType
  setFormMode: Dispatch<SetStateAction<TFormMode>>
  setFormType: Dispatch<SetStateAction<TFormsRegisterType>>

  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const formsContext = createContext({} as IFormsContext)

export function FormsContextProvider({ children }: { children: ReactNode }) {
  const [formMode, setFormMode] = useState<TFormMode>('add')
  const [formType, setFormType] = useState<TFormsRegisterType>('dialog')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const { currentScreen } = useContext(generalContext)

  function getFormType() {
    const formType = menuItems.filter(
      (item) => item.path === `/${currentScreen.toLowerCase()}`,
    )[0]?.formType

    return formType
  }

  useEffect(() => {
    const formType = getFormType()
    if (formType !== undefined) setFormType(formType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScreen])

  return (
    <formsContext.Provider
      value={{
        formMode,
        formType,
        setFormMode,
        setFormType,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </formsContext.Provider>
  )
}
