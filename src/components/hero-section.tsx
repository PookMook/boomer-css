import * as React from 'react'
import { Container } from '@/css/layout'
import { Title, Text } from '@/css/typography'

export function HeroSection() {
  return (
    <Container $padding="hero">
      <Title $size="hero" $neon="true" $align="center">Boomer​CSS</Title>
      <Text $size="large" $floating="true">
        Write type-safe CSS with themes, variants, and responsive designs - all generated at build time.
      </Text>
    </Container>
  )
} 