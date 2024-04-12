import { createConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

interface IKinsRelationsResponse {
  id: number
  relationName: string
}

export async function getKinsRelationsLabels(id?: number) {
  const Conn = await createConnection()
const conn = await Conn.getConnection()

  const query = `
      SELECT
        id,
        relationName
      FROM stdKinsRelations
      ${id ? `WHERE id = ?` : ''}
      `

  let data: IKinsRelationsResponse[] = []

  if (id) {
    return conn
      .query(query, id)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
      })
      .then(() => {
        return new Response(JSON.stringify(data[0]), { status: 200 })
      })
      .catch((error) => {
        console.error(`Error fetching kins relations: ${error}`)
        return new Response('Error fetching kins relations', { status: 500 })
      })
      .finally(() => {
        conn.release()
      })
  } else {
    return conn
      .query(query)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
      })
      .then(() => {
        return new Response(JSON.stringify(data), { status: 200 })
      })
      .catch((error) => {
        console.error(`Error fetching kins relations: ${error}`)
        return new Response('Error fetching kins relations', { status: 500 })
      })
      .finally(() => {
        conn.release()
      })
  }
}
