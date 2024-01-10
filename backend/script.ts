import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// script to select all screens
async function main() {
  const result = await prisma.peopleRoles.deleteMany()
  
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
