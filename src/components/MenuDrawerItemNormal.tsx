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

        if (path === currentPath || (path === '/' && currentPath === '/dashboard')) {
          return
        }
        setIsScreenLoading(true)
      }}
    >
      <Link href={`${path}`} key={id} className="flex cursor-pointer items-center gap-2 px-5 py-2 hover:underline">
        {icon}
        {menuLabel}
      </Link>
    </div>
  )
}
