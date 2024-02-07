'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TMembersTitles } from '@/types/TMembersTitles'
import { getData } from '@/utils/fetchData'

import { ReactNode, useEffect, useState } from 'react'

function populatingSociety(): ReactNode {
  const societies = ['UPH', 'SAF', 'UMP', 'UPA', 'UCP']

  return societies.map((data) => (
    <SelectItem key={data} value={data} className="cursor-pointer ">
      {data}
    </SelectItem>
  ))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChurchInfo(formControl: any) {
  const [titleSelectValues, setTitleSelectValues] = useState<ReactNode[]>([])
  useEffect(() => {
    ;(async () => {
      await getData<TMembersTitles[]>({
        endpoint: 'titles',
      }).then((data) => {
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
      })
    })()
  }, [])

  return (
    <div className="flex flex-col gap-5 border rounded-lg border-gray-400 p-5 bg-white flex-1">
      <h1 className="text-left">IGREJA</h1>
      <div className="flex gap-5 text-left">
        <FormField
          control={formControl}
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
          control={formControl}
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
          control={formControl}
          name="ebdClassroom"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel>Sala EBD</FormLabel>
              <p className="leading-9">{field.value}</p>
              {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 ">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">{populatingSociety()}</SelectContent>
              </Select> */}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Fim - Dt Nascimento e Ativo */}
    </div>
  )
}
