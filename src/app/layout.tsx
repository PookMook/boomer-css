import type { Metadata } from "next";
import localFont from "next/font/local";
import '@/css/config.css'
import '@/css/global.css'

import { run } from "@/css/boomer.config";
// Required for now to initialize the token and globalCSS
run()

const hkg = localFont({
  src: "./fonts/hkg.woff",
  weight:'600',
  variable: "--bmr-fonts-hkg",
});
const roboto = localFont({
  src: "./fonts/roboto.woff",
  variable: "--bmr-fonts-roboto",
});


//export const runtime = 'edge'

export const metadata: Metadata = {
  title: "Arthur Juchereau",
  description: "Arthur Juchereau's resume, principal engineer",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
