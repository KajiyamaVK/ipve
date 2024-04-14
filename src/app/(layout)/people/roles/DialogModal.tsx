'use client'
import { z } from 'zod'
import { TRoles } from '@/types/TRoles'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogColorSelection, availableColors } from './DialogColorSelection'
import { formsContext } from '@/contexts/formsContext'
import { useToast } from '@/components/ui/use-toast'
import { getData, saveData } from '@/utils/fetchData'

const DialogFormSchema = z.object({
  roleName: z.string().min(1, 'Campo obrigatório'),
  description: z.string(),
})

function obterElementoAleatorio(array: string[]) {
  const indiceAleatorio = Math.floor(Math.random() * array.length)
  return array[indiceAleatorio]
}

export function DialogModal() {
  const { register, formState, setValue, watch } = useForm({
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
    isSkeletonOpen,
    setIsSkeletonOpen,
  } = useContext(formsContext)

  useEffect(() => {
    if (isDialogOpen && formMode === 'add') {
      setValue('roleName', '')
      setValue('description', '')
      setColorSelected(elementoAleatorio)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen, formMode])

  useEffect(() => {
    if (isSkeletonOpen && formMode === 'edit') {
      ;(async () => {
        await getData<TRoles>({
          endpoint: 'roles',
          id: currentSelectedItem,
        })
          .then((data) => {
            setValue('roleName', data?.name)
            setValue('description', data?.description)
            if (data?.tailwindColor) setColorSelected(data?.tailwindColor)
          })
          .then(() => {
            setIsDialogOpen(true)
            setIsSkeletonOpen(false)
          })
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSkeletonOpen, formMode, currentSelectedItem])

  function enableForm() {
    setFormMode('edit')
  }

  async function saveForm() {
    const body: TRoles = {
      name: watch('roleName'),
      description: watch('description'),
      tailwindColor: colorSelected,
    }
    const id = formMode === 'edit' ? { id: currentSelectedItem } : {}

    await saveData({ body, endpoint: 'roles', ...id })
      .then((data) => {
        if (data) {
          toast({
            type: 'background',
            description: 'Função cadastrada com sucesso!',
            variant: 'default',
          })
        }
      })
      .then(() => {
        setFormMode('add')
        setIsDialogOpen(false)
      })
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (formMode === 'add' || formMode === 'edit') {
      saveForm()
    } else if (formMode === 'view') {
      enableForm()
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b-2 border-gray-500">Cadastro de Funções</DialogTitle>
          <DialogDescription>
            <i className="text-sm">Cadastro das funções que são atribuidas no cadastro de pessoas.</i>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitForm} className="mt-3 flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex grow flex-col pr-5">
              <label htmlFor="roleName" className="font-bold">
                Nome da função
              </label>
              <Input type="text" placeholder="Ex: Louvor, Pregação, Tesouraria, etc." {...register('roleName')} />
              <p className="text-destructive">{formState.errors.roleName?.message?.toString()}</p>
            </div>
            <b>Cor:</b>
            <div className="ml-2 mt-2">
              <div className="flex items-center">
                <DialogColorSelection colorSelected={colorSelected} setColorSelected={setColorSelected} />
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
          <Button type="submit" className="float-right mr-5 mt-5">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
