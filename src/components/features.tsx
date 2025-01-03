import * as React from 'react'
import { styled, v } from '@/libs/boomer' with { type: 'macro' }
import { Container, Grid } from '@/css/layout'
import { Title, Text } from '@/css/typography'

const FeatureCard = styled('div', {
  base: {
    padding: v('spacing.lg'),
    backgroundColor: v('colors.background'),
    borderRadius: v('radii.md'),
    boxShadow: v('shadows.md')
  }
}, { name: 'FeatureCard' })

const features = [
  {
    title: 'Zero Runtime',
    description: 'All CSS is generated at build time with no runtime overhead or style calculations.'
  },
  {
    title: 'Type-Safe Styling',
    description: 'Full TypeScript support for theme tokens, variants, and CSS properties.'
  },
  {
    title: 'Variant Support',
    description: 'Create reusable component variants with type-safe props.'
  },
  {
    title: 'Theme System',
    description: 'Powerful theming with support for dark mode and custom color schemes.'
  },
  {
    title: 'Fully Yours',
    description: 'Modify the code to your liking.'
  },
  {
    title: 'Framework Agnostic',
    description: 'Works with any UI framework or vanilla JavaScript.'
  }
]

export function Features() {
  return (
     <Container $background="alternate" $spread="full" $padding="section">
        <Grid>
          {features.map((feature) => (
            <FeatureCard key={feature.title}>
              <Title $size="section">{feature.title}</Title>
              <Text $responsive>{feature.description}</Text>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
  )
} 