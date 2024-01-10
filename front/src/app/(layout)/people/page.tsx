'use client'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { useEffect, useState } from 'react'
import { getAllData } from '@/utils/fetchData'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'

export default function People() {
  const [people, setPeople] = useState<TPeopleGridHeader[]>([])

  useEffect(() => {
    getPeople()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getPeople() {
    const data = await getAllData({
      endpoint: 'people',
    })
    setPeople(data as TPeopleGridHeader[])
  }

  return (
    <center>
      <div className="m-10">
        <DataTable
          dataValues={people}
          columns={columns}
          getData={getPeople}
          setData={setPeople}
        />
      </div>
    </center>
  )
}
