'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'

export const columns: ColumnDef<TPeopleGridHeader>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
    size: 1,
    cell: ({ renderValue }) => <div className="ml-2 md:ml-10">{renderValue() as string}</div>,
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
      const role = renderValue() as { name: string; color: string }[]

      return (
        <div className="flex flex-wrap">
          {role.map((r, index) => (
            <div key={index} className={` m-1 rounded-lg  px-2 py-1 text-xs  text-white ${r.color}`}>
              {r.name || '-'}
            </div>
          ))}
        </div>
      )
    },
  },
]
