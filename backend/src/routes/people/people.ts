import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { TPeople } from '../../types/people'
import { handleError, runQuery, sendResponse } from '../../utils/routesUtils'

export async function people(app: FastifyInstance) {
  // Abstract error handling into a separate function
  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    const mySql = app.mysql

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
      group_concat(peopleRoles.name SEPARATOR ';') as roles,
      peopleTitles.name as title
    FROM people
    JOIN peopleTitles on peopleTitles.id = people.titleIdFK
    LEFT JOIN peopleRolesData on peopleRolesData.peopleIdFK = people.id
    LEFT JOIN peopleRoles on peopleRoles.id = peopleRolesData.roleIdFK
    GROUP BY people.id
    `

    let data: TPeople[] = []

    try {
      data = await runQuery<TPeople>(query, mySql)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
    }

    sendResponse({ data, res, statusCode: 200 })
  })
  interface IGetPeopleParams {
    id: number
  }

  app.get('/:id', async (req: FastifyRequest<{ Params: IGetPeopleParams }>, res: FastifyReply) => {
    const mySql = app.mysql

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
      group_concat(peopleRoles.id SEPARATOR ';') as roles
    FROM people
    LEFT JOIN peopleRolesData ON peopleRolesData.peopleIdFK = people.id
    LEFT JOIN peopleRoles ON peopleRoles.id = peopleRolesData.roleIdFK
    WHERE people.id = ?
    GROUP BY people.id`

    let data: TPeople[] = []
    try {
      data = await runQuery<TPeople>(query, mySql, [req.params.id])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
    }

    sendResponse({ data: data[0], res, statusCode: 200 })
  })

  app.post('/', async (req: FastifyRequest, res: FastifyReply) => {
    const mySql = app.mysql
    const body = req.body as TPeople

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

    await runQuery<TPeople>(query, mySql, [
      body.fullName,
      body.titleIdFK,
      body.dateOfBirth,
      body.gender,
      body.address,
      body.complement,
      body.city,
      body.suburb,
      body.uf,
      body.cep,
      body.phone1,
      body.phone1IsWhatsapp,
      body.phone2,
      body.photoUrl,
      body.email,
      body.isActive,
      body.isActiveEBD,
      body.ebdClassroom,
      body.society,
      body.isMember ? 1 : 0,
      body.isUser ? 1 : 0,
      body.addressNumber,
      body.hasFamilyInChurch ? 1 : 0,
    ])

    if (body.relatives && body.relatives?.length > 0) {
      for (const kin of body.relatives) {
        const findIdCounterQuery = `
          SELECT idCounter
          FROM stdKinsRelations
          WHERE id = ?
        `
        const idCounter: { idCounter: number }[] = await runQuery(findIdCounterQuery, mySql, [Number(kin.relation)])

        if (!idCounter[0].idCounter) throw new Error('Invalid kinship id - counter not found')

        const query = `
            INSERT INTO kinsRelations (idKinA, idKinB, relation)
            VALUES (?, ?, ?)
          `

        await runQuery(query, mySql, [body.id, kin.idKinB, kin.relation])
        await runQuery(query, mySql, [kin.idKinB, body.id, idCounter])
      }
    }

    sendResponse({ res, statusCode: 201 })
  })

  app.put('/:id', async (req: FastifyRequest<{ Params: IGetPeopleParams }>) => {
    const mySql = app.mysql
    const body = req.body as TPeople
    const { id } = req.params

    const query = `
    UPDATE people
    SET
      fullName = ?,
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
      hasFamilyInChurch = ?,
      titleIdFK = ?
    WHERE id = ?`

    await runQuery<TPeople>(query, mySql, [
      body.fullName,
      body.titleIdFK,
      body.dateOfBirth,
      body.gender,
      body.address,
      body.complement,
      body.city,
      body.suburb,
      body.uf,
      body.cep,
      body.phone1,
      body.phone1IsWhatsapp,
      body.phone2,
      body.photoUrl,
      body.email,
      body.isActive,
      body.isActiveEBD,
      body.ebdClassroom,
      body.society,
      body.isMember,
      body.isUser,
      body.addressNumber,
      body.hasFamilyInChurch,
      Number(body.titleIdFK),
      id,
    ])

    if (body.relatives && body.relatives?.length > 0) {
      for (const kin of body.relatives) {
        const query = `
          SELECT 1
          FROM kinsRelations
          WHERE idKinA = ? 
          AND idKinB = ?
          AND relation = ?
        `

        const data = await runQuery(query, mySql, [id, kin.idKinB, kin.relation])
        console.log('data', data)

        const findIdCounterQuery = `
          SELECT idCounter
          FROM stdKinsRelations
          WHERE id = ?
        `
        const idCounter: { idCounter: number }[] = await runQuery(findIdCounterQuery, mySql, [Number(kin.relation)])

        if (!idCounter[0].idCounter) throw new Error('Invalid kinship id - counter not found')

        const kinHasFamilyUpdateQuery = `
          UPDATE people
          SET hasFamilyInChurch = 1
          WHERE id = ?
          `
        await runQuery(kinHasFamilyUpdateQuery, mySql, [kin.idKinB])

        if (data.length === 0) {
          const query = `
            INSERT INTO kinsRelations (idKinA, idKinB, relation)
            VALUES (?, ?, ?)
          `

          console.log('kinhasFmaily', kinHasFamilyUpdateQuery)

          await runQuery(query, mySql, [id, kin.idKinB, kin.relation])
          await runQuery(query, mySql, [kin.idKinB, id, idCounter[0].idCounter])
        } else {
          const query = `
            UPDATE kinsRelations
            SET relation = ?
            WHERE idKinA = ? 
            AND idKinB = ?
          `
          await runQuery(query, mySql, [kin.relation, id, kin.idKinB])
          await runQuery(query, mySql, [idCounter[0].idCounter, kin.idKinB, id])
        }
      }
    } else {
      deleteKins(mySql, Number(id))
    }

    deleteRoles(mySql, Number(id))

    if (body.roles && body.roles?.length > 0) {
      for (const role of body.roles) {
        const query = `
        INSERT INTO peopleRolesData (peopleIdFK, roleIdFK)
        VALUES (?, ?)
      `

        await runQuery(query, mySql, [id, role])
      }
    }
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deleteRoles(mySql: any, id: number) {
  const queryDeleteRoles = `
    DELETE FROM peopleRolesData
    WHERE peopleIdFK = ?
  `
  return runQuery(queryDeleteRoles, mySql, [id])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deleteKins(mySql: any, id: number) {
  const queryDeleteKins = `
    DELETE FROM kinsRelations
    WHERE idKinA = ?
    OR idKinB = ?
  `
  return runQuery(queryDeleteKins, mySql, [id, id])
}
