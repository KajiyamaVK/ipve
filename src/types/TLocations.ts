import { z } from 'zod'

export const ZLocations = z.object({
  id: z.number().nullable().optional(),
  locationName: z.string(),
  locationDesc: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type TLocations = z.infer<typeof ZLocations>
