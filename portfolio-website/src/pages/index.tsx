import Head from 'next/head'
import Image from 'next/image'
import Layout from './components/Layout'
import profile from "../../public/Profile-Picture.png"
import AnimatedText from './components/AnimatedText'
import Link from 'next/link'
import HireMe from './components/HireMe'

export default function Home() {
  return (
    <>
      <Head>
        <title>Website</title>
        <meta name='description' content='Generated by create next app' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex items-center text-dark w-full min-h-screen dark:text-light'>
        <Layout className='pt-0'>
          <div className='flex items-center justify-between w-full'>
            <div className='w-1/2'>
              <Image src={profile} alt='Profile Picture' className='w-full h-auto' />
            </div>
            <div className='w-1/2 flex flex-col items-center self-center'>
              <AnimatedText text="Turning Vision Into Reality With Code And Design" className='!text-left' />
              <p className='font-montserrat my-4 text-base font-medium'>
                As a skilled full-stack developer, I am dedicated to turning ideas into innovative web applications.
                Explore my latest projects and articles, showcasing my expertise in React.js and web development
              </p>
              <div className='font-montserrat flex items-center self-start mt-2'>
                <Link href="/dummy.pdf" target={"_blank"}
                  className='flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg 
                font-semibold hover:bg-light hover:text-dark border border-solid border-trasparent 
                hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark 
                hover:dark:text-light hover:dark:border-light'
                  download={true}>
                  Resume
                  <svg className='ml-1' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 4H4v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M9 15L20 4m-5 0h5v5" />
                  </svg>
                </Link>
                <Link href={"mailto:mmaazkhan@outlook.com"} target={"_blank"}
                  className='ml-4 text-lg font-medium capitalize text-dark underline dark:text-light '>
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <HireMe />
        <div className='absolute right-8 -bottom-8 w-32'>
          <Image src={"/lightbulb.png"} alt="" className='w-full h-auto' width={120} height={120} />
        </div>
      </main>
    </>

  )
}
