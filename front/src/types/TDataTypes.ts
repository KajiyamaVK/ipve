import { z } from 'zod'

export const ZDataTypesEnum = z.enum(['people', 'titles', 'roles', 'churches', 'branches', 'generalRoutes'])
export type TTDataTypes = z.infer<typeof ZDataTypesEnum>
