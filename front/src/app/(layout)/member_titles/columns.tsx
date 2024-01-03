'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'
import { TMembersTitles } from '@/types/TMembersTitles'

export const columns: ColumnDef<TMembersTitles>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <SortedGridHeader column={column} label="Cargo" />,
  },
  {
    header: 'Descrição',
    accessorKey: 'description',
  },
]
