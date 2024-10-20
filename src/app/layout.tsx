import type { Metadata } from "next";
import localFont from "next/font/local";

import { run } from "@/css/boomer.config";
// Required for now to initialize the token and globalCSS
run()

const hkg = localFont({
  src: "./fonts/hkg.woff",
  weight:'600',
  variable: "--font-hkg-sans",
});
const roboto = localFont({
  src: "./fonts/roboto.woff",
  variable: "--font-roboto-sans",
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
