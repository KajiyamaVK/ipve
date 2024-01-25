import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/people/roles/columns'
import { DialogModalSkeleton } from './DialogModalSkeleton'
import { DialogModal } from './DialogModal'
import { TRoles } from '@/types/TRoles'
import { getData } from '@/utils/fetchData'

export default async function RolesGrid() {
  let data: TRoles[] = []
  async function retrieveData() {
    data = await getData<TRoles[]>({
      endpoint: 'roles',
    }).then((data) => {
      return data
    })
  }

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
