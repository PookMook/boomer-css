import React from 'react'

// Components
import { HeroSection } from '@/app/(home)/hero-section'
import { Features } from '@/app/(home)/features'
import { CodeExamples } from '@/app/(home)/code-examples'

export default function Home() {
  return (
    <>
      <HeroSection />
      <CodeExamples />
      <Features />
    </>
  )
}
