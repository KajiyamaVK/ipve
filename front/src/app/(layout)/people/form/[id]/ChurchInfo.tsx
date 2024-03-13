'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { TMembersTitles } from '@/types/TMembersTitles'
import { getData } from '@/utils/fetchData'
import { Tag } from '@/components/ui/tag'
import { ReactNode, useEffect, useState } from 'react'
import { X } from '@phosphor-icons/react'
import { UseFormReturn } from 'react-hook-form'

function populatingSociety(): ReactNode {
  const societies = ['UPH', 'SAF', 'UMP', 'UPA', 'UCP']

  return societies.map((data) => (
    <SelectItem key={data} value={data} className="cursor-pointer ">
      {data}
    </SelectItem>
  ))
}

//FUnction that saves the photo of the person in NextJS public folder (/images/users). It is important that the photo is saved with the name as <randomCrypto_currentDateeAndTime>.png

interface ISelectRoles {
  id: number
  name: string
  tailwindColor: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChurchInfo(form: UseFormReturn<any>) {
  const [titleSelectValues, setTitleSelectValues] = useState<ReactNode[]>([])
  const [rolesSelectValues, setRolesSelectValues] = useState<ReactNode[]>([])
  const [tagsElements, setTagsElements] = useState<ReactNode>(<></>)
  const [allRoles, setAllRoles] = useState<ISelectRoles[]>([])

  const toast = useToast()

  useEffect(() => {
    async function getTitlesData() {
      await getData<TMembersTitles[]>({
        endpoint: 'titles',
      })
        .then((data) => {
          if (data && data.length > 0) {
            setTitleSelectValues(
              data.map((title) => {
                if (title.id) {
                  return (
                    <SelectItem key={title.id} value={title.id.toString()} className="cursor-pointer ">
                      {title.name}
                    </SelectItem>
                  )
                } else {
                  throw new Error('Erro ao carregar os cargos')
                }
              }),
            )
          }
        })
        .catch((err) => {
          console.error(err)
          toast.toast({
            title: 'Erro ao carregar os cargos',
            description: 'Erro ao carregar os cargos',
            variant: 'destructive',
          })
        })
    }

    async function getRolesData() {
      const roles: ISelectRoles[] = []
      await getData<ISelectRoles[]>({
        endpoint: 'roles',
      })
        .then((data) => {
          if (data && data.length > 0) {
            data.map((role) => {
              if (role.id) {
                roles.push({ id: role.id, name: role.name, tailwindColor: role.tailwindColor })
              } else {
                throw new Error('Erro ao carregar as funções')
              }
            }),
              setAllRoles(roles)
          }
        })

        .then(() => {})
        .catch((err) => {
          console.error(err)
          toast.toast({
            title: 'Erro ao carregar os cargos',
            description: 'Erro ao carregar os cargos',
            variant: 'destructive',
          })
        })
    }

    getTitlesData()
    getRolesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTagsElements(renderTags())
    if (allRoles.length > 0) {
      setRolesSelectValues(
        allRoles.map((role) => {
          return (
            <SelectItem key={role.id} value={role.id.toString()} className="cursor-pointer ">
              {role.name}
            </SelectItem>
          )
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('roles'), allRoles])

  function checkIfRoleIsAlreadyChosen(roleId: number) {
    return form.watch('roles').includes(roleId)
  }

  function handleRoleSelection(e: number) {
    if (checkIfRoleIsAlreadyChosen(e)) return
    const roles = form.watch('roles') !== '' ? form.watch('roles').split(';') : []
    roles.push(e.toString())
    form.setValue('roles', roles.join(';'))
  }

  function renderTags() {
    return (
      <div className="flex gap-2">
        {typeof form.watch('roles') === 'string' &&
          form.watch('roles') !== '' &&
          form
            .watch('roles')
            .split(';')
            .map((role: number) => {
              const tagColor = allRoles.find((r) => r.id == role)?.tailwindColor
              const tagName = allRoles.find((r) => r.id == role)?.name

              return (
                <div key={role}>
                  <Tag key={role} color={tagColor ?? 'bg-primary'}>
                    {tagName}
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => {
                        form.setValue('roles', form.watch('roles').replace(role.toString(), ''))
                      }}
                    >
                      <X />
                    </button>
                  </Tag>
                </div>
              )
            })}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 border rounded-lg border-gray-400 p-5 bg-white flex-1">
      <h1 className="text-left">IGREJA</h1>
      <div className="flex gap-5 text-left">
        <FormField
          control={form.control}
          name="titleIdFK"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cargo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 ">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">{titleSelectValues}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="society"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Sociedade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-20">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">{populatingSociety()}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ebdClassroom"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Sala EBD</FormLabel>
              <p className="leading-9">{field.value}</p>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormItem className="w-full">
            <FormLabel>Funções</FormLabel>
            <Select
              onValueChange={(e) => {
                handleRoleSelection(Number(e))
              }}
            >
              <FormControl>
                <SelectTrigger className="w-full min-w-52 rounded-lg text-white bg-primary border-none">
                  <SelectValue placeholder="Adicionar função" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white ">{rolesSelectValues}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
          <div className="flex gap-2">{tagsElements}</div>
        </div>
      </div>

      {/* Fim - Dt Nascimento e Ativo */}
    </div>
  )
}
