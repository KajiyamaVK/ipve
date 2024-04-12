import { createConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

interface IPeopleTitlesResponse {
  id: number
  name: string
}

export async function getPeopleTitles(id?: number) {
  const query = `
      SELECT
        id,
        name
      FROM peopleTitles
      ${id ? `WHERE id = ?` : ''}
      `

  let data: IPeopleTitlesResponse[] = []

  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  if (id) {
    return conn
      .query(query, id)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
      })
      .then(() => {
        return Response.json(data[0], { status: 200 })
      })
      .catch((error) => {
        console.error(`Error fetching titles: ${error}`)
        return Response.json({ message: 'Error fetching titles' }, { status: 500 })
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
        console.error(`Error fetching titles: ${error}`)
        return Response.json({ message: 'Error fetching titles' }, { status: 500 })
      })
      .finally(() => {
        conn.release()
      })
  }
}

export async function savePeopleTitle(name: string) {
  if (!name) return Response.json({ message: 'Name is required in the body' }, { status: 400 })

  const query = `
      INSERT INTO peopleTitles (name)
      VALUES (?)
      `
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  return conn
    .query(query, name)
    .then(() => {
      return Response.json({ message: 'Title saved' }, { status: 201 })
    })
    .catch((error) => {
      console.error(`Error saving title: ${error}`)
      return Response.json({ message: 'Error saving title' }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })
}

export async function updatePeopleTitle(id: number, name: string) {
  if (!id || !name) return Response.json({ message: 'ID and Name are required in the body' }, { status: 400 })

  const query = `
      UPDATE peopleTitles
      SET name = ?
      WHERE id = ?
      `
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  return conn
    .query(query, [name, id])
    .then(() => {
      return Response.json({ message: 'Title updated' }, { status: 200 })
    })
    .catch((error) => {
      console.error(`Error updating title: ${error}`)
      return Response.json({ message: 'Error updating title' }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })
}

export async function deletePeopleTitle(id: number) {
  if (!id) return Response.json({ message: 'ID is required in the body' }, { status: 400 })

  const query = `
      DELETE FROM peopleTitles
      WHERE id = ?
      `
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  return conn
    .query(query, id)
    .then(() => {
      return Response.json({ message: 'Title deleted' }, { status: 200 })
    })
    .catch((error) => {
      console.error(`Error deleting title: ${error}`)
      return Response.json({ message: 'Error deleting title' }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })
}
