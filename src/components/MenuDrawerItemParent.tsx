import { TMenuDrawerItem } from '@/types/TMenuDrawerItem'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { useContext } from 'react'
import { generalContext } from '@/contexts/generalContext'
import Link from 'next/link'

export function MenuItemParent({
  id,
  menuLabel,
  children,
  icon,
}: TMenuDrawerItem) {
  const { changeScreen, currentScreen } = useContext(generalContext)

  function checkChildrenData() {
    if (children === undefined) {
      throw new Error('children is undefined')
    }
    if (!menuLabel) {
      throw new Error('menuLabel is null')
    }
    if (!id) {
      throw new Error('id is null')
    }

    if (!children) {
      throw new Error('children is null')
    }

    if (children.length === 0) {
      throw new Error('children is empty')
    }
    return true
  }

  checkChildrenData()

  return (
    <div key={menuLabel}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="p-3 pl-5">
          <AccordionTrigger className="text-base font-normal hover:underline flex gap-2 items-center justify-start">
            {icon}
            {menuLabel}
          </AccordionTrigger>
          <AccordionContent>
            {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              children!.map((child) => {
                if (child.type === 'children') {
                  return (
                    <Link
                      href={`/${child.id}`}
                      key={child.menuLabel}
                      className="hover:underline cursor-pointer p-5 pt-1 "
                    >
                      {child.menuLabel}
                    </Link>
                  )
                }
                return null
              })
            }
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
