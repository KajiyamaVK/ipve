import { z } from 'zod'

export const ZMember = z.object({
  id: z.number().optional(),
  fullName: z
    .string({ required_error: 'Nome completo é um campo obrigatório' })
    .min(1),
  memberTitle: z.string({ required_error: 'Cargo é um campo obrigatório' }),
  roles: z.array(z.number()).optional(),
  dateOfBirth: z.date().optional(),
  address: z.string().optional(),
  complement: z.string().optional(),
  city: z.string().optional(),
  suburb: z.string().optional(),
  uf: z.string().optional(),
  cep: z.string().optional(),
  phone1: z.string().optional(),
  phone1isWhatsapp: z.boolean().default(false),
  phone2: z.string().optional(),
  photoUrl: z.string(),
  email: z.string().email().optional(),
})

export type TMembers = z.infer<typeof ZMember>
