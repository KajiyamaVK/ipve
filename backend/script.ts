import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// script to select all screens
async function main() {
  const screens = await prisma.screens.findMany()
  console.log(screens)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
