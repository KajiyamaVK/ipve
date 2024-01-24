import { z } from 'zod'

export const ZRoles = z.object({
  id: z.number().nullable().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  tailwindColor: z.string().min(1, 'Formato de HexColor inválido'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type TRoles = z.infer<typeof ZRoles>
