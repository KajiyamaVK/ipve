import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/locations/columns'
import { DialogModalSkeleton } from './DialogModalSkeleton'
import { DialogModal } from './DialogModal'
import { getData } from '@/utils/fetchData'
import { TLocations } from '@/types/TLocations'

export default async function LocationsGrid() {
  const data: TLocations[] = []

  async function retrieveData() {
    const result = await getData<TLocations[]>({
      endpoint: 'locations',
    }).then((data) => {
      console.log('Finished LocationsGrid data fetch')
      return data
    })

    return result
  }

  retrieveData()

  console.log('Started LocationsGrid data fetch')

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
