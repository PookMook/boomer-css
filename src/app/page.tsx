import React from 'react'

// Components
import { HeroSection } from '@/components/hero-section'
import { Features } from '@/components/features'
import { CodeExamples } from '@/components/code-examples'

export default function Home() {
  return (
    <>
      <HeroSection />
      <CodeExamples />
      <Features />
    </>
  )
}
