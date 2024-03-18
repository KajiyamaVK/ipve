import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { handleError, runQuery, sendResponse } from '../../utils/routesUtils'
import { env } from '../../env'

export async function storePeoplePhoto(app: FastifyInstance) {
  interface IStorePeoplePhotoBody {
    idPerson: number
    fileName: string
  }
  app.post('/', async (req: FastifyRequest, res: FastifyReply) => {
    const mySql = app.mysql
    const { idPerson, fileName } = req.body as IStorePeoplePhotoBody
    const query = `
      UPDATE people
      SET photoUrl = ${env.APP_URL}/?
      WHERE id = ?`

    try {
      await runQuery(query, mySql, [fileName, idPerson])
      sendResponse({ data: { message: 'Updated' }, res, statusCode: 200 })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError({ err, res })
    }

    sendResponse({ res, statusCode: 200 })
  })
}
