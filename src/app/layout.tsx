import React from 'react'
import type { Metadata } from 'next/types'
import { Inter, Tilt_Neon } from "next/font/google";
import { run } from '@/css/theme';

import '@/css/global.css';
import '@/css/config.css';

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

run()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${neoneon.variable}`}>{children}</body>
    </html>
  );
}
