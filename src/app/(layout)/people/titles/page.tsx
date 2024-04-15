import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(layout)/people/titles/columns'
import { DialogModal } from './DialogModal'
import { TMembersTitles } from '@/types/TMembersTitles'
import { DialogSkeleton } from './DialogSkeleton'
import { getPeopleTitles } from './functions'
import { IDBResponse } from '@/types/IDBResponse'

let data: TMembersTitles[] = []

async function retrieveData() {
  try {
    const response: IDBResponse = await getPeopleTitles()
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data = response.data as TMembersTitles[]
  } catch (error) {
    console.error(error)
  }
}

export default async function MemberTitlesGrid() {
  await retrieveData()

  return (
    <center>
      <div className="m-10">
        <DataTable
          data={data}
          columns={columns}
          dialogForm={<DialogModal data={data} />}
          dialogSkeleton={<DialogSkeleton />}
        />
      </div>
    </center>
  )
}
