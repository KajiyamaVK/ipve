'use client'

import { z } from 'zod'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { formsContext } from '@/contexts/formsContext'
import { useToast } from '@/components/ui/use-toast'
import { TPeopleTitles } from '@/types/TPeopleTitles'
import { savePeopleTitle, updatePeopleTitle } from './functions'

const DialogFormSchema = z.object({
  name: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(1, 'Campo obrigatório'),
})

export function DialogModal({ data }: { data: TPeopleTitles[] }) {
  const { register, formState, setValue, watch, handleSubmit } = useForm({
    resolver: zodResolver(DialogFormSchema),
  })

  const { toast } = useToast()
  const {
    isDialogOpen,
    setIsDialogOpen,
    formMode,
    currentSelectedItem,
    setFormMode,
    isSkeletonOpen,
    setIsSkeletonOpen,
  } = useContext(formsContext)
  const [buttonIsLoading, setButtonIsLoading] = useState(false)

  useEffect(() => {
    if (isDialogOpen && formMode === 'add') {
      setValue('name', '')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen, formMode])

  useEffect(() => {
    if (isSkeletonOpen && formMode === 'edit') {
      setValue('name', data.find((item) => item.id === currentSelectedItem)?.name)
      setIsSkeletonOpen(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSkeletonOpen, formMode, currentSelectedItem])

  function enableForm() {
    setFormMode('edit')
  }

  async function saveForm() {
    setButtonIsLoading(true)

    formMode === 'add' &&
      (await savePeopleTitle(watch('name'))
        //eslint-disable-next-line
      .then((data: any) => {
          if (data) {
            toast({
              type: 'background',
              description: 'Título cadastrado com sucesso!',
              variant: 'default',
            })
          }
        })
        .then(() => {
          setFormMode('add')
          setIsDialogOpen(false)
        })
        .catch((error) => {
          toast({
            type: 'background',
            description: error.toString(),
            variant: 'destructive',
          })
        })
        .finally(() => {
          setButtonIsLoading(false)
        }))

    if (formMode === 'edit')
      if (currentSelectedItem)
        try {
          await updatePeopleTitle(currentSelectedItem, watch('name'))
        } catch (error) {
          console.error(error)
          toast({
            type: 'background',
            description: 'Erro interno ao atualizar título. Entre em contato com o suporte: ' + error,
            variant: 'destructive',
          })
        } finally {
          setButtonIsLoading(false)
          setFormMode('add')
          setIsDialogOpen(false)
        }
      else {
        toast({
          type: 'background',
          description: 'Erro interno. Por favor, avise o suporte.',
          variant: 'destructive',
        })
        setButtonIsLoading(false)
      }
  }

  function submitForm() {
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
          <DialogTitle className="border-b-2 border-gray-500">Cadastro de Cargos</DialogTitle>
          <DialogDescription>
            <i className="text-sm">Cadastro dos cargos que são atribuidos no cadastro de pessoas.</i>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitForm)} className="mt-3 flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex grow flex-col pr-5">
              <label htmlFor="name" className="font-bold">
                Nome do cargo
              </label>
              <Input type="text" placeholder="Ex: Pastor, presbítero, membro, etc." {...register('name')} />
              <p className="text-destructive">{formState.errors.name?.message?.toString()}</p>
            </div>
          </div>
          <Button type="submit" className="float-right mr-5 mt-5" isLoading={buttonIsLoading}>
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
