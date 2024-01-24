import { DataTable } from '@/components/ui/data-table'
import { columns } from '../people/columns'
import { getData } from '@/utils/fetchData'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'

export default async function People() {
  let data: TPeopleGridHeader[] = []
  async function retrieveData() {
    console.log('retrieving data')
    data = await getData<TPeopleGridHeader[]>({
      endpoint: 'people',
    }).then((data) => {
      return data
    })
  }

  await retrieveData()

  console.log(data)
  return (
    <center>
      <p>test</p>
      <div className="m-10">
        <DataTable columns={columns} data={data} />
      </div>
    </center>
  )
}
