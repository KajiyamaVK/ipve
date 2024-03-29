import { z } from 'zod'

export const ZMembersTitles = z.object({
  id: z.number().nullable().optional(),
  name: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type TMembersTitles = z.infer<typeof ZMembersTitles>
