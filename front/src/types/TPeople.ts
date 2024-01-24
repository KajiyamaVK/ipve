import { z } from 'zod'

export const ZPeople = z.object({
  id: z.number().optional(),
  fullName: z.string({ required_error: 'Nome completo é um campo obrigatório' }).min(1),
  memberTitle: z.number({ required_error: 'Cargo é um campo obrigatório' }),
  roles: z.array(z.number()).optional().nullable(),
  dateOfBirth: z.date().optional().nullable(),
  society: z.string().optional().nullable(),
  gender: z.string({
    required_error: 'Gênero é um campo obrigatório',
  }),
  churchId: z.number({
    required_error: 'Igreja é um campo obrigatório',
  }),
  address: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  suburb: z.string().optional().nullable(),
  uf: z.string().optional().nullable(),
  cep: z.string().optional().nullable(),
  phone1: z.string().optional().nullable(),
  phone1isWhatsapp: z.boolean().default(false),
  phone2: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  isActive: z.boolean().default(true),
  isUser: z.boolean(),
  hasFamilyInChurch: z.boolean(),
  obs: z.string().nullable().optional(),
})

export type TPeople = z.infer<typeof ZPeople>
