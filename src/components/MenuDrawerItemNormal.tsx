'use client'
import { getRouteData } from '@/utils/getRouteData'
import Link from 'next/link'

export function MenuItemNormal(id: string) {
  const { menuLabel, icon } = getRouteData(id)
  return (
    <Link
      href={`/${id}`}
      key={id}
      className="p-5 border-b-2 border-b-white flex gap-2 items-center"
    >
      {icon}
      {menuLabel}
    </Link>
  )
}
