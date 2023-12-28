import { TMembersGridHeader } from '@/types/TMembersGridHeader'

export const members: TMembersGridHeader[] = [
  {
    id: '1',
    memberName: 'Francisco Hugo',
    memberTitle: 'Visitante',
    roles: [
      { name: 'Tecnologia', color: 'bg-choices-gold' },
      { name: 'Tesouraria', color: 'bg-choices-purple' },
    ],
    dateOfBirth: '1988-05-21',
    mainPhone: '11999999999',
    email: 'victor.kajiyama@gmail.com',
  },
  {
    id: '2',
    memberName: 'Alessandra Amaral',
    memberTitle: 'Membro',
    roles: [
      { name: 'Louvor', color: 'bg-choices-black' },
      { name: 'Tesouraria', color: 'bg-choices-purple' },
    ],
    dateOfBirth: '1985-05-11',
    mainPhone: '1',
    email: 'Ale.santana@gmail.com',
  },
  {
    id: '3',
    memberName: 'Gabriel',
    memberTitle: 'Diácono',
    roles: [
      { name: 'Louvor', color: 'bg-choices-black' },
      { name: 'Tesouraria', color: 'bg-choices-purple' },
    ],
    dateOfBirth: '1985-05-11',
    mainPhone: '1234567890',
    email: null,
  },
]
