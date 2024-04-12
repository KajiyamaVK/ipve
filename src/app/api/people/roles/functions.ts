import { createConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

interface IPeopleRolesResponse {
  id: number
  name: string
  description: string
  tailwindColor: string
}

export async function getPeopleRoles(id?: number) {
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  const query = `
      SELECT
        id,
        name,
        description,
        tailwindColor
      FROM peopleRoles
      ${id ? `WHERE id = ?` : ''}
      `

  let data: IPeopleRolesResponse[] = []

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
        console.error(`Error fetching roles: ${error}`)
        return Response.json({ message: 'Error fetching roles' }, { status: 500 })
      })
      .finally(() => {
        conn.release()
      })
  } else {
    return conn
      .query(query, id)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
      })
      .then(() => {
        return new Response(JSON.stringify(data), { status: 200 })
      })
      .catch((error) => {
        console.error(`Error fetching roles: ${error}`)
        return Response.json({ message: 'Error fetching roles' }, { status: 500 })
      })
      .finally(() => {
        conn.release()
      })
  }
}

export async function savePeopleRole(name: string, description: string, tailwindColor: string) {
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  if (!name) return Response.json({ message: 'Name is required in the body' }, { status: 400 })

  const query = `
      INSERT INTO peopleRoles (
        name,
        description,
        tailwindColor)
      VALUES (?,?,?)
      `

  return conn
    .query(query, [name, description, tailwindColor])
    .then(() => {
      return Response.json({ message: 'role saved' }, { status: 201 })
    })
    .catch((error) => {
      console.error(`Error saving role: ${error}`)
      return Response.json({ message: 'Error saving role' }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })
}

export async function updatePeopleRole(id: number, name: string, description: string, tailwindColor: string) {
  const query = `
  UPDATE peopleRoles
  SET name = ?,
  description = ?,
  tailwindColor = ?
  WHERE id = ?
  `

  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  return await conn
    .query(query, [name, description, tailwindColor, id])
    .then(() => {
      return Response.json({ message: 'Role updated' }, { status: 200 })
    })
    .catch((error) => {
      console.error(`Error updating role: ${error}`)
      return Response.json({ message: 'Error updating role' }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })
}

export async function deletePeopleRole(id: number) {
  if (!id) return Response.json({ message: 'ID is required in the body' }, { status: 400 })

  const query = `
      DELETE FROM peopleRoles
      WHERE id = ?
      `
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  return await conn
    .query(query, id)
    .then(() => {
      return Response.json({ message: 'Role deleted' }, { status: 200 })
    })
    .catch((error) => {
      console.error(`Error deleting role: ${error}`)
      return Response.json({ message: 'Error deleting role' }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })
}
