'use client'
import { generalContext } from '@/contexts/generalContext'
import { useContext } from 'react'

export default function Dashboard() {
  const { currentScreen } = useContext(generalContext)
  console.log('currentScreen', currentScreen)
  return <div className="block w-full mt-11 bg-purple-400 "></div>
}
