import * as React from 'react'
import { createConfig, globalCSS, q, styled, v } from '@/libs/boomer' with { type: 'macro' }

export const { queries, themeTypeForV } = createConfig({
  queries: {
    large: 'media (min-width: 1200px)',
    desktop: 'media (min-width: 1024px)',
    tablet: 'media (min-width: 768px)', 
    mobile: 'media (max-width: 767px)',
    dark: 'media (prefers-color-scheme: dark)',
    light: 'media (prefers-color-scheme: light)',
    print: 'print',
    noAnimation: 'prefers-reduced-motion: reduce',
  },
  theme: {
    base: {
      colors: {
        background: '#ffffff',
        text: '#1a1a1a',
        textSecondary: '#666666',
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        border: '#e5e7eb',
        backgroundCode: '#f8f9fa',
        textCode: '#1a1a1a',
        alertBackground: '#fef2f2',
        alertBorder: '#fee2e2',
        alertText: '#991b1b'
      },
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem'
      }
    },
    dark: {
      colors: {
        background: '#0f172a',
        text: '#f8fafc',
        textSecondary: '#94a3b8',
        border: '#1e293b',
        backgroundCode: '#1e293b',
        textCode: '#f8fafc',
        alertBackground: '#451a1a',
        alertBorder: '#991b1b',
        alertText: '#fecaca'
      }
    }
  }
}) 

globalCSS({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  'html, body': {
    height: '100%',
    width: '100%',
  },
  body: {
    backgroundColor: v('colors.background'),
    lineHeight: 1.5,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontFamily: 'Inter, sans-serif',
    color: v('colors.text'),
    overflowY: 'scroll',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  '#root, #__next': {
    isolation: 'isolate',
  }
})

export const Main = styled('main', {
    base: {
      backgroundColor: v('colors.background'),
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      gridAutoRows: 'auto',
      query: {
        [q('desktop/media (min-width: 1024px)')]: {
          gridTemplateColumns: 'auto 800px auto'
        },
      }
    },
  }, { name: 'Main' })