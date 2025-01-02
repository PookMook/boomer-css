import React from 'react'
import type { Metadata } from 'next/types'
import { Inter, Tilt_Neon } from "next/font/google";
import { run } from '@/css/theme';
import { styled, v } from '@/libs/boomer' with { type: 'macro' }
import { NavBar } from '@/components/nav-bar'


const inter = Inter({ subsets: ["latin"] });
const neoneon = Tilt_Neon({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-neoneon'
})


const Main = styled('main', {
    base: {
      minHeight: '100vh',
      backgroundColor: v('colors.background'),
    }
  }, { name: 'Main' })

export const metadata: Metadata = {
  title: "BoomerCSS - Zero Runtime CSS-in-TS Solution",
  description: "A zero-runtime CSS-in-TS styling solution that generates CSS at build time using Parcel macros",
};

run()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${neoneon.variable}`}>
        
        <Main>
          <NavBar />
          <>{children}</>
        </Main>
      </body>
    </html>
  );
}
