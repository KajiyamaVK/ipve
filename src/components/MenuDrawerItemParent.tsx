import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import Link from 'next/link'
import { getRouteData } from '@/utils/getRouteData'

export function MenuItemParent(id: string) {
  const { menuLabel, icon, children } = getRouteData(id)

  return (
    <div key={menuLabel}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="p-3 pl-5">
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
                    <Link
                      href={`/${child.id}`}
                      className="hover:underline cursor-pointer p-5 pt-1"
                      key={child.menuLabel}
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
