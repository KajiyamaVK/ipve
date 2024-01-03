'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'
import { TMembersGridHeader } from '@/types/TMembersGridHeader'

export const columns: ColumnDef<TMembersGridHeader>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
  },
  {
    accessorKey: 'memberName',
    header: ({ column }) => <SortedGridHeader column={column} label="Nome" />,
  },
  {
    accessorKey: 'memberTitle',
    header: ({ column }) => <SortedGridHeader column={column} label="Cargo" />,
  },
  {
    accessorKey: 'roles',
    header: 'Funções',
    cell: ({ row }) => {
      const roles = row.original.roles
      if (roles)
        return (
          <div>
            {roles.map((role) => (
              <span
                key={role.name.toLowerCase()}
                className={`mr-2 text-white ${role.color} px-2 pt-1 pb-2 rounded-lg`}
              >
                {role.name}
              </span>
            ))}
          </div>
        )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'mainPhone',
    header: 'Telefone Principal',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Data de Nascimento',
  },
]
