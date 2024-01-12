'use client'
import { generalContext } from '@/contexts/generalContext'
import { getRouteData } from '@/utils/getRouteData'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

export function MenuItemNormal(id: string) {
  const { menuLabel, icon, path } = getRouteData(id)
  const currentPath = usePathname()
  const { setIsScreenLoading } = useContext(generalContext)
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        console.log('path', path)
        console.log('currentPath', currentPath)
        if (
          path === currentPath ||
          (path === '/' && currentPath === '/dashboard')
        ) {
          return
        }
        setIsScreenLoading(true)
      }}
    >
      <Link
        href={`${path}`}
        key={id}
        className="px-5 py-2 flex gap-2 items-center hover:underline cursor-pointer"
      >
        {icon}
        {menuLabel}
      </Link>
    </div>
  )
}
