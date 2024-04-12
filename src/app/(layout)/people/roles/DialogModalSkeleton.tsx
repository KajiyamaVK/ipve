'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useContext } from 'react'
import { formsContext } from '@/contexts/formsContext'

export function DialogModalSkeleton() {
  const { isSkeletonOpen, setIsSkeletonOpen } = useContext(formsContext)
  return (
    <Dialog open={isSkeletonOpen} onOpenChange={setIsSkeletonOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b-2 border-gray-500">Cadastro de Funções</DialogTitle>
          <DialogDescription>
            <i className="text-sm">Cadastro das funções que são atribuidas no cadastro de pessoas.</i>
          </DialogDescription>
        </DialogHeader>
        <form className="mt-3 flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex flex-col flex-grow pr-5">
              <label htmlFor="roleName" className="font-bold">
                Nome da função
              </label>
              <Skeleton className="h-10 w-full bg-gray-300" />
            </div>
            <b>Cor:</b>
            <div className="mt-2 ml-2">
              <div className="flex items-center ">
                <Skeleton className="h-6 w-6 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="font-bold">
              Descrição
            </label>

            <Skeleton className="h-10 w-full bg-gray-300" />
          </div>
          <Button type="button" className="mt-5 float-right mr-5" disabled>
            Editar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
