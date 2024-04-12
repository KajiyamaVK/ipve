import { createConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

export async function getKinsRelations(id: number) {
  const query = `
      SELECT
        idKinB,
        relation
      FROM kinsRelations
      WHERE idKinA = ?
      `

  let data: { idKinB: number; relation: string }[] = []
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  return conn
    .query(query, id)
    .then((value: [QueryResult, FieldPacket[]]) => {
      data = JSON.parse(JSON.stringify(value))
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
