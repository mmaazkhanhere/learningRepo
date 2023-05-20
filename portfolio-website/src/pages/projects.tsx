import Head from 'next/head'
import React from 'react'
import Layout from './components/Layout'
import AnimatedText from './components/AnimatedText'
import Image from 'next/image'
import Link from 'next/link'
import project1 from "../../public/project_1.png"
import { motion } from "framer-motion"

const FramerImage = motion(Image)

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
    return (
        <article className='w-full flex items-center relative justify-between rounded-3xl border border-solid
         border-dark bg-light shadow-2xl p-12 rounded-br-2xl dark:bg-dark dark:border-light
         lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4'
        >
            <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark
            rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]'
            />
            <Link href={link}
                target="_blank"
                className='w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full'>
                <FramerImage src={img} alt={title} className="w-full h-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }} />
            </Link>
            <div className='w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6'>
                <span className='text-primary font-medium text-xl dark:text-primaryDark xs:text-base'>
                    {type}
                </span>
                <Link href={link} target="_blank" className='hover:underline underline-offset-2'>
                    <h2 className='my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm'>
                        {title}
                    </h2>
                </Link>
                <p className='my-2 font-medium text-dark dark:text-light sm:text-sm'>
                    {summary}
                </p>
                <div className='mt-2 flex items-center'>
                    <Link href={github} target="_blank" className='w-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1024 1024"><path fill="currentColor" d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5C64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9c26.4 39.1 77.9 32.5 104 26c5.7-23.5 17.9-44.5 34.7-60.8c-140.6-25.2-199.2-111-199.2-213c0-49.5 16.3-95 48.3-131.7c-20.4-60.5 1.9-112.3 4.9-120c58.1-5.2 118.5 41.6 123.2 45.3c33-8.9 70.7-13.6 112.9-13.6c42.4 0 80.2 4.9 113.5 13.9c11.3-8.6 67.3-48.8 121.3-43.9c2.9 7.7 24.7 58.3 5.5 118c32.4 36.8 48.9 82.7 48.9 132.3c0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9c177.1-59.7 304.6-227 304.6-424.1c0-247.2-200.4-447.3-447.5-447.3z" /></svg>
                    </Link>
                    <Link href={link} target="_blank" className='ml-4 rounded-lg bg-dark text-light p-2 px-6
                    text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base'>
                        Visit Project
                    </Link>
                </div>
            </div>
        </article>
    )
}

const Project = ({ title, type, img, link, github }) => {
    return (
        <article className='w-full flex flex-col items-center justify-center rounded-2xl border border-solid 
        border-dark bg-light relative p-6 dark:bg-dark dark:border-light xs:p-4'>
            <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
            rounded-br-3xl dark:bg-light md:-4-giht-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]' />
            <Link href={link} target="_blank" className='w-full cursor-pointer overflow-hidden 
            rounded-lg'>
                <FramerImage src={img} alt={title} className="w-full h-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    priority
                    sizes='(max-width:768px) 100vw,
                    (max-width:1200px) 50vw,
                    50vw '
                />
            </Link>
            <div className='w-full flex flex-col items-start justify-between mt-4'>
                <span className='text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base'>{type}</span>
                <Link href={link} target="_blank" className='hover:underline underline-offset-2'>
                    <h2 className='my-2 w-full text-left text-3xl font-bold lg:text-2xl '>
                        {title}
                    </h2>
                </Link>
                <div className='mt-2 flex items-center justify-between w-full'>
                    <Link href={link} target="_blank" className='text-lg font-semibold underline md:text-base'>
                        Visit
                    </Link>
                    <Link href={github} target="_blank" className='w-8 md:w-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1024 1024"><path fill="currentColor" d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5C64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9c26.4 39.1 77.9 32.5 104 26c5.7-23.5 17.9-44.5 34.7-60.8c-140.6-25.2-199.2-111-199.2-213c0-49.5 16.3-95 48.3-131.7c-20.4-60.5 1.9-112.3 4.9-120c58.1-5.2 118.5 41.6 123.2 45.3c33-8.9 70.7-13.6 112.9-13.6c42.4 0 80.2 4.9 113.5 13.9c11.3-8.6 67.3-48.8 121.3-43.9c2.9 7.7 24.7 58.3 5.5 118c32.4 36.8 48.9 82.7 48.9 132.3c0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9c177.1-59.7 304.6-227 304.6-424.1c0-247.2-200.4-447.3-447.5-447.3z" /></svg>
                    </Link>

                </div>
            </div>
        </article>
    )
}

export default function Projects() {
    return (
        <>
            <Head>
                <title>Maaz Khan | Projects Page</title>
                <meta name='description' content='created with nextjs' />
            </Head>
            <main className='w-full mb-16 flex flex-col items-center justify-center dark:text-light'>
                <Layout className='pt-16'>
                    <AnimatedText text="Imagination Trumps Knowledge!"
                        className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl' />
                    <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8
                    md:gap-y-24 md:gap-x-0'>
                        <div className='col-span-12'>
                            <FeaturedProject
                                title={"Crypto Screener Application"}
                                summary={"A feature-rich Crypto Screener App using Raect, TailwindCSS, Context API, React Router and Recahrts. It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your local currency"}
                                link={"/"}
                                type="Featured Project"
                                img={project1}
                                github="https://github.com/mmaazkhanhere?tab=repositories"
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project
                                title={"Crypto Screener Application"}
                                summary={"A feature-rich Crypto Screener App using Raect, TailwindCSS, Context API, React Router and Recahrts. It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your local currency"}
                                link={"/"}
                                type="Featured Project"
                                img={project1}
                                github="https://github.com/mmaazkhanhere?tab=repositories"
                            />
                        </div>

                        <div className='col-span-6 sm:col-span-12'>
                            <Project
                                title={"Crypto Screener Application"}
                                summary={"A feature-rich Crypto Screener App using Raect, TailwindCSS, Context API, React Router and Recahrts. It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your local currency"}
                                link={"/"}
                                type="Featured Project"
                                img={project1}
                                github="https://github.com/mmaazkhanhere?tab=repositories"
                            />
                        </div>
                        <div className='col-span-12'>
                            <div className='col-span-12'>
                                <FeaturedProject
                                    title={"Crypto Screener Application"}
                                    summary={"A feature-rich Crypto Screener App using Raect, TailwindCSS, Context API, React Router and Recahrts. It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your local currency"}
                                    link={"/"}
                                    type="Featured Project"
                                    img={project1}
                                    github="https://github.com/mmaazkhanhere?tab=repositories"
                                />
                            </div>
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project
                                title={"Crypto Screener Application"}
                                summary={"A feature-rich Crypto Screener App using Raect, TailwindCSS, Context API, React Router and Recahrts. It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your local currency"}
                                link={"/"}
                                type="Featured Project"
                                img={project1}
                                github="https://github.com/mmaazkhanhere?tab=repositories"
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project
                                title={"Crypto Screener Application"}
                                summary={"A feature-rich Crypto Screener App using Raect, TailwindCSS, Context API, React Router and Recahrts. It shows detail regarding almost all the cryptocurrency. You can easily convert the price in your local currency"}
                                link={"/"}
                                type="Featured Project"
                                img={project1}
                                github="https://github.com/mmaazkhanhere?tab=repositories"
                            />
                        </div>
                    </div>
                </Layout>
            </main >
        </>
    )
}
