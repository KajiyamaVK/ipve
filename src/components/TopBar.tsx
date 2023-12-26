'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { menuItems } from '@/data/menuItems'
import { usePathname } from 'next/navigation'

export default function TopBar() {
  const pathname = usePathname()
  function getDisplayName() {
    let displayName

    const currentScreen = pathname.replace('/', '')
    menuItems.forEach((item) => {
      if (item.id === pathname.replace('/', '')) {
        displayName = item.displayName
      } else if (item.type === 'parent') {
        if (item.children !== undefined) {
          item.children.forEach((child) => {
            if (child.id === `${currentScreen}`) {
              displayName = child.displayName
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
    <div className="bg-white text-black flex border-b-2 border-gray-200 w-full p-2 text-center justify-center items-center gap-2">
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
