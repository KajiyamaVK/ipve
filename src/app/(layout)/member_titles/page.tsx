import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/member_titles/columns'
import { DialogModal } from './DialogModal'
import { memberTitlesData } from '@/data/memberTitles'

export default function memberTitlesGrid() {
  return (
    <center>
      <div className="m-10">
        <DataTable
          columns={columns}
          data={memberTitlesData}
          dialogForm={<DialogModal />}
        />
      </div>
    </center>
  )
}
