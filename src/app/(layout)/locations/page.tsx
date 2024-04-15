import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/locations/columns'
import { DialogModalSkeleton } from './DialogModalSkeleton'
import { DialogModal } from './DialogModal'
import { TLocations } from '@/types/TLocations'
import { getLocations } from './functions'

let data: TLocations[] = []

async function retrieveData() {
  try {
    const response = await getLocations()
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data = await response.json()
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
