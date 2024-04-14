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

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

import { Trash } from '@phosphor-icons/react'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { usePathname, useRouter } from 'next/navigation'
import { useForm, useWatch } from 'react-hook-form'
import { formsContext } from '@/contexts/formsContext'
import { generalContext } from '@/contexts/generalContext'
import { toast } from './use-toast'
import { ImSpinner9 } from 'react-icons/im'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  dialogForm?: ReactNode
  dialogSkeleton?: ReactNode
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  dialogForm = <></>,
  dialogSkeleton = <></>,
  data,
}: DataTableProps<TData, TValue>) {
  const TableHeaderRowArray: ReactNode[] = []
  const TableHeaderRowArrayHeaders: ReactNode[] = []
  const tempArray: ReactNode[] = []

  const { table } = useTable(columns, data)
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

  const tableHeaderRow = TableHeaderRowArray
  const SearchColumnsSelectOptions = tempArray

  const [searchColumn, setSearchColumn] = useState('id')
  const [buttonIsLoading, setButtonIsLoading] = useState(false)

  const router = useRouter()

  const { register, control } = useForm()

  const { setFormMode, setIsDialogOpen, currentSelectedItem, setCurrentSelectedItem, isDialogOpen, setIsSkeletonOpen } =
    useContext(formsContext)
  const { currentScreen } = useContext(generalContext)
  const { formType } = currentScreen
  const path = usePathname()
  const searchValue = useWatch({
    control,
    name: 'search',
  })

  useEffect(() => {
    function resetFormMode() {
      setFormMode('add')
      setIsDialogOpen(false)
      setIsSkeletonOpen(false)
      setCurrentSelectedItem(0)
    }
    resetFormMode()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isDialogOpen) {
      router.refresh()
      setButtonIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogOpen])

  useEffect(() => {
    table.getColumn(searchColumn)?.setFilterValue(searchValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

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

  function handleEditState(id: number) {
    setCurrentSelectedItem(id)
    setFormMode('edit')
    if (currentScreen.formType === 'dialog') {
      setIsDialogOpen(true)
      setIsSkeletonOpen(true)
    } else router.push(`/${currentScreen.id}/form/${id}`)
  }

  function useTable<TData, TValue>(columns: ColumnDef<TData, TValue>[], data: TData[]) {
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

  async function handleDelete(id: number) {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          toast({
            title: `Registro ${id} apagado com sucesso!`,
            description: 'O registro foi apagado com sucesso',
            type: 'background',
          })
        } else {
          toast({
            title: `Erro ao apagar o registro ${id}`,
            description: 'Erro ao tentar apagar o registro, avise para manutenção o quanto antes.',
            type: 'background',
          })
        }
      })
      .then(() => {
        router.refresh()
      })
      .catch((err) => {
        console.error(err)
        toast({
          title: `Erro ao apagar o registro ${id}`,
          description: 'Erro ao tentar apagar o registro, entre em contato com o suporte: ' + err.message,
          type: 'background',
          variant: 'destructive',
        })
      })
  }

  function renderTableCell<TData>(cell: Cell<TData, unknown>) {
    if (cell.id !== '') {
      return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
    const label = flexRender(header.column.columnDef.header, header.getContext())

    return <TableHead key={`${header.id}-TH`}>{header.isPlaceholder ? null : label}</TableHead>
  }

  return (
    <div>
      <div className="flex items-end justify-between text-left">
        <div className="mb-10 rounded-lg border-b-2 border-gray-300 bg-white px-5 shadow-sm shadow-black">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="text-left">
                  <h2 className="text-[1.5rem] font-bold">Busca</h2>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-5 text-left italic">
                  Escolha uma das colunas no seletor e digite o texto que deseja procurar.
                </p>
                <div className="flex gap-5">
                  <select value={searchColumn} onChange={(e) => setSearchColumn(e.target.value)}>
                    {SearchColumnsSelectOptions}
                  </select>
                  <Input
                    placeholder="Escolha a coluna que deseja filtrar..."
                    value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''}
                    className="w-[700px]"
                    type="text"
                    {...register('search')}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mb-10 text-right">
          <Button className="w-20" variant={'default'} onClick={pushToProperRoute}>
            Novo
          </Button>
        </div>
        {dialogSkeleton}
        {dialogForm}
      </div>
      <div className="shadow-md shadow-black">
        <Table className="bg-white ">
          <TableHeader className="bg-[#68b3c6] text-white ">{tableHeaderRow}</TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const idValue = row.getValue('id') as number
                return (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer  hover:bg-primary-dark hover:text-primary-foreground"
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => handleEditState(idValue)}
                  >
                    {row.getVisibleCells().map((cell) => renderTableCell(cell))}
                    <TableCell className="flex cursor-pointer gap-2">
                      <button
                        aria-label="Deletar"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(idValue)
                          setButtonIsLoading(true)
                          setCurrentSelectedItem(idValue)
                        }}
                      >
                        {buttonIsLoading && currentSelectedItem === idValue ? (
                          <div className="animate-spin">
                            <ImSpinner9 />
                          </div>
                        ) : (
                          <Trash size={24} />
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado
                  <p className="font-bold text-destructive">A coluna selecionada na busca é a correta?</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
