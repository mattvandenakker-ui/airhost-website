'use client'

import { forwardRef } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[0.9375rem]',
  lg: 'px-8 py-4 text-base',
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-[#1A56DB] hover:bg-[#1140A6] text-white',
  secondary: 'border border-[#1A56DB] text-[#1A56DB] hover:bg-[#EBF2FF]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, className = '', children, ...props }, ref) => {
    const base = `inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200 font-body ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    if (href) {
      return (
        <Link href={href} className={base}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={base} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
