import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  <Head>
    <title>Portfolio Website</title>
  </Head>
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
