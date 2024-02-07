'use client'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { TPeople, ZPeople } from '@/types/TPeople'
import { Textarea } from '@/components/ui/textarea'
import { useContext, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { ProfileAvatar } from './profileAvatar'
import { ActiveControl } from './ActiveControl'
import { BasicTopPersonalInfo } from './BasicTopPersonalInfo'
import { AddressDataInfo } from './AddressDataInfo'
import { ContactInfo } from './ContactInfo'
import { ChurchInfo } from './ChurchInfo'
import { AccessControl } from './AccessControl'
import { getEnv } from '@/envSchema'
import FamilyInfo from './FamilyInfo'
import { getData } from '@/utils/fetchData'
import { format } from 'date-fns'
import PageSkeleton from './pageSkeleton'
import { Button } from '@/components/ui/button'
import { formsContext } from '@/contexts/formsContext'

export default function PeopleForm({ params }: { params: { id: number } }) {
  const form = useForm<z.infer<typeof ZPeople>>({
    resolver: zodResolver(ZPeople),
  })

  const { control } = form

  const { formMode, setFormMode } = useContext(formsContext)

  const hasFamilyValue: boolean = useWatch({
    control,
    name: 'hasFamilyInChurch',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    if (params.id > 0) {
      setIsLoading(true)
      setFormMode('edit')
      const { id } = params
      ;(async () => {
        await getData<TPeople>({
          endpoint: 'people',
          id,
        })
          .then((data) => {
            populatingFields(data)
          })
          .then(() => {
            setIsLoading(false)
          })
      })()
    }

    if (params.id === 0) {
      setFormMode('add')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, params])

  useEffect(() => {
    const cep = form.watch('cep')
    if (cep && cep.length === 9) {
      handleCepSearch(cep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('cep')])

  function setDateInput(date: string) {
    form.setValue('dateOfBirth', format(date, 'yyyy-MM-dd'))
  }

  function handleBack() {
    setIsButtonLoading(true)
    router.push('/people')
  }

  //eslint-disable-next-line
  function setInputValue(key: keyof TPeople, value: any) {
    if (key === 'dateOfBirth' && typeof value === 'string') {
      setDateInput(value)
    } else if (['false', 'true'].includes(value)) {
      const valueInBool = value === 'true' ? true : false

      form.setValue(key, valueInBool)
    } else if (value !== null) {
      form.setValue(key, value)
    }
  }

  async function populatingFields(data: TPeople) {
    Object.keys(data).forEach((key) => {
      const keyOfTPeople = key as keyof TPeople
      if (keyOfTPeople in data) {
        if (keyOfTPeople === 'titleIdFK') {
          data['titleIdFK'] = data['titleIdFK']?.toString()
        } else if (keyOfTPeople === 'dateOfBirth' && data['dateOfBirth']) {
          data['dateOfBirth'] = format(new Date(data['dateOfBirth']), 'yyyy-MM-dd')
        }

        setInputValue(keyOfTPeople, data[keyOfTPeople])
      }
    })
  }

  // function teste() {
  //   const values = form.getValues()
  //   const zValues = ZPeople.safeParse(values)
  //   if (!zValues.success) {
  //     toast.toast({
  //       title: 'Erro!',
  //       description: `Ocorreu um erro ao salvar os dados! Erro: ${zValues.error.message}`,
  //       variant: 'destructive',
  //     })
  //     return
  //   }
  // }

  async function saveData(values: z.infer<typeof ZPeople>) {
    const zValues = ZPeople.safeParse(values)
    if (!zValues.success) {
      toast.toast({
        title: 'Erro!',
        description: `Ocorreu um erro ao salvar os dados! Erro: ${zValues.error.message}`,
        variant: 'destructive',
      })
      return
    }

    //const values = form.getValues()
    if (formMode === 'add') {
      await fetch(`${getEnv().NEXT_PUBLIC_API_URL}/people`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .then(() => {
          toast.toast({
            title: 'Sucesso!',
            variant: 'default',
            description: 'Dados salvos com sucesso!',
          })

          router.push('/people')
        })
        .catch((err) => {
          const message = err.message
          toast.toast({
            title: 'Erro!',
            description: `Ocorreu um erro ao criar os dados! Erro: ${message}`,
            variant: 'destructive',
          })
        })
    } else if (formMode === 'edit') {
      await fetch(`${getEnv().NEXT_PUBLIC_API_URL}/people/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw err
            })
          }
          return response.json()
        })
        .then(() => {
          toast.toast({
            title: 'Sucesso!',
            variant: 'default',
            description: 'Dados salvos com sucesso!',
          })

          router.push('/people')
        })
        .catch((err) => {
          const message = err.message
          toast.toast({
            title: 'Erro!',
            description: `Ocorreu um erro ao editar os dados! Erro: ${message}`,
            variant: 'destructive',
          })

          console.error(message)
        })
    }
  }

  async function handleCepSearch(cep: string) {
    const cepWithoutMask = cep.replace('-', '')
    const response = await fetch(`https://viacep.com.br/ws/${cepWithoutMask}/json/`)
    const data = await response.json()

    form.setValue('address', data.logradouro)
    form.setValue('suburb', data.bairro)
    form.setValue('city', data.localidade)
    form.setValue('uf', data.uf)
  }
  if (isLoading) {
    return <PageSkeleton />
  } else
    return (
      <Form {...form}>
        <div className="flex justify-center">
          <form className="my-10 max-w-[1500px] px-36 xl:px-10" onSubmit={form.handleSubmit(saveData)}>
            <div>
              <div className="flex gap-5 justify-end">
                <Button isLoading={isButtonLoading} onClick={handleBack}>
                  Voltar
                </Button>

                <Button type="submit">Salvar</Button>
              </div>
              <div className="flex gap-5 items-center ml-20 ">
                <ProfileAvatar {...form.control} />
                <div className="flex flex-col gap-5">
                  <ActiveControl {...form.control} />
                  <div className="flex  flex-wrap gap-5 w-min-5">
                    <BasicTopPersonalInfo {...form.control} />
                    <ChurchInfo {...form.control} />
                  </div>
                </div>
              </div>

              <AddressDataInfo {...form} />

              <div className="flex flex-1 gap-5 ">
                <ContactInfo {...form} />

                <FormField
                  control={form.control}
                  name="obs"
                  render={({ field }) => (
                    <FormItem className="text-left flex-1 mt-5">
                      <FormLabel>Observação</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Caso necessário algum detalhe adicional, informe aqui."
                          className="resize-none h-48 "
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex mt-5 gap-10 ">
                  <AccessControl {...form} />
                </div>
                <div>
                  <FamilyInfo hasFamilyValue={hasFamilyValue as boolean} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Form>
    )
}
