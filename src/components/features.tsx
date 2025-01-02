import * as React from 'react'
import { styled, v } from '@/libs/boomer' with { type: 'macro' }

const FeaturesSection = styled('section', {
  base: {
    padding: '6rem 2rem',
    backgroundColor: v('colors.backgroundCode'),
  }
}, { name: 'FeaturesSection' })

const FeaturesGrid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    query: {
      'media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      'media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(3, 1fr)'
      }
    }
  }
}, { name: 'FeaturesGrid' })

const FeatureCard = styled('div', {
  base: {
    padding: '2rem',
    backgroundColor: v('colors.background'),
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  }
}, { name: 'FeatureCard' })

const FeatureTitle = styled('h3', {
  base: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: v('colors.text')
  }
}, { name: 'FeatureTitle' })

const FeatureDescription = styled('p', {
  base: {
    color: v('colors.textSecondary'),
    lineHeight: '1.6'
  }
}, { name: 'FeatureDescription' })

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
    <FeaturesSection>
      <FeaturesGrid>
        {features.map((feature) => (
          <FeatureCard key={feature.title}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  )
} 