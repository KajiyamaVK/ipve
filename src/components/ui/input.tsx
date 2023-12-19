'use client'

import { forwardRef, useState } from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, name, ...props }, ref) => {
    const [isOnFocus, setOnFocus] = useState(false)

    function activateOnFocusState() {
      setOnFocus(true)
    }

    function deactivateOnFocusState() {
      setOnFocus(false)
    }

    name = name || ''

    return (
      <input
        type={type}
        className={`border-b-2 border-gray-500  text-foreground p-2 m-2 focus:outline-none focus:border-b-[3px] ${className}`}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
