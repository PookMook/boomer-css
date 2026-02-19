import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/home/hero-section'
import { Features } from '@/components/home/features'
import { CodeExamples } from '@/components/home/code-examples'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <HeroSection />
      <CodeExamples />
      <Features />
    </>
  )
}
