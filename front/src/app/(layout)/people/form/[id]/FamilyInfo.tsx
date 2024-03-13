'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'
import { getData } from '@/utils/fetchData'
import { ReactNode, useEffect, useState } from 'react'

import { Trash } from '@phosphor-icons/react'

export default function FamilyInfo({
  hasFamilyValue,
  setRelatives,
  relatives,
  personId,
}: {
  hasFamilyValue: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRelatives: (value: any) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relatives: { idKinB: number; relation: string }[] | undefined
  personId: number
}) {
  interface IMemberSearchValue {
    id: number
    fullName: string
  }

  const [personList, setPersonList] = useState<IMemberSearchValue[]>([])
  const [relativesTitles, setRelativesTitles] = useState<{ id: number; relationName: string }[]>([])
  const [relativeSelectValue, setRelativeSelectValue] = useState<string>('')
  const [relativeTitleSelectValue, setRelativeTitleSelectValue] = useState('')
  const [relativesTable, setRelativesTable] = useState<ReactNode>(<></>)

  useEffect(() => {
    if (!relativesTitles || relativesTitles.length === 0) return
    renderRelativesTitles()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relativesTitles])

  useEffect(() => {
    if (!relatives) {
      setRelatives([])
    }
    getKinsRelationsTitles()
    getKinsRelations(personId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!hasFamilyValue) return
    getSelectOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFamilyValue])

  async function getKinsRelationsTitles() {
    await getData({
      endpoint: 'kinsRelations',
    }).then((data) => {
      setRelativesTitles(data as { id: number; relationName: string }[])
    })
  }

  useEffect(() => {
    if (!relatives) return
    if (personList.length === 0) return
    setRelativesTable(renderRelatives())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relatives, personList])

  interface KinsRelationData {
    idKinB: string
    relation: string
  }
  async function getKinsRelations(id: number) {
    if (!id) return
    await getData({
      endpoint: 'kinsRelations',
      id,
    }).then((data) => {
      const kinsData = data as KinsRelationData

      setRelatives(kinsData)
    })
  }

  async function getSelectOptions() {
    await getData<TPeopleGridHeader[]>({
      endpoint: 'people',
    }).then((data) => {
      const people: IMemberSearchValue[] = []
      data.forEach((p: TPeopleGridHeader) => {
        const { id, fullName } = p
        people.push({ id, fullName })
      })
      setPersonList(people)
    })
  }

  function handleAddRelative(): void {
    if (!relatives) relatives = []

    setRelatives([
      ...relatives,
      {
        idKinB: Number(relativeSelectValue),
        relation: relativeTitleSelectValue,
      },
    ])
  }

  function handleRemoveRelative(id: number): void {
    if (!relatives) return
    const newRelatives = relatives.filter((relative) => relative.idKinB !== id)
    setRelatives(newRelatives)
  }

  function renderSelectOptions(): ReactNode {
    return personList.map((data) => (
      <SelectItem key={data.id} value={data.id.toString()} className="cursor-pointer ">
        {data.fullName}
      </SelectItem>
    ))
  }

  function renderRelatives(): ReactNode {
    const cells: ReactNode[] = []

    if (!relatives) return null

    relatives.map((relative) => {
      const relativeData = personList.find((person) => person.id === Number(relative.idKinB))

      if (!relativeData) return
      const relativeTitle = relativesTitles.find((title) => title.id.toString() === relative.relation)
      if (!relativeTitle) return
      if (relativeData.id && relativeData.fullName && relativeTitle.relationName)
        cells.push(
          <TableRow key={relativeData.id}>
            <TableCell>{relativeData.fullName}</TableCell>
            <TableCell>{relativeTitle.relationName}</TableCell>
            <TableCell>
              <Trash
                className="cursor-pointer text-destructive"
                size={24}
                onClick={() => handleRemoveRelative(relative.idKinB)}
              />
            </TableCell>
          </TableRow>,
        )
    })
    return cells
  }

  function renderRelativesTitles(): ReactNode {
    return relativesTitles.map((title) => (
      <SelectItem key={title.id} value={title.id.toString()} className="cursor-pointer ">
        {title.relationName}
      </SelectItem>
    ))
  }

  function renderRelativeTitlesSelect(): ReactNode {
    return (
      <FormItem className="w-fit">
        <FormLabel className="font-normal">Parentesco:</FormLabel>
        <Select value={relativeTitleSelectValue} onValueChange={setRelativeTitleSelectValue} name="membeTitleNames">
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="bg-white ">{renderRelativesTitles()}</SelectContent>
        </Select>
      </FormItem>
    )
  }

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
              <Select value={relativeSelectValue} onValueChange={setRelativeSelectValue} name="membersNames">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-white ">{renderSelectOptions()}</SelectContent>
              </Select>
            </FormItem>
            {renderRelativeTitlesSelect()}
            <Button
              type="button"
              disabled={!relativeSelectValue || !relativeTitleSelectValue}
              onClick={handleAddRelative}
            >
              Adicionar
            </Button>
          </div>
          <Table className="mt-5">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Parentesco</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{relativesTable}</TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
