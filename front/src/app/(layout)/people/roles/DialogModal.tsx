'use client'

import { z } from 'zod'
import { TRoles } from '@/types/TRoles'
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
import { Dispatch, useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogColorSelection, availableColors } from './DialogColorSelection'
import { formsContext } from '@/contexts/formsContext'
import { useToast } from '@/components/ui/use-toast'
import { usePathname } from 'next/navigation'

const DialogFormSchema = z.object({
  roleName: z.string().min(1, 'Campo obrigatório'),
  description: z.string(),
})

function obterElementoAleatorio(array: string[]) {
  const indiceAleatorio = Math.floor(Math.random() * array.length)
  return array[indiceAleatorio]
}

interface IDialogModal {
  setData: Dispatch<React.SetStateAction<TRoles[]>>
  getData: () => void
  data: TRoles[]
}

export function DialogModal({ getData, data }: IDialogModal) {
  const { handleSubmit, register, formState, setValue, watch } = useForm({
    resolver: zodResolver(DialogFormSchema),
  })

  const elementoAleatorio = obterElementoAleatorio(availableColors)

  const [colorSelected, setColorSelected] = useState<string>(elementoAleatorio)
  const { toast } = useToast()
  const {
    isDialogOpen,
    setIsDialogOpen,
    formMode,
    setFormMode,
    currentSelectedItem,
  } = useContext(formsContext)
  const path = usePathname()

  useEffect(() => {
    if (isDialogOpen) {
      if (formMode === 'view') {
        const selectedItem = data.find(
          (item) => item.id === currentSelectedItem,
        )
        setValue('roleName', selectedItem?.name)
        setValue('description', selectedItem?.description)
        if (selectedItem?.tailwindColor)
          setColorSelected(selectedItem?.tailwindColor)
      }

      if (formMode === 'add') {
        setValue('roleName', '')
        setValue('description', '')
        setColorSelected(elementoAleatorio)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedItem, formMode, isDialogOpen])

  async function saveData() {
    const data: TRoles = {
      name: watch('roleName'),
      description: watch('description'),
      tailwindColor: colorSelected,
    }

    const endPoint = `${process.env.NEXT_PUBLIC_API_URL}${path}${
      currentSelectedItem === '' && formMode === 'edit'
        ? ''
        : `/${currentSelectedItem}`
    }`

    fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast({
          title: 'Função registrada com sucesso!',
          description:
            'A função foi registrada com sucesso e já pode ser utilizada no cadastro de pessoas.',
          type: 'background',
        })
      })
      .then(() => {
        getData()
        setIsDialogOpen(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        throw new Error(error)
      })
  }

  function enableForm(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    setFormMode('edit')
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                disabled={formMode === 'view'}
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
                  isDisabled={formMode === 'view'}
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
              disabled={formMode === 'view'}
              {...register('description')}
            />
          </div>
          {formMode === 'view' ? (
            <Button
              type="button"
              className="mt-5 float-right mr-5"
              onClick={(e) => enableForm(e)}
            >
              Editar
            </Button>
          ) : (
            <Button type="submit" className="mt-5 float-right mr-5">
              Salvar
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
