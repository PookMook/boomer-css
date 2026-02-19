import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AlphaDisclaimer } from '@/components/alpha-disclaimer'
import { Container } from '@/css/layout'
import { CodeBlock } from '@/css/code'
import { PageTitle } from '@/css/typography'

export const Route = createFileRoute('/docs')({
  component: DocumentationPage,
})

function DocumentationPage() {
  return (
    <Container $typographic="true">
      <PageTitle>Documentation</PageTitle>
        <AlphaDisclaimer />
        
        <h2>Core Concepts</h2>
        <p>
          boomerCSS is a TypeScript CSS preprocessor that runs at build time and keeps runtime style work at zero. 
          It provides a type-safe way to write CSS with support for themes, variants, responsive designs, and a zero-runtime output path everywhere.
        </p>


        <h2>Best Practices</h2>
        <ul>
          <li>Always import functions with the macro type declaration</li>
          <li>Use semantic names for variants and theme values</li>
          <li>Leverage the theme system for consistent styling</li>
          <li>Use the css function for reusable styles across different components</li>
          <li>Use the styled function when you need a styled React component</li>
        </ul>

        <h2>The css Function</h2>
        <p>
          The <code>css</code> function is the core building block of boomerCSS. It generates class names for your styles at build time.
        </p>

        <h3>Basic Usage</h3>
        <CodeBlock>
          <code>{`import { css } from '@/libs/boomer' with { type: 'macro' }

const buttonClass = css({
  base: {
    padding: '0.5rem 1rem',
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '0.25rem'
  }
})

// Usage:
// <button className={buttonClass()}>Click me</button>`}</code>
        </CodeBlock>

        <h3>With Variants</h3>
        <CodeBlock>
          <code>{`const buttonWithVariants = css({
  base: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem'
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
// <button className={buttonWithVariants({ intent: 'primary', size: 'small' })}>
//   Click me
// </button>`}</code>
        </CodeBlock>

        <h3>With Media Queries</h3>
        <CodeBlock>
          <code>{`const responsiveBox = css({
  base: {
    padding: '1rem',
    query: {
      [q('tablet/media (min-width: 768px)')]: {
        padding: '2rem'
      },
      [q('desktop/media (min-width: 1024px)')]: {
        padding: '3rem'
      }
    }
  }
})`}</code>
        </CodeBlock>

        

        <h2>The styled Function</h2>
        <p>
          The <code>styled</code> function creates React components with built-in styles. It's similar to the css function but returns a component instead of a class name.
        </p>

        <CodeBlock>
          <code>{`const Button = styled('button', {
  base: {
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    backgroundColor: v('colors.primary'),
    color: 'white'
  },
  variants: {
    size: {
      small: { fontSize: '0.875rem' },
      large: { fontSize: '1.125rem' }
    }
  }
})

// Usage:
// <Button $size="small">Click me</Button>`}</code>
        </CodeBlock>

        <h2>Naming Styles</h2>
        <p>
          Both <code>css</code> and <code>styled</code> functions accept an optional name parameter that helps with debugging and DevTools identification.
        </p>
        <CodeBlock>
          <code>{`const buttonClass = css({
  base: {
    padding: '0.5rem 1rem',
    backgroundColor: v('colors.primary'),
    color: 'white'
  }
}, { name: 'Button' }) // This name will appear in the generated class

const StyledButton = styled('button', {
  base: {
    padding: '0.5rem 1rem',
    backgroundColor: v('colors.primary'),
    color: 'white'
  }
}, { name: 'StyledButton' }) // This name will appear in the DOM`}</code>
        </CodeBlock>

        <h2>Animations with keyframes</h2>
        <p>
          Use the <code>keyframes</code> function to create CSS animations. Like other boomerCSS functions, it generates the CSS at build time.
        </p>

        <CodeBlock>
          <code>{`import { keyframes, styled } from '@/libs/boomer' with { type: 'macro' }

const fadeIn = keyframes({
  '0%': {
    opacity: 0
  },
  '100%': {
    opacity: 1
  }
}, 'fadeIn') // Optional name for the animation, if set it will be used in the generated CSS as is. So you can reference it in other files by name.

const FadeInDiv = styled('div', {
  base: {
    animation: \`\${fadeIn} 0.3s ease-in\`,
    query: {
      [q('noAnimation/prefers-reduced-motion: reduce')]: {
        animation: 'none'
      }
    }
  }
})

// More complex example
const flicker = keyframes({
  '0%, 18%, 22%, 25%, 53%, 57%, 100%': {
    textShadow: \`
      0 0 7px #3b82f6,
      0 0 10px #3b82f6,
      0 0 21px #3b82f6,
      0 0 42px #8b5cf6,
      0 0 82px #8b5cf6
    \`
  },
  '20%, 24%, 55%': {
    textShadow: 'none'
  }
}, 'flicker')

const NeonText = styled('span', {
  base: {
    color: 'white',
    animation: \`\${flicker} 1.5s infinite alternate\`
  }
})`}</code>
        </CodeBlock>

        <h2>Theme Configuration</h2>
        <p>
          Themes are configured using the <code>createConfig</code> function. This sets up your design tokens and media queries.
        </p>

        <CodeBlock>
          <code>{`import { createConfig } from '@/libs/boomer' with { type: 'macro' }

export const { queries, themeTypeForV } = createConfig({
  queries: {
    desktop: 'media (min-width: 1024px)',
    tablet: 'media (min-width: 768px)',
    dark: 'media (prefers-color-scheme: dark)'
  },
  theme: {
    base: {
      colors: {
        primary: '#3b82f6',
        text: '#1a1a1a'
      },
      spacing: {
        sm: '0.5rem',
        md: '1rem'
      }
    },
    dark: {
      colors: {
        text: '#ffffff'
      }
    }
  }
})`}</code>
        </CodeBlock>

        <h2>Using Theme Values</h2>
        <p>
          The <code>v()</code> function accesses theme values, while <code>q()</code> accesses media queries.
        </p>
        <p>While it's not required, it's recommended to use <code>v()</code> and <code>q()</code> functions to access theme values and media queries. Those are statically typed and will be checked at build time for missing declaration.</p>

        <CodeBlock>
          <code>{`// Using theme values
const Box = styled('div', {
  base: {
    color: v('colors.text'),
    padding: v('spacing.md'),
    query: {
      [q('dark/media (prefers-color-scheme: dark)')]: {
        backgroundColor: '#000'
      }
    }
  }
})`}</code>
        </CodeBlock>

        <h2>Global Styles</h2>
        <p>
          Use <code>globalCSS</code> to define global styles for your application.
        </p>

        <CodeBlock>
          <code>{`globalCSS({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },
  'body': {
    backgroundColor: v('colors.background'),
    color: v('colors.text'),
    fontFamily: 'system-ui'
  }
})`}</code>
        </CodeBlock>
    </Container>
  )
}
