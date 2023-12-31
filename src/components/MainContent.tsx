'use client'
import { ReactNode, useContext } from 'react'
import TopBar from './TopBar'
import { generalContext } from '@/contexts/generalContext'

export function MainContent({ children }: { children: ReactNode }) {
  const { isMenuOpen } = useContext(generalContext)

  return (
    <div
      className={`flex-1  h-full w-full transition-[margin-left] md:mr-[20px] ${
        isMenuOpen ? 'md:ml-[277px]' : 'md:ml-[20px]'
      }`}
    >
      <TopBar />
      <div className={`mt-2 ${isMenuOpen ? '' : 'mt-20'}`}>{children}</div>
    </div>
  )
}
