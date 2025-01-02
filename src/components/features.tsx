import * as React from 'react'
import { styled, v, q } from '@/libs/boomer' with { type: 'macro' }

const FeaturesSection = styled('section', {
  base: {
    padding: '6rem 1rem', // Reduced side padding for mobile
    backgroundColor: v('colors.backgroundCode'),
    width: '100%',
    overflowX: 'hidden', // Prevent horizontal scroll
    query: {
      [q('tablet/media (min-width: 768px)')]: {
        padding: '6rem 2rem'
      }
    }
  }
}, { name: 'FeaturesSection' })

const FeaturesGrid = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem', // Reduced gap for mobile
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    query: {
      [q('tablet/media (min-width: 768px)')]: {
        gap: '2rem',
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      [q('desktop/media (min-width: 1024px)')]: {
        gridTemplateColumns: 'repeat(3, 1fr)'
      }
    }
  }
}, { name: 'FeaturesGrid' })

const FeatureCard = styled('div', {
  base: {
    padding: '1.5rem', // Reduced padding for mobile
    backgroundColor: v('colors.background'),
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    query: {
      [q('tablet/media (min-width: 768px)')]: {
        padding: '2rem'
      }
    }
  }
}, { name: 'FeatureCard' })

const FeatureTitle = styled('h3', {
  base: {
    fontSize: '1.25rem', // Slightly smaller for mobile
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    color: v('colors.text'),
    query: {
      [q('tablet/media (min-width: 768px)')]: {
        fontSize: '1.5rem',
        marginBottom: '1rem'
      }
    }
  }
}, { name: 'FeatureTitle' })

const FeatureDescription = styled('p', {
  base: {
    color: v('colors.textSecondary'),
    lineHeight: '1.6',
    fontSize: '0.875rem', // Smaller font for mobile
    query: {
      [q('tablet/media (min-width: 768px)')]: {
        fontSize: '1rem'
      }
    }
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