'use client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { format, isValid, parse } from 'date-fns'
import { FocusEventHandler } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BasicTopPersonalInfo(form: any) {
  const handleDateChange: FocusEventHandler<HTMLInputElement> = (event) => {
    const dateStr = event.target.value
    const date = parse(dateStr, 'yyyy-MM-dd', new Date())
    if (!isValid(date) || date.getFullYear() < 1900 || date.getFullYear() > 2100) {
      alert('Verifique a data de nascimento. Ou a pessoa é Moisés ou veio do futuro...')
      // Limpa o campo ou seta o valor para o estado anterior
      form.setValue('dateOfBirth', null)
    } else {
      form.setValue('dateOfBirth', date)
    }
  }

  const formatDateValue = (dateValue: Date | null) => {
    return dateValue && isValid(dateValue) ? format(dateValue, 'yyyy-MM-dd') : ''
  }

  return (
    <div className="flex flex-1 flex-col gap-5 rounded-lg border border-gray-400 bg-white p-5">
      <h1 className="text-left">DADOS PESSOAIS</h1>
      <div className="flex gap-5">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="flex-1 text-left">
              <FormLabel className="required">Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Fulano da Silva Mendes" className="min-w-52 " {...field} />
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
                  value={formatDateValue(field.value)}
                  onChange={(e) => field.onChange(parse(e.target.value, 'yyyy-MM-dd', new Date()))}
                  onBlur={handleDateChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <label className="required">Gênero</label>
          <select
            {...form.register('gender')}
            className="cursor-pointer rounded-md border border-gray-600 p-2 outline-none"
          >
            <option value="" className="cursor-pointer" />
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
          </select>
          <p className="text-destructive">{form.formState.errors.gender?.message}</p>
        </div>
      </div>
    </div>
  )
}
