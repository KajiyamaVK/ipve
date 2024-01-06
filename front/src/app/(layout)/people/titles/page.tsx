'use client'

import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/people/titles/columns'
import { DialogModal } from './DialogModal'
import { useEffect, useState } from 'react'
import { TMembersTitles, ZMembersTitles } from '@/types/TMembersTitles'
import { toast } from '@/components/ui/use-toast'

export default function MemberTitlesGrid() {
  const [data, setData] = useState<TMembersTitles[]>([])

  useEffect(() => {
    getTitles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getTitles() {
    const endPoint = `${process.env.NEXT_PUBLIC_API_URL}/people/titles`

    await fetch(endPoint, {
      cache: 'no-cache',
    })
      .then(async (response) => {
        const json = await response.json()
        const gridData: TMembersTitles[] = json.map((item: TMembersTitles) =>
          ZMembersTitles.parse(item),
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
          getData={getTitles}
          setData={setData}
          dataValues={data}
          dialogForm={
            <DialogModal setData={setData} getData={getTitles} data={data} />
          }
        />
      </div>
    </center>
  )
}
