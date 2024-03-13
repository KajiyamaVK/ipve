import { number, z } from 'zod'

export const ZKinsRelations = z.object({
  id: z.number(),
  relationName: z.string(),
})

export type IKinsRelations = z.infer<typeof ZKinsRelations>

export const ZRoles = z.object({
  id: z.number(),
  name: z.string(),
  tailwindColor: z.string(),
  description: z.string().optional(),
})

export type IRoles = z.infer<typeof ZRoles>

export const ZTitles = z.object({
  name: z.string(),
})

export type ITitles = z.infer<typeof ZTitles>

const GenderTypeValues = ['m', 'f'] as const

// Create a Zod schema for the enum
const ZGenderType = z.enum(GenderTypeValues)

export const ZPeople = z.object({
  id: z.number().optional(),
  fullName: z.string({ required_error: 'Nome completo é um campo obrigatório' }).min(1),
  titleIdFK: z.string({ required_error: 'Cargo é um campo obrigatório' }).min(1), //VK: O form do client tem que trabalhar com id como string, senão não está aparecendo no <select>
  peopleRolesDataFK: z.array(number()).optional().nullable(),
  dateOfBirth: z.string().optional().nullable(), // TODO: Estamos trazendo como string por causa do format no frontend, mas creio que conseguimos trazer como date direto.
  gender: ZGenderType,
  address: z.string().optional().nullable(),
  addressNumber: z.string().optional().nullable(),
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
  isUser: z.boolean().default(false),
  isMember: z.boolean().default(true),
  roles: z.array(number()).optional().nullable(),
  isActive: z.boolean().default(true),
  isActiveEBD: z.boolean().default(false),
  ebdClassroom: z.string().optional().nullable(),
  society: z.string().optional().nullable(),
  hasFamilyInChurch: z.boolean().default(false),
  relatives: z
    .array(
      z.object({
        idKinB: z.number(),
        relation: z.string(),
      }),
    )
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type TPeople = z.infer<typeof ZPeople>
