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

import { Pencil, Trash } from '@phosphor-icons/react'
import { ReactNode, useEffect, useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { useRouter, usePathname } from 'next/navigation'
import { TFormMode } from '@/types/TFormMode'
import { DataTableFormDialog } from './dataTableFormDialog'

type TFormType = 'dialog' | 'page'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  formType: TFormType
  dialogTitle?: string
  dialogDescription?: string
  dialogTrigger?: string
  dialogContent?: ReactNode
  dialogFooter?: ReactNode
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

function renderSelectOptions(header: any) {
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
function renderHeaders(header: any) {
  const label = flexRender(header.column.columnDef.header, header.getContext())

  return (
    <TableHead key={`${header.id}-TH`}>
      {header.isPlaceholder ? null : label}
    </TableHead>
  )
}

export function DataTable<TData, TValue>({
  columns,
  data,
  formType,
  dialogTitle = '',
  dialogDescription = '',
  dialogTrigger = '',
  dialogContent = <></>,
  dialogFooter = <></>,
}: DataTableProps<TData, TValue>) {
  const { table } = useTable(columns, data)
  const [searchColumn, setSearchColumn] = useState('id')
  const router = useRouter()
  const currentRoute = usePathname()

  const [headerRows, setHeaderRows] = useState<ReactNode[]>([])
  const [selectOptions, setSelectOptions] = useState<ReactNode[]>([])

  useEffect(() => {
    const headerRowsArray: ReactNode[] = []
    const headerRowsArrayHeaders: ReactNode[] = []
    const tempArray: ReactNode[] = []

    const headerGroups = table.getHeaderGroups().slice() // ou .concat()

    headerGroups.forEach((headerGroup) => {
      headerGroup.headers.map((header) => {
        headerRowsArrayHeaders.push(renderHeaders(header))
        tempArray.push(renderSelectOptions(header))
      })

      headerRowsArray.push(
        <TableRow key={headerGroup.id}>
          {headerRowsArrayHeaders}
          <TableHead>Ações</TableHead>
        </TableRow>,
      )
    })

    setHeaderRows(headerRowsArray)
    setSelectOptions(tempArray)
  }, [])

  function pushToProperRoute(TFormMode: TFormMode) {
    const registerRoute = `${currentRoute}/${TFormMode}`
    router.push(registerRoute)
  }

  return (
    <div>
      <div className="text-left flex justify-between items-end">
        <div className="border-2 border-gray-300 p-5 rounded-lg mb-10 max-w-[500px] w-[500px]">
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
                <div className="flex ">
                  <select
                    value={searchColumn}
                    onChange={(e) => setSearchColumn(e.target.value)}
                  >
                    {selectOptions}
                  </select>
                  <Input
                    placeholder="Escolha a coluna que deseja filtrar..."
                    value={
                      (table
                        .getColumn(searchColumn)
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) => {
                      table
                        .getColumn(searchColumn)
                        ?.setFilterValue(event.target.value)
                    }}
                    className="min-w-2xl w-[700px]"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="text-right mb-10">
          {formType === 'page' ? (
            <Button
              className="w-20"
              variant={'default'}
              onClick={() => pushToProperRoute('register')}
            >
              Novo
            </Button>
          ) : (
            <DataTableFormDialog
              trigger="Novo"
              title={dialogTitle}
              description={dialogDescription}
              content={dialogContent}
              footer={dialogFooter}
            />
          )}
        </div>
      </div>
      <Table>
        <TableHeader className="text-white bg-[#68b3c6] ">
          {headerRows}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const idValue = row
                .getAllCells()
                .find((cell) => cell.column.id === 'id')
                ?.getValue()

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => renderTableCell(cell))}
                  <TableCell className="flex gap-2 cursor-pointer">
                    <button aria-label="Editar">
                      <Pencil size={24} />
                    </button>
                    <button aria-label="Deletar">
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
