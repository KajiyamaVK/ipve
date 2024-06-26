import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/locations/columns'
import { DialogModalSkeleton } from './DialogModalSkeleton'
import { DialogModal } from './DialogModal'
import { TLocations } from '@/types/TLocations'
import { getLocations } from './functions'
import { IDBResponse } from '@/types/IDBResponse'

let data: TLocations[] = []

async function retrieveData() {
  try {
    const response: IDBResponse = await getLocations()
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data = response.data as TLocations[]
  } catch (error) {
    console.error(error)
  }
}

export default async function LocationsGrid() {
  await retrieveData()

  return (
    <center>
      <div className="m-10">
        <DataTable
          columns={columns}
          data={data}
          dialogForm={<DialogModal data={data} />}
          dialogSkeleton={<DialogModalSkeleton />}
        />
      </div>
    </center>
  )
}
