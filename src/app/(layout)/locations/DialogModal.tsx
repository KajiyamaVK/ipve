'use client'
import { z } from 'zod'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useContext, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { formsContext } from '@/contexts/formsContext'
import { useToast } from '@/components/ui/use-toast'
import { TLocations } from '@/types/TLocations'
import { saveLocations, updateLocations } from './functions'

const DialogFormSchema = z.object({
  locationName: z.string().min(1, 'Campo obrigatório'),
  locationDesc: z.string(),
})

export function DialogModal({ data }: { data: TLocations[] }) {
  const { register, formState, setValue, watch } = useForm({
    resolver: zodResolver(DialogFormSchema),
  })

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
      setValue('locationName', '')
      setValue('locationDesc', '')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen, formMode])

  useEffect(() => {
    function getLocationData() {
      const locationData = data.filter((item) => item.id === currentSelectedItem)
      setValue('locationName', locationData[0].locationName)
      setValue('locationDesc', locationData[0].locationDesc)

      setIsDialogOpen(true)
      isSkeletonOpen && setIsSkeletonOpen(false)
    }

    if (isSkeletonOpen && formMode === 'edit') {
      getLocationData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSkeletonOpen, formMode, currentSelectedItem])

  async function saveForm() {
    if (formMode === 'edit') {
      if (!currentSelectedItem) {
        toast({
          type: 'background',
          description: 'Erro interno, por favor entre em contato com o suporte: ID não encontrado',
          variant: 'destructive',
        })
        return
      }
      await updateLocations(watch('locationName'), watch('locationDesc'), currentSelectedItem)
        .then(() => {
          setIsDialogOpen(false)
          toast({ type: 'background', description: 'Local atualizado com sucesso' })
        })
        .catch((err) => {
          console.error(err)
          toast({ type: 'background', description: 'Erro ao atualizar local: ' + err.message, variant: 'destructive' })
        })
    } else {
      await saveLocations(watch('locationName'), watch('locationDesc'))
        .then(() => {
          setFormMode('add')
          setIsDialogOpen(false)
          toast({ type: 'background', description: 'Local registrado com sucesso' })
        })
        .catch((err) => {
          console.error(err)
          toast({ type: 'background', description: 'Erro ao gravar local', variant: 'destructive' })
        })
    }
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    saveForm()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b-2 border-gray-500">Cadastro de Locais</DialogTitle>
          <DialogDescription>
            <i className="text-sm">Cadastro das locais que são usados para o cadastro de eventos</i>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitForm} className="mt-3 flex flex-col gap-6">
          <div>
            <label htmlFor="locationName" className="font-bold">
              Nome do local
            </label>
            <Input type="text" placeholder="Ex: Prédio, Templo, Externo, etc." {...register('locationName')} />
            <p className="text-destructive">{formState.errors.locationName?.message?.toString()}</p>
          </div>

          <div>
            <label htmlFor="locationDesc" className="font-bold">
              Descrição
            </label>

            <Input placeholder="Ex.: Salão de festas logo após as escadas." {...register('locationDesc')} />
          </div>
          <Button type="submit" className="float-right  mt-5">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
