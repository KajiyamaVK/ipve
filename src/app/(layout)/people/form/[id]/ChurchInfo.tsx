'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { TMembersTitles } from '@/types/TMembersTitles'
import { getData } from '@/utils/fetchData'
import { Tag } from '@/components/ui/tag'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { Check, X } from '@phosphor-icons/react'
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

interface IRoles {
  id: number
  name: string
  tailwindColor: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChurchInfo(form: UseFormReturn<any>) {
  const [titleSelectValues, setTitleSelectValues] = useState<ReactNode[]>([])
  //const [rolesSelectValues, setRolesSelectValues] = useState<ReactNode[]>([])
  const [tagsElements, setTagsElements] = useState<ReactNode>(<></>)
  const [allRoles, setAllRoles] = useState<IRoles[]>([])
  const [selectRoleValue, setSelectRoleValue] = useState<string>('')

  const roles = useMemo(() => {
    const rolesIds: string[] = form.watch('rolesIds').split(';')

    console.log(
      'allRoles.filter',
      allRoles.filter((role) => rolesIds.includes(role.id.toString())),
    )
    return allRoles.filter((role) => rolesIds.includes(role.id.toString()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('rolesIds'), allRoles])

  const rolesSelectValues = useMemo(() => {
    return allRoles.map((role) => {
      const isChecked = checkIfRoleIsAlreadyChosen(role.id)
      const check: ReactNode = isChecked ? <Check className="h-full " size={15} /> : <></>
      return (
        <div className="flex items-center" key={role.id}>
          <SelectItem value={role.id.toString()} className="flex cursor-pointer text-start">
            <div className={`${isChecked && '-ml-7'}  flex items-center gap-2`}>
              {check}
              {role.name}
            </div>
          </SelectItem>
        </div>
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRoles])

  useEffect(() => {}, [roles])

  const toast = useToast()

  useEffect(() => {
    async function getSTDTitlesData() {
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

    async function getSTDRolesData() {
      const roles: IRoles[] = []
      await getData<IRoles[]>({
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

    getSTDTitlesData()
    getSTDRolesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTagsElements(renderTags())

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('rolesIds'), allRoles])

  function checkIfRoleIsAlreadyChosen(roleId: number) {
    //return form.watch('rolesIds').includes(roleId)

    //return form.watch('rolesIds').split(';').includes(roleId.toString())
    return roles.map((role) => role.id).includes(roleId)
  }

  function handleRoleSelection(e: number) {
    if (checkIfRoleIsAlreadyChosen(e)) return
    const roles = form.watch('rolesIds') !== '' ? form.watch('rolesIds').split(';') : []
    roles.push(e.toString())
    form.setValue('rolesIds', roles.join(';'))
    setSelectRoleValue('')
  }

  function renderTags() {
    return (
      <div className="flex gap-2">
        {roles.map((role: IRoles) => {
          return (
            <div key={role.id}>
              <Tag color={role.tailwindColor ?? 'bg-primary'}>
                {role.name}
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {
                    const newRoles = roles.filter((roleValue) => roleValue.id !== role.id)
                    const newRolesIds = newRoles.map((roleValue) => roleValue.id)

                    form.setValue('rolesId', newRolesIds.join(';'))
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
    <div className="flex flex-1 flex-col gap-5 rounded-lg border border-gray-400 bg-white p-5">
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
              value={selectRoleValue}
            >
              <FormControl>
                <SelectTrigger className="w-full min-w-52 rounded-lg border-none bg-primary text-white">
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
