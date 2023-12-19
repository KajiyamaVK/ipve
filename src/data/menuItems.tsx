import { Gauge, Keyboard } from '@phosphor-icons/react'
import { TMenuDrawerItem } from '@/types/TMenuDrawerItem'

export const menuItems: TMenuDrawerItem[] = [
  {
    displayName: 'Dashboard',
    menuLabel: 'Dashboard',
    type: 'normal',
    order: 1,
    icon: <Gauge size={32} />,
    path: '/dashboard',
  },
  {
    displayName: 'Cadastros',
    menuLabel: 'Cadastros',
    type: 'parent',
    order: 2,
    icon: <Keyboard size={32} />,
    children: [
      {
        displayName: 'Cadastro de Pessoas',
        menuLabel: 'Pessoas',
        type: 'children',
        order: 1,
        path: '/people',
      },
      {
        displayName: 'Cadastro de Status',
        menuLabel: 'Status',
        type: 'children',
        order: 2,
        path: '/status',
      },
      {
        displayName: 'Cadastro de Responsabilidades',
        menuLabel: 'Responsabilidades',
        type: 'children',
        order: 3,
        path: '/responsabilities',
      },
    ],
  },
]
