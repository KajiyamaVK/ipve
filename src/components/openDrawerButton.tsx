'use client'

import { useContext } from 'react'
import { Button } from './ui/button'
import { VscThreeBars } from 'react-icons/vsc'
import { generalContext } from '@/contexts/generalContext'
export function OpenDrawerButton() {
  const { isMenuOpen, setIsMenuOpen } = useContext(generalContext)
  return (
    <Button
      className="bg-primary text-primary-foreground shadow-lg hover:bg-primary-light absolute rounded-full top-4 left-4 z-50 h-12 shadow-md shadow-black"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <VscThreeBars />
    </Button>
  )
}
