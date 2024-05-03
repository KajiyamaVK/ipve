'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'
import { TPeopleTitles } from '@/types/TPeopleTitles'

export const columns: ColumnDef<TPeopleTitles>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <SortedGridHeader column={column} label="Cargo" />,
  },
]
