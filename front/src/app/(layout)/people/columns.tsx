'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SortedGridHeader } from '@/components/ui/sortedGridHeader'
import { TMembersGridHeader } from '@/types/TMembersGridHeader'
import { TMembers } from '@/types/TMembers'

export const columns: ColumnDef<TMembers>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
  },
  {
    accessorKey: 'name',
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
                {role.name}
              </span>
            ))}
          </div>
        )
    },
  },
  {
    accessorKey: 'email',
    accessorFn: (row) => row.email,
    header: 'Email',
  },
  {
    accessorKey: 'mainPhone',
    accessorFn: (row) => row.mainPhone,
    header: 'Telefone Principal',
  },
  {
    accessorKey: 'dateOfBirth',
    accessorFn: (row) => row.dateOfBirth,
    header: 'Data de Nascimento',
  },
]
// export const columns: ColumnDef<TMembersGridHeader>[] = [
//   {
//     accessorKey: 'id',
//     header: ({ column }) => <SortedGridHeader column={column} label="ID" />,
//   },
//   {
//     accessorKey: 'name',
//     header: ({ column }) => <SortedGridHeader column={column} label="Nome" />,
//   },
//   {
//     accessorKey: 'memberTitle',
//     header: ({ column }) => <SortedGridHeader column={column} label="Cargo" />,
//   },
//   {
//     accessorKey: 'roles',
//     header: 'Funções',
//     cell: ({ row }) => {
//       const roles = row.original.roles
//       if (roles)
//         return (
//           <div>
//             {roles.map((role) => (
//               <span
//                 key={role.name.toLowerCase()}
//                 className={`mr-2 text-white ${role.color} px-2 pt-1 pb-2 rounded-lg`}
//               >
//                 {role.name}
//               </span>
//             ))}
//           </div>
//         )
//     },
//   },
//   {
//     accessorKey: 'email',
//     accessorFn: (row) => row.email,
//     header: 'Email',
//   },
//   {
//     accessorKey: 'mainPhone',
//     accessorFn: (row) => row.mainPhone,
//     header: 'Telefone Principal',
//   },
//   {
//     accessorKey: 'dateOfBirth',
//     accessorFn: (row) => row.dateOfBirth,
//     header: 'Data de Nascimento',
//   },
// ]
