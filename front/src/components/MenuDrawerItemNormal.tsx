'use client'
import { generalContext } from '@/contexts/generalContext'
import { getRouteData } from '@/utils/getRouteData'
import Link from 'next/link'
import { useContext } from 'react'

export function MenuItemNormal(id: string) {
  const { menuLabel, icon, path } = getRouteData(id)
  const { setIsScreenLoading } = useContext(generalContext)
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
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
