import React from 'react'
import { styled, v } from '@/libs/boomer' with { type: 'macro' }

const Alert = styled('div', {
  base: {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: v('colors.alertBackground'),
    border: `1px solid ${v('colors.alertBorder')}`,
    color: v('colors.alertText'),
    marginBottom: '2rem',
    '& ul': {
      marginLeft: '1.5rem',
      marginTop: v('spacing.sm')
    },
    '& p': {
      marginTop: v('spacing.sm')
    }
  }
}, { name: 'Alert' })

export function AlphaDisclaimer() {
  return (
    <Alert>
      <strong>⚠️ Alpha Version Notice:</strong>
      <p>BoomerCSS is currently in alpha stage and has some important limitations:</p>
      <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
        <li>Not compatible with Turbopack - please use Vite or other supported bundlers</li>
        <li>Macros don't play well with build cache in vercel deployments, you might need to disable it or redeploy manually sometimes</li>
        <li>Macro functions cannot be used across files - theme, animation, and query values must be defined in the same file as css/styled functions</li>
        <li>API may change without notice</li>
        <li>Some features are still experimental</li>
      </ul>
      <p style={{ marginTop: '0.5rem' }}>Use with caution in production environments.</p>
    </Alert>
  )
} 
