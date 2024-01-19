'use client'

import { MenuDrawerProfile } from './MenuDrawerProfile'
import { MenuDrawerItems } from './MenuDrawerItems'
import Link from 'next/link'
import { SignOut } from '@phosphor-icons/react'
import Cookie from 'js-cookie'
export function MenuDrawer() {
  function logOut() {
    Cookie.remove('ipve_auth_token')
  }

  return (
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
  )
}
