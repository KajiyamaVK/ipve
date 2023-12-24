'use client'

import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogColorSelection, availableColors } from './DialogColorSelection'

const DialogFormSchema = z.object({
  roleName: z.string().min(1, 'Campo obrigatório'),
})

function obterElementoAleatorio(array: string[]) {
  const indiceAleatorio = Math.floor(Math.random() * array.length)
  return array[indiceAleatorio]
}

type TFormMode = 'add' | 'edit'

type TDialogForm = {
  isDialogOpen?: boolean
  setisDialogOpen?: (value: boolean) => void
  dialogMode?: TFormMode
}

export function DialogModal({
  isDialogOpen = false,
  setisDialogOpen = () => { },
  dialogMode = 'add',
}: TDialogForm) {
  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(DialogFormSchema),
  })

  const elementoAleatorio = obterElementoAleatorio(availableColors)

  const [colorSelected, setColorSelected] = useState<string>(elementoAleatorio)

  function saveData() {
    console.log('submit')
    setisDialogOpen(false)
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
      <DialogTrigger className="bg-primary text-primary-foreground px-5 py-2 rounded-lg">
        Novo
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b-2 border-gray-500">
            Cadastro de Funções
          </DialogTitle>
          <DialogDescription>
            <i className="text-sm">
              Cadastro das funções que são atribuidas no cadastro de pessoas.
            </i>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(saveData)} className="mt-3">
          <div className="flex justify-between">
            <div className="flex flex-col flex-grow pr-5">
              <label htmlFor="roleName" className="font-bold -mb-3">
                Nome da função
              </label>
              <Input
                type="text"
                placeholder="Ex: Louvor, Pregação, Tesouraria, etc."
                {...register('roleName')}
              />
              <p className="text-destructive">
                {formState.errors.roleName?.message?.toString()}
              </p>
            </div>
            <div className="flex items-center">
              <b>Cor:</b>
              <div className="mt-2 ml-2">
                <DialogColorSelection
                  colorSelected={colorSelected}
                  setColorSelected={setColorSelected}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-5 float-right mr-5">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
