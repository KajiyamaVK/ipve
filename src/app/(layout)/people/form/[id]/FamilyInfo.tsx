'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ReactNode, useMemo, useState } from 'react'

import { Trash } from '@phosphor-icons/react'
import { IKinsRelationsSTDTitles } from './functions'
import { TPeopleForm } from './formSchema'
import { UseFormReturn } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast'
import { TPeopleRelatives } from '@/types/TPeopleRelatives'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IFamilyInfo extends UseFormReturn<any> {
  allKinsLabels: IKinsRelationsSTDTitles[]
  allPeople: TPeopleForm[]
}

export default function FamilyInfo({ allKinsLabels, allPeople, ...form }: IFamilyInfo) {
  const [relativeSelectValue, setRelativeSelectValue] = useState<string>('')
  const [relativeTitleSelectValue, setRelativeTitleSelectValue] = useState(0)

  const relativeSelectOptionsHTML = useMemo(() => {
    return allPeople
      .map((person) => {
        if (!person.id) return null
        return (
          <option key={person.id} value={person.id.toString()} className="cursor-pointer">
            {person.fullName}
          </option>
        )
      })
      .filter(Boolean) // Filter out null values
  }, [allPeople])

  const relativeTitleSelectOptionsHTML = useMemo(() => {
    return allKinsLabels
      .map((title) => {
        if (!title.id) return null
        return (
          <option key={title.id} value={title.id.toString()} className="cursor-pointer">
            {title.relationName}
          </option>
        )
      })
      .filter(Boolean) // Filter out null values
  }, [allKinsLabels])

  const familyTableHTML = useMemo(() => {
    if (!form.watch('relatives')) return null
    return renderRelatives()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('relatives')])

  function handleAddRelative(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (form.watch('relatives')?.find((relative: any) => relative.idKinB === Number(relativeSelectValue))) {
      toast({
        title: 'Erro',
        description: 'Este parente já foi adicionado',
        variant: 'destructive',
      })
      return
    }

    form.setValue('relatives', [
      ...form.watch('relatives'),
      {
        idKinB: Number(relativeSelectValue),
        relativeName: allPeople.find((person) => person.id === Number(relativeSelectValue))?.fullName,
        relationId: relativeTitleSelectValue,
        relationName: allKinsLabels.find((title) => title.id === Number(relativeTitleSelectValue))?.relationName,
      },
    ])
  }

  function handleRemoveRelative(id: number): void {
    if (!form.watch('relatives')) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newRelatives = form.watch('relatives').filter((relative: any) => relative.idKinB !== id)
    form.setValue('relatives', newRelatives)
  }

  function handleDisableHasFamilyOption(): void {
    if (!form.watch('hasFamilyInChurch')) {
      form.setValue('relatives', [])
    }
  }

  function renderRelatives(): ReactNode {
    const element: ReactNode[] = []

    if (!form.watch('relatives')) return null

    const relativesRows = form.watch('relatives').map((relative: TPeopleRelatives) => (
      <TableRow key={relative.idKinB}>
        <TableCell>{relative.relativeName}</TableCell>
        <TableCell>{relative.relationName}</TableCell>
        <TableCell>
          <Trash
            className="cursor-pointer text-destructive"
            size={24}
            onClick={() => handleRemoveRelative(relative.idKinB)}
          />
        </TableCell>
      </TableRow>
    ))
    element.push(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Parentesco</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{relativesRows}</TableBody>
      </Table>,
    )

    return element
  }

  return (
    <div className="flex gap-10">
      <FormField
        name="hasFamilyInChurch"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} onClick={handleDisableHasFamilyOption} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Possui família na igreja?</FormLabel>
            </div>
          </FormItem>
        )}
      />
      {form.watch('hasFamilyInChurch') && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="flex  gap-2">
              <label className="mt-2">Parente</label>
              <div className="flex flex-col">
                <select
                  className="w-48 cursor-pointer rounded-md border border-gray-400 p-2 outline-none"
                  value={relativeSelectValue}
                  onChange={(e) => setRelativeSelectValue(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {relativeSelectOptionsHTML}
                </select>
                <small>Selecione uma pessoa</small>
              </div>
            </div>

            <div className="flex gap-2">
              <label className="mt-2">Parentesco</label>
              <div className="flex flex-col">
                <select
                  className="w-48 cursor-pointer rounded-md border border-gray-400 p-2 outline-none"
                  value={relativeTitleSelectValue}
                  onChange={(e) => setRelativeTitleSelectValue(Number(e.target.value))}
                >
                  <option value="">Selecione</option>
                  {relativeTitleSelectOptionsHTML}
                </select>
                <small>Selecione o grau de parentesco</small>
              </div>
            </div>

            <Button type="button" onClick={handleAddRelative}>
              Adicionar
            </Button>
          </div>
          {familyTableHTML}
        </div>
      )}
    </div>
  )
}
