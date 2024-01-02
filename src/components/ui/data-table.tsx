'use client'
import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  Cell,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion'

import { Trash } from '@phosphor-icons/react'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { formsContext } from '@/contexts/formsContext'
import { generalContext } from '@/contexts/generalContext'
import { toast } from './use-toast'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  dialogForm?: ReactNode
}

export function DataTable<TData, TValue>({
  columns,
  data,
  dialogForm = <></>,
}: DataTableProps<TData, TValue>) {
  const { table } = useTable(columns, data)
  const [searchColumn, setSearchColumn] = useState('id')
  const [buttonIsLoading, setButtonIsLoading] = useState(false)

  const router = useRouter()

  const [tableHeaderRow, TableHetHeaderRow] = useState<ReactNode[]>([])
  const [SearchColumnsSelectOptions, setSearchColumnsSelectOptions] = useState<
    ReactNode[]
  >([])

  const { register, watch } = useForm()

  const { setFormMode, setIsDialogOpen, setCurrentSelectedItem } =
    useContext(formsContext)
  const { currentScreen } = useContext(generalContext)
  const { formType } = currentScreen

  useEffect(() => {
    setIsDialogOpen(false)
    const TableHeaderRowArray: ReactNode[] = []
    const TableHeaderRowArrayHeaders: ReactNode[] = []
    const tempArray: ReactNode[] = []

    const headerGroups = table.getHeaderGroups().slice()

    headerGroups.forEach((headerGroup) => {
      headerGroup.headers.forEach((header) => {
        TableHeaderRowArrayHeaders.push(renderHeaders(header))
        tempArray.push(renderSearchColumnsSelectOptions(header))
      })

      TableHeaderRowArray.push(
        <TableRow key={headerGroup.id}>
          {TableHeaderRowArrayHeaders}
          <TableHead>Ações</TableHead>
        </TableRow>,
      )
    })

    TableHetHeaderRow(TableHeaderRowArray)
    setSearchColumnsSelectOptions(tempArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function pushToProperRoute() {
    setFormMode('add')
    setButtonIsLoading(true)
    if (formType === 'page') {
      const registerRoute = `/${currentScreen.id}/form/0`
      router.push(registerRoute)
    } else {
      setIsDialogOpen(true)
    }
  }

  function handleViewState(id: string) {
    if (currentScreen.formType === 'dialog') {
      setCurrentSelectedItem(id)
      setFormMode('view')
      setIsDialogOpen(true)
    } else router.push(`/${currentScreen.id}/form/${id}`)
  }

  function handleDelete(id: string) {
    toast({
      title: `Registro ${id} apagado com sucesso!`,
      description: 'A função foi apagada com sucesso',
      type: 'background',
      variant: 'destructive',
    })
  }

  function useTable<TData, TValue>(
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
  ) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        columnFilters,
      },
    })

    return { table, sorting, setSorting, columnFilters, setColumnFilters }
  }

  function renderTableCell<TData>(cell: Cell<TData, unknown>) {
    if (cell.id !== '') {
      return (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      )
    } else {
      return <TableCell key="default">Default Value</TableCell>
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderSearchColumnsSelectOptions(header: any) {
    const headerDataType = typeof header.column.columnDef.header

    const label =
      headerDataType === 'string'
        ? header.column.columnDef.header
        : header.column.columnDef.header({ column: {} }).props.label
    return (
      <option key={`${header.id}-option`} value={header.id}>
        {label}
      </option>
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function renderHeaders(header: any) {
    const label = flexRender(
      header.column.columnDef.header,
      header.getContext(),
    )

    return (
      <TableHead key={`${header.id}-TH`}>
        {header.isPlaceholder ? null : label}
      </TableHead>
    )
  }

  return (
    <div>
      <div className="text-left flex justify-between items-end">
        <div className="border-b-2 border-gray-300 px-5 rounded-lg mb-10 bg-white shadow-sm shadow-black">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="text-left">
                  <h2 className="font-bold text-[1.5rem]">Busca</h2>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="italic mb-5 text-left">
                  Escolha uma das colunas no seletor e digite o texto que deseja
                  procurar.
                </p>
                <div className="flex gap-5">
                  <select
                    value={searchColumn}
                    onChange={(e) => setSearchColumn(e.target.value)}
                  >
                    {SearchColumnsSelectOptions}
                  </select>
                  <Input
                    placeholder="Escolha a coluna que deseja filtrar..."
                    value={
                      (table
                        .getColumn(searchColumn)
                        ?.getFilterValue() as string) ?? ''
                    }
                    onKeyUp={() => {
                      table
                        .getColumn(searchColumn)
                        ?.setFilterValue(watch('search'))
                    }}
                    className="min-w-2xl w-[700px]"
                    type="text"
                    {...register('search')}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="text-right mb-10">
          <Button
            className="w-20"
            variant={'default'}
            onClick={pushToProperRoute}
            isLoading={buttonIsLoading}
          >
            Novo
          </Button>
        </div>
        {dialogForm}
      </div>
      <Table className="bg-white">
        <TableHeader className="text-white bg-[#68b3c6] ">
          {tableHeaderRow}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const idValue = row.getValue('id') as string
              return (
                <TableRow
                  key={row.id}
                  id={idValue}
                  className="hover:bg-primary-dark hover:text-primary-foreground cursor-pointer "
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => handleViewState(idValue)}
                >
                  {row.getVisibleCells().map((cell) => renderTableCell(cell))}
                  <TableCell className="flex gap-2 cursor-pointer">
                    <button
                      aria-label="Deletar"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(idValue)
                      }}
                    >
                      <Trash size={24} />
                    </button>
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado encontrado
                <p className="text-destructive font-bold">
                  A coluna selecionada na busca é a correta?
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
