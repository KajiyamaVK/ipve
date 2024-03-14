import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { handleError, runQuery, sendResponse } from '../../utils/routesUtils'
import { ITitles } from '../../types/people'

export async function titles(app: FastifyInstance) {
  // Abstract error handling into a separate function
  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    const mySql = app.mysql

    const query = `
      SELECT
        id,
        name
      FROM peopleTitles`

    let data: ITitles[] = []

    try {
      data = await runQuery<ITitles>(query, mySql)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
    }

    sendResponse({ data, res, statusCode: 200 })
  })

  app.get('/:id', async (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
    const mySql = app.mysql
    const { id } = req.params

    const query = `
      SELECT
        id,
        name
      FROM peopleTitles
      WHERE id = ?`

    let data: ITitles[] = []

    try {
      data = await runQuery<ITitles>(query, mySql, [id])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
    }

    sendResponse({ data: data[0], res, statusCode: 200 })
  })

  app.post('/', async (req: FastifyRequest, res: FastifyReply) => {
    const mySql = app.mysql
    const body = req.body as ITitles
    const query = `
    INSERT INTO peopleTitles (name)
    VALUES (?)`
    try {
      await runQuery(query, mySql, [body.name])
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
    DELETE FROM peopleTitles
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
