'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'

export const columns: ColumnDef<TPeopleGridHeader>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
    size: 1,
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => <SortedGridHeader column={column} label="Nome" />,
    cell: ({ renderValue }) => <div className="text-sm">{renderValue() as string}</div>,
    size: 1,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortedGridHeader column={column} label="Cargo" />,
  },
  {
    accessorKey: 'roles',
    header: 'Funções',
    cell: ({ renderValue }) => {
      let value: string = ''
      value = renderValue() as string
      if (!value) return <div className="text-sm">-</div>
      return <div className="text-sm">{value.replace(';', ', ')}</div>
    },
  },
]
