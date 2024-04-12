import { z } from 'zod'

export const ZDataTypesEnum = z.enum([
  'people',
  'titles',
  'roles',
  'churches',
  'branches',
  'generalRoutes',
  'kinsRelations',
  'locations',
])
export type TTDataTypes = z.infer<typeof ZDataTypesEnum>
