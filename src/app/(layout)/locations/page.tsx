import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/locations/columns'
import { DialogModalSkeleton } from './DialogModalSkeleton'
import { DialogModal } from './DialogModal'
import { getData } from '@/utils/fetchData'
import { TLocations } from '@/types/TLocations'

let data: TLocations[] = []

async function retrieveData() {
  data = await getData<TLocations[]>({
    endpoint: 'locations',
  }).then((data) => {
    return data
  })

  return data
}

export default async function LocationsGrid() {
  await retrieveData()

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
