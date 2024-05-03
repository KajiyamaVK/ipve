import { ReactNode } from 'react'
import TopBar from './TopBar'
import slogan from '/public/images/system/Lembra-te.png'
import Image from 'next/image'

export function MainContent({ children }: { children: ReactNode }) {
  return (
    <div className={`flex size-full flex-col overflow-y-scroll`}>
      <TopBar />
      <Image src={slogan} alt="Lembre-te" width={500} className="absolute bottom-0 right-0" priority />
      <div className="flex-1">{children}</div>
    </div>
  )
}
