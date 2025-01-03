import * as React from 'react'
import { styled, v, q, keyframes } from '@/libs/boomer' with { type: 'macro' }

const holographic = keyframes({
  '0%': {
    backgroundPosition: '0% 50%'
  },
  '100%': {
    backgroundPosition: '400% 50%'
  }
}, 'holographic')

const flicker = keyframes({
  '0%, 18%, 22%, 25%, 53%, 57%, 100%': {
    textShadow: `
      0 0 7px #3b82f6,
      0 0 10px #3b82f6, 
      0 0 21px #3b82f6,
      0 0 42px #8b5cf6,
      0 0 82px #8b5cf6,
      0 0 92px #8b5cf6
    `
  },
  '20%, 24%, 55%': {
    textShadow: 'none'
  }
}, 'flicker')

export const Title = styled('h1', {
  base: {
    fontWeight: 'bold',
    color: v('colors.text'),
  },
  variants: {
    size: {
      hero: { fontSize: '3.5rem' },
      section: { fontSize: '1.5rem' },
    },
    neon: {
      true: {
        query: {
          [q('light/media (prefers-color-scheme: light)')]: {
            background: `linear-gradient(45deg, 
              #ff0000 0%, 
              #00ff00 33%,
              #0000ff 66%,
              #ff0000 99%,
              #ff0000 100%
            )`,
            backgroundSize: '400%',
            color: 'transparent',
            backgroundClip: 'text',
            animation: `${holographic} 28s linear infinite`,
          },
          [q('dark/media (prefers-color-scheme: dark)')]: {
            color: 'white',
            fontFamily: 'var(--font-neoneon)',
            letterSpacing: '0.25rem',
            textShadow: `
              0 0 7px #3b82f6,
              0 0 10px #3b82f6,
              0 0 21px #3b82f6,
              0 0 42px #8b5cf6,
              0 0 82px #8b5cf6,
              0 0 92px #8b5cf6`,
            animation: `${flicker} 1.5s infinite alternate`
          },
          [q('noAnimation/prefers-reduced-motion: reduce')]: {
            animation: 'none'
          },
        }
      }
    },
    align: {
      center: { textAlign: 'center' },
      left: { textAlign: 'left' },
      right: { textAlign: 'right' }
    }
  }
}, { name: 'Title' })

export const PageTitle = styled('h2', {
    base: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      color: v('colors.text')
    }
  }, { name: 'PageTitle' })


export const Text = styled('p', {
  base: {
    color: v('colors.textSecondary'),
    lineHeight: '1.6',
    fontSize: '1rem'
  },
  variants: {
    floating: {
        true: {
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
        }
    },
    size: {
      small: { fontSize: '0.875rem' },
      base: { fontSize: '1rem' },
      large: { fontSize: '1.5rem' },
    },
    responsive: {
      true: {
        fontSize: '0.875rem',
        query: {
          [q('tablet/media (min-width: 768px)')]: {
            fontSize: '1rem'
          }
        }
      }
    }
  },
}, { name: 'Text' }) 