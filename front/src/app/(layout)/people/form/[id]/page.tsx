'use client'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { TPeople, ZPeople } from '@/types/TPeople'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Toolbar } from './toolbar'
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

export default function PeopleForm({ params }: { params: { id: number } }) {
  const form = useForm<z.infer<typeof ZPeople>>({
    resolver: zodResolver(ZPeople),
    defaultValues: {
      isActive: true,
    },
  })

  const { control } = form

  const hasFamilyValue: boolean = useWatch({
    control,
    name: 'hasFamilyInChurch',
  })

  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    console.log(params.id)
    if (params.id > 0) {
      console.log('entrei')
      setIsLoading(true)
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

  //eslint-disable-next-line
  function setInputValue(key: keyof TPeople, value: any) {
    if (key === 'dateOfBirth' && typeof value === 'string') {
      setDateInput(value)
    } else {
      form.setValue(key, value)
    }
  }

  function populatingFields(data: TPeople) {
    console.log('data', data)
    Object.keys(data).forEach((key) => {
      const keyOfTPeople = key as keyof TPeople
      if (keyOfTPeople in data) {
        setInputValue(keyOfTPeople, data[keyOfTPeople]?.toString())
        console.log('keyOfTPeople', keyOfTPeople, 'data[keyOfTPeople]', typeof data[keyOfTPeople]?.toString())
      }
    })
  }

  async function saveData() {
    const values = form.getValues()
    await fetch(`${getEnv().NEXT_PUBLIC_API_URL}/people`, {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(() => {
        toast.toast({
          title: 'Sucesso!',
          description: 'Dados salvos com sucesso!',
        })

        router.push('/people')
      })
      .catch((err) => {
        toast.toast({
          title: 'Erro!',
          description: `Ocorreu um erro ao salvar os dados! Erro: ${err.message}`,
          variant: 'destructive',
        })
      })
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
              <Toolbar />
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
