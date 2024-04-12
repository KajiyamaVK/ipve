/* eslint-disable @typescript-eslint/no-explicit-any */

import { TLocations } from '@/types/TLocations'
import { createConnection } from '@/utils/database'
import { FieldPacket, QueryResult, RowDataPacket } from 'mysql2'
import { NextResponse } from 'next/server'

export async function getLocations(id?: number) {
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

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
      ? ((await conn.query(query, id)) as [RowDataPacket[], any])
      : ((await conn.query(query)) as [RowDataPacket[], any])

    conn.release()
    if (results.length === 0) {
      // Checando se existem resultados.
      return NextResponse.json({ error: 'Não há cadastros de locais disponíveis no momento.' }, { status: 400 })
      //return new Response(JSON.stringify({ message: 'Error fetching products' }), { status: 500 })
    }

    return new Response(JSON.stringify(results), { status: 200 })
  } catch (error) {
    console.error(`Error fetching locations: ${error}`)
    return NextResponse.json({ error: 'Error fetching locations' }, { status: 500 })
  }
}

export async function saveLocations(body: TLocations) {
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  try {
    const query = `
    INSERT INTO locations (locationName, locationDesc)
    VALUES (?, ?)
    `
    return await conn
      .execute(query, [body.locationName, body.locationDesc])
      .then((value: [QueryResult, FieldPacket[]]) => {
        conn.release()
        return new Response(JSON.stringify(value[0]), { status: 200 })
      })
  } catch (error) {
    console.error(`Error saving locations: ${error}`)
    return NextResponse.json({ error: 'Error saving locations' }, { status: 500 })
  }
}

export async function updateLocations(id: number, body: TLocations) {
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  try {
    const query = `
    UPDATE locations
    SET locationName = ?, locationDesc = ?
    WHERE id = ?
    `
    return await conn
      .execute(query, [body.locationName, body.locationDesc, id])
      .then((value: [QueryResult, FieldPacket[]]) => {
        conn.release()
        return new Response(JSON.stringify(value), { status: 200 })
      })
  } catch (error) {
    console.error(`Error updating locations: ${error}`)
    return NextResponse.json({ error: 'Error updating locations' }, { status: 500 })
  }
}

export async function deleteLocations(id: number) {
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  try {
    const query = `
    DELETE FROM locations
    WHERE id = ?
    `
    return await conn.execute(query, [id]).then((value: [QueryResult, FieldPacket[]]) => {
      conn.release()

      return new Response(JSON.stringify(value[0]), { status: 200 })
    })
  } catch (error) {
    console.error(`Error deleting locations: ${error}`)
    return NextResponse.json({ error: 'Error deleting locations' }, { status: 500 })
  }
}
