import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'

export const columns: ColumnDef<TPeopleGridHeader>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
  },
  {
    accessorKey: 'fullname',
    header: ({ column }) => <SortedGridHeader column={column} label="Nome" />,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <SortedGridHeader column={column} label="Cargo" />,
  },
  {
    accessorKey: 'roles',
    header: 'Funções',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Data de Nascimento',
  },
  {
    accessorKey: 'phone1',
    header: 'Telefone 1',
  },
  {
    accessorKey: 'isPhone1WhatsApp',
    header: ({ column }) => (
      <SortedGridHeader column={column} label="Whatsapp?" />
    ),
  },
]
