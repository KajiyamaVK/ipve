import { z } from 'zod'

// {
//   id: '1',
//   memberFirstName: 'Francisco',
//   memberLastName: 'Hugo',
//   memberTitle: 'Visitante',
//   roles: ['Tecnologia', 'Tesouraria'],
//   dateOfBirth: '1988-05-21',
//   address: 'Rua Primeiro de Janeiro',
//   complement: 'Apt 1',
//   city: 'São Paulo',
//   suburb: 'Lapa',
//   uf: 'SP',
//   cep: '12345-123',
//   phones: [
//     {
//       phone: '1234567890',
//       phoneType: 'Home',
//       phoneObs: 'Ligar após as 17.',
//       phoneIsWhatsapp: false,
//     },
//     {
//       phone: '0987654321',
//       phoneType: 'Work',
//       phoneObs: 'Ligar em horário de experiente',
//       phoneIsWhatsapp: false,
//     },
//     {
//       phone: '1234567890',
//       phoneType: 'Mobile',
//       phoneObs: 'Ligar após as 17.',
//       phoneIsWhatsapp: true,
//     },
//   ],
//   mainPhoneId: '1',
//   photoUrl: 'https://via.placeholder.com/150',
//   email: 'victor.kajiyama@gmail.com',
// },
export const schema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  isActive: z.boolean().default(true),
  isUser: z.boolean().default(true),
  hasFamilyInChurch: z.boolean().default(false),
  familyRelations: z.array(z.number()).optional(),
  surname: z.string().min(1, { message: 'O sobrenome é obrigatório' }),
  title: z.string().min(1, { message: 'Atribua um título a pessoa.' }),
  roles: z.array(z.string()).optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  city: z.string().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
  cep: z.string().optional(),
  phones: z
    .array(
      z.object({
        phone: z.string(),
        phoneType: z.string(),
        phoneObs: z.string(),
        phoneIsWhatsapp: z.boolean(),
      }),
    )
    .optional(),
  photoUrl: z.string().optional(),
  email: z.string().email('Formato de e-mail inválido.').optional(),
  obs: z.string().optional(),
})
