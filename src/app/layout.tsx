import React from 'react'
import type { Metadata } from 'next/types'
import { Inter, Tilt_Neon } from "next/font/google";
import { NavBar } from '@/components/nav-bar'
import { Main } from '@/css/theme';


const inter = Inter({ subsets: ["latin"] });
const neoneon = Tilt_Neon({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-neoneon'
})


export const metadata: Metadata = {
  title: "BoomerCSS - Zero Runtime CSS-in-TS Solution",
  description: "A zero-runtime CSS-in-TS styling solution that generates CSS at build time using Parcel macros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${neoneon.variable}`}>
          <NavBar />
        <Main>
          {children}
        </Main>
      </body>
    </html>
  );
}
