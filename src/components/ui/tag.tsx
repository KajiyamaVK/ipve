import { ReactNode } from 'react'

interface ITagProps {
  children: ReactNode
  color: string
}

export function Tag({ children, color }: ITagProps) {
  return <span className={`px-2  ${color}  flex gap-2 rounded-lg text-white`}>{children}</span>
}
