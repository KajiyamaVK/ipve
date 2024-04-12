'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'
import { TLocations } from '@/types/TLocations'

export const columns: ColumnDef<TLocations>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
  },
  {
    accessorKey: 'locationName',
    header: ({ column }) => <SortedGridHeader column={column} label="Local" />,
  },
  {
    header: 'Descrição',
    accessorKey: 'locationDesc',
  },
]
