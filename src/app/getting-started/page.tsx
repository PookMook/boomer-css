import React from 'react'
import { styled, v } from '@/libs/boomer' with { type: 'macro' }
import { AlphaDisclaimer } from '@/components/alpha-disclaimer'
import { Container } from '@/css/layout'
import { PageTitle } from '@/css/typography'
import { CodeBlock } from '@/css/code'

export default function GettingStartedPage() {
  return (
    <Container $typographic="true">
      <PageTitle>Getting Started with BoomerCSS</PageTitle>
        <AlphaDisclaimer />

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
    </Container>
  )
}