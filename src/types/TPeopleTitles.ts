import { z } from 'zod'

export const ZPeopleTitles = z.object({
  id: z.number().nullable().optional(),
  name: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type TPeopleTitles = z.infer<typeof ZPeopleTitles>
