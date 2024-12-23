// src/components/ui/button.tsx
import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-white text-gray-900 hover:bg-gray-100',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100'
    }
    
    const sizes = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3',
      lg: 'h-12 px-8'
    }

    const variantStyles = variants[variant]
    const sizeStyles = sizes[size]

    return (
      <button
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"