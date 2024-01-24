import { menuItems } from '@/data/menuItems'

export function getDisplayName(pathname: string) {
  const pathParts = pathname.split('/')
  let displayName

  const isForm = pathParts[pathParts.length - 2] === 'form'
  const currentScreen = isForm ? pathParts[pathParts.length - 3] : pathParts[pathParts.length - 1]

  menuItems.forEach((item) => {
    if (item.id === currentScreen) {
      displayName = item.displayName
      // Check if the path ends with '/form' for parent
      if (isForm) {
        displayName = `Cadastro de ${item.id}`
      }
    } else if (item.type === 'parent') {
      if (item.children !== undefined) {
        item.children.forEach((child) => {
          if (child.id === currentScreen) {
            displayName = child.displayName
            // Check if the path ends with '/form' for child
            if (isForm) {
              displayName = child.displayName
            }
          }
        })
      } else {
        throw new Error('children is undefined')
      }
    }
  })

  return displayName
}
