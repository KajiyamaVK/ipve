'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TLocations } from '@/types/TLocations'
import { getDatabaseConnection } from '@/utils/database'
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2'
import { NextResponse } from 'next/server'

export async function getLocations(id?: number) {
  const Conn = await getDatabaseConnection()
  try {
    const query = `
    SELECT 
      id,
      locationName,
      locationDesc
    FROM locations
    ${id ? 'WHERE id = ?' : ''}
    `
    // Usando asserção de tipos para informar ao TypeScript o formato esperado da resposta.
    const [results] = id
      ? ((await Conn.query(query, id)) as [RowDataPacket[], any])
      : ((await Conn.query(query)) as [RowDataPacket[], any])

    if (results.length === 0) {
      // Checando se existem resultados.
      return { error: 'Não há cadastros de locais disponíveis no momento.', status: 400 }
      //return new Response(JSON.stringify({ message: 'Error fetching products' }), { status: 500 })
    }

    return new Response(JSON.stringify(results), { status: 200 })
  } catch (error) {
    console.error(`Error fetching locations: ${error}`)
    return { error: 'Error fetching locations', status: 500 }
  }
}

export async function saveLocations(body: TLocations) {
  const Conn = await getDatabaseConnection()
  try {
    const query = `
      INSERT INTO locations (locationName, locationDesc)
      VALUES (?, ?)
      `
    await Conn.execute(query, [body.locationName, body.locationDesc])
  } catch (error) {
    console.error(`Error saving locations: ${error}`)
    return { error: 'Error saving locations', status: 500 }
  }
}

export async function updateLocations(body: TLocations) {
  const Conn = await getDatabaseConnection()
  try {
    const query = `
    UPDATE locations
    SET locationName = ?, locationDesc = ?
    WHERE id = ?
    `
    await Conn.execute(query, [body.locationName, body.locationDesc, body.id])
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
    Conn.execute(query, [id]).catch((error) => {
      console.error(`Error deleting locations: ${error}`)
      return { error: 'Error deleting locations: ' + error.message, status: 500 }
    })
    return { message: 'Local deletado com sucesso', status: 200 }
  } catch (error) {
    console.error(`Error deleting locations: ${error}`)
    return { error: 'Error deleting locations', status: 500 }
  }
}
