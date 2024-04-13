import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/people/roles/columns'
import { DialogModalSkeleton } from './DialogModalSkeleton'
import { DialogModal } from './DialogModal'
import { TRoles } from '@/types/TRoles'
import { getData } from '@/utils/fetchData'

const data: TRoles[] = []

async function retrieveData() {
  const result = await getData<TRoles[]>({
    endpoint: 'roles',
  }).then((data) => {
    console.log('Finished RolesGrid data fetch')
    return data
  })

  return result
}

console.log('Start RolesGrid data fetch')

retrieveData()
export default async function RolesGrid() {
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
