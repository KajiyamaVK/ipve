'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'
import { TMembers } from '@/types/TMembers'

export const columns: ColumnDef<TMembers>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
  },
  {
    accessorKey: 'fullname',
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
                key={role}
                className={`mr-2 text-white ${row.getValue} px-2 pt-1 pb-2 rounded-lg`}
              >
                {role}
              </span>
            ))}
          </div>
        )
    },
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Data de Nascimento',
  },
  {
    accessorKey: 'address',
    header: 'Endereço',
  },
  {
    accessorKey: 'complement',
    header: 'Complemento',
  },
  {
    accessorKey: 'suburb',
    header: 'Bairro',
  },
  {
    accessorKey: 'city',
    header: 'Cidade',
  },
  {
    accessorKey: 'uf',
    header: 'UF',
  },
  {
    accessorKey: 'cep',
    header: 'Cep',
  },
  {
    accessorKey: 'phone1',
    header: 'Telefone 1',
  },
  {
    accessorKey: 'phone1isWhatsapp',
    header: 'Whatsapp?',
  },
  {
    accessorKey: 'phone2',
    header: 'Telefone 2',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'photoUrl',
    header: 'Url da Foto',
  },
]
