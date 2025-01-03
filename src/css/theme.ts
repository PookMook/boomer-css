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
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '64px',
        '2xl': '96px',
      },
      fontSizes: {
        defaultFontSize: '75%',
        xs: '0.875rem',
        sm: '1rem',
        md: '1.125rem',
        lg: '1.5rem',
        xl: '2.5rem',
        '2xl': '3.5rem',
      },
      lineHeights: {
        tight: '1.2',
        base: '1.5',
        relaxed: '1.6',
        loose: '1.7',
      },
      radii: {
        sm: '4px',
        md: '8px',
      },
      shadows: {
        sm: '0 2px 10px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      grids: {
        main: 'auto 800px auto',
        mobile: 'auto 1fr auto',
      },
      gaps: {
        sm: '16px',
        md: '32px',
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
      },
      shadows: {
        sm: '0 2px 10px rgba(0, 0, 0, 0.2)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      }
    },
    desktop:{
      fontSizes: {
        defaultFontSize: '100%',
      },
    },
    tablet:{
      fontSizes: {
        defaultFontSize: '90%',
      },
    },
    print:{},
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
  html:{
    fontSize: v('fontSizes.defaultFontSize'),
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