import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import Link from 'next/link'
import { getRouteData } from '@/utils/getRouteData'
import { useContext } from 'react'
import { generalContext } from '@/contexts/generalContext'

export function MenuItemParent(id: string) {
  const { menuLabel, icon, children } = getRouteData(id)
  const { setIsScreenLoading } = useContext(generalContext)
  return (
    <div key={menuLabel}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-3  pl-5">
          <AccordionTrigger className="text-base font-normal hover:underline flex gap-2 items-center justify-start">
            {icon}
            {menuLabel}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col">
            {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              children!.map((child) => {
                if (child.type === 'children') {
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsScreenLoading(true)
                      }}
                      key={child.menuLabel}
                    >
                      <Link
                        href={`${child.path}`}
                        className="hover:underline cursor-pointer px-5  pt-1"
                      >
                        {child.menuLabel}
                      </Link>
                    </div>
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
