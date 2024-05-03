import { z } from 'zod'

export const ZPeopleRoles = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable().optional(),
  tailwindColor: z.string().min(1, 'Formato de HexColor inválido'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type TPeopleRoles = z.infer<typeof ZPeopleRoles>
