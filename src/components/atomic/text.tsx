import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import React from 'react'

type Ref = HTMLSpanElement
type textVariant = 'primary' | 'black' | 'white' | 'success' | 'error'
type textWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
type textDecoration = 'underline' | 'italic' | ''
type textSize = 'banner' | 'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7'

interface TextOptions {
  variant?: textVariant
  weight?: textWeight
  decoration?: textDecoration
  size?: textSize
}

export type TextProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> & TextOptions;

const getVariant = (variant: textVariant) => {
  switch (variant) {
    case 'primary':
      return 'text-teal-500';
    case 'black':
      return 'text-black';
    case 'white':
      return 'text-white';
    case 'success':
      return 'text-green-500';
    case 'error':
      return 'text-red-500';
  }
}

const getWeight = (weight: textWeight) => {
  switch (weight) {
    case '100':
      return 'font-thin'
    case '200':
      return 'font-extralight'
    case '300':
      return 'font-light'
    case '400':
      return 'font-normal'
    case '500':
      return 'font-medium'
    case '600':
      return 'font-semibold'
    case '700':
      return 'font-bold'
    case '800':
      return 'font-extrabold'
    case '900':
      return 'font-black'
  }
}

const getDecoration = (decoration: textDecoration) => {
  switch (decoration) {
    case 'underline':
      return 'underline'
    case 'italic':
      return 'italic'
  }
}

const getSize = (size: textSize) => {
  switch (size) {
    case 'banner':
      return 'text-2xl md:text-5xl lg:text-6xl'
    case 'h0':
      return 'text-xl md:text-3xl lg:text-5xl'
    case 'h1':
      return 'text-2xl'
    case 'h2':
      return 'text-xl'
    case 'h3':
      return 'text-lg'
    case 'h4':
      return 'text-base'
    case 'h5':
      return 'text-sm'
    case 'h6':
      return 'text-xs'
    case 'h7':
      return 'text-[10px]'
  }
}

const Text = forwardRef<Ref, TextProps>((props, ref) => {
  const {
    variant = 'primary',
    weight = '400',
    size = 'banner',
    decoration = '',
    className,
    children,
    ...rest
  } = props

  const merged = cn(
    getVariant(variant),
    getWeight(weight),
    getDecoration(decoration),
    getSize(size),
    className
  )

  return (
    <>
      <span
        ref={ref}
        className={merged}
        {...rest}
      >
        { children }
      </span>
    </>
  )
})

Text.displayName = 'Text'
export default Text
