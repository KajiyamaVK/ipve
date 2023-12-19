'use client'
import { generalContext } from '@/contexts/generalContext'
import Link from 'next/link'
import { ReactNode, useContext } from 'react'

export function MenuItemNormal(
  menuLabel: string,
  name: string,
  icon: ReactNode,
) {
  const { changeScreen } = useContext(generalContext)
  return (
    <Link
      href={`/${menuLabel.toLowerCase()}`}
      key={menuLabel}
      onClick={() => changeScreen(name)}
    >
      <div className="p-5 border-b-2 border-b-white flex gap-2 items-center">
        {icon}
        {menuLabel}
      </div>
    </Link>
  )
}
