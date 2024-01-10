'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ZPeople } from '@/types/TPeople'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Toolbar } from './toolbar'
import { ProfileAvatar } from './profileAvatar'
import { ActiveControl } from './activeControl'
import { BasicTopPersonalInfo } from './BasicTopPersonalInfo'
import { AddressDataInfo } from './AddressDataInfo'
import { ContactInfo } from './ContactInfo'
import { ChurchInfo } from './ChurchInfo'
import { AccessControl } from './AccessControl'
import { getEnv } from '@/envSchema'

export default function PeopleForm() {
  const form = useForm<z.infer<typeof ZPeople>>({
    resolver: zodResolver(ZPeople),
    defaultValues: {
      isActive: true,
    },
  })

  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    const cep = form.watch('cep')
    if (cep && cep.length === 9) {
      handleCepSearch(cep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('cep')])

  useEffect(() => {
    console.log(form.watch('memberTitle'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('memberTitle')])
  useEffect(() => {
    console.log(form.watch('churchId'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('churchId')])

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
    const response = await fetch(
      `https://viacep.com.br/ws/${cepWithoutMask}/json/`,
    )
    const data = await response.json()

    form.setValue('address', data.logradouro)
    form.setValue('suburb', data.bairro)
    form.setValue('city', data.localidade)
    form.setValue('uf', data.uf)
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto mt-10 max-w-[1500px] text-center "
        onSubmit={form.handleSubmit(saveData)}
      >
        <div>
          <Toolbar />
          <div className="flex gap-5 items-center ml-20 ">
            <ProfileAvatar {...form.control} />
            <div className="flex flex-col gap-5">
              <ActiveControl {...form.control} />
              <BasicTopPersonalInfo {...form.control} />
              <ChurchInfo {...form.control} />
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
                  <FormLabel className="">Observação</FormLabel>
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
          <div className="flex mt-5 gap-10 ">
            <FormField
              control={form.control}
              name="isUser"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Usuário da plataforma?</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <AccessControl
              form={form}
              className="border-l-8 border-primary-dark pl-10"
            />
          </div>
          <FormField
            control={form.control}
            name="hasFamilyInChurch"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Possui família na igreja?</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
