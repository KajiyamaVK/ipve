import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { IDBResponse } from '@/types/IDBResponse'
import { getPeople } from './functions'
import { TPeople } from '@/types/TPeople'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let data: any[] = []
async function retrieveData() {
  try {
    const response: IDBResponse = await getPeople()
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data = response.data as TPeople[]
  } catch (error) {
    console.error(error)
  }
}

export default async function People() {
  await retrieveData()

  return (
    <center>
      <div className="m-10">
        <DataTable columns={columns} data={data} />
      </div>
    </center>
  )
}
