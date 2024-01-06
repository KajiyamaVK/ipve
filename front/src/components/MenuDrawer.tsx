'use client'

import { MenuDrawerProfile } from './MenuDrawerProfile'
import { MenuDrawerItems } from './MenuDrawerItems'
import Link from 'next/link'
import { SignOut } from '@phosphor-icons/react'
import Cookie from 'js-cookie'
import { useContext } from 'react'
import { generalContext } from '@/contexts/generalContext'
import { FiMenu } from 'react-icons/fi'
import { HiChevronDoubleLeft } from 'react-icons/hi2'
export function MenuDrawer() {
  const { isMenuOpen, setIsMenuOpen } = useContext(generalContext)
  function logOut() {
    Cookie.remove('ipve_auth_token')
  }

  function toggleMenu() {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
  }

  return (
    <div
      className={` fixed top-0   z-50 h-screen transition-transform flex ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-[-85%]'
      }`}
    >
      <div>
        <div className="w-64 bg-primary h-full shadow-lg shadow-black text-primary-foreground z-50 flex flex-col">
          <div className="flex-1">
            <MenuDrawerProfile />
            <MenuDrawerItems />
          </div>
          <Link href="/login">
            <div
              className="px-5 py-2 border-t border-gray-200 cursor-pointer flex items-center gap-2 mb-5"
              onClick={logOut}
            >
              <SignOut size={32} />
              Sair
            </div>
          </Link>
        </div>
      </div>

      <div
        className="cursor-pointer bg-primary-dark h-12 w-12  mt-20 flex justify-center items-center rounded-r-lg text-white shadow-black drop-shadow-lg z-40"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <HiChevronDoubleLeft size={30} /> : <FiMenu size={30} />}
      </div>
    </div>
  )
}
