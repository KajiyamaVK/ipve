import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/roles/columns'
import { rolesData } from '@/data/rolesData'
import { DialogModal } from './DialogModal'

export default function rolesGrid() {
  return (
    <center>
      <div className="m-10">
        <DataTable
          columns={columns}
          data={rolesData}
          dialogForm={<DialogModal />}
        />
      </div>
    </center>
  )
}
