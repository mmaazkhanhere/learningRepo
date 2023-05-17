import Head from 'next/head'
import React, { useEffect, useRef } from 'react'
import AnimatedText from './components/AnimatedText'
import Layout from './components/Layout'
import Image from 'next/image'
import Profile from "../../public/Profile.jpg"
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Education from './components/Education'

const AnimatedNumber = ({ value }) => {

    const ref = useRef(null)

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 })
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current && latest.toFixed(0) <= value) {
                ref.current.textContent = latest.toFixed(0);
            }
        })
    }, [springValue, value])

    return <span ref={ref}></span>
}

export default function about() {
    return (
        <>
            <Head>
                <title>Maaz Khan | About Page</title>
                <meta name="description" content="any description" />
            </Head>
            <main className='flex w-full flex-col items-center justify-center dark:text-light'>
                <Layout className='pt-16'>
                    <AnimatedText text="Passion Fuels Purposes !" className='mb-16' />

                    <div className='grid w-full grid-cols-8 gap-16'>
                        <div className='col-span-3 flex flex-col items-start justify-start'>
                            <h2 className='mb-4 text-lg font-bold uppercase text-dark/75
                            dark:text-light/75'>
                                Biography
                            </h2>
                            <p className='font medium'>
                                Hi, I am Maaz Khan, a web developer and UI/UX designer with a passion for creating beautifuk,
                                functional, and user-centered digital experiences. With 1 year experience in the field. I am
                                always looking for new and innovative ways to bring my clients vision tp life.
                            </p>
                            <p className='font medium my-4'>
                                I believe that design is aboyt more than just making things look pretty - it is about solving
                                problems and creating intuitive, enjoyable experiences for users.
                            </p>
                            <p className='font medium my-4'>
                                Whether I am working on a website, mobile app, or other digital products, I bring my commitment to
                                design excellence and user-centered thinking to every project I work on. I look forward to the
                                opportunity to bring my skills and passion to your next project.
                            </p>
                        </div>
                        {/*Profile Image */}
                        <div className='col-span-3 relative h-max rounded-2xl border-2 border-solid
                        border-dark dark:bg-dark dark:border-light bg-light p-8'>
                            <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem]
                            bg-dark dark:bg-light'/>
                            <Image src={Profile} alt='Maaz Khan' className='w-full h-auto rounded-2xl' />
                        </div>

                        {/*Experiences */}
                        <div className='col-span-2 flex flex-col items-end justify-between'>
                            <div className='flex flex-col items-end justify-center'>
                                <span className='inline-block text-7xl font-bold'>
                                    <AnimatedNumber value={50} />+
                                </span>
                                <h2 className='text-xl font-medium capitalize text-dark/75 
                                dark:text-light'>
                                    Satisfied Clients
                                </h2>
                            </div>
                            <div className='flex flex-col items-end justify-center'>
                                <span className='inline-block text-7xl font-bold'>
                                    <AnimatedNumber value={40} />+
                                </span>
                                <h2 className='text-xl font-medium capitalize text-dark/75
                                dark:text-light'>
                                    Projects Completed
                                </h2>
                            </div>
                            <div className='flex flex-col items-end justify-center'>
                                <span className='inline-block text-7xl font-bold'>
                                    <AnimatedNumber value={4} />+
                                </span>
                                <h2 className='text-xl font-medium capitalize text-dark/75
                                dark:text-light'>
                                    Experience
                                </h2>
                            </div>
                        </div>
                    </div>

                    <Skills />
                    <Experience />
                    <Education />
                </Layout>
            </main >
        </>
    )
}
