import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode } from 'react'
import { Button } from './button'

type TDialogForm = {
  title: string
  description: string
  trigger: string
  content: ReactNode
  footer: ReactNode
}

export function DataTableFormDialog({
  title,
  description,
  trigger,
  content,
  footer,
}: TDialogForm) {
  return (
    <Dialog>
      <DialogTrigger className="bg-primary text-primary-foreground px-5 py-2 rounded-lg">
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
      {footer}
    </Dialog>
  )
}
