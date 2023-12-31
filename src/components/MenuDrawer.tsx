'use client'

import { MenuDrawerProfile } from './MenuDrawerProfile'
import { MenuDrawerItems } from './MenuDrawerItem'
import Link from 'next/link'
import { SignOut } from '@phosphor-icons/react'
import Cookie from 'js-cookie'
import { useContext } from 'react'
import { generalContext } from '@/contexts/generalContext'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2'
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
      className={` fixed top-0   z-30 h-screen transition-transform flex ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-[-90%]'
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
              className="p-5 border-t-2 cursor-pointer flex items-center gap-2"
              onClick={logOut}
            >
              <SignOut size={32} />
              Sair
            </div>
          </Link>
        </div>
      </div>

      <div
        className="cursor-pointer bg-primary-dark h-20 w-10 mt-20 flex justify-center items-center rounded-r-lg text-white shadow-black drop-shadow-lg z-40"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <HiChevronDoubleLeft size={40} />
        ) : (
          <HiChevronDoubleRight size={40} />
        )}
      </div>
    </div>
  )
}
