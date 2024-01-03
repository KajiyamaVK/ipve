import { DataTable } from '@/components/ui/data-table'
import { members } from '@/data/gridMembersData'
import { columns } from './columns'

export default function people() {
  return (
    <center>
      <div className="m-10">
        <DataTable data={members} columns={columns} />
      </div>
    </center>
  )
}
