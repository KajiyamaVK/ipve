import { z } from 'zod'

export const ZPeople = z.object({
  id: z.number().optional(),
  fullName: z.string({ required_error: 'Nome completo é um campo obrigatório' }).min(1).default(''),
  titleIdFK: z.string({ required_error: 'Cargo é um campo obrigatório' }), // VK: O <select> do form não está aceitando number
  rolesNames: z.string().optional(),
  rolesIds: z.string().optional(),
  dateOfBirth: z.string().optional(),
  society: z.string().optional(),
  gender: z.string({
    required_error: 'Gênero é um campo obrigatório',
  }),
  address: z.string().optional(),
  addressNumber: z.string().optional(),
  ebdClassroom: z.string().optional(),
  complement: z.string().optional(),
  city: z.string().optional(),
  suburb: z.string().optional(),
  uf: z.string().optional(),
  cep: z.string().optional(),
  phone1: z.string().optional(),
  phone1IsWhatsapp: z.boolean().default(false),
  phone2: z.string().optional(),
  photoUrl: z.string().optional(),
  email: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true
        try {
          z.string().email().parse(value)
          return true
        } catch {
          return false
        }
      },
      {
        message: 'Formato inválido',
      },
    ),
  isActive: z.boolean().default(true),
  isUser: z.boolean().default(false),
  isMember: z.boolean().default(true),
  hasFamilyInChurch: z.boolean().default(false),
  obs: z.string().optional(),
  relatives: z
    .array(
      z.object({
        idKinB: z.number(),
        relation: z.string(),
      }),
    )
    .optional(),
})

export type TPeople = z.infer<typeof ZPeople>
