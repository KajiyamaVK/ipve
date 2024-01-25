import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import { getData } from '@/utils/fetchData'
import { TPeopleGridHeader } from '@/types/TPeopleGridHeader'
//import { Toast } from '@/components/ui/toast'

export default async function People() {
  let dataValues: TPeopleGridHeader[] = []
  async function retrieveData() {
    console.log('retrieving data')
    await getData<TPeopleGridHeader[]>({
      endpoint: 'people',
    })
      .then((data) => {
        if (data) dataValues = data
      })
      .catch((error) => {
        console.log('error', error)
        // Toast({
        //   content: 'Tivemos uma situação inesperada. Contate o time de suporte, por favor.',
        //   variant: 'destructive',
        // })
      })
  }

  await retrieveData()

  return (
    <center>
      <div className="m-10">
        <DataTable columns={columns} data={dataValues} />
      </div>
    </center>
  )
}
