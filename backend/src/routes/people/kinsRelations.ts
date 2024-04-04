import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { handleError, runQuery, sendResponse } from '../../utils/routesUtils'
import { IKinsRelations } from '../../types/people'

export async function kinsRelations(app: FastifyInstance) {
  // Abstract error handling into a separate function
  app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
    const mySql = app.mysql

    const query = `
      SELECT
        id,
        relationName
      FROM stdKinsRelations`

    let data: IKinsRelations[] = []

    try {
      data = await runQuery<IKinsRelations>(query, mySql)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
      return
    }

    res
      .header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .header('Pragma', 'no-cache')
      .header('Expires', '0')

    sendResponse({ data, res, statusCode: 200 })
  })

  app.get('/:id', async (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
    const mySql = app.mysql
    const { id } = req.params

    const query = `
      SELECT
        kinsRelations.idKinB,
        kinsRelations.relation
      FROM kinsRelations
      WHERE idKinA = ?`

    let data: IKinsRelations[] = []

    try {
      data = await runQuery<IKinsRelations>(query, mySql, [Number(id)])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
      return
    }

    res
      .header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .header('Pragma', 'no-cache')
      .header('Expires', '0')

    sendResponse({ data, res, statusCode: 200 })
  })
}
