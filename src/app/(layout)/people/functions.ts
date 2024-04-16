'use server'
import { getDatabaseConnection } from '@/utils/database'
import { FieldPacket, QueryResult } from 'mysql2'

interface IPeopleResponse {
  id: number
  name: string
}

export async function getPeople(id?: number) {
  const Conn = await getDatabaseConnection()
  const query = `
    SELECT 
      people.id, 
      people.fullName, 
      people.titleIdFK, 
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
      peopleTitles.name AS title,
            COALESCE(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'name',
            peopleRoles.name, 
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

  if (id) {
    return Conn.query(query, id)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
      })
      .then(() => {
        return { data, status: 200 }
      })
      .catch((error) => {
        console.error(`Erro interno, por favor, entre em contato o suporte:  ${error}`)
        return { message: 'Erro interno, por favor, entre em contato o suporte: ' + error, status: 500 }
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
        console.error(`Erro interno, por favor, entre em contato o suporte: : ${error}`)
        return { message: 'Erro interno, por favor, entre em contato o suporte: ' + error, status: 500 }
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
    return { message: `The following fields are missing in the body: ${dataMissingInBody.join(', ')}`, status: 400 }
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
  const Conn = await getDatabaseConnection()

  return Conn.query(query, [
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
      return { message: 'People saved', status: 201 }
    })
    .catch((error) => {
      console.error(`Error saving People: ${error}`)
      return { message: 'Error saving ', status: 500 }
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
    return { message: `The following fields are missing in the body: ${dataMissingInBody.join(', ')}`, status: 400 }
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

  const Conn = await getDatabaseConnection()

  return Conn.query(query, [
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
      return { message: 'Cadastro de pessoa efetuado com sucesso', status: 200 }
    })
    .catch((error) => {
      console.error(`Erro ao atualizar : ${error}`)
      return { message: 'Erro ao atualizar ', status: 500 }
    })
}

export async function deletePeople(id: number) {
  if (!id) return { message: 'ID is required in the body', status: 400 }

  const queryDeleteKinsRelations = `
      DELETE FROM kinsRelations
      WHERE idKinA = ?
      OR idKinB = ?
      `

  const queryDeletePeople = `
      DELETE FROM people
      WHERE id = ?
      `
  const Conn = await getDatabaseConnection()

  await Conn.query('START TRANSACTION')

  await Conn.query(queryDeleteKinsRelations, [id, id]).catch((error) => {
    console.error(`Error deleting : ${error}`)
    Conn.query('ROLLBACK')
    return { message: 'Erro ao deletar o registro: ' + error, status: 500 }
  })

  return await Conn.query(queryDeletePeople, id)
    .then(() => {
      Conn.query('COMMIT')
      return { message: 'Registro deletado com sucesso', status: 200 }
    })
    .catch((error) => {
      console.error(`Error deleting : ${error}`)
      Conn.query('ROLLBACK')
      return { message: 'Erro ao deletar o registro: ' + error, status: 500 }
    })
}

interface IKinsRelationsResponse {
  id: number
  relationName: string
}

export async function getKinsRelationsLabels(id?: number) {
  const Conn = await getDatabaseConnection()

  const query = `
      SELECT
        id,
        relationName
      FROM stdKinsRelations
      ${id ? `WHERE id = ?` : ''}
      `

  let data: IKinsRelationsResponse[] = []

  if (id) {
    return Conn.query(query, id)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
      })
      .then(() => {
        return new Response(JSON.stringify(data[0]), { status: 200 })
      })
      .catch((error) => {
        console.error(`Error fetching kins relations: ${error}`)
        return new Response('Error fetching kins relations', { status: 500 })
      })
  } else {
    return Conn.query(query)
      .then((value: [QueryResult, FieldPacket[]]) => {
        data = JSON.parse(JSON.stringify(value[0]))
      })
      .then(() => {
        return new Response(JSON.stringify(data), { status: 200 })
      })
      .catch((error) => {
        console.error(`Error fetching kins relations: ${error}`)
        return new Response('Error fetching kins relations', { status: 500 })
      })
  }
}
