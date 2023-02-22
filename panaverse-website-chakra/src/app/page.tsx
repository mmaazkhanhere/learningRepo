'use client'

import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from './Component/Header'

export default function Home() {
  return (
    <ChakraProvider>
      <Header />
    </ChakraProvider>
  )
}
