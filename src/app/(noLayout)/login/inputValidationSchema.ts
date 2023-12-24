import { z } from 'zod'

export const loginFormValidationSchema = z.object({
  email: z
    .string()
    .min(1, 'O email é obrigatório.')
    .email('O formato do email está incorreto, por favor verifique.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  // text: z.string(),
})
