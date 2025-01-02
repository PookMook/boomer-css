'use client'

import * as React from 'react'
import { v, styled, keyframes, q, css } from '@/libs/boomer' with { type: 'macro' }
import * as Popover from '@radix-ui/react-popover'

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
    display: 'none',
    gap: '2rem',
    query: {
      [q('tablet/media (min-width: 768px)')]: {
        display: 'flex'
      }
    }
  }
}, { name: 'NavLinks' })

const NavLink = styled('a', {
  base: {
    color: v('colors.text'),
    textDecoration: 'none',
    '&:hover': {
      color: v('colors.primary')
    },
},
    variants: {
        home:{
            true:{
                fontSize: '1.5rem',
                fontWeight: 'bold'

            }
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
    display: 'none',
    alignItems: 'center',
    "&::before, &::after": {
        zIndex: 2,
        width: '15ch',
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
              },
    query:{
        [q('tablet/media (min-width: 768px)')]: {
            display: 'flex'
        }
      }
  },
}, { name: 'MarqueeWrapper' })

const MenuButton = styled('button', {
  base: {
    display: 'flex',
    padding: '0.5rem',
    color: v('colors.text'),
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    query: {
      [q('tablet/media (min-width: 768px)')]: {
        display: 'none'
      }
    }
  }
}, { name: 'MenuButton' })

const PopoverContent = css({
  base: {
    backgroundColor: v('colors.background'),
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }
}, { name: 'PopoverContent' })

export function NavBar() {
  return (
    <NavContainer>
      <NavLink $home="true" href="/">BoomerCSS</NavLink>
      <MarqueeWrapper>
        <MarqueeText>Zero Runtime CSS-in-TS Solution</MarqueeText>
      </MarqueeWrapper>
      <NavLinks>
        <NavLink href="/why">Why</NavLink>
        <NavLink href="/getting-started">Getting Started</NavLink>
        <NavLink href="/docs">Documentation</NavLink>
        <NavLink href="https://github.com/PookMook/boomer-css" target="_blank" rel="noopener noreferrer">GitHub</NavLink>
      </NavLinks>
      <Popover.Root>
        <Popover.Trigger asChild>
          <MenuButton aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </MenuButton>
        </Popover.Trigger>
        <Popover.Content className={PopoverContent()}>
          <NavLink href="/why">Why</NavLink>
          <NavLink href="/getting-started">Getting Started</NavLink>
          <NavLink href="/docs">Documentation</NavLink>
          <NavLink href="https://github.com/PookMook/boomer-css" target="_blank" rel="noopener noreferrer">GitHub</NavLink>
        </Popover.Content>
      </Popover.Root>
    </NavContainer>
  )
}