import { ReactNode } from 'react'

interface ITagProps {
  children: ReactNode
  color: string
}

export function Tag({ children, color }: ITagProps) {
  return <span className={`px-2 py-1 ${color}  text-white rounded-lg flex gap-2`}>{children}</span>
}
