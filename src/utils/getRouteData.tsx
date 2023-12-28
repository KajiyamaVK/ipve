import { menuItems } from '@/data/menuItems'
import { TMenuDrawerItem } from '@/types/TMenuDrawerItem'

export function getRouteData(id: string): TMenuDrawerItem {
  let menuData = {} as TMenuDrawerItem
  for (const item of menuItems) {
    if (item.id === id) {
      menuData = item
    } else if (item.children) {
      for (const child of item.children) {
        if (child.id === id) {
          menuData = child
        }
      }
    }
  }
  return menuData
}
