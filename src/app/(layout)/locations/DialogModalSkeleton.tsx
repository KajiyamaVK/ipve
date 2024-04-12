'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useContext } from 'react'
import { formsContext } from '@/contexts/formsContext'

export function DialogModalSkeleton() {
  const { isSkeletonOpen, setIsSkeletonOpen } = useContext(formsContext)
  return (
    <Dialog open={isSkeletonOpen} onOpenChange={setIsSkeletonOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b-2 border-gray-500">Cadastro de Locais</DialogTitle>
          <DialogDescription>
            <i className="text-sm">Cadastro das locais que são usados para o cadastro de eventos</i>
          </DialogDescription>
        </DialogHeader>

        <div>
          <label htmlFor="locationName" className="font-bold">
            Nome do local
          </label>
          <Skeleton className="h-10 w-full bg-gray-300" />
        </div>

        <div>
          <label htmlFor="locationDesc" className="font-bold">
            Descrição
          </label>
          <Skeleton className="h-10 w-full bg-gray-300" />
        </div>
        <Button className="float-right  mt-5" disabled>
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
