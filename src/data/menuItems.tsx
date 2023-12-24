import { Gauge, Keyboard } from '@phosphor-icons/react'
import { TMenuDrawerItem } from '@/types/TMenuDrawerItem'

export const menuItems: TMenuDrawerItem[] = [
  {
    id: 'dashboard',
    displayName: 'Dashboard',
    menuLabel: 'Dashboard',
    type: 'normal',
    order: 1,
    icon: <Gauge size={32} />,
  },
  {
    id: 'register',
    displayName: 'Cadastros',
    menuLabel: 'Cadastros',
    type: 'parent',
    order: 2,
    icon: <Keyboard size={32} />,
    children: [
      {
        id: 'people',
        displayName: 'Cadastro de Pessoas',
        menuLabel: 'Pessoas',
        type: 'children',
        order: 1,
        formType: 'page',
      },
      {
        id: 'memberTitles',
        displayName: 'Cadastro de Cargos',
        menuLabel: 'Cargos',
        type: 'children',
        order: 2,
        formType: 'dialog',
      },
      {
        id: 'roles',
        displayName: 'Cadastro de Funções',
        menuLabel: 'Funções',
        type: 'children',
        order: 3,
        formType: 'dialog',
      },
    ],
  },
]
