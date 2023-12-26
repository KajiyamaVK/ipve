'use client'
import { generalContext } from '@/contexts/generalContext'
import Link from 'next/link'
import { ReactNode, useContext } from 'react'

export function MenuItemNormal(
  menuLabel: string,
  displayName: string,
  icon: ReactNode,
  id: string,
) {
  const { changeScreen } = useContext(generalContext)

  return (
    <Link href={`/${id}`} key={menuLabel}>
      <div className="p-5 border-b-2 border-b-white flex gap-2 items-center">
        {icon}
        {menuLabel}
      </div>
    </Link>
  )
}
