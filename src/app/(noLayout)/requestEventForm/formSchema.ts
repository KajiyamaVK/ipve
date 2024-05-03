import { z } from 'zod'

export const schema = z.object({
  requesterName: z.string({ required_error: 'Selecione seu nome na lista' }),
  eventName: z.string({ required_error: 'Diga o nome do evento' }),
  society: z.string({ required_error: 'Selecione a sociedade' }),
  isMultipleDays: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  description: z.string().optional(),
  location: z.string().optional(),
  backupTeam: z.string().optional(),
})

export type TSchema = z.infer<typeof schema>
