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
    <div className="z-50 flex w-64 flex-1 flex-col bg-primary text-primary-foreground shadow-lg shadow-black ">
      <div className="flex-1">
        <MenuDrawerProfile />
        <MenuDrawerItems />
      </div>
      <Link href="/login">
        <div
          className="mb-5 flex cursor-pointer items-center gap-2 border-t border-gray-200 px-5 py-2"
          onClick={logOut}
        >
          <SignOut size={32} />
          Sair
        </div>
      </Link>
    </div>
  )
}
