import { IMenuDrawerItem } from '@/types/TMenuDrawerItem'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { ReactNode, useContext } from 'react'
import { generalContext } from '@/contexts/generalContext'
import Link from 'next/link'

export function MenuItemParent({
  menuLabel,
  children,
  icon,
}: {
  menuLabel: string
  children: IMenuDrawerItem[]
  icon: ReactNode
}) {
  const { changeScreen } = useContext(generalContext)

  function checkChildrenData() {
    let result = true

    if (!children) {
      console.error('children is null')
      result = false
    }

    if (children.length === 0) {
      console.error('children is empty')
      result = false
    }

    children.map((child) => {
      if (!child.path || typeof child.path === 'undefined') {
        console.error('child.path is null')
        result = false
      }
    })
    return result
  }

  const resultCheckChildrenData = checkChildrenData()

  if (!resultCheckChildrenData) {
    return null
  }

  return (
    <div key={menuLabel}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="p-3 pl-5">
          <AccordionTrigger className="text-base font-normal hover:underline flex gap-2 items-center justify-start">
            {icon}
            {menuLabel}
          </AccordionTrigger>
          <AccordionContent>
            {children.map((child) => {
              if (child.type === 'children' && child.path) {
                return (
                  <Link
                    href={child.path}
                    className="p-5 pt-1 "
                    key={child.menuLabel}
                    onClick={() => changeScreen(child.displayName)}
                  >
                    <p className="hover:underline cursor-pointer">
                      {child.menuLabel}
                    </p>
                  </Link>
                )
              }
              return null
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
