import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { DialogModalSkeleton } from './DialogModalSkeleton'
import { DialogModal } from './DialogModal'
import { TRoles } from '@/types/TPeopleRoles'
import { IDBResponse } from '@/types/IDBResponse'
import { getPeopleRoles } from './functions'

let data: TRoles[] = []

async function retrieveData() {
  try {
    const response: IDBResponse = await getPeopleRoles()
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data = response.data as TRoles[]
  } catch (error) {
    console.error(error)
  }
}

export default async function RolesGrid() {
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
