import { TMenuDrawerItem } from '@/types/TMenuDrawerItem'
import { ReactNode } from 'react'
import { MenuItemParent } from './MenuDrawerItemParent'
import { MenuItemNormal } from './MenuDrawerItemNormal'
import { menuItems } from '@/data/menuItems'

function renderMenuItem({
  menuLabel,
  type,
  children,
  displayName,
  icon,
  order,
  id,
}: TMenuDrawerItem) {
  if (type === 'parent') {
    if (children !== undefined)
      return MenuItemParent({
        menuLabel,
        children,
        icon,
        displayName,
        type,
        order,
        id,
      })
  } else if (type === 'normal') {
    return MenuItemNormal(menuLabel, displayName, icon, id)
  }
}

export function MenuDrawerItems() {
  const elements: ReactNode[] = []

  for (const item of menuItems) {
    elements.push(renderMenuItem(item))
  }

  return <>{elements}</>
}
