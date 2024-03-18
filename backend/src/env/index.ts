import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string(),
  APP_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  throw new Error('Variáveis de ambiente não definidas ou incorretas.')
}

export const env = _env.data
