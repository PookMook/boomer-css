import * as React from 'react'
import { styled, v, keyframes, q } from '@/libs/boomer' with { type: 'macro' }

const HeroContainer = styled('section', {
  base: {
    padding: '4rem 2rem',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  }
}, { name: 'HeroContainer' })


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

const holographic = keyframes({
  '0%': {
    backgroundPosition: '0% 50%'
  },
  '100%': {
    backgroundPosition: '400% 50%'
  }
}, 'holographic')


const Title = styled('h1', {
  base: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem', 
    color: v('colors.text'),
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
        color: v('colors.background'),
        textShadow: `
            0 0 7px #3b82f6,
            0 0 10px #3b82f6,
            0 0 21px #3b82f6,
            0 0 42px #8b5cf6,
            0 0 82px #8b5cf6,
            0 0 92px #8b5cf6`,
        animation: `${flicker} 1.5s infinite alternate`
      }
    },
  }
}, { name: 'Title' })

const Subtitle = styled('p', {
  base: {
    fontSize: '1.5rem',
    color: v('colors.textSecondary'),
    maxWidth: '800px',
    margin: '0 auto 2rem'
  }
}, { name: 'Subtitle' })

export function HeroSection() {
  return (
    <HeroContainer>
      <Title>BoomerCSS</Title>
      <Subtitle>
        Write type-safe CSS with themes, variants, and responsive designs - all generated at build time.
      </Subtitle>
    </HeroContainer>
  )
} 