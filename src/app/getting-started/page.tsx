import React from 'react'
import { styled, v } from '@/libs/boomer' with { type: 'macro' }

const Container = styled('main', {
  base: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  }
}, { name: 'Container' })

const Title = styled('h1', {
  base: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: v('colors.text')
  }
}, { name: 'Title' })

const Section = styled('section', {
  base: {
    maxWidth: '800px',
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
}, { name: 'Section' })

const CodeBlock = styled('pre', {
  base: {
    padding: '1.5rem',
    borderRadius: '0.5rem',
    backgroundColor: v('colors.backgroundCode'),
    color: v('colors.textCode'),
    overflow: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.7',
    margin: '1rem 0'
  }
}, { name: 'CodeBlock' })

const Alert = styled('div', {
  base: {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: v('colors.alertBackground'),
    border: `1px solid ${v('colors.alertBorder')}`,
    color: v('colors.alertText'),
    marginBottom: '2rem',
    '& ul': {
      marginLeft: '1.5rem',
      marginTop: v('spacing.sm')
    },
    '& p': {
      marginTop: v('spacing.sm')
    }
  }
}, { name: 'Alert' })

export default function GettingStartedPage() {
  return (
    <Container>
      <Title>Getting Started with BoomerCSS</Title>
      <Section>
        <Alert>
          <strong>⚠️ Alpha Version Notice:</strong>
          <p>BoomerCSS is currently in alpha stage and has some important limitations:</p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Not compatible with Turbopack - please use webpack for nextjs or other supported bundlers</li>
            <li>Macro functions cannot be used across files - theme, animation, and query values must be defined in the same file as css/styled functions</li>
            <li>API may change without notice</li>
            <li>Some features are still experimental</li>
          </ul>
          <p style={{ marginTop: '0.5rem' }}>Use with caution in production environments.</p>
        </Alert>

        <h2>Prerequisites</h2>
        <p>If you're using Parcel as your bundler, macros will work out of the box. For other bundlers, follow the configuration instructions in the unplugin-parcel-macros documentation.</p>
        <p>Before installing BoomerCSS, you need to set up the required dependencies:</p>
        <CodeBlock>
          <code>npm install -D unplugin-parcel-macros @parcel/macros</code>
        </CodeBlock>

        <h2>Installation</h2>
        <p>1. Copy the boomer.ts file from https://github.com/PookMook/boomer-css/blob/main/src/libs/boomer.ts to your project</p>
        <p>2. Create a theme file at @/css/theme.ts with your configuration (you can change the path in the file downloaded at step 1):</p>
        <CodeBlock>
           {`import { createConfig, globalCSS, v } from '@/libs/boomer' with { type: 'macro' }

// The export are for TypeScript type inference, we are not going to use them.
export const { queries, themeTypeForV } = createConfig({
  theme: {
    base: {
      colors: {
        primary: '#3b82f6',
        // ... your theme values
      }
    }
  }
})

globalCSS({
  // ... your global styles
})

export function run(){}`}
        </CodeBlock>

        <h2>Basic Setup</h2>
        <p>When using BoomerCSS, you must import functions with the macro type declaration. This is crucial as the library will throw an error at runtime without it:</p>
        <CodeBlock>
          <code>{`import { css } from '@/src/lib/boomer.ts' with { type: 'macro' }`}</code>
        </CodeBlock>
        
      </Section>
    </Container>
  )
}