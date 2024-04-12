import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/locations/columns'
import { DialogModalSkeleton } from './DialogModalSkeleton'
import { DialogModal } from './DialogModal'
import { getData } from '@/utils/fetchData'
import { TLocations } from '@/types/TLocations'

export default async function LocationsGrid() {
  let places: TLocations[] = []

  async function retrieveData() {
    places = await getData<TLocations[]>({
      endpoint: 'locations',
    }).then((data) => {
      if (!data) return []
      return data
    })
  }

  await retrieveData()
  console.log('LocationsGrid rendered')
  return (
    <center>
      <div className="m-10">
        <DataTable
          columns={columns}
          data={places}
          dialogForm={<DialogModal />}
          dialogSkeleton={<DialogModalSkeleton />}
        />
      </div>
    </center>
  )
}
