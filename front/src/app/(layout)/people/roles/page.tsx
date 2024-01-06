'use client'

import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/people/roles/columns'
import { DialogModal } from './DialogModal'
import { TRoles, ZRoles } from '@/types/TRoles'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'

export default function RolesGrid() {
  const [data, setData] = useState<TRoles[]>([])

  useEffect(() => {
    getRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getRoles() {
    console.log('getRoles')
    const endPoint = `${process.env.NEXT_PUBLIC_API_URL}/people/roles`

    await fetch(endPoint, {
      cache: 'no-cache',
    })
      .then(async (response) => {
        const json = await response.json()
        const gridData: TRoles[] = json.map((item: TRoles) =>
          ZRoles.parse(item),
        )
        console.log('gridData', gridData)
        setData(gridData)
      })

      .catch((error) => {
        toast({
          title: 'Erro ao carregar dados',
          description: `Não foi possível carregar os dados: ${error}`,
          variant: 'destructive',
        })
      })
  }

  return (
    <center>
      <div className="m-10">
        <DataTable
          columns={columns}
          dataValues={data}
          setData={setData}
          getData={getRoles}
          dialogForm={
            <DialogModal setData={setData} getData={getRoles} data={data} />
          }
        />
      </div>
    </center>
  )
}
