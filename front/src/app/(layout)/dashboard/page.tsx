'use client'

import { generalContext } from '@/contexts/generalContext'
import { useContext, useEffect } from 'react'

export default function Dashboard() {
  const { setIsScreenLoading } = useContext(generalContext)
  useEffect(() => {
    setIsScreenLoading(false)
  }, [setIsScreenLoading])

  return <div className="block w-full mt-11 bg-purple-400 "></div>
}
