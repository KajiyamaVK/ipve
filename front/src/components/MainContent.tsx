import { ReactNode } from 'react'
import TopBar from './TopBar'

export function MainContent({ children }: { children: ReactNode }) {
  return (
    <div className={`flex flex-col h-full w-full`}>
      <TopBar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
