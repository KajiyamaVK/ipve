import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const ZSaveInfraLog = z.object({
  message: z.string(),
  idPeople: z.number(),
})

type ISaveInfraLog = z.infer<typeof ZSaveInfraLog>

export async function saveInfraLog({ message, idPeople }: ISaveInfraLog) {
  await prisma.infraLogs.create({
    data: {
      message,
      peopleIdFK: idPeople,
    },
  })
}
