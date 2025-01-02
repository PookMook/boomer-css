'use client'

import * as React from 'react'
import { styled, v } from '@/libs/boomer' with { type: 'macro' }

const ExamplesSection = styled('section', {
  base: {
    padding: '6rem 2rem',
    backgroundColor: v('colors.background')
  }
}, { name: 'ExamplesSection' })

const Container = styled('div', {
  base: {
    maxWidth: '1200px',
    margin: '0 auto'
  }
}, { name: 'Container' })

const SectionTitle = styled('h2', {
  base: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    color: v('colors.text')
  }
}, { name: 'SectionTitle' })

const CodeBlock = styled('pre', {
  base: {
    padding: '1.5rem',
    borderRadius: '0.5rem',
    backgroundColor: v('colors.backgroundCode'),
    color: v('colors.textCode'),
    overflow: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    margin: '2rem 0'
  }
}, { name: 'CodeBlock' })

const TabsContainer = styled('div', {
  base: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  }
}, { name: 'TabsContainer' })

const Tab = styled('button', {
  base: {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: 'transparent',
    color: v('colors.textSecondary'),
    cursor: 'pointer',
    '&:hover': {
      color: v('colors.primary')
    }
  },
  variants: {
    active: {
      true: {
        color: v('colors.primary'),
        borderBottom: `2px solid ${v('colors.primary')}`
      }
    }
  }
}, { name: 'Tab' })

const examples = {
  css: `import { css, v } from '@/libs/boomer' with { type: 'macro' }

// Simple CSS function for one-off styles
const buttonClass = css({
  base: {
    padding: '0.5rem 1rem',
    backgroundColor: v('colors.primary'),
    color: 'white',
    borderRadius: '0.25rem'
  }
})

// CSS function with variants
const buttonWithVariants = css({
  base: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer'
  },
  variants: {
    intent: {
      primary: {
        backgroundColor: v('colors.primary'),
        color: 'white'
      },
      secondary: {
        backgroundColor: 'transparent',
        border: \`1px solid \${v('colors.primary')}\`,
        color: v('colors.primary')
      }
    },
    size: {
      small: { fontSize: '0.875rem' },
      large: { fontSize: '1.125rem' }
    }
  }
})

// Usage:
// <button className={buttonClass()}>Click me</button>
// <button className={buttonWithVariants({ intent: 'primary', size: 'small' })}>Click me</button>`,

  styled: `import { styled, v } from '@/libs/boomer' with { type: 'macro' }

const Button = styled('button', {
  base: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    fontWeight: 'medium'
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: v('colors.primary'),
        color: 'white'
      },
      secondary: {
        backgroundColor: v('colors.secondary'),
        color: 'white'
      }
    },
    size: {
      small: { fontSize: '0.875rem' },
      large: { fontSize: '1.125rem' }
    }
  }
})

// Usage:
// <Button $variant="primary" $size="small">Click me</Button>`,

  theme: `import { createConfig, globalCSS } from '@/libs/boomer' with { type: 'macro' }

// Theme configuration
export const { theme } = createConfig({
  theme: {
    base: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6'
      }
    },
    dark: {
      colors: {
        primary: '#60a5fa',
        secondary: '#a78bfa'
      }
    }
  }
})

// Global styles
globalCSS({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },
  'body': {
    fontFamily: 'system-ui',
    lineHeight: 1.5
  }
})

// Usage:
// The library will generate CSS files for you to import at the root of your project
import '@/css/global.css';
import '@/css/config.css';`
}

export function CodeExamples() {
  const [activeTab, setActiveTab] = React.useState<keyof typeof examples>('css')

  return (
    <ExamplesSection>
      <Container>
        <SectionTitle>Write blazingly fast type-safe styles with ease</SectionTitle>
        <TabsContainer>
          <Tab 
            $active={activeTab === 'css'} 
            onClick={() => setActiveTab('css')}
          >
            Generate Classes
          </Tab>
          <Tab 
            $active={activeTab === 'styled'} 
            onClick={() => setActiveTab('styled')}
          >
            Generate Components
          </Tab>
          <Tab 
            $active={activeTab === 'theme'} 
            onClick={() => setActiveTab('theme')}
          >
            Theme & Global CSS
          </Tab>
        </TabsContainer>
        <CodeBlock>
          <code>{examples[activeTab]}</code>
        </CodeBlock>
      </Container>
    </ExamplesSection>
  )
} 