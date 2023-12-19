import { ReactNode } from 'react'

type menuItemType = 'normal' | 'parent' | 'children'
export type TMenuDrawerItem = {
  displayName: string
  menuLabel: string
  type: menuItemType
  order: number
  children?: TMenuDrawerItem[]
  icon?: ReactNode
  path?: string
}
