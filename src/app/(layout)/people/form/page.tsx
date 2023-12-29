'use client'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { schema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaUser } from 'react-icons/fa'
import { format } from 'date-fns'
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

export default function PeopleForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      isActive: true,
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
  }

  function getAllTitles() {
    return memberTitlesData.map((title) => (
      <SelectItem key={title.id} value={title.id}>
        {title.name}
      </SelectItem>
    ))
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto mt-10 max-w-[1500px] text-center "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <div className="flex gap-5 align-center">
            {/* Início - Avatar */}
            <div className="flex flex-col items-center mr-10">
              <div className="bg-gray-300 hover:bg-black hover:bg-opacity-70 p-10 rounded-full cursor-pointer relative group">
                <p className="absolute  bg-white px-5 py-2 bottom-0 left-1/2 border-2 border-gray-300 shadow-black shadow-md hidden group-hover:block">
                  Editar
                </p>
                <FaUser className="w-32 h-32" />
              </div>
              <center>
                <p className="mx-auto">Clique para editar</p>
              </center>
            </div>
            {/* Fim - Avatar */}

            <div className="flex flex-col gap-5">
              {/* Início - Informações (Cargo e ativo) */}
              <div className="flex gap-5">
                <div className="text-left">
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
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um cargo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>{getAllTitles()}</SelectContent>
                        </Select>
                        <FormDescription>
                          Um título que é usado para essa pessoa
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-center">
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
                          <FormLabel>Cadastro ativo?</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Fim - Informações (Cargo e ativo) */}

              {/* Início - Informações (Nome e sobrenome) */}

              <div className="flex gap-5 items-center">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel className="required">Primeiro Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} required />
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
                        <Input placeholder="shadcn" {...field} required />
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
                      <FormLabel className="required">
                        Data de nascimento
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="01/01/1900"
                          type="date"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Fim - Informações (Nome e sobrenome) */}
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-5 border rounded-lg p-10">
            <h1 className="text-left text-2xl font-bold">Endereço</h1>

            {/* Início - Informações (Cep) */}

            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Fim - Informações (Cep) */}

            {/* Início - Informações (Endereço e número) */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Ex.: Praça José Gebara, 92</FormDescription>
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
                    <Input placeholder="shadcn" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Fim - Informações (Endereço e número) */}

            {/* Início - Informações (complemento e bairro) */}

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="suburb"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fim - Informações (complemento e bairro) */}

            {/* Início - Informações (cidade e estado) */}

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Início - Informações (Email e telefone) */}
          <div className="flex gap-5 mt-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="required">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="email"
                      {...field}
                      required
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="required">Telefones</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(11) 9999-5555"
                      type="text"
                      {...field}
                      required
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Fim - Informações (Email e telefone) */}

          <FormField
            control={form.control}
            name="obs"
            render={({ field }) => (
              <FormItem className="text-left">
                <FormLabel>Observação</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
