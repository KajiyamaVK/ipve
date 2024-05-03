'use server'
import { getDatabaseConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

interface IPeopleTitlesResponse {
  id: number
  name: string
}

export async function getPeopleTitles(id?: number) {
  const Conn = await getDatabaseConnection()
  const query = `
      SELECT
        id,
        name
      FROM peopleTitles
      ${id ? `WHERE id = ?` : ''}
      `

  let data: IPeopleTitlesResponse[] = []

  if (id) {
    return await Conn.query(query, id)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
      })
      .then(() => {
        return { data, status: 200 }
      })
      .catch((error) => {
        console.error(`Error fetching titles: ${error}`)
        return { message: 'Error fetching titles', status: 500 }
      })
      .finally(() => {
        Conn.end()
      })
  } else {
    return Conn.query(query)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))

        return { data, status: 200 }
      })
      .catch((error) => {
        console.error(`Error fetching titles: ${error}`)
        return { message: 'Error fetching titles', status: 500 }
      })
      .finally(() => {
        Conn.end()
      })
  }
}

export async function savePeopleTitle(name: string) {
  if (!name) return { message: 'Name is required in the body', status: 400 }

  const query = `
      INSERT INTO peopleTitles (name)
      VALUES (?)
      `
  const Conn = await getDatabaseConnection()

  return Conn.query(query, name)
    .then(() => {
      return { message: 'Title saved', status: 201 }
    })
    .catch((error) => {
      console.error(`Error saving title: ${error}`)
      return { message: 'Error saving title', status: 500 }
    })
    .finally(() => {
      Conn.end()
    })
}

export async function updatePeopleTitle(id: number, name: string) {
  if (!id || !name)
    return {
      message: 'Erro interno. Por favor, entre em contato com o suporte. ID and Name are required in the body',
      status: 400,
    }

  const Conn = await getDatabaseConnection()

  const query = `
      UPDATE peopleTitles
      SET name = ?
      WHERE id = ?
      `

  return await Conn.query(query, [name, id])
    .then(() => {
      return { message: 'Title updated', status: 200 }
    })
    .catch((error) => {
      console.error(`Error updating title: ${error}`)
      return { message: 'Error updating title', status: 500 }
    })
    .finally(() => {
      Conn.end()
    })
}

export async function deletePeopleTitle(id: number) {
  if (!id) return { message: 'ID is required in the body', status: 400 }

  const Conn = await getDatabaseConnection()

  const checkIfTitleIsInUse = `
      SELECT 1
      FROM people
      WHERE titleIdFK = ?
      GROUP BY titleIdFK
      `
  const value: [QueryResult, FieldPacket[]] = await Conn.query(checkIfTitleIsInUse, [id])

  if (Array.isArray(value[0]) && value[0].length > 0) {
    return {
      message:
        'Esse cargo está em uso e não pode ser apagado. Para apagar o registro, remova o cargo no cadastro de pessoas',
      status: 400,
    }
  }

  const query = `
      DELETE FROM peopleTitles
      WHERE id = ?
      `

  return Conn.query(query, id)
    .then(() => {
      return { message: 'Cargo apagado com sucesso.', status: 200 }
    })
    .catch((error) => {
      console.error(`Error deleting title: ${error}`)
      return { message: 'Error updating title', status: 500 }
    })
    .finally(() => {
      Conn.end()
    })
}
