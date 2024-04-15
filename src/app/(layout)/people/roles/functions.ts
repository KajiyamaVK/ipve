'use server'

import { getDatabaseConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

interface IPeopleRolesResponse {
  id: number
  name: string
  description: string
  tailwindColor: string
}

export async function getPeopleRoles(id?: number) {
  const Conn = await getDatabaseConnection()
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
    return Conn.query(query, id)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
      })
      .then(() => {
        return { data, status: 200 }
      })
      .catch((error) => {
        console.error(`Error fetching roles: ${error}`)
        return { message: 'Error fetching roles', status: 500 }
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
        console.error(`Error fetching roles: ${error}`)
        return { message: 'Error fetching roles', status: 500 }
      })
  }
}

export async function savePeopleRole(roleName: string, description: string, tailwindColor: string) {
  const Conn = await getDatabaseConnection()

  if (!roleName) return Response.json({ message: 'Name is required in the body' }, { status: 400 })

  const query = `
      INSERT INTO peopleRoles (
        name,
        description,
        tailwindColor)
      VALUES (?,?,?)
      `

  return Conn.query(query, [roleName, description, tailwindColor])
    .then(() => {
      return { message: 'Role saved', status: 201 }
    })
    .catch((error) => {
      console.error(`Error saving role: ${error}`)
      return { message: 'Error saving role', status: 500 }
    })
}

export async function updatePeopleRole(id: number, name: string, description: string, tailwindColor: string) {
  if (!id || !name)
    return {
      message: 'Erro intenrno. Por favor, entre em contato com o suporte. ID and Name are required in the body',
      status: 400,
    }

  const Conn = await getDatabaseConnection()

  const query = `
    UPDATE peopleRoles
    SET name = ?,
      description = ?,
      tailwindColor = ?
      WHERE id = ?
    `

  return await Conn.query(query, [name, description, tailwindColor, id])
    .then(() => {
      return { message: 'Role updated', status: 200 }
    })
    .catch((error) => {
      console.error(`Error updating role: ${error}`)
      return { message: 'Error updating role', status: 500 }
    })
}

export async function deletePeopleRole(id: number) {
  if (!id) return { message: 'ID is required in the body', status: 400 }

  const Conn = await getDatabaseConnection()

  const checkIfRoleIsInUse = `
      SELECT 1
      FROM peopleRolesData
      WHERE roleIdFK = ?
      GROUP BY roleIdFK
      `
  const value: [QueryResult, FieldPacket[]] = await Conn.query(checkIfRoleIsInUse, [id])

  if (Array.isArray(value[0]) && value[0].length > 0) {
    return {
      message:
        'Essa função está em uso e não pode ser apagada. Para apagar o registro, remova a função no cadastro de pessoas',
      status: 400,
    }
  }

  const query = `
      DELETE FROM peopleRoles
      WHERE id = ?
      `

  return Conn.query(query, id)
    .then(() => {
      return { message: 'Função apagado com sucesso.', status: 200 }
    })
    .catch((error) => {
      console.error(`Error deleting role: ${error}`)
      return { message: 'Error updating role', status: 500 }
    })
}
