import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { IRoles } from '../../types/people'
import { handleError, runQuery, sendResponse } from '../../utils/routesUtils'

export async function roles(app: FastifyInstance) {
  // Abstract error handling into a separate function
  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    const mySql = app.mysql

    const query = `
      SELECT
        id,
        name,
        description,
        createdAt,
        updatedAt,
        tailwindColor
      FROM peopleRoles;`

    let data: IRoles[] = []

    try {
      console.log('Starting database query')
      data = await runQuery<IRoles>(query, mySql)
      console.log('Ending database query')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
    }
    console.log('Sending Response')
    sendResponse({ data, res, statusCode: 200 })
    console.log('Response sent')
  })

  app.get('/:id', async (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
    const mySql = app.mysql
    const { id } = req.params

    const query = `
      SELECT
        id,
        name,
        description,
        createdAt,
        updatedAt,
        tailwindColor
      FROM peopleRoles
      WHERE id = ?`

    let data: IRoles[] = []

    try {
      data = await runQuery<IRoles>(query, mySql, [id])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
    }

    sendResponse({ data: data[0], res, statusCode: 200 })
  })

  app.post('/', async (req: FastifyRequest, res: FastifyReply) => {
    const mySql = app.mysql
    const body = req.body as IRoles

    const query = `
      INSERT INTO peopleRoles (name, description, tailwindColor,createdAt)
      VALUES (?,?,?,current_timestamp);`

    try {
      await runQuery(query, mySql, [body.name, body.description, body.tailwindColor])
      sendResponse({ data: { message: 'Created' }, res, statusCode: 201 })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
    }
  })

  app.delete('/:id', async (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
    const mySql = app.mysql
    const { id } = req.params

    const query = `
      DELETE FROM peopleRoles
      WHERE id = ?`

    try {
      await runQuery(query, mySql, [id])
      sendResponse({ data: { message: 'Deleted' }, res, statusCode: 200 })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
    }
  })
}
