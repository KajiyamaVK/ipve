'use client'

import { generalContext } from '@/contexts/generalContext'
import Image from 'next/image'
import { useContext } from 'react'

export default function TopBar() {
  const { currentScreen } = useContext(generalContext)

  return (
    <div className="bg-white text-black flex border-b-2 border-gray-200 w-full p-2 text-center justify-center items-center gap-2">
      <Image
        src="/logo.png"
        width={30}
        height={30}
        alt="Logo da igreja presbiteriana da Vila Eutália"
      />
      <span>{currentScreen} </span>
    </div>
  )
}
