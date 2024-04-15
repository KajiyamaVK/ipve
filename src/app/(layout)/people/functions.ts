'use server'
import { createConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

interface IPeopleResponse {
  id: number
  name: string
}

export async function getPeople(id?: number) {
  const query = `
    SELECT 
      people.id,
      people.fullName,
      people.titleIdFK,
      peopleTitles.name as title,
      people.dateOfBirth,
      people.gender,
      people.address,
      people.complement,
      people.city,
      people.suburb,
      people.uf,
      people.cep,
      people.phone1,
      people.phone1IsWhatsapp,
      people.phone2,
      people.photoUrl,
      people.email,
      people.isActive,
      people.isActiveEBD,
      people.ebdClassroom,
      people.society,
      people.createdAt,
      people.updatedAt,
      people.isMember,
      people.isUser,
      people.addressNumber,
      people.hasFamilyInChurch,
      COALESCE(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', peopleRoles.name, 
            'color', peopleRoles.tailwindColor
          )
        ), JSON_ARRAY()
      ) AS roles
    FROM people
    LEFT JOIN peopleRolesData ON peopleRolesData.peopleIdFK = people.id
    LEFT JOIN peopleRoles ON peopleRoles.id = peopleRolesData.roleIdFK
    JOIN peopleTitles on titleIdFK = peopleTitles.id
    ${id ? `WHERE people.id = ?` : ''}
    GROUP BY people.id`

  let data: IPeopleResponse[] = []
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
        console.error(`Error fetching : ${error}`)
        return Response.json({ message: 'Error fetching ' }, { status: 500 })
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
        console.error(`Error fetching : ${error}`)
        return Response.json({ message: 'Error fetching ' }, { status: 500 })
      })
      .finally(() => {
        conn.release()
      })
  }
}

export async function savePeople(
  fullName: string,
  titleIdFK: number,
  dateOfBirth: string | null,
  gender: string,
  address: string,
  complement: string | null,
  city: string,
  suburb: string,
  uf: string,
  cep: string,
  phone1: string | null,
  phone1IsWhatsapp: boolean | null,
  phone2: string | null,
  photoUrl: string | null,
  email: string,
  isActive: boolean,
  isActiveEBD: boolean,
  ebdClassroom: string | null,
  society: string | null,
  isMember: boolean,
  isUser: boolean,
  addressNumber: string,
  hasFamilyInChurch: boolean,
) {
  const dataMissingInBody: string[] = []

  if (!fullName) dataMissingInBody.push('fullName')
  if (!titleIdFK) dataMissingInBody.push('titleIdFK')
  if (!gender) dataMissingInBody.push('gender')
  if (!address) dataMissingInBody.push('address')
  if (!city) dataMissingInBody.push('city')
  if (!suburb) dataMissingInBody.push('suburb')
  if (!uf) dataMissingInBody.push('uf')
  if (!cep) dataMissingInBody.push('cep')
  if (!email) dataMissingInBody.push('email')
  if (!isActive) dataMissingInBody.push('isActive')
  if (!isActiveEBD) dataMissingInBody.push('isActiveEBD')
  if (!isMember) dataMissingInBody.push('isMember')
  if (!isUser) dataMissingInBody.push('isUser')
  if (!addressNumber) dataMissingInBody.push('addressNumber')
  if (!hasFamilyInChurch) dataMissingInBody.push('hasFamilyInChurch')

  if (dataMissingInBody.length > 0) {
    return Response.json(
      { message: `The following fields are missing in the body: ${dataMissingInBody.join(', ')}` },
      { status: 400 },
    )
  }

  const query = `
    INSERT INTO people (
      fullName,
      titleIdFK,
      dateOfBirth,
      gender,
      address,
      complement,
      city,
      suburb,
      uf,
      cep,
      phone1,
      phone1IsWhatsapp,
      phone2,
      photoUrl,
      email,
      isActive,
      isActiveEBD,
      ebdClassroom,
      society,
      isMember,
      isUser,
      addressNumber,
      hasFamilyInChurch)
    VALUES (
      ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  return conn
    .query(query, [
      fullName,
      titleIdFK,
      dateOfBirth,
      gender,
      address,
      complement,
      city,
      suburb,
      uf,
      cep,
      phone1,
      phone1IsWhatsapp,
      phone2,
      photoUrl,
      email,
      isActive,
      isActiveEBD,
      ebdClassroom,
      society,
      isMember,
      isUser,
      addressNumber,
      hasFamilyInChurch,
    ])
    .then(() => {
      return Response.json({ message: 'People saved' }, { status: 201 })
    })
    .catch((error) => {
      console.error(`Error saving People: ${error}`)
      return Response.json({ message: 'Error saving ' }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })
}

export async function updatePeople(
  id: number,
  fullName: string,
  titleIdFK: number,
  dateOfBirth: string | null,
  gender: string,
  address: string,
  complement: string | null,
  city: string,
  suburb: string,
  uf: string,
  cep: string,
  phone1: string | null,
  phone1IsWhatsapp: boolean | null,
  phone2: string | null,
  photoUrl: string | null,
  email: string,
  isActive: boolean,
  isActiveEBD: boolean,
  ebdClassroom: string | null,
  society: string | null,
  isMember: boolean,
  isUser: boolean,
  addressNumber: string,
  hasFamilyInChurch: boolean,
) {
  const dataMissingInBody: string[] = []

  if (!id) dataMissingInBody.push('id')
  if (!fullName) dataMissingInBody.push('fullName')
  if (!titleIdFK) dataMissingInBody.push('titleIdFK')
  if (!gender) dataMissingInBody.push('gender')
  if (!address) dataMissingInBody.push('address')
  if (!city) dataMissingInBody.push('city')
  if (!suburb) dataMissingInBody.push('suburb')
  if (!uf) dataMissingInBody.push('uf')
  if (!cep) dataMissingInBody.push('cep')
  if (!email) dataMissingInBody.push('email')
  if (!isActive) dataMissingInBody.push('isActive')
  if (!isActiveEBD) dataMissingInBody.push('isActiveEBD')
  if (!isMember) dataMissingInBody.push('isMember')
  if (!isUser) dataMissingInBody.push('isUser')
  if (!addressNumber) dataMissingInBody.push('addressNumber')
  if (!hasFamilyInChurch) dataMissingInBody.push('hasFamilyInChurch')

  if (dataMissingInBody.length > 0) {
    return Response.json(
      { message: `The following fields are missing in the body: ${dataMissingInBody.join(', ')}` },
      { status: 400 },
    )
  }

  const query = `
      UPDATE people
      SET fullName = ?,
      titleIdFK = ?,
      dateOfBirth = ?,
      gender = ?,
      address = ?,
      complement = ?,
      city = ?,
      suburb = ?,
      uf = ?,
      cep = ?,
      phone1 = ?,
      phone1IsWhatsapp = ?,
      phone2 = ?,
      photoUrl = ?,
      email = ?,
      isActive = ?,
      isActiveEBD = ?,
      ebdClassroom = ?,
      society = ?,
      isMember = ?,
      isUser = ?,
      addressNumber = ?,
      hasFamilyInChurch = ?
      WHERE id = ?
      `

  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  return conn
    .query(query, [
      fullName,
      titleIdFK,
      dateOfBirth,
      gender,
      address,
      complement,
      city,
      suburb,
      uf,
      cep,
      phone1,
      phone1IsWhatsapp,
      phone2,
      photoUrl,
      email,
      isActive,
      isActiveEBD,
      ebdClassroom,
      society,
      isMember,
      isUser,
      addressNumber,
      hasFamilyInChurch,
      id,
    ])
    .then(() => {
      return Response.json({ message: 'Cadastro de pessoa efetuado com sucesso' }, { status: 200 })
    })
    .catch((error) => {
      console.error(`Erro ao atualizar : ${error}`)
      return Response.json({ message: 'Erro ao atualizar ' }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })
}

export async function deletePeople(id: number) {
  if (!id) return Response.json({ message: 'ID is required in the body' }, { status: 400 })

  const queryDeleteKinsRelations = `
      DELETE FROM kinsRelations
      WHERE idKinA = ?
      OR idKinB = ?
      `

  const queryDeletePeople = `
      DELETE FROM people
      WHERE id = ?
      `
  const Conn = await createConnection()
  const conn = await Conn.getConnection()

  conn.beginTransaction()

  await conn
    .query(queryDeleteKinsRelations, [id, id])
    .catch((error) => {
      console.error(`Error deleting : ${error}`)
      conn.rollback()
      return Response.json({ message: 'Erro ao deletar o registro: ' + error }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })

  return await conn
    .query(queryDeletePeople, id)
    .then(() => {
      conn.commit()
      return Response.json({ message: 'Registro deletado com sucesso' }, { status: 200 })
    })
    .catch((error) => {
      console.error(`Error deleting : ${error}`)
      conn.rollback()
      return Response.json({ message: 'Erro ao deletar o registro: ' + error }, { status: 500 })
    })
    .finally(() => {
      conn.release()
    })
}
