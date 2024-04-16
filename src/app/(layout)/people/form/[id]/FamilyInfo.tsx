'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ReactNode, useEffect, useMemo, useState } from 'react'

import { Trash } from '@phosphor-icons/react'
import { IDBResponse } from '@/types/IDBResponse'
import { IKinsRelationsResponse, getKinsRelations, getKinsRelationsSTD } from './functions'
import { getPeople } from '../../functions'
import { TPeople } from './formSchema'

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
  const [personList, setPersonList] = useState<TPeople[]>([])
  const [relativesTitles, setRelativesTitles] = useState<{ id: number; relationName: string }[]>([])
  const [relativeSelectValue, setRelativeSelectValue] = useState<string>('')
  const [relativeTitleSelectValue, setRelativeTitleSelectValue] = useState('')
  const [relativesTable, setRelativesTable] = useState<ReactNode>(<></>)

  const kinsOptions = useMemo(() => {
    return personList.map((data) => {
      if (data.id)
        return (
          <SelectItem key={data.id as number} value={data.id.toString()} className="cursor-pointer ">
            {data.fullName}
          </SelectItem>
        )
    })
  }, [personList])

  const renderRelativeTitlesOptions = useMemo(() => {
    console.log('relativesTitles', relativesTitles)
    return relativesTitles.map((title) => (
      <SelectItem key={title.id} value={title.id.toString()} className="cursor-pointer ">
        {title.relationName}
      </SelectItem>
    ))
  }, [relativesTitles])

  useEffect(() => {
    if (!relativesTitles || relativesTitles.length === 0) return
    renderRelativesTitles()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relativesTitles])

  useEffect(() => {
    getKinsRelationsTitle()
    getKinsRelations(personId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!hasFamilyValue) return
    getSelectOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFamilyValue])

  useEffect(() => {
    if (!relatives || relatives.length === 0) return
    if (personList.length === 0) return
    setRelativesTable(renderRelatives())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relatives, personList])

  async function getKinsRelationsTitle() {
    try {
      const response: IDBResponse = await getKinsRelationsSTD()

      if (response.status !== 200) {
        throw new Error(
          `Erro interno. Por favor, entre em contato com o suporte: HTTP error! status: ${response.status}`,
        )
      }
      const data = response.data as IKinsRelationsResponse[]
      setRelativesTitles(data)

      return data
    } catch (error) {
      console.error(error)
    }
  }

  async function getSelectOptions() {
    try {
      await getPeople().then((response) => {
        const data: IDBResponse = response
        if (data.data === undefined) {
          console.error('data.data is undefined')
          throw new Error('data.data is undefined')
        }
        const personData = data.data as TPeople[]
        console.log('personData', personData)
        setPersonList(personData)
      })
    } catch (error) {
      console.error(error)
    }
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
          <div className="flex items-end gap-5">
            <FormItem className="w-fit">
              <FormLabel className="font-normal">Procure um parente do cadastro de membros:</FormLabel>
              <Select value={relativeSelectValue} onValueChange={setRelativeSelectValue} name="membersNames">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-white ">{kinsOptions}</SelectContent>
              </Select>
            </FormItem>
            <FormItem className="w-fit">
              <FormLabel className="font-normal">Parentesco:</FormLabel>
              <Select
                value={relativeTitleSelectValue}
                onValueChange={setRelativeTitleSelectValue}
                name="membeTitleNames"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="bg-white ">{renderRelativeTitlesOptions}</SelectContent>
              </Select>
            </FormItem>
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
