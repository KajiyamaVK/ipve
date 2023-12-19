'use client'
import { generalContext } from '@/contexts/generalContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { isLogged } = useContext(generalContext)
  const router = useRouter()

  useEffect(() => {
    if (isLogged) router.push('/dashboard')
    else router.push('/login')
  })
}
