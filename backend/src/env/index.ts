import { z } from 'zod'
const envSchema = z.object({
  DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  throw new Error('Variáveis de ambiente não definidas ou incorretas.')
}

export const env = _env.data
