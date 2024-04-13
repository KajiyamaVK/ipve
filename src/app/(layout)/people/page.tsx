import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { getData } from '@/utils/fetchData'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'

async function retrieveData() {
  const data = await getData<TPeopleGridHeader[]>({
    endpoint: 'people',
  }).then((data) => {
    if (data) return data
    else return []
  })
  return data
}

export default async function People() {
  const dataValues: TPeopleGridHeader[] = await retrieveData()

  return (
    <center>
      <div className="m-10">
        <DataTable columns={columns} data={dataValues} />
      </div>
    </center>
  )
}
