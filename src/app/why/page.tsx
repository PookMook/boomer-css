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

export default function WhyPage() {
  return (
    <Container>
      <Title>Why boomerCSS?</Title>
      <Section>
        <h2>Embracing the Cascade</h2>
        <p>
          boomerCSS was created to bring back the power of CSS's cascade while maintaining the benefits of modern CSS-in-JS solutions. Unlike other styling libraries that fight against the cascade, boomerCSS works with it to create more maintainable and performant stylesheets.
        </p>

        <h2>Zero Runtime Overhead</h2>
        <p>
          Using macro functions, boomerCSS generates all styles at build time, resulting in zero runtime overhead. This means your styles are compiled into static CSS files, eliminating the performance costs typically associated with CSS-in-JS libraries.
        </p>

        <h2>Type-Safe Styling</h2>
        <p>
          With full TypeScript support, boomerCSS provides type safety for your styles, theme values, and variants. This helps catch styling errors during development and provides better IDE support with autocompletion.
        </p>

        <h2>Simplified Theme Management</h2>
        <p>
          boomerCSS makes theme management straightforward with a centralized theme configuration. Variables are automatically typed and can be accessed throughout your application, making it easy to maintain consistent styling across your project.
        </p>

        <h2>Always Up to Date</h2>
        <p>
          Since boomerCSS does very little beyond providing a thin wrapper around native CSS, you'll never have to wait for library updates to use new CSS features. As soon as your target browsers support a new CSS feature, you can start using it immediately in your boomerCSS styles.
        </p>

        <h2>Full Control Over Your Styling Solution</h2>
        <p>
          The entire boomerCSS library is small, straightforward, and fully customizable. As the source code lives in your project, you have complete control to modify and extend it according to your specific needs. This means you can adapt the styling solution to perfectly match your project's requirements without being constrained by third-party limitations.
        </p>

        <h2>Best of Both Worlds</h2>
        <p>
          By combining the power of CSS's cascade with modern development features like type safety and build-time optimization, boomerCSS offers a unique solution that's both powerful and developer-friendly. It's designed for developers who want to write maintainable, performant styles without fighting against CSS's natural behavior.
        </p>
      </Section>
    </Container>
  )
}