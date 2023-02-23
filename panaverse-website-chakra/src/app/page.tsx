'use client'

import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
//import Header from './Component/Header'
//import Footer from './Component/Footer'
import Banner from './Component/Banner'

export default function Home() {
  return (
    <ChakraProvider>
      {/* <Header /> */}
      <Banner />
      {/* <Footer /> */}
    </ChakraProvider>
  )
}
