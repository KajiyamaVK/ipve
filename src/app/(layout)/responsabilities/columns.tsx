'use client'

import { Button } from '@/components/ui/button'
import { TResponsabilities } from '@/types/TResponsabilities'
import { CaretUpDown, CaretDown, CaretUp } from '@phosphor-icons/react'
import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'

export const columns: ColumnDef<TResponsabilities>[] = [
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
    accessorKey: 'tailwindThemeColor',
    cell: ({ row }) => {
      const color = row.getValue('tailwindThemeColor')

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
