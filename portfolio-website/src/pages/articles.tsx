import React, { useRef } from 'react'
import Head from 'next/head'
import Layout from './components/Layout'
import AnimatedText from './components/AnimatedText'
import Link from 'next/link'
import Image from 'next/image'
import articleImg from '../../public/article.png'
import articleImg2 from "../../public/article2.jpg"
import articleImg3 from "../../public/article3.jpg"
import articleImg4 from "../../public/article4.jpg"
import { motion, useMotionValue } from "framer-motion"

const FramerImage = motion(Image)

const MovingImg = ({ title, img, link }) => {

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const imgRef = useRef(null);

    function handleMouse(event) {
        imgRef.current.style.display = "inline-block"
        x.set(event.pageX);
        y.set(-10);
    }
    function handleMouseLeave(event) {
        imgRef.current.style.display = "none"
        x.set(0);
        y.set(0);
    }

    return (
        <Link href={link} target='_blank'
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
        >
            <h2 className='capitalise text-xl font-semibold hover:underline'>{title}</h2>
            <FramerImage
                style={{ x: x, y: y }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
                ref={imgRef} src={img} alt={title} className='z-10 w-96 auto hidden absolute rounded-lg' />
        </Link>
    )
}

const Article = ({ img, title, date, link }) => {
    return (
        <motion.li
            initial={{ y: 200 }}
            whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            viewport={{ once: true }}
            className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light
        text-dark first:mt-0 border border-solid border-dark border-r-4 border-b-4'>
            <MovingImg title={title} img={img} link={link} />
            <span className='text-primary font-semibold pl-4'>{date}</span>
        </motion.li>

    )
}

const FeaturedArticle = ({ img, title, time, summary, link }) => {
    return (
        <li className='col-span-1 w-full p-4 bg-light border border-solid relative border-dark rounded-2xl'>
            <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
            rounded-br-3xl' />
            <Link href={link}
                target='_blank'
                className='w-full inline-block cursor-pointer overflow-hidden rounded-lg'>
                <FramerImage src={img} alt={title} className="w-full h-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                />
            </Link>
            <Link href={link}
                target='_blank'>
                <h2 className='capitalise text-2xl font-bold mt-4 my-2 hover:underline'>
                    {title}
                </h2>
                <p className='text-sm mb-2'>
                    {summary}
                </p>
                <span className='text-primary font-semibold'>
                    {time}
                </span>
            </Link>
        </li>
    )
}

export default function Articles() {
    return (
        <>
            <Head>
                <title>Maaz Khan | Articles</title>
                <meta name="description" content="any description" />
            </Head>
            <main className=' w-full flex flex-col items-center justify-center overflow-hidden'>
                <Layout className='pt-16'>
                    <AnimatedText text="Words Can Change the World!" className='mb-16' />
                    <ul className='grid grid-cols-2 gap-16'>
                        <FeaturedArticle
                            title={"Build A Custom Pagination Component in ReactJS From Scratch"}
                            summary={"Learn how to build a custom pagination component in ReactJS from scratch. Follow this step-by-step guide to integrate pagination component in your ReactJS project"}
                            time={'9 min read'}
                            link={'/'}
                            img={articleImg}
                        />
                        <FeaturedArticle
                            title={"Build A Custom Pagination Component in ReactJS From Scratch"}
                            summary={"Learn how to build a custom pagination component in ReactJS from scratch. Follow this step-by-step guide to integrate pagination component in your ReactJS project"}
                            time={'9 min read'}
                            link={'/'}
                            img={articleImg}
                        />
                    </ul>
                    <h2 className='font-bold text-4xl w-full text-center my-16 mt-32'>All Articles</h2>
                    <ul>
                        <Article
                            title="Form Validation in ReactJS: Build A Reusable Custom Hook For Inputs and Error Handling"
                            date="March 22, 2023"
                            link="/"
                            img={articleImg2}
                        />
                        <Article
                            title="Form Validation in ReactJS: Build A Reusable Custom Hook For Inputs and Error Handling"
                            date="March 22, 2023"
                            link="/"
                            img={articleImg3}
                        />
                        <Article
                            title="Form Validation in ReactJS: Build A Reusable Custom Hook For Inputs and Error Handling"
                            date="March 22, 2023"
                            link="/"
                            img={articleImg4}
                        />
                        <Article
                            title="Form Validation in ReactJS: Build A Reusable Custom Hook For Inputs and Error Handling"
                            date="March 22, 2023"
                            link="/"
                            img={articleImg2}
                        />
                        <Article
                            title="Form Validation in ReactJS: Build A Reusable Custom Hook For Inputs and Error Handling"
                            date="March 22, 2023"
                            link="/"
                            img={articleImg3}
                        />
                        <Article
                            title="Form Validation in ReactJS: Build A Reusable Custom Hook For Inputs and Error Handling"
                            date="March 22, 2023"
                            link="/"
                            img={articleImg4}
                        />
                        <Article
                            title="Form Validation in ReactJS: Build A Reusable Custom Hook For Inputs and Error Handling"
                            date="March 22, 2023"
                            link="/"
                            img={articleImg2}
                        />
                    </ul>
                </Layout>
            </main>
        </>
    )
}
