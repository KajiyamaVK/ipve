import { PrismaClient } from '@prisma/client'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getBaseData = z.object({
  typeOfData: z.enum(['screens', 'churchBranches']),
  idPeople: z.number(),
})

export async function generalRoutes(app: FastifyInstance) {
  const prisma = new PrismaClient()
  app.post('/', async (req: FastifyRequest, res: FastifyReply) => {
    let body

    try {
      body = getBaseData.parse(req.body)
    } catch (err) {
      res.status(500).send({ message: `Zod Parse: ${err}` })
    }

    if (body) {
      let data
      try {
        switch (body.typeOfData) {
          case 'screens':
            data = await prisma.screens.findMany()
            break
          case 'churchBranches':
            data = await prisma.churchBranches.findMany()
            break
          default:
            res.status(500).send({ message: 'Invalid typeOfData' })
            break
        }
        res.status(200).send({ data })
      } catch (err) {
        const message = `Erro ao rodar o Prisma: ${err}`
        res.status(500).send({ message })
      }
    }
  })
}
