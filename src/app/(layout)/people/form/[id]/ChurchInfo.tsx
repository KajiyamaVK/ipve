'use client'

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tag } from '@/components/ui/tag'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { Check, X } from '@phosphor-icons/react'
import { UseFormReturn } from 'react-hook-form'
import { TPeopleRoles } from '@/types/TPeopleRoles'
import { TPeopleTitles } from '@/types/TPeopleTitles'
import { isValid } from 'date-fns'

function populatingSociety(): ReactNode {
  const societies = ['UPH', 'SAF', 'UMP', 'UPA', 'UCP']

  return societies.map((data) => (
    <option key={data} value={data} className="cursor-pointer ">
      {data}
    </option>
  ))
}

//FUnction that saves the photo of the person in NextJS public folder (/images/users). It is important that the photo is saved with the name as <randomCrypto_currentDateeAndTime>.png
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IChurchInfo extends UseFormReturn<any> {
  allRoles: TPeopleRoles[]
  allTitles: TPeopleTitles[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChurchInfo({ allRoles, allTitles, ...form }: IChurchInfo) {
  const [tagsElements, setTagsElements] = useState<ReactNode>(<></>)
  const [selectRoleValue, setSelectRoleValue] = useState<string>('')

  const rolesSelectOptionsHTML = useMemo(() => {
    return allRoles.map((role) => {
      const isChecked: boolean = checkIfRoleIsAlreadyChosen(role.id!)
      const check: ReactNode = isChecked ? <Check className="h-full " size={15} /> : <></>
      if (!role.id) return null
      return (
        <SelectItem key={role.id} value={role.id.toString()} className="cursor-pointer ">
          <div className={`${isChecked && '-ml-7'}  flex items-center gap-2`}>
            {check}
            {role.name}
          </div>
        </SelectItem>
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRoles, form.watch('roles')])

  const titlesSelectOptionsHTML = useMemo(() => {
    return allTitles.map((title) => {
      if (!title.id) return null
      return (
        <option key={title.id} value={title.id} className="cursor-pointer ">
          {title.name}
        </option>
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTitles, form.watch('titleIdFK')])

  useEffect(() => {
    setTagsElements(renderTags())
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('roles'), allRoles])

  function checkIfRoleIsAlreadyChosen(roleId: number) {
    const roles = form.watch('roles') as TPeopleRoles[]
    return roles?.map((role: TPeopleRoles) => role.id).includes(roleId)
  }

  function handleRoleSelection(e: number) {
    const newRoles = [...form.watch('roles'), allRoles.find((role) => role.id === e) as TPeopleRoles]

    if (checkIfRoleIsAlreadyChosen(e)) return

    form.setValue('roles', newRoles)
    setSelectRoleValue('')
  }

  function renderTags() {
    return (
      <div className="flex gap-2">
        {form.watch('roles')?.map((role: TPeopleRoles) => {
          return (
            <div key={role.id}>
              <Tag color={role.tailwindColor ?? 'bg-primary'}>
                {role.name}
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {
                    const newRoles = form.watch('roles').filter((roleValue: TPeopleRoles) => roleValue.id !== role.id)
                    form.setValue('roles', newRoles)
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
      <div className="flex justify-evenly gap-10 text-left">
        <div className="flex flex-col gap-2">
          <label className="required">Cargo</label>
          <select
            {...form.register('titleIdFK', {
              setValueAs: (value) => (value === '' ? value : parseInt(value)),
            })}
            className=" cursor-pointer rounded-md border border-gray-600 p-2 outline-none"
          >
            <option value="" className="cursor-pointer" />
            {titlesSelectOptionsHTML}
          </select>
          <p className="text-destructive">{String(form.formState.errors.titleIdFK?.message ?? '')}</p>
        </div>

        <div className="flex   flex-col gap-2">
          <label>Sociedade</label>
          <select
            {...form.register('society')}
            className=" cursor-pointer rounded-md border border-gray-600 p-2 outline-none"
          >
            <option value="" className="cursor-pointer" />
            {populatingSociety()}
          </select>
          <p className="text-destructive">{String(form.formState.errors.society?.message ?? '')}</p>
        </div>
        <div className="flex   flex-col gap-2">
          <label>Sala EBD</label>
          <select
            {...form.register('ebdClassroom')}
            className=" cursor-pointer rounded-md border border-gray-600 p-2 outline-none"
          >
            <option value="" className="cursor-pointer" />
            {populatingSociety()}
          </select>
          <p className="text-destructive">{String(form.formState.errors.ebdClassroom?.message ?? '')}</p>
        </div>
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
              <SelectContent className="bg-white ">{rolesSelectOptionsHTML}</SelectContent>
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
