import { ReactNode } from 'react'

type menuItemType = 'normal' | 'parent' | 'children'
export type TMenuDrawerItem = {
  displayName: string
  menuLabel: string
  path?: string
  type: menuItemType
  order: number
  children?: TMenuDrawerItem[]
  icon?: ReactNode
  id: string
  formType: 'dialog' | 'page' | null
}
