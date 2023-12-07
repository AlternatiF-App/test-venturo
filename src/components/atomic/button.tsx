import * as React from 'react'
import { cn } from '../../lib/utils'

type typeVariant = 'primary' | 'secondary' | 'disabled'
type typeSize = 'primary' | 'default' | 'auth' | 'icon'
type typeRounded = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

const getVariants = (variant: typeVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-teal-600 text-white hover:bg-teal-700 focus:bg-teal-700'
    case 'secondary':
      return 'bg-transparant text-black'
    case 'disabled':
      return 'bg-gray-200 text-gray-400'
  }
}


const getSize = (size: typeSize) => {
  switch (size) {
    case 'primary':
      return 'px-4 py-2 w-full'
    case 'default':
      return 'px-4 py-2'
    case 'auth':
      return 'w-full lg:w-[240px] py-2'
    case 'icon':
      return 'h-8 w-8'
  }
}

const getRounded = (rounded: typeRounded) => {
  switch (rounded) {
    case 'sm':
      return 'rounded-sm'
    case 'md':
      return 'rounded-md'
    case 'lg':
      return 'rounded-lg'
    case 'xl':
      return 'rounded-xl'
    case '2xl':
      return 'rounded-2xl'
    case '3xl':
      return 'rounded-3xl'
    case 'full':
      return 'rounded-full'
  }
}

export interface ButtonProps {
  className?: string
  variant?: typeVariant
  size?: typeSize
  rounded?: typeRounded
  asChild?: boolean
  disabled?: boolean
  children: JSX.Element
  onClick? :Function
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', rounded = 'md', disabled = false, children, onClick = () => {}, ...props }, ref) => {

    const classname = cn(
      getVariants(disabled ? 'disabled' : variant),
      getSize(size),
      getRounded(rounded),
      className,
      'relative'
    )

    return (
      <button
        id='btn-submit'
        className={classname}
        ref={ref}
        disabled={disabled}
        type='submit'
        onClick={() => onClick()}
        {...props}
      >
        { children }
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
