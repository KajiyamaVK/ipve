import { z } from 'zod'

const schema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
})

export type TEnv = z.infer<typeof schema>

export function getEnv(): TEnv {
  const env = {
    NEXT_PUBLIC_API_URL: '',
  } as TEnv

  if (typeof process.env.NEXT_PUBLIC_API_URL !== 'undefined') env.NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL // Foi tentado fazer schema.parse, mas o valor está indo como undefined.

  return env
}
