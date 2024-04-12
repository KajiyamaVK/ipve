'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useContext } from 'react'
import { formsContext } from '@/contexts/formsContext'
import { Skeleton } from '@/components/ui/skeleton'

export function DialogSkeleton() {
  const { isSkeletonOpen, setIsSkeletonOpen } = useContext(formsContext)

  return (
    <Dialog open={isSkeletonOpen} onOpenChange={setIsSkeletonOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b-2 border-gray-500">Cadastro de Cargos</DialogTitle>
          <DialogDescription>
            <i className="text-sm">Cadastro dos cargos que são atribuidos no cadastro de pessoas.</i>
          </DialogDescription>
        </DialogHeader>
        <form className="mt-3 flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex grow flex-col pr-5">
              <label htmlFor="roleName" className="font-bold">
                Nome do cargo
              </label>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <Button className="float-right mr-5 mt-5" disabled>
            Editar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
