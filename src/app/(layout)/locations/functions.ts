'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDatabaseConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

interface ILocations {
  id?: number
  locationName: string
  locationDesc: string
}

export async function getLocations(id?: number) {
  const Conn = await getDatabaseConnection()

  const query = `
    SELECT 
      id,
      locationName,
      locationDesc
    FROM locations
    ${id ? 'WHERE id = ?' : ''}
    `
  let data: ILocations[] = []

  if (id) {
    return Conn.query(query, id)
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
  } else {
    return Conn.query(query)
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
  }
}

export async function saveLocations(locationName: string, locationDesc: string) {
  const Conn = await getDatabaseConnection()
  if (!locationDesc || !locationName)
    return {
      message:
        'Erro interno. Por favor, entre em contato com o suporte. Location name and location Desc are required in the body',
      status: 400,
    }
  const query = `
      INSERT INTO locations (locationName, locationDesc)
      VALUES (?, ?)
    `

  return Conn.query(query, [locationName, locationDesc])
    .then(() => {
      return { message: 'Title saved', status: 201 }
    })
    .catch((error) => {
      console.error(`Error saving title: ${error}`)
      return { message: 'Error saving title', status: 500 }
    })
}

export async function updateLocations(locationName: string, locationDesc: string, id: number) {
  if (!id || !locationName || !locationDesc)
    return {
      message:
        'Erro interno. Por favor, entre em contato com o suporte. Location name and location Desc are required in the body',
      status: 400,
    }

  const Conn = await getDatabaseConnection()
  try {
    const query = `
      UPDATE locations
      SET locationName = ?, locationDesc = ?
      WHERE id = ?
    `
    await Conn.execute(query, [locationName, locationDesc, id]).finally(() => {
      Conn.end()
    })
  } catch (error) {
    console.error(`Error updating locations: ${error}`)
  }
}

export async function deleteLocations(id: number) {
  const Conn = await getDatabaseConnection()

  try {
    const query = `
    DELETE FROM locations
    WHERE id = ?
    `
    Conn.execute(query, [id])
      .catch((error) => {
        console.error(`Erro interno. Favor entrar em contato com o suporte. \nError deleting locations: ${error}`)
        return {
          error: 'Erro interno. Favor entrar em contato com o suporte. \nError deleting locations: ' + error.message,
          status: 500,
        }
      })
      .finally(() => {
        Conn.end()
      })
    return { message: 'Local deletado com sucesso', status: 200 }
  } catch (error) {
    console.error(`Erro interno. Favor entrar em contato com o suporte. \nError deleting locations: ${error}`)
    return { error: 'Erro interno. Favor entrar em contato com o suporte. \nError deleting locations', status: 500 }
  }
}
