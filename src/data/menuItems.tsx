import { Gauge, Keyboard } from '@phosphor-icons/react'
import { TMenuDrawerItem } from '@/types/TMenuDrawerItem'

export const menuItems: TMenuDrawerItem[] = [
  {
    id: 'dashboard',
    path: '/',
    displayName: 'Dashboard',
    menuLabel: 'Dashboard',
    type: 'normal',
    order: 1,
    icon: <Gauge size={32} />,
    formType: null,
  },
  {
    id: 'register',
    displayName: 'Cadastros',
    menuLabel: 'Cadastros',
    type: 'parent',
    order: 2,
    icon: <Keyboard size={32} />,
    formType: null,
    children: [
      {
        id: 'people',
        displayName: 'Cadastro de Pessoas',
        menuLabel: 'Pessoas',
        path: '/people',
        type: 'children',
        order: 1,
        formType: 'page',
      },
      {
        id: 'titles',
        displayName: 'Cadastro de Cargos',
        menuLabel: 'Cargos',
        path: '/people/titles',
        type: 'children',
        order: 2,
        formType: 'dialog',
      },
      {
        id: 'roles',
        displayName: 'Cadastro de Funções',
        menuLabel: 'Funções',
        path: '/people/roles',
        type: 'children',
        order: 3,
        formType: 'dialog',
      },
      {
        id: 'locations',
        displayName: 'Cadastro de Locais',
        menuLabel: 'Locais',
        path: '/locations',
        type: 'children',
        order: 4,
        formType: 'dialog',
      },
    ],
  },
]
