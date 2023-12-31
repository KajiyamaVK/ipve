'use client'

import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { menuItems } from '@/data/menuItems'
import { usePathname } from 'next/navigation'
import { generalContext } from '@/contexts/generalContext'

export default function TopBar() {
  const pathname = usePathname()
  const { isMenuOpen } = useContext(generalContext)
  function getDisplayName() {
    let displayName

    const pathParts = pathname.split('/')
    console.log('🚀 ~ getDisplayName ~ pathParts:', pathParts)
    const currentScreen = pathParts[pathParts.length - 1] || ''
    console.log('🚀 ~ getDisplayName ~ currentScreen:', currentScreen)
    const isForm = pathParts[pathParts.length - 2] === 'form'

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

  useEffect(() => {
    getDisplayName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div
      className={`text-black flex border-b-2 border-gray-200 w-full p-2 z-10 text-center justify-center items-center gap-2 transition-all ${
        isMenuOpen
          ? 'bg-white'
          : 'bg-primary absolute right-2 text-primary-foreground'
      }`}
    >
      <Image
        src="/logo.png"
        width={30}
        height={30}
        alt="Logo da igreja presbiteriana da Vila Eutália"
      />
      <span>{getDisplayName()} </span>
    </div>
  )
}
