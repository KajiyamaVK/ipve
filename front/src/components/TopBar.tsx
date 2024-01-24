'use client'

import Image from 'next/image'
import { menuItems } from '@/data/menuItems'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function TopBar() {
  const pathname = usePathname()
  function getDisplayName() {
    let displayName

    const pathParts = pathname.split('/')
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

  useEffect(() => {
    getDisplayName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div
      className={`text-black flex border-b-2 border-gray-200 w-full p-2 z-10 text-center justify-center items-center gap-2 transition-all `}
    >
      <Image src="/logo.png" width={30} height={30} alt="Logo da igreja presbiteriana da Vila Eutália" />
      <span>{getDisplayName()} </span>
    </div>
  )
}
