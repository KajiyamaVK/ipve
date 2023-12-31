'use client'
import { useForm } from 'react-hook-form'
import { schema } from './schema'
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

export default function PeopleForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      isActive: true,
    },
  })

  const toast = useToast()
  const router = useRouter()
  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
    router.push('/people')
    toast.toast({
      title: 'Sucesso',
      description: 'Cadastro realizado com sucesso!',
    })
  }

  async function handleCepSearch(cep: string) {
    const cepWithoutMask = cep.replace('-', '')
    const response = await fetch(
      `https://viacep.com.br/ws/${cepWithoutMask}/json/`,
    )
    const data = await response.json()
    console.log(data)
    form.setValue('address', data.logradouro)
    form.setValue('suburb', data.bairro)
    form.setValue('city', data.localidade)
    form.setValue('state', data.uf)
  }

  useEffect(() => {
    const cep = form.watch('cep')
    if (cep && cep.length === 9) {
      handleCepSearch(cep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('cep')])

  return (
    <Form {...form}>
      <form
        className="mx-auto mt-10 max-w-[1500px] text-center "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <Toolbar />
          <div className="flex gap-5 items-center ml-20 ">
            <ProfileAvatar {...form.control} />
            <div className="flex flex-col gap-5">
              <ActiveControl {...form.control} />
              <BasicTopPersonalInfo {...form.control} />
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col mt-5 gap-5">
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
        </div>
      </form>
    </Form>
  )
}
