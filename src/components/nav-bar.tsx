'use client'

import * as React from 'react'
import Link from 'next/link'
import { v, keyframes, q, css } from '@/libs/boomer' with { type: 'macro' }
import * as Popover from '@radix-ui/react-popover'

const NavContainer = css({
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

const NavLinks = css({
  base: {
    display: 'none',
    gap: '2rem',
    query: {
      [q('tabletAndUp/media (min-width: 768px)')]: {
        display: 'flex'
      }
    }
  }
}, { name: 'NavLinks' })

const NavLink = css({
  base: {
    color: v('colors.text'),
    textDecoration: 'none',
    '&:hover': {
      color: v('colors.primary')
    },
  },
  variants: {
    home: {
      true: {
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

const MarqueeText = css({
  base: {
    position: 'absolute',
    zIndex: 1,
    whiteSpace: 'nowrap',
    animation: `${marqueeKeyframes} 15s linear infinite`,
    color: v('colors.text'),
    fontSize: '1rem',
  }
}, { name: 'MarqueeText' })

const MarqueeWrapper = css({
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
    query: {
      [q('tabletAndUp/media (min-width: 768px)')]: {
        display: 'flex'
      }
    }
  },
}, { name: 'MarqueeWrapper' })

const MenuButton = css({
  base: {
    display: 'flex',
    padding: '0.5rem',
    color: v('colors.text'),
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    query: {
      [q('tabletAndUp/media (min-width: 768px)')]: {
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
    <nav className={NavContainer()}>
      <Link href="/" className={NavLink({ home: true })}>BoomerCSS</Link>
      <div className={MarqueeWrapper()}>
        <p className={MarqueeText()}>Zero Runtime CSS-in-TS Solution</p>
      </div>
      <div className={NavLinks()}>
        <Link href="/why" className={NavLink()}>Why</Link>
        <Link href="/getting-started" className={NavLink()}>Getting Started</Link>
        <Link href="/docs" className={NavLink()}>Documentation</Link>
        <Link href="https://github.com/PookMook/boomer-css" className={NavLink()} target="_blank" rel="noopener noreferrer">GitHub</Link>
      </div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className={MenuButton()} aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </Popover.Trigger>
        <Popover.Content className={PopoverContent()}>
          <Link href="/why" className={NavLink()}>Why</Link>
          <Link href="/getting-started" className={NavLink()}>Getting Started</Link>
          <Link href="/docs" className={NavLink()}>Documentation</Link>
          <Link href="https://github.com/PookMook/boomer-css" className={NavLink()} target="_blank" rel="noopener noreferrer">GitHub</Link>
        </Popover.Content>
      </Popover.Root>
    </nav>
  )
}