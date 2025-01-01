import * as React from 'react'
import { v,styled, keyframes} from '@/libs/boomer' with { type: 'macro' }
const NavContainer = styled('nav', {
  base: {
    padding: '1rem',
    display: 'flex',
    gap: v('spacing.md'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: v('colors.border')
  }
}, { name: 'NavContainer' })

const NavLinks = styled('div', {
  base: {
    display: 'flex',
    gap: '2rem'
  }
}, { name: 'NavLinks' })

const NavLink = styled('a', {
  base: {
    color: v('colors.text'),
    textDecoration: 'none',
    '&:hover': {
      color: v('colors.primary')
    }
  }
}, { name: 'NavLink' })

const marqueeKeyframes = keyframes({
  '0%': {
    right: '-31ch'
  },
  '100%': {
    right: '100%'
  }
}, 'marquee')




const MarqueeText = styled('p', {
  base: {
    position: 'absolute',
    zIndex: 1,
    whiteSpace: 'nowrap',
    animation: `${marqueeKeyframes} 15s linear infinite`,
    color: v('colors.text'),
    fontSize: '1rem',
  }
}, { name: 'MarqueeText' })

const MarqueeWrapper = styled('div', {
  base: {
    flex: 1,
    height: '1rem',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    "&::before, &::after": {
      zIndex: 2,
      width: '31ch',
      height: '100%',
      content: '""',
      position: 'absolute',
      left: '0',
    },
    "&::after": {
        left: 'auto',
        right: '0',
        background: `linear-gradient(to left, ${v('colors.background')}, transparent)`
    },
    "&::before": {
      background: `linear-gradient(to right, ${v('colors.background')}, transparent)`
    }
  }
}, { name: 'MarqueeWrapper' })




export function NavBar() {
  return (
    <NavContainer>
      <h1>BoomerCSS</h1>
      <MarqueeWrapper><MarqueeText>Zero Runtime CSS-in-TS Solution</MarqueeText></MarqueeWrapper>
      <NavLinks>
        <NavLink href="#features">Features</NavLink>
        <NavLink href="#docs">Documentation</NavLink>
        <NavLink href="https://github.com/PookMook/boomer-css">GitHub</NavLink>
      </NavLinks>
    </NavContainer>
  )
} 