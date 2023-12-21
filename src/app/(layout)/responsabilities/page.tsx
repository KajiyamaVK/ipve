import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/responsabilities/columns'
import { responsabilities } from '@/data/responsabilities'

export default function responsabilitiesGrid() {
  return (
    <center>
      <div className="m-10">
        <DataTable
          columns={columns}
          data={responsabilities}
          formType="dialog"
        />
      </div>
    </center>
  )
}
