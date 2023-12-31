'use client'

import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogColorSelection, availableColors } from './DialogColorSelection'
import { formsContext } from '@/contexts/formsContext'
import { useToast } from '@/components/ui/use-toast'
import { rolesData } from '@/data/rolesData'

const DialogFormSchema = z.object({
  roleName: z.string().min(1, 'Campo obrigatório'),
  description: z.string(),
})

function obterElementoAleatorio(array: string[]) {
  const indiceAleatorio = Math.floor(Math.random() * array.length)
  return array[indiceAleatorio]
}

export function DialogModal() {
  const { handleSubmit, register, formState, setValue } = useForm({
    resolver: zodResolver(DialogFormSchema),
  })

  const elementoAleatorio = obterElementoAleatorio(availableColors)

  const [colorSelected, setColorSelected] = useState<string>(elementoAleatorio)
  const { toast } = useToast()
  const { isDialogOpen, setIsDialogOpen, formMode, currentSelectedItem } =
    useContext(formsContext)

  function saveData() {
    toast({
      title: 'Função cadastrada com sucesso!',
      description:
        'A função foi cadastrada com sucesso e já pode ser utilizada no cadastro de pessoas.',
      type: 'background',
    })
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (formMode === 'edit') {
      const role = rolesData.filter(
        (role) => role.id === currentSelectedItem,
      )[0]
      if (role) {
        setValue('roleName', role.name)
        setValue('description', role.description)
        setColorSelected(role.tailwindThemeColor)
      }
    } else {
      setValue('roleName', '')
      setValue('description', '')
      setColorSelected(elementoAleatorio)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* <DialogTrigger className="bg-primary text-primary-foreground px-5 py-2 rounded-lg">
        Novo
      </DialogTrigger> */}
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
        <form
          onSubmit={handleSubmit(saveData)}
          className="mt-3 flex flex-col gap-6"
        >
          <div className="flex justify-between">
            <div className="flex flex-col flex-grow pr-5">
              <label htmlFor="roleName" className="font-bold">
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

          <div>
            <label htmlFor="description" className="font-bold">
              Descrição
            </label>
            <Input
              placeholder="Ex.: Função administrativa de controle financeiro da igreja"
              {...register('description')}
            />
          </div>

          <Button type="submit" className="mt-5 float-right mr-5">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
