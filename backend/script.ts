// import { PrismaClient } from '@prisma/client'
// import { differenceInYears } from 'date-fns'

// // script to select all screens
// async function main() {
//   const prisma = new PrismaClient()
//   prisma.$connect()

//   const people = await prisma.people.findMany({})

//   const today = new Date()

//   const newPeople = people.map((person) => {
//     const age = differenceInYears(today, person.dateOfBirth as Date)

//     if (age > 2 && age < 12) {
//       return {
//         ...person,
//         ebdClassroom: 'UCP',
//       }
//     } else if (age >= 12 && age <= 17) {
//       return {
//         ...person,
//         ebdClassroom: 'UPA',
//       }
//     } else if (age >= 18 && age <= 34) {
//       return {
//         ...person,
//         ebdClassroom: 'UMP',
//       }
//     } else if (age > 34) {
//       return {
//         ...person,
//         ebdClassroom: person.gender === 'm' ? 'UPH' : 'SAF',
//       }
//     }
//     return { ...person, ebdClassroom: null }
//   })

//   /*
//     UPA - 12 aos 17
// UMP - 18 aos 34
// SAF - 35 em diante Mulheres
// UPH - 35 em diante Homens
//     */

//   prisma.$disconnect()
// }

// main()
