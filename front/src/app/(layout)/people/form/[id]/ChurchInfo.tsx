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

import { ReactNode } from 'react'

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
  return (
    <div className="flex flex-col gap-5 border rounded-lg border-gray-400 p-5 bg-white flex-1">
      <h1 className="text-left">IGREJA</h1>
      <div className="flex gap-5 text-left">
        <FormField
          control={formControl}
          name="memberTitle"
          render={({ field }) => (
            <FormItem className="w-full">
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
          name="society"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Sociedade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full lg:min-w-40">
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
            <FormItem className="w-full">
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
