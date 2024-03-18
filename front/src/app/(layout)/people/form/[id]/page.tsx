'use client'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useContext, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ImSpinner9 } from 'react-icons/im'
import { Input } from '@/components/ui/input'
import { generateRandomNumberWithDigits } from '@/utils/generateRandomNumber'
import { TPeople, ZPeople } from './formSchema'

export default function PeopleForm({ params }: { params: { id: number } }) {
  // Inside your component

  const toast = useToast()
  const router = useRouter()

  const { formMode, setFormMode } = useContext(formsContext)

  const form = useForm<z.infer<typeof ZPeople>>({
    resolver: zodResolver(ZPeople),
    defaultValues: {
      fullName: '',
      photoUrl: '',
      isActive: true,
      isMember: false,
      isUser: false,
      hasFamilyInChurch: false,
      relatives: [],
    },
  })
  const { control } = form
  const hasFamilyValue: boolean = useWatch({
    control,
    name: 'hasFamilyInChurch',
  })

  const photoUrlValue = useWatch({
    control,
    name: 'photoUrl',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  // interface IRelative {
  //   id: number
  //   fullName: string
  //   kinshipId: string
  //   relativeTitle: string
  // }

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
          .then((response) => {
            const data = response
            if (data) {
              populatingFields(data)
            }
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

  useEffect(() => {
    const phone1 = form.watch('phone1')
    if (phone1) {
      form.setValue('phone1', handlePhoneMask(phone1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('phone1')])

  useEffect(() => {
    const phone2 = form.watch('phone2')
    if (phone2) {
      form.setValue('phone2', handlePhoneMask(phone2))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('phone2')])

  function handlePhoneMask(value: string | undefined) {
    if (!value) return ''
    if (value.length === 15) return value

    //Remove todas as letras e caracteres especiais que não sejam parenteses, espaços e traços
    value = value.replace(/[^0-9()-\s]/g, '')

    if (value.length < 15) {
      return value
        .replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1')
    }
    // Deixa no formato (99) 99999-9999
    if (value.length === 15) {
      return value
        .replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
    }
  }

  function setRelatives(
    value: {
      idKinB: number
      relation: string
    }[],
  ) {
    form.setValue('relatives', value)
  }

  function handleBack() {
    setIsButtonLoading(true)
    router.push('/people')
  }

  async function populatingFields(data: TPeople) {
    form.setValue('id', data.id)
    form.setValue('photoUrl', data.photoUrl ?? '')
    form.setValue('fullName', data.fullName ?? '')
    form.setValue('titleIdFK', (data.titleIdFK ?? '').toString())
    form.setValue('dateOfBirth', data.dateOfBirth ? format(new Date(data.dateOfBirth), 'yyyy-MM-dd') : '')
    form.setValue('roles', data.roles ?? '')
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
    form.setValue('isUser', !!data.isUser)
    form.setValue('hasFamilyInChurch', !!data.hasFamilyInChurch)
    form.setValue('obs', data.obs ?? '')
    form.setValue('relatives', data.relatives)
    form.setValue('gender', data.gender ?? '')
  }

  function storePersonPhoto(e: React.ChangeEvent<HTMLInputElement>): void {
    let photo: File
    if (e.target.files) {
      photo = e.target.files[0]
    } else {
      throw new Error('Erro ao carregar a foto')
    }

    const fileName = `TMP${generateRandomNumberWithDigits(7)}_${new Date().getTime()}.png`

    const formData = new FormData()

    formData.append('photo', photo, fileName)

    fetch(`/api/uploadFile`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => {
        if (data.success) {
          form.setValue('photoUrl', `${process.env.NEXT_PUBLIC_APP_URL}/images/users/${fileName}`)

          toast.toast({
            title: 'Sucesso!',
            description: 'Foto salva com sucesso!',
          })
          form.setValue('photoUrl', fileName)
        } else {
          throw new Error(data.message)
        }
      })
      .catch((err) => {
        const message = err.message
        toast.toast({
          title: 'Erro!',
          description: `Ocorreu um erro ao salvar a foto! Erro: ${message}`,
          variant: 'destructive',
        })
      })
  }

  const {
    formState: { errors },
  } = form

  function handleFormErrors() {
    console.error('errors', errors)
  }

  async function saveData(values: z.infer<typeof ZPeople>) {
    const relatives = form.watch('relatives') ?? []
    if (hasFamilyValue && relatives.length === 0) {
      toast.toast({
        title: 'Erro!',
        description:
          'É necessário informar ao menos um familiar caso a opção "Possui família na igreja" esteja marcada.',
        variant: 'destructive',
      })
      return
    }
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
          toast.toast({
            title: 'Erro!',
            description: `Ocorreu um erro ao criar os dados! Erro: ${err.message}`,
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
          <form
            className="my-10 max-w-[1500px] px-36 xl:px-10"
            onSubmit={form.handleSubmit(saveData, handleFormErrors)}
          >
            <div>
              <div className="flex gap-5 justify-end">
                <Button isLoading={isButtonLoading} onClick={handleBack}>
                  Voltar
                </Button>

                <Button type="submit">Salvar</Button>
              </div>
              <div className="flex gap-5 items-center ml-20 mb-5">
                {/* <ProfileAvatar file={selectedFile} control={form.control} /> */}
                <FormField
                  control={form.control}
                  name="photoUrl"
                  render={() => (
                    <FormItem className="text-left min-w-36 md:min-w-52">
                      <FormLabel htmlFor="photoUrl">
                        <div className="flex flex-col items-center my-auto mr-10">
                          <Avatar className="border-4 border-secondary w-48 h-48 bg-white cursor-pointer">
                            <AvatarImage
                              src={photoUrlValue ? `/images/users/${photoUrlValue}` : '/images/system/avatar.png'}
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
                                storePersonPhoto(e)
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
                  <div className="flex  flex-wrap gap-5 w-min-5">
                    <BasicTopPersonalInfo {...form.control} />
                  </div>
                </div>
              </div>
              <ChurchInfo {...form} />

              <AddressDataInfo {...form} />

              <div className="flex flex-1 gap-5 ">
                <ContactInfo {...form} />

                <FormField
                  control={form.control}
                  name="obs"
                  render={({ field }) => (
                    <FormItem className="text-left flex-1 mt-5 bg-white">
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
                  <FamilyInfo
                    hasFamilyValue={hasFamilyValue as boolean}
                    setRelatives={setRelatives}
                    relatives={form.watch('relatives')}
                    personId={form.watch('id') || 0}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </Form>
    )
}
