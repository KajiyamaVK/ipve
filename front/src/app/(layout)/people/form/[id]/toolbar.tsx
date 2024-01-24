'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Toolbar() {
  const router = useRouter()
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  function handleBack() {
    setIsButtonLoading(true)
    router.push('/people')
  }
  return (
    <div className="flex gap-5 justify-end">
      <Button isLoading={isButtonLoading} onClick={handleBack}>
        Voltar
      </Button>

      <Button type="submit">Salvar</Button>
    </div>
  )
}
