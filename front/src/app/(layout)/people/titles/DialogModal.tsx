'use client'

import { set, z } from 'zod'

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
import { TMembersTitles, ZMembersTitles } from '@/types/TMembersTitles'
import { generalContext } from '@/contexts/generalContext'

const DialogFormSchema = z.object({
  roleName: z.string().min(1, 'Campo obrigatório'),
})

interface IDialogModal {
  setData: Dispatch<React.SetStateAction<TMembersTitles[]>>
  getData: () => void
  data: TMembersTitles[]
}

export function DialogModal({ setData, getData, data }: IDialogModal) {
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
    console.log('formMode', formMode)

    const endpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/people/titles/${
      formMode === 'edit' ? '/' + currentSelectedItem : ''
    }`

    console.log('endpointUrl', endpointUrl)
    await fetch(endpointUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          toast({
            variant: 'default',
            content: 'Cargo gravado com sucesso',
          })
          getData()
          setIsDialogOpen(false)
        }
      })
      .catch((err) => {
        toast({
          variant: 'destructive',
          content: `Erro ao atualizar o cargo: ${err.message}}`,
        })
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
                placeholder="Ex: Louvor, Pregação, Tesouraria, etc."
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