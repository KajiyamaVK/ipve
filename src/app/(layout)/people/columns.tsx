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
      const roles = renderValue() as { id: number; name: string; tailwindColor: string }[]

      return (
        <div className="flex flex-wrap">
          {roles &&
            roles.map((role) => (
              <div key={role.id} className={` m-1 rounded-lg  px-2 py-1 text-xs  text-white ${role.tailwindColor}`}>
                {role.name}
              </div>
            ))}
        </div>
      )
    },
  },
]
