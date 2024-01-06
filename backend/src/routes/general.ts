import { PrismaClient } from '@prisma/client'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function generalRoutes(app: FastifyInstance) {
  const prisma = new PrismaClient()

  app.get('/menuScreens', async (req: FastifyRequest, res: FastifyReply) => {
    const result = await prisma.screens.findMany()

    return res.status(200).send(result)
  })
}
