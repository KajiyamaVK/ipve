'use server'
import { getDatabaseConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

export interface IKinsRelationsResponse {
  id: number
  relationName: string
}

export async function getKinsRelationsSTD(id?: number) {
  let data: IKinsRelationsResponse[] = []
  const Conn = await getDatabaseConnection()

  const query = `
      SELECT
        id,
        relationName
      FROM stdKinsRelations
      ${id ? `WHERE id = ?` : ''}
      `

  if (id) {
    return await Conn.query(query, id)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
        return { data, status: 200 }
      })
      .catch((error) => {
        console.error(`Error fetching kins relations: ${error}`)
        return { message: 'Error fetching kins relations', status: 500 }
      })
  } else {
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
  }
}

export async function getKinsRelations(id: number) {
  const query = `
      SELECT
        idKinB,
        relation
      FROM kinsRelations
      WHERE idKinA = ?
      `

  let data: { idKinB: number; relation: string }[] = []
  const Conn = await getDatabaseConnection()

  return Conn.query(query, id)
    .then((value: [QueryResult, FieldPacket[]]) => {
      data = JSON.parse(JSON.stringify(value))
    })
    .then(() => {
      return JSON.stringify(data), { status: 200 }
    })
    .catch((error) => {
      console.error(`Error fetching kins relations: ${error}`)
      return new Response('Error fetching kins relations', { status: 500 })
    })
}

// export async function getKinsRelations(id: number) {
//   const query = `
//       SELECT
//         idKinB,
//         relation
//       FROM kinsRelations
//       WHERE idKinA = ?
//       `

//   let data: { idKinB: number; relation: string }[] = []
//   const Conn = await createConnection()
//   const Conn = await Conn.getConnection()

//   return Conn
//     .query(query, id)
//     .then((value: [QueryResult, FieldPacket[]]) => {
//       data = JSON.parse(JSON.stringify(value))
//     })
//     .then(() => {
//       return new Response(JSON.stringify(data), { status: 200 })
//     })
//     .catch((error) => {
//       console.error(`Error fetching kins relations: ${error}`)
//       return new Response('Error fetching kins relations', { status: 500 })
//     })
//     .finally(() => {
//       Conn.release()
//     })
// }
