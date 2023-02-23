'use client'

import { ChakraProvider } from '@chakra-ui/react'
import Footer from './Component/Footer'
import Header from './Component/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ChakraProvider> {/*Since layout describes the page header and footer and also we will be using Chakra components so it is wrapped within ChakraProvider.
        Header and Footer are added here because we want to display it on every page of our website  */}
          <Header />
          {children}
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  )
}
