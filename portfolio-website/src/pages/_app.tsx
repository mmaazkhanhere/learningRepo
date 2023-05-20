import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  return (
    <>
      <Head>
        <title>Portfolio Website</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={`font-montserrat bg-light dark:bg-dark w-full min-h-screen`}>
        <NavBar />
        <AnimatePresence mode='wait'>
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
        <Footer />
      </main>
    </>
  )
}
