'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import Link from 'next/link'
import { getRouteData } from '@/utils/getRouteData'
import { useContext } from 'react'
import { usePathname } from 'next/navigation'
import { formsContext } from '@/contexts/formsContext'

export function MenuItemParent(id: string) {
  const { menuLabel, icon, children, path } = getRouteData(id)
  const { setIsDialogOpen, setIsSkeletonOpen } = useContext(formsContext)
  const currentPath = usePathname()

  function handleLinkClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()

    setIsDialogOpen(false)
    setIsSkeletonOpen(false)

    if (path === currentPath) {
      return false
    }
  }
  return (
    <div key={menuLabel}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="px-3  pl-5">
          <AccordionTrigger className="flex items-center justify-start gap-2 text-base font-normal hover:underline">
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
                        if (child.path === currentPath) {
                          return
                        }
                        handleLinkClick(e)
                      }}
                      key={child.menuLabel}
                    >
                      <Link href={`${child.path}`} className="cursor-pointer px-5 pt-1  hover:underline">
                        {child.menuLabel}
                      </Link>
                    </div>
                  )
                }
                return <></>
              })
            }
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
