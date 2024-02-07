'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'
import { getData } from '@/utils/fetchData'
import { ReactNode, useEffect, useState } from 'react'

export default function FamilyInfo({ hasFamilyValue }: { hasFamilyValue: boolean }) {
  interface IMemberSearchValue {
    id: number
    fullName: string
  }

  interface iKin {
    kinName: string
    kinRelation: string
  }
  const [options, setOptions] = useState<IMemberSearchValue[]>([])
  const [searchMemberInputValue, setSearchMemberInputValue] = useState('')
  const [kinsListValue, setKinsListValue] = useState<iKin>({} as iKin)

  useEffect(() => {
    if (!hasFamilyValue) return
    ;(async () => {
      await getData<TPeopleGridHeader[]>({
        endpoint: 'people',
      }).then((data) => {
        const people: IMemberSearchValue[] = []
        data.forEach((p: TPeopleGridHeader) => {
          const { id, fullName } = p
          people.push({ id, fullName })
        })
        setOptions(people)
      })
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // }, [form.watch('hasFamilyInChurch')])

  function renderSelectOptions(): ReactNode {
    return options.map((data) => (
      <SelectItem key={data.id} value={data.id.toString()} className="cursor-pointer ">
        {data.fullName}
      </SelectItem>
    ))
  }

  //function addKin(): void {}
  return (
    <div className="flex gap-10">
      <FormField
        name="hasFamilyInChurch"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Possui família na igreja?</FormLabel>
            </div>
          </FormItem>
        )}
      />

      {hasFamilyValue && (
        <div>
          <div className="flex gap-5 items-end">
            <FormItem className="w-fit">
              <FormLabel className="font-normal">Procure um parente do cadastro de membros:</FormLabel>
              <Select value={searchMemberInputValue} onValueChange={setSearchMemberInputValue} name="membersNames">
                <SelectTrigger className="w-full lg:min-w-40 ">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-white ">{renderSelectOptions()}</SelectContent>
              </Select>
            </FormItem>

            <Button>Adicionar</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Parentesco</TableHead>
                <TableHead>Remover</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Nome do parente</TableCell>
                <TableCell>Parentesco</TableCell>
                <TableCell>
                  <Button variant="destructive">Remover</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
