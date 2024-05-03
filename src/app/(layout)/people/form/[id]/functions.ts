'use server'
import { getDatabaseConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

export interface IKinsRelationsSTDTitles {
  id: number
  relationName: string
}

export async function getKinsRelationsSTD() {
  let data: IKinsRelationsSTDTitles[] = []
  const Conn = await getDatabaseConnection()

  const query = `
      SELECT
        id,
        relationName
      FROM stdKinsRelations
      `

  return Conn.query(query)
    .then((value: [QueryResult, FieldPacket[]]) => {
      data = JSON.parse(JSON.stringify(value[0]))
    })
    .then(() => {
      return { data, status: 200 }
    })
    .catch((error) => {
      console.error(`Error fetching kins relations: ${error}`)
      return { message: 'Error fetching kins relations', status: 500 }
    })
    .finally(() => {
      Conn.end()
    })
}
