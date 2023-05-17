import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Portfolio Website</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={`font-montserrat bg-light dark:bg-dark w-full min-h-screen`}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  )
}
