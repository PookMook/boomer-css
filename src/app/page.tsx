import React from 'react'
import { styled, v } from '@/libs/boomer' with { type: 'macro' }

// Components
import { NavBar } from '@/components/nav-bar'
import { HeroSection } from '@/components/hero-section'
import { Features } from '@/components/features'
import { CodeExamples } from '@/components/code-examples'

// Styled components
const Main = styled('main', {
  base: {
    minHeight: '100vh',
    backgroundColor: v('colors.background'),
  }
}, { name: 'Main' })

export default function Home() {
  return (
    <Main>
      <NavBar />
      <HeroSection />
      <CodeExamples />
      <Features />
    </Main>
  )
}
