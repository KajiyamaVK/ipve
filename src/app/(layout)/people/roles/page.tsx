'use client'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/people/roles/columns'
import { DialogModalSkeleton } from './DialogModalSkeleton'
import { DialogModal } from './DialogModal'
import { TRoles } from '@/types/TRoles'
import { getData } from '@/utils/fetchData'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'

export default async function RolesGrid() {
  //let data: TRoles[] = []
  const [data, setData] = useState<TRoles[]>([])
  useEffect(() => {
    async function retrieveData() {
      await getData<TRoles[]>({
        endpoint: 'roles',
      })
        .then((data) => {
          if (!data) return []
          setData(data)
        })
        .catch((error) => {
          console.error(error.message)
          toast({
            title: 'Error',
            description:
              'Um erro ocorreu ao tentar buscar os dados das funções. Por favor, tente novamente ou entre em contato com o suporte.' +
              error.message,
            variant: 'destructive',
          })
        })
    }
    retrieveData()
  }, [])

  return (
    <center>
      <div className="m-10">
        <DataTable
          columns={columns}
          data={data}
          dialogForm={<DialogModal />}
          dialogSkeleton={<DialogModalSkeleton />}
        />
      </div>
    </center>
  )
}
