'use client'
import { generalContext } from '@/contexts/generalContext'
import Link from 'next/link'
import { ReactNode, useContext } from 'react'

export function MenuItemNormal(
  menuLabel: string,
  screenId: string,
  icon: ReactNode,
) {
  const { changeScreen } = useContext(generalContext)
  console.log(screenId)
  return (
    <Link
      href={`/${screenId}`}
      key={menuLabel}
      onClick={() => changeScreen(screenId)}
    >
      <div className="p-5 border-b-2 border-b-white flex gap-2 items-center">
        {icon}
        {menuLabel}
      </div>
    </Link>
  )
}
