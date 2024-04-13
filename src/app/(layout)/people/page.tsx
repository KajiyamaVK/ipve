import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { getData } from '@/utils/fetchData'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'

let dataValues: TPeopleGridHeader[] = []
async function retrieveData() {
  dataValues = await getData<TPeopleGridHeader[]>({
    endpoint: 'people',
  }).then((data) => {
    if (data) return data
    else return []
  })
}
export default async function People() {
  await retrieveData()
  return (
    <center>
      <div className="m-10">
        <DataTable columns={columns} data={dataValues} />
      </div>
    </center>
  )
}
