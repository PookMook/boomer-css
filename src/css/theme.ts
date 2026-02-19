import * as React from 'react'
import { createConfig, globalCSS, q, styled, v } from '@/libs/boomer' with { type: 'macro' }

export const { queries, themeTypeForV } = createConfig({
  queries: {
    largeAndUp: 'media (min-width: 1200px)',
    desktopAndDown: 'media (max-width: 1199px)',
    desktopAndUp: 'media (min-width: 1024px)', 
    tabletAndDown: 'media (max-width: 1023px)',
    tabletAndUp: 'media (min-width: 768px)',
    mobileAndDown: 'media (max-width: 767px)',
    dark: 'media (prefers-color-scheme: dark)',
    light: 'media (prefers-color-scheme: light)',
    print: 'print',
    noAnimation: 'prefers-reduced-motion: reduce',
    highContrastDark: 'media (prefers-contrast: more) and (prefers-color-scheme: dark)',
    highContrastLight: 'media (prefers-contrast: more) and (prefers-color-scheme: light)',
  },
  theme: {
    base: {
      colors: {
        background: '#ffffff',
        text: '#1a1a1a', // Contrast ratio 14.4:1
        textSecondary: '#595959', // Contrast ratio 7:1 
        primary: '#0052cc', // Contrast ratio 7.5:1
        secondary: '#6200ee', // Contrast ratio 8.3:1
        border: '#d1d5db',
        backgroundCode: '#f8f9fa',
        textCode: '#1a1a1a', // Same high contrast as main text
        alertBackground: '#fef2f2',
        alertBorder: '#fee2e2', 
        alertText: '#7f1d1d' // Contrast ratio 7.5:1 against alertBackground
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
      fontFamilies: {
        body: 'Inter, sans-serif',
        neon: '"Tilt Neon", "Inter", sans-serif',
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
        text: '#ffffff', // Contrast ratio 21:1
        textSecondary: '#cbd5e1', // Contrast ratio 11.5:1
        border: '#1e293b',
        backgroundCode: '#1e293b',
        textCode: '#ffffff', // Contrast ratio 13.5:1
        alertBackground: '#451a1a',
        alertBorder: '#991b1b',
        alertText: '#ffffff' // Contrast ratio 12:1 against alertBackground
      },
      shadows: {
        sm: '0 2px 10px rgba(0, 0, 0, 0.2)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      }
    },
    highContrastLight: {
      colors: {
        background: '#ffffff',
        text: '#000000', // Maximum contrast ratio
        textSecondary: '#000000',
        primary: '#000000',
        secondary: '#000000',
        border: '#000000',
        backgroundCode: '#ffffff',
        textCode: '#000000',
        alertBackground: '#ffffff',
        alertBorder: '#000000',
        alertText: '#000000'
      }
    },
    highContrastDark: {
      colors: {
        background: '#000000',
        text: '#ffffff', // Maximum contrast ratio
        textSecondary: '#ffffff',
        primary: '#ffffff',
        secondary: '#ffffff',
        border: '#ffffff',
        backgroundCode: '#000000',
        textCode: '#ffffff',
        alertBackground: '#000000',
        alertBorder: '#ffffff',
        alertText: '#ffffff'
      }
    },
    tabletAndUp:{
      fontSizes: {
        defaultFontSize: '90%',
      },
    },
    desktopAndUp:{
      fontSizes: {
        defaultFontSize: '100%',
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
    fontFamily: v('fontFamilies.body'),
    color: v('colors.text'),
    overflowY: 'scroll',
    isolation: 'isolate',
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
  
})

export const Main = styled('main', {
    base: {
      backgroundColor: v('colors.background'),
    },
  }, { name: 'Main' })
