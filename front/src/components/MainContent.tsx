'use client'
import { ReactNode, useContext } from 'react'
import TopBar from './TopBar'
import { generalContext } from '@/contexts/generalContext'
import Image from 'next/image'

export function MainContent({ children }: { children: ReactNode }) {
  const { isMenuOpen, isScreenLoading } = useContext(generalContext)

  return (
    <div
      className={`flex-1  h-full w-full transition-[margin-left] md:mr-[20px] ${
        isMenuOpen ? 'md:ml-[277px]' : 'md:ml-[20px]'
      }`}
    >
      <TopBar />
      <div
        className={`absolute inset-0 flex justify-center items-center z-40
        bg-black bg-opacity-50 transition-opacity h-full ${
          isScreenLoading ? 'block' : 'hidden'
        }
        `}
      >
        <div
          className={`screenLoader z-10
          ${isMenuOpen ? 'md:ml-[277px]' : 'md:ml-[20px]'}
          
          `}
        >
          <Image
            alt="Tela está carregando com o logo da IPVE pulsando"
            src={'/logo.png'}
            width={200}
            height={200}
            className="z-20"
          ></Image>
        </div>
      </div>

      <div className={`mt-2 ${isMenuOpen ? '' : 'mt-20'}`}>{children}</div>
    </div>
  )
}
