'use client'

import { TRoles } from '@/types/TRoles'
import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'

export const columns: ColumnDef<TRoles>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <SortedGridHeader column={column} label="Função" />,
  },
  {
    header: 'Descrição',
    accessorKey: 'description',
  },
  {
    header: 'Cor',
    accessorKey: 'tailwindColor',
    cell: ({ row }) => {
      const color = row.getValue('tailwindColor')

      return (
        <div>
          <div
            className={'w-5 h-5 rounded-full  shadow-black shadow-sm ' + color}
          />
        </div>
      )
    },
  },
]
