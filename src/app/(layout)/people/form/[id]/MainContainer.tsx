'use client'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { ActiveControl } from './ActiveControl'
import { BasicTopPersonalInfo } from './BasicTopPersonalInfo'
import { AddressDataInfo } from './AddressDataInfo'
import { ContactInfo } from './ContactInfo'
import { ChurchInfo } from './ChurchInfo'
import FamilyInfo from './FamilyInfo'
import { format, parse } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ImSpinner9 } from 'react-icons/im'
import { Input } from '@/components/ui/input'
import { TPeopleForm, ZPeopleForm } from './formSchema'
import { formatPhone } from '@/utils/maskFunctions'
import { TPeopleRoles } from '@/types/TPeopleRoles'
import { TPeopleTitles } from '@/types/TPeopleTitles'
import { IKinsRelationsSTDTitles } from './functions'
import { savePeople, updatePeople } from '../../functions'

type TMode = 'create' | 'edit'

interface IMainContainer {
  data: TPeopleForm
  allRoles: TPeopleRoles[]
  allTitles: TPeopleTitles[]
  allKinsLabels: IKinsRelationsSTDTitles[]
  allPeople: TPeopleForm[]

  mode: TMode
}

export function MainContainer({ data, allRoles, allTitles, allPeople, allKinsLabels, mode }: IMainContainer) {
  const toast = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof ZPeopleForm>>({
    resolver: zodResolver(ZPeopleForm),
    defaultValues: {
      id: -1,
      fullName: '',
      photoUrl: '',
      titleIdFK: -1,
      dateOfBirth: null,
      roles: [] as TPeopleRoles[],
      ebdClassroom: '',
      society: '',
      address: '',
      addressNumber: '',
      complement: '',
      city: '',
      suburb: '',
      uf: '',
      cep: '',
      phone1: '',
      phone1IsWhatsapp: false,
      phone2: '',
      email: '',
      isActive: true,
      isMember: false,
      isUser: false,
      hasFamilyInChurch: false,
      obs: '',
      relatives: [],
      gender: '',
    },
  })

  const { control } = form

  const hasFamilyValue: boolean = useWatch({
    control,
    name: 'hasFamilyInChurch',
  })

  const [isBackButtonLoading, setIsBackButtonLoading] = useState(false)
  const [isSaveButtonLoading, setIsSaveButtonLoading] = useState(false)

  useEffect(() => {
    if (mode === 'edit') populatingFields(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const cep = form.watch('cep') || '' // form.watch can be undefined. That's why we are creating this
    if (cep.length === 9) {
      handleCepSearch(cep)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('cep')])

  useEffect(() => {
    const phone1 = form.watch('phone1')
    if (phone1) {
      form.setValue('phone1', formatPhone(phone1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('phone1')])

  useEffect(() => {
    const phone2 = form.watch('phone2')
    if (phone2) {
      form.setValue('phone2', formatPhone(phone2))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('phone2')])

  useEffect(() => {}, [form.formState.errors])

  function handleBack() {
    setIsBackButtonLoading(true)
    router.push('/people')
  }

  function populatingFields(data: TPeopleForm) {
    const formattedDate = data.dateOfBirth ? format(data.dateOfBirth, 'yyyy-MM-dd') : null

    form.setValue('id', data.id ?? -1)
    form.setValue('photoUrl', data.photoUrl ?? '')
    form.setValue('fullName', data.fullName ?? '')
    form.setValue('titleIdFK', data.titleIdFK)
    form.setValue('dateOfBirth', formattedDate ? parse(formattedDate, 'yyyy-MM-dd', new Date()) : null)
    form.setValue('roles', data.roles ?? [])
    form.setValue('ebdClassroom', data.ebdClassroom ?? '')
    form.setValue('society', data.society ?? '')
    form.setValue('address', data.address ?? '')
    form.setValue('addressNumber', data.addressNumber ?? '')
    form.setValue('complement', data.complement ?? '')
    form.setValue('city', data.city ?? '')
    form.setValue('suburb', data.suburb ?? '')
    form.setValue('uf', data.uf ?? '')
    form.setValue('cep', data.cep ?? '')
    form.setValue('phone1', data.phone1 ?? '')
    form.setValue('phone1IsWhatsapp', !!data.phone1IsWhatsapp)
    form.setValue('phone2', data.phone2 ?? '')
    form.setValue('email', data.email ?? '')
    form.setValue('isActive', !!data.isActive)
    form.setValue('isMember', !!data.isMember)
    form.setValue('isUser', !!data.isUser ?? false)
    form.setValue('hasFamilyInChurch', !!data.hasFamilyInChurch)
    form.setValue('obs', data.obs ?? '')
    form.setValue('relatives', data.relatives)
    form.setValue('gender', data.gender)
  }

  function handleFormErrors() {
    console.error('errors', form.formState.errors)
  }

  function validateHasFamilyCheckboxRelatives() {
    const relatives = form.watch('relatives') ?? []

    if (hasFamilyValue && relatives.length === 0) {
      toast.toast({
        title: 'Erro!',
        description:
          'É necessário informar ao menos um familiar caso a opção "Possui família na igreja" esteja marcada.',
        variant: 'destructive',
      })
      return false
    }

    return true
  }

  async function saveData(values: z.infer<typeof ZPeopleForm>) {
    setIsSaveButtonLoading(true)
    if (!validateHasFamilyCheckboxRelatives()) {
      return
    }

    if (values.id == -1) {
      await savePeople(values)
    } else {
      try {
        await updatePeople(values)
          .then((response) => {
            if (response.status === 200) {
              toast.toast({
                title: 'Sucesso!',
                description: 'Pessoa atualizada com sucesso!',
                variant: 'default',
              })
            } else {
              toast.toast({
                title: 'Erro!',
                description: 'Erro ao atualizar pessoa. Entre em contato com o suporte.',
                variant: 'destructive',
              })
            }
          })
          .then(() => {
            setIsBackButtonLoading(false)
            router.push('/people')
          })
      } catch (error) {
        console.error('error', error)
      } finally {
        setIsSaveButtonLoading(false)
      }
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

  return (
    <Form {...form}>
      <div className="flex justify-center">
        <form className="my-10 max-w-[1500px] px-36 xl:px-10" onSubmit={form.handleSubmit(saveData, handleFormErrors)}>
          <div>
            <div className="flex justify-end gap-5">
              <Button isLoading={isBackButtonLoading} onClick={handleBack}>
                Voltar
              </Button>

              <Button type="submit" isLoading={isSaveButtonLoading}>
                Salvar
              </Button>
            </div>
            <div className="mb-5 ml-20 flex items-center gap-5">
              <FormField
                control={form.control}
                name="photoUrl"
                render={() => (
                  <FormItem className="min-w-36 text-left md:min-w-52">
                    <FormLabel htmlFor="photoUrl">
                      <div className="my-auto mr-10 flex flex-col items-center">
                        <Avatar className="size-48 cursor-pointer border-4 border-secondary bg-white">
                          <AvatarImage
                            src={'/images/system/avatar.png'}
                            alt="Foto do usuário do sistema"
                            id="photo"
                            className="object-cover"
                          />
                          <AvatarFallback>
                            <div className="animate-spin text-primary">
                              <ImSpinner9 />
                            </div>
                          </AvatarFallback>
                        </Avatar>
                        <center>
                          <p className="mx-auto">Clique para editar</p>
                        </center>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Controller
                        control={form.control}
                        name="photoUrl"
                        render={({ field: { onChange } }) => (
                          <Input
                            type="file"
                            accept="image/*"
                            id="photoUrl"
                            className="hidden"
                            {...form.register('photoUrl')}
                            onChange={(e) => {
                              onChange(e)
                            }}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-5">
                <ActiveControl {...form.control} />
                <div className="flex flex-wrap gap-5">
                  <BasicTopPersonalInfo {...form} />
                </div>
              </div>
            </div>
            <ChurchInfo {...form} allRoles={allRoles} allTitles={allTitles} />

            <AddressDataInfo {...form} />

            <div className="flex flex-1 gap-5 ">
              <ContactInfo {...form} />

              <FormField
                control={form.control}
                name="obs"
                render={({ field }) => (
                  <FormItem className="mt-5 flex-1  bg-white text-left">
                    <FormLabel>Observação</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Caso necessário algum detalhe adicional, informe aqui."
                        className="h-72 resize-none "
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
              <div className="mt-5 flex gap-10 ">{/* <AccessControl {...form} /> */}</div>
              <div>
                <FamilyInfo {...form} allKinsLabels={allKinsLabels} allPeople={allPeople} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Form>
  )
}
