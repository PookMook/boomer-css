import * as React from 'react'
import { styled, v } from '@/libs/boomer' with { type: 'macro' }

export const CodeBlock = styled('pre', {
  base: {
    padding: '1.5rem',
    borderRadius: '0.5rem',
    backgroundColor: v('colors.backgroundCode'),
    color: v('colors.textCode'),
    overflow: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    whiteSpace: 'pre-wrap',
    margin: '1rem 0'
  },
  variants: {
    spacing: {
      large: {
        margin: '2rem 0'
      }
    }
  }
}, { name: 'CodeBlock' }) 