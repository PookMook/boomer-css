import * as React from 'react'
import { styled, q, v } from '@/libs/boomer' with { type: 'macro' }

export const Container = styled('div', {
  base: {
    maxWidth: '100vw',
    width: '100%',
    paddingBlock: v('spacing.lg'),
    paddingInline: v('spacing.lg'),
    query: {
      [q('desktopAndUp/media (min-width: 1024px)')]: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0'
      },
    },
  },
  variants: {
    spread: {
        full:{
            maxWidth: '100vw',
            width: '100%'
        }
    },
    padding: {
        hero: {
            paddingBlock: v('spacing.2xl')
        },
        section: {
            padding: v('spacing.lg')
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
            },
            '& ul, & ol': {
                marginBottom: '1rem',
                paddingLeft: '1.5rem',
                color: v('colors.textSecondary'),
                lineHeight: 1.7,
            },
            '& li': {
                marginBottom: '0.5rem'
            },
            '& ul': {
                listStyleType: 'disc'
            },
            '& ol': {
                listStyleType: 'decimal'
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
          [q('tabletAndDown/media (max-width: 1023px)')]: {
            gap: '2rem',
            gridTemplateColumns: 'repeat(1, 1fr)'
          },
          [q('desktopAndUp/media (min-width: 1024px)')]: {
            gridTemplateColumns: 'repeat(2, 1fr)'
          },
          [q('largeAndUp/media (min-width: 1200px)')]: {
            gridTemplateColumns: 'repeat(3, 1fr)'
          }
        }
  },
}, { name: 'Grid' }) 