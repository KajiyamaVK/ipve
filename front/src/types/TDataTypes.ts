import { z } from 'zod'

export const ZDataTypesEnum = z.enum(['people', 'titles', 'roles', 'churches', 'branches'])
export type TTDataTypes = z.infer<typeof ZDataTypesEnum>
