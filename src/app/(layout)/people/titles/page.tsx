import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/people/titles/columns'
import { DialogModal } from './DialogModal'
import { TMembersTitles } from '@/types/TMembersTitles'
import { getData } from '@/utils/fetchData'
import { DialogSkeleton } from './DialogSkeleton'

let data: TMembersTitles[] = []
async function retrieveData() {
  data = await getData<TMembersTitles[]>({
    endpoint: 'titles',
  }).then((data) => {
    console.log('Finished MemberTitlesGrid fetch')
    return data
  })

  return data
}

console.log('Started MemberTitlesGrid fetch')

retrieveData()
export default function MemberTitlesGrid() {
  return (
    <center>
      <div className="m-10">
        <DataTable data={data} columns={columns} dialogForm={<DialogModal />} dialogSkeleton={<DialogSkeleton />} />
      </div>
    </center>
  )
}
