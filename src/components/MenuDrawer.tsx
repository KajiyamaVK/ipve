'use client'

import { MenuDrawerProfile } from './MenuDrawerProfile'
import { MenuDrawerItems } from './MenuDrawerItem'
import Link from 'next/link'
import { SignOut } from '@phosphor-icons/react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export function MenuDrawer() {
  const router = useRouter()
  function logOut() {
    Cookie.remove('ipve_auth_token')
    router.push('/login')
  }
  return (
    <>
      <div className="w-80 bg-primary h-full shadow-lg shadow-black text-primary-foreground z-50 flex justify-between flex-col">
        <div>
          <MenuDrawerProfile />
          <MenuDrawerItems />
        </div>
        <Link href={'/login'}>
          <div
            className="p-5 border-t-2 cursor-pointer flex items-center gap-2"
            onClick={logOut}
          >
            <SignOut size={32} />
            Sair
          </div>
        </Link>
      </div>
    </>
  )
}
