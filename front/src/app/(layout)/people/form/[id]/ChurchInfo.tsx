'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAllDataPost } from '@/utils/fetchData'
import { ReactNode, useEffect, useState } from 'react'

interface IChurch {
  id: number
  name: string
}

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
  const [churchOptions, setChurchOptions] = useState<ReactNode[]>([])

  useEffect(() => {
    populateChurchesSelect()
    console.log('render')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('churchOptions', churchOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [churchOptions])

  async function getAllChurches(): Promise<IChurch[]> {
    const data = await getAllDataPost<{ data: IChurch[] }>({
      endpoint: '',
      body: {
        typeOfData: 'churchBranches',
      },
    })

    return data.data
  }
  async function populateChurchesSelect() {
    const churchesBranch = await getAllChurches()
    const element: ReactNode[] = []
    churchesBranch.forEach((church: IChurch) =>
      element.push(
        <SelectItem
          key={church.id}
          value={church.id.toString()}
          className="cursor-pointer "
        >
          {church.name}
        </SelectItem>,
      ),
    )

    setChurchOptions(element)
  }

  return (
    <div className="flex flex-col gap-5 border rounded-lg border-gray-400 p-5 bg-white ">
      <h1 className="text-left">IGREJA</h1>
      {/* Início - Informações (Nome e sobrenome) */}
      <div className="flex gap-5 text-left">
        <FormField
          control={formControl}
          name="churchId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="required  ">Igreja</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 ">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">
                  {churchOptions}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formControl}
          name="society"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sociedade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 ">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">
                  {populatingSociety()}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formControl}
          name="memberTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 ">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">
                  {populatingSociety()}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formControl}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sala EBD</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40 ">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white ">
                  {populatingSociety()}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Fim - Dt Nascimento e Ativo */}
    </div>
  )
}
