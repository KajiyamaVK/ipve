'use server'
import { getDatabaseConnection } from '@/utils/database'
import { FieldPacket, QueryResult, ResultSetHeader } from 'mysql2'
import { TPeopleForm } from './form/[id]/formSchema'

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
    roles.roles_json AS roles,
    COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'idKinB', peopleB.id,
                'relativeName', peopleB.fullName,
                'relationId', stdKinsRelations.id, 
                'relationName', stdKinsRelations.relationName
            )
        ), JSON_ARRAY()
    ) AS relatives
    FROM people
    JOIN peopleTitles ON people.titleIdFK = peopleTitles.id
    LEFT JOIN (
        SELECT 
            peopleRolesData.peopleIdFK,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', peopleRoles.id,
                    'name', peopleRoles.name,
                    'tailwindColor', peopleRoles.tailwindColor
                )
            ) AS roles_json
        FROM peopleRoles
        JOIN peopleRolesData ON peopleRolesData.roleIdFK = peopleRoles.id
        GROUP BY peopleRolesData.peopleIdFK
    ) AS roles ON roles.peopleIdFK = people.id
    LEFT JOIN kinsRelations ON kinsRelations.idKinA = people.id 
    LEFT JOIN people AS peopleB ON peopleB.id = kinsRelations.idKinB AND kinsRelations.idKinB = peopleB.id
    LEFT JOIN stdKinsRelations ON kinsRelations.relation = stdKinsRelations.id 
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
      .finally(() => {
        Conn.end()
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
      .finally(() => {
        Conn.end()
      })
  }
}

export async function savePeople({
  isActive,
  fullName,
  dateOfBirth,
  gender,
  address,
  addressNumber,
  complement,
  suburb,
  city,
  uf,
  cep,
  phone1,
  phone1IsWhatsapp,
  phone2,
  photoUrl,
  email,
  titleIdFK,
  ebdClassroom,
  society,
  isMember,
  hasFamilyInChurch,
  isUser,
  roles,
}: TPeopleForm) {
  const dataMissingInBody: string[] = []

  if (!fullName) dataMissingInBody.push('fullName')
  if (!titleIdFK) dataMissingInBody.push('titleIdFK')
  if (!gender) dataMissingInBody.push('gender')
  if (!roles) dataMissingInBody.push('roles')

  if (dataMissingInBody.length > 0) {
    console.error(`The following fields are missing in the body: ${dataMissingInBody.join(', ')}`)
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
      ebdClassroom,
      society,
      isMember,
      isUser,
      addressNumber,
      hasFamilyInChurch)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

  // Eu vou comentar esses trechos porque não sei se deveriam estar sendo usados
  // const insertPeopleRelationsQuery = `
  //     INSERT INTO kinsRelations (idKinA, idKinB, relation)
  //     VALUES (?, ?, ?)
  //     `

  // const insertPeopleRolesQuery = `
  //     INSERT INTO peopleRolesData (peopleIdFK, roleIdFK)
  //     VALUES (?, ?)
  //     `

  // let errorStatus: boolean = false
  // let errorMessages: string = ''

  //const insertedId: number = 0

  const Conn = await getDatabaseConnection()

  await Conn.query('START TRANSACTION')

  await Conn.query<ResultSetHeader>(query, [
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
    ebdClassroom,
    society,
    isMember,
    isUser,
    addressNumber,
    hasFamilyInChurch,
  ]).catch((error) => {
    console.error(`Erro ao criar o cadastro: ${error}`)
    Conn.query('ROLLBACK')
    //errorStatus = true
    //errorMessages = error
  })

  // if (!errorStatus && relatives) {
  //
  //   for (const relative of relatives) {
  //     await Conn.query(insertPeopleRelationsQuery, [id, relative.idKinB, relative.relationId]).catch((error) => {
  //       console.error(`Erro ao inserir os parentescos: ${error}`)
  //       errorStatus = true
  //       errorMessages = error
  //     })
  //   }
  // }
}

export async function updatePeople({
  id,
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
  ebdClassroom,
  society,
  isMember,
  isUser,
  addressNumber,
  hasFamilyInChurch,
  relatives,
  roles,
}: TPeopleForm) {
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
  if (!email && email !== '') dataMissingInBody.push('email')
  if (!isActive) dataMissingInBody.push('isActive')
  if (!isMember) dataMissingInBody.push('isMember')
  if (!addressNumber) dataMissingInBody.push('addressNumber')
  if (!hasFamilyInChurch) dataMissingInBody.push('hasFamilyInChurch')
  if (!relatives) dataMissingInBody.push('relatives')
  if (!roles) dataMissingInBody.push('roles')

  if (dataMissingInBody.length > 0) {
    console.error(`The following fields are missing in the body: ${dataMissingInBody.join(', ')}`)
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
      ebdClassroom = ?,
      society = ?,
      isMember = ?,
      isUser = ?,
      addressNumber = ?,
      hasFamilyInChurch = ?
      WHERE id = ?
      `

  const deletePeopleRelationsQuery = `
      DELETE FROM kinsRelations
      WHERE idKinA = ? 
      OR idKinB = ?
      `

  const insertPeopleRelationsQuery = `
      INSERT INTO kinsRelations (idKinA, idKinB, relation)
      VALUES (?, ?, ?)
      `

  const deletePeopleRolesQuery = `
      DELETE FROM peopleRolesData
      WHERE peopleIdFK = ?
      `

  const insertPeopleRolesQuery = `
      INSERT INTO peopleRolesData (peopleIdFK, roleIdFK)
      VALUES (?, ?)
      `

  const Conn = await getDatabaseConnection()

  let errorStatus: boolean = false
  let errorMessages: string = ''

  await Conn.query('START TRANSACTION')

  await Conn.query(query, [
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
    ebdClassroom,
    society,
    isMember,
    isUser,
    addressNumber,
    hasFamilyInChurch,
    id,
  ]).catch((error) => {
    Conn.query('ROLLBACK')
    console.error(`Erro ao atualizar o cadastro: ${error}`)
    errorStatus = true
    errorMessages = error
  })

  if (!errorStatus && relatives) {
    await Conn.query(deletePeopleRelationsQuery, [id, id]).catch((error) => {
      console.error(`Erro ao deletar os parentescos: ${error}`)
      errorStatus = true
      errorMessages = error
    })
  }

  if (!errorStatus && relatives) {
    for (const relative of relatives) {
      await Conn.query(insertPeopleRelationsQuery, [id, relative.idKinB, relative.relationId]).catch((error) => {
        console.error(`Erro ao inserir os parentescos: ${error}`)
        errorStatus = true
        errorMessages = error
      })
    }
  }

  if (!errorStatus && roles) {
    await Conn.query(deletePeopleRolesQuery, id).catch((error) => {
      console.error(`Erro ao deletar as funções: ${error}`)
      errorStatus = true
      errorMessages = error
    })
  }

  if (!errorStatus && roles) {
    for (const role of roles) {
      await Conn.query(insertPeopleRolesQuery, [id, role.id]).catch((error) => {
        console.error(`Erro ao inserir as funções: ${error}`)
        errorStatus = true
        errorMessages = error
      })
    }
  }

  if (errorStatus) {
    console.error('Fail')
    Conn.query('ROLLBACK')
    return {
      message: 'Erro desconhecido ao atualizar o cadastro. Por favor, entre em contato com o suporte: ' + errorMessages,
      status: 500,
    }
  } else {
    Conn.query('COMMIT')
    return { message: 'Cadastro atualizado com sucesso', status: 200 }
  }
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
    .finally(() => {
      Conn.end()
    })
}

// interface IKinsRelationsResponse {
//   id: number
//   relationName: string
// }

// export async function getKinsRelationsLabels(id?: number) {
//   const Conn = await getDatabaseConnection()

//   const query = `
//       SELECT
//         id,
//         relationName
//       FROM stdKinsRelations
//       ${id ? `WHERE id = ?` : ''}
//       `

//   let data: IKinsRelationsResponse[] = []

//   if (id) {
//     return Conn.query(query, id)
//       .then((value: [QueryResult, FieldPacket[]]) => {
//         data = JSON.parse(JSON.stringify(value[0]))
//       })
//       .then(() => {
//         return new Response(JSON.stringify(data[0]), { status: 200 })
//       })
//       .catch((error) => {
//         console.error(`Error fetching kins relations: ${error}`)
//         return new Response('Error fetching kins relations', { status: 500 })
//       })
//       .finally(() => {
//         Conn.end()
//       })
//   } else {
//     return Conn.query(query)
//       .then((value: [QueryResult, FieldPacket[]]) => {
//         data = JSON.parse(JSON.stringify(value[0]))
//       })
//       .then(() => {
//         return new Response(JSON.stringify(data), { status: 200 })
//       })
//       .catch((error) => {
//         console.error(`Error fetching kins relations: ${error}`)
//         return new Response('Error fetching kins relations', { status: 500 })
//       })
//       .finally(() => {
//         Conn.end()
//       })
//   }
//}
