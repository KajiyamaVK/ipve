import { z } from 'zod'

export const schema = z.object({
  name: z.string({ required_error: 'Este campo é obrigatório' }).min(1),
  isActive: z.boolean().default(true),
  gender: z.string({ required_error: 'Este campo é obrigatório' }).min(1),
  isUser: z.boolean().default(true),
  hasFamilyInChurch: z.boolean().default(false),
  familyRelations: z.array(z.number()).optional(),
  surname: z.string({ required_error: 'Este campo é obrigatório' }).min(1),
  title: z.string({ required_error: 'Este campo é obrigatório' }).min(1),
  roles: z.array(z.string()).optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  city: z.string().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
  cep: z.string().min(9, { message: 'CEP inválido.' }).optional(),

  mobileNumber: z.string().min(14, 'Formato inválido').optional(),
  mobileIsWhatsapp: z.boolean().optional(),

  photoUrl: z.string().optional(),
  email: z.string().email('Formato de e-mail inválido.').optional(),
  obs: z.string().optional(),
})
