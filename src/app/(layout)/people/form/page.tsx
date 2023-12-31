'use client'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { schema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { memberTitlesData } from '@/data/memberTitles'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { handleCepMask } from '@/utils/handleCepMask'
import { KeyboardEvent, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

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

  function getAllTitles() {
    return memberTitlesData.map((title) => (
      <SelectItem key={title.id} value={title.id} className="cursor-pointer ">
        {title.name}
      </SelectItem>
    ))
  }

  function handleCepChanges(e: KeyboardEvent<HTMLInputElement>) {
    const { value } = e.currentTarget
    const cep = handleCepMask(value, e)
    form.setValue('cep', cep)
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
          <div className="text-right">
            <Button>Voltar</Button>
            <Button type="submit">Salvar</Button>
          </div>
          <div className="flex gap-5 items-center ml-20 ">
            {/* Início - Avatar */}
            <FormField
              control={form.control}
              name="photoUrl"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>
                    <div className="flex flex-col items-center my-auto mr-10">
                      <Image
                        src={/* form.watch('photoUrl') || */ '/avatar.png'}
                        alt="avatar_photo"
                        height={150}
                        width={150}
                        objectFit="cover"
                        className="rounded-full border-[10px] border-primary hover:border-primary-dark hover:bg-gray-300 cursor-pointer"
                      />
                      <center>
                        <p className="mx-auto">Clique para editar</p>
                      </center>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fim - Avatar */}

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5 ">
                <div className="flex flex-col gap-2 justify-center mt-5">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Cadastro ativo?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                {/* Início - Informações (Nome e sobrenome) */}
                <div className="flex gap-5 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel className="required">
                          Primeiro Nome
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex.: Fulano"
                            className="w-full lg:min-w-40 lg:max-w-40"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel className="required">Sobrenome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Silva"
                            {...field}
                            className="w-full lg:min-w-40 lg:max-w-40"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Data de nascimento</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="01/01/1900"
                            type="date"
                            className="w-full lg:min-w-40 lg:max-w-40"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Fim - Informações (Nome e sobrenome) */}

                {/* Início - Dt Nascimento e Ativo */}
                <div className="flex gap-5">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">Gênero</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full lg:min-w-40 lg:max-w-40">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white w-full">
                            <SelectItem
                              value="Masculino"
                              className="cursor-pointer "
                            >
                              Masculino
                            </SelectItem>
                            <SelectItem
                              value="Feminino"
                              className="cursor-pointer "
                            >
                              Feminino
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="required">Cargo</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full lg:min-w-40 ">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white ">
                            {getAllTitles()}
                          </SelectContent>
                        </Select>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Fim - Dt Nascimento e Ativo */}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-5 border rounded-lg p-10">
            <h1 className="text-left text-2xl font-bold">Endereço</h1>

            {/* Início - Informações (Cep, endereço e número) */}
            <div className="flex flex-wrap gap-5">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: 12345-010"
                        className="w-full lg:min-w-40 lg:max-w-40"
                        maxLength={9}
                        onKeyDown={(e) => {
                          handleCepChanges(e)
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Fim - Informações (Cep) */}

              {/* Início - Informações (Endereço e número) */}
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Endereço (sem o número)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: Praça José Gebara"
                          className="min-w-80 max-w-96"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex.: 15A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Fim - Informações (Cep, endereço e número) */}

            {/* Início - Informações (complemento e bairro) */}
            <div className="flex gap-5 ">
              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem className="text-left flex-1">
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: Apto 123"
                        className=" w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="suburb"
                render={({ field }) => (
                  <FormItem className="text-left flex-1">
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: Vila Euthalia"
                        className=" w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Fim - Informações (complemento e bairro) */}

            {/* Início - Informações (cidade e estado) */}
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="text-left flex-1">
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex.: São Paulo" w-full {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="text-left flex-1">
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex.: SP" w-full {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Fim - Informações (cidade e estado) */}
          </div>
          <div className="flex flex-1 gap-5 ">
            <div className="  mt-5 border-gray-300 border p-5 w-1/2 ">
              <h1 className="text-left text-2xl font-bold mb-5">Contato</h1>
              {/* Início - Informações (Email e telefone) */}
              <div className="flex gap-5 p-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex.: contato@ipb.com.br"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-5">
                  <div className="flex flex-col justify-center">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="text-left">
                          <FormLabel>Celular</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="(11) 99999-5555"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mobileIsWhatsapp"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 mt-1 self-end">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={
                                form.watch('mobileNumber')?.length !== 15
                              }
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-normal italic">
                              Whatsapp?
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Outro Telefone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(11) 9999-5555"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Fim - Informações (Email e telefone) */}

              {/* Início - Cargo */}

              {/* Fim - Cargo */}
            </div>

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
