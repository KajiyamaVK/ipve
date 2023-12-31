'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { set } from 'zod'

export function Toolbar() {
  const router = useRouter()
  const [isLoding, setIsLoading] = useState(false)

  function handleBack() {
    setIsLoading(true)
    router.push('/people')
  }
  return (
    <div className="flex gap-5 justify-end">
      <Button isLoading={isLoding} onClick={handleBack}>
        Voltar
      </Button>

      <Button type="submit">Salvar</Button>
    </div>
  )
}
