import { z } from 'zod'

export const loginFormValidationSchema = z.object({
  email: z
    .string({
      required_error: 'O campo email é obrigatório.',
    })
    .min(1)
    .email('O formato do email está incorreto, por favor verifique.'),
  password: z
    .string({
      required_error: 'O campo senha é obrigatório.',
    })
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
})
