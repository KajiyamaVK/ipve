import { ReactNode } from 'react'
import { MenuItemParent } from './MenuDrawerItemParent'
import { MenuItemNormal } from './MenuDrawerItemNormal'
import { menuItems } from '@/data/menuItems'

function renderMenuItem(id: string, type: string) {
  if (type === 'parent') {
    return MenuItemParent(id)
  } else if (type === 'normal') {
    return MenuItemNormal(id)
  }
}

export function MenuDrawerItems() {
  const elements: ReactNode[] = []

  for (const item of menuItems) {
    elements.push(<div key={item.id}>{renderMenuItem(item.id, item.type)}</div>)
  }

  return <>{elements}</>
}
