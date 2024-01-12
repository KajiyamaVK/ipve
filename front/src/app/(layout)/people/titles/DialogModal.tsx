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
import { Dispatch, useContext, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { formsContext } from '@/contexts/formsContext'
import { useToast } from '@/components/ui/use-toast'
import { TMembersTitles } from '@/types/TMembersTitles'

const DialogFormSchema = z.object({
  roleName: z.string().min(1, 'Campo obrigatório'),
})

interface IDialogModal {
  setData: Dispatch<React.SetStateAction<TMembersTitles[]>>
  getData: () => void
  data: TMembersTitles[]
}

export function DialogModal({ getData }: IDialogModal) {
  const { handleSubmit, register, formState, setValue, watch } = useForm({
    resolver: zodResolver(DialogFormSchema),
  })

  const { toast } = useToast()
  const {
    isDialogOpen,
    setIsDialogOpen,
    formMode,
    currentSelectedItem,
    setFormMode,
  } = useContext(formsContext)
  const [buttonIsLoading, setButtonIsLoading] = useState(false)

  useEffect(() => {
    if (
      formMode === 'view' &&
      currentSelectedItem &&
      typeof currentSelectedItem === 'number'
    ) {
      getTitle(currentSelectedItem)
      if (register) {
        setValue('titleName', register.name)
      }
    } else {
      setValue('titleName', '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen, currentSelectedItem, formMode, setValue])

  async function getTitle(id: number) {
    const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/people/titles/${id}`
    const response = await fetch(endpointUrl)
    const data = await response.json()

    setValue('roleName', data.name)
  }

  async function saveData() {
    setButtonIsLoading(true)
    const data = {
      name: watch('roleName'),
    }

    const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/people/titles/${
      formMode === 'edit' ? '/' + currentSelectedItem : ''
    }`

    await fetch(endpointUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast({
          title: 'Cargo registrado com sucesso!',
          description:
            'O cargo foi registrado com sucesso e já pode ser utilizada no cadastro de pessoas.',
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

    setButtonIsLoading(false)
  }

  function enableInput(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    setFormMode('edit')
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b-2 border-gray-500">
            Cadastro de Cargos
          </DialogTitle>
          <DialogDescription>
            <i className="text-sm">
              Cadastro dos cargos que são atribuidos no cadastro de pessoas.
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
                Nome do cargo
              </label>
              <Input
                type="text"
                placeholder="Ex: Pastor, presbítero, membro, visitante, etc."
                disabled={formMode === 'view'}
                {...register('roleName')}
              />
              <p className="text-destructive">
                {formState.errors.roleName?.message?.toString()}
              </p>
            </div>
          </div>
          {formMode !== 'view' ? (
            <Button
              type="submit"
              className="mt-5 float-right mr-5"
              isLoading={buttonIsLoading}
            >
              Salvar
            </Button>
          ) : (
            <Button
              onClick={enableInput}
              className="mt-5 float-right mr-5"
              isLoading={buttonIsLoading}
            >
              Editar
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
