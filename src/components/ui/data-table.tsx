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
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pencil, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { useRouter, usePathname } from 'next/navigation'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

type routeType = 'register' | 'edit'

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const router = useRouter()
  const currentRoute = usePathname()

  function pushToProperRoute(routeType: routeType) {
    const registerRoute = `${currentRoute}/${routeType}`
    router.push(registerRoute)
  }

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

  return (
    <div>
      <div className="text-right">
        <Button
          className="w-20"
          variant={'default'}
          onClick={() => pushToProperRoute('register')}
        >
          Novo
        </Button>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Procurar pela função ou descrição"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-lg w-96"
        />
      </div>
      <Table>
        <TableHeader className="text-white bg-[#68b3c6] ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                )
              })}
              <TableHead>Ações</TableHead>
            </TableRow>
          ))}
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
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    )
                  })}
                  <TableCell className="flex gap-2 cursor-pointer">
                    <Pencil size={24} />
                    <Trash size={24} />
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
