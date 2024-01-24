import { number, z } from 'zod'

export const ZRoles = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
})

export type IRoles = z.infer<typeof ZRoles>

const GenderTypeValues = ['m', 'f'] as const

// Create a Zod schema for the enum
const ZGenderType = z.enum(GenderTypeValues)

export const ZPeople = z.object({
  id: z.number().optional(),
  fullName: z.string({ required_error: 'Nome completo é um campo obrigatório' }).min(1),
  titleIdFK: z.number({ required_error: 'Cargo é um campo obrigatório' }).min(1),
  peopleRolesDataFK: z.array(number()).optional().nullable(),
  dateOfBirth: z.date().optional().nullable(),
  gender: ZGenderType,
  address: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  suburb: z.string().optional().nullable(),
  uf: z.string().optional().nullable(),
  cep: z.string().optional().nullable(),
  phone1: z.string().optional().nullable(),
  phone1IsWhatsapp: z.boolean().default(false),
  phone2: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
})

export type TPeople = z.infer<typeof ZPeople>
