'use client'
import { getRouteData } from '@/utils/getRouteData'
import Link from 'next/link'

export function MenuItemNormal(id: string) {
  const { menuLabel, icon } = getRouteData(id)
  return (
    <Link
      href={`/${id}`}
      key={id}
      className="px-5 py-2 flex gap-2 items-center hover:underline cursor-pointer"
    >
      {icon}
      {menuLabel}
    </Link>
  )
}
