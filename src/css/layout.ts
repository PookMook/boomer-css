import * as React from 'react'
import { styled, q, v } from '@/libs/boomer' with { type: 'macro' }

export const Container = styled('div', {
  base: {
    gridColumn: '2 / 3',
    maxWidth: '100vw',
    paddingBlock: '2rem'
  },
  variants: {
    spread: {
        full:{
            gridColumn: '1 / -1',
        }
    },
    padding: {
        hero: {
            paddingBlock: '6rem'
        },
        section: {
            padding: '2rem'
        },
      none: {
        paddingBlock: '0'
      },
    },
    background: {
      alternate: {
        backgroundColor: v('colors.backgroundCode')
      }
    },
    typographic: {
        true: {
            '& h2': {
                fontSize: '1.75rem',
                fontWeight: 'bold',
                marginTop: '2rem',
                marginBottom: '1rem',
                color: v('colors.text')
              },
              '& p': {
                marginBottom: '1rem',
                color: v('colors.textSecondary'),
                lineHeight: 1.7
              }
        }
    }
  },
}, { name: 'Container' })

export const Grid = styled('div', {
  base: {
    display: 'grid',
    width: '100%',
    gap: '1rem',
        query: {
          [q('tablet/media (min-width: 768px)')]: {
            gap: '2rem',
            gridTemplateColumns: 'repeat(1, 1fr)'
          },
          [q('desktop/media (min-width: 1024px)')]: {
            gridTemplateColumns: 'repeat(2, 1fr)'
          },
          [q('large/media (min-width: 1200px)')]: {
            gridTemplateColumns: 'repeat(3, 1fr)'
          }
        }
  },
}, { name: 'Grid' }) 