import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// script to select all screens
async function main() {
  const allUsers = await prisma.screen.findMany()
  console.log(allUsers)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
