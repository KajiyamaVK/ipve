import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// script to select all screens
async function main() {
  return true
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
