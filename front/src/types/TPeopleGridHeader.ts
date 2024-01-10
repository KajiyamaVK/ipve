import { z } from 'zod'

export const ZPeopleGridHeader = z.object({
  id: z.string(),
  fullrName: z.string(),
  title: z.string(),
  roles: z.array(
    z.object({
      name: z.string(),
      color: z.string(),
    }),
  ),
  dateOfBirth: z.string().optional(),
  phone1: z.string().optional(),
  isPhone1WhatsApp: z.boolean().optional(),
})

export type TPeopleGridHeader = z.infer<typeof ZPeopleGridHeader>
