import * as React from 'react'

import { cn } from '@/lib/utils'
import InputMask, { ReactInputMask } from 'react-input-mask'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mask?: string
}

const Input = React.forwardRef<ReactInputMask, InputProps>(
  ({ className, type, mask, ...props }, ref) => {
    const maskValue = mask || ''
    return (
      <InputMask
        mask={maskValue}
        type={type}
        className={cn(
          'border-b-2 border-gray-500  text-foreground p-2 m-2 focus:outline-none focus:border-b-[3px] flex h-10 w-full rounded-md  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
