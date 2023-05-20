import Link from 'next/link'
import React, { useState } from 'react'
import Logo from './Logo'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import useThemeSwitcher from './hooks/useThemeSwitcher'

interface CustomLinkType {
    href: string;
    title: string;
    className?: string;
}

const CustomLink = ({ href, title, className = "" }: CustomLinkType) => {
    const router = useRouter();
    return (
        <Link href={href} className={`${className} relative group`}>
            {title}
            <span className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full 
            transistion-[width] ease duration-300 
            ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-light`}>
                {/*The router.asPath checks whether the user is on same page as that on the router. If yes, that page
            link would be underlined (w-full). */}
                &nbsp;
            </span>
        </Link>
    )
}

interface CustomMobileLinkType {
    href: string;
    title: string;
    className?: string;
    toggle: () => void;
}

const CustomMobileLink = ({ href, title, className = "", toggle }: CustomMobileLinkType) => {
    const router = useRouter();

    const handleClick = () => {
        toggle();
        console.log(toggle)
        router.push(href)
    }

    return (
        <button
            className={`${className} relative group text-light dark:text-dark my-2`}
            onClick={handleClick}
        >

            {title}
            <span className={`h-[1px] inline-block bg-light absolute left-0 -bottom-0.5 group-hover:w-full 
            transistion-[width] ease duration-300 
            ${router.asPath === href ? 'w-full' : 'w-0'} dark:bg-dark`}>
                {/*The router.asPath checks whether the user is on same page as that on the router. If yes, that page
            link would be underlined (w-full). */}
                &nbsp;
            </span>
        </button>
    )
}

export function SunIcon() {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0Zm8 24a64 64 0 1 0 64 64a64.07 64.07 0 0 0-64-64Zm-69.66 5.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32ZM192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72Zm5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8Zm80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8Zm112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16Z" /></svg>
        </>
    )
}

export function MoonIcon() {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="currentColor" d="M236.37 139.4a12 12 0 0 0-12-3A84.07 84.07 0 0 1 119.6 31.59a12 12 0 0 0-15-15a108.86 108.86 0 0 0-54.91 38.48A108 108 0 0 0 136 228a107.09 107.09 0 0 0 64.93-21.69a108.86 108.86 0 0 0 38.44-54.94a12 12 0 0 0-3-11.97Zm-49.88 47.74A84 84 0 0 1 68.86 69.51a84.93 84.93 0 0 1 23.41-21.22Q92 52.13 92 56a108.12 108.12 0 0 0 108 108q3.87 0 7.71-.27a84.79 84.79 0 0 1-21.22 23.41Z" /></svg>
        </>
    )
}


export default function NavBar() {

    const [mode, setMode] = useThemeSwitcher();

    const handleModeToggle = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className='w-full px-32 py-8 font-montserrat font-medium flex items-center justify-between
        dark:text-light relative z-10 lg:px-16 md:px-12 sm:px-8'>

            <button className='lg:flex flex-col justify-center items-center hidden' onClick={handleClick}>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 
                w-6 rounded-sm my-0.5 ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}></span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 
                w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity:100"}`}></span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 
                w-6 rounded-sm my-0.5 ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}></span>
            </button>

            <div className='w-full flex justify-between items-center lg:hidden'>
                <nav>
                    <CustomLink className='mr-4' href={"/"} title="Home" />
                    <CustomLink className='mx-4' href={"/about"} title="About" />
                    <CustomLink className='mx-4' href={"/projects"} title="Projects" />
                    <CustomLink className='ml-4' href={"/articles"} title="Articles" />
                </nav>
                <nav className='flex items-center justify-center flex-wrap'>
                    <motion.a href="https://twitter.com/" target={'_blank'} whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }} className='w-6 mx-3'>
                        <svg width="25" height="25" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 30.7622C3.92886 31.8286 17.8914 39.8773 27.8199 33.674C37.7483 27.4707 37.2006 16.7833 37.2006 11.886C38.1 10.0018 40 9.0439 40 3.9438C38.1337 5.6678 36.2787 6.2544 34.435 5.7036C32.6287 2.94957 30.1435 1.73147 26.9794 2.04934C22.2333 2.52614 20.4969 7.1825 21.0079 13.2067C13.6899 16.9074 7.9515 10.524 4.99418 5.7036C4.00607 9.4999 3.0533 14.0576 4.99418 19.0995C6.2881 22.4607 9.3985 25.3024 14.3254 27.6246C9.3323 30.3308 5.22382 31.3766 2 30.7622Z" fill="#2F88FF" stroke="black" stroke-width="4" stroke-linejoin="round" />
                        </svg>
                    </motion.a>

                    <motion.a href="https://github.com/" target={'_blank'} className='w-6 mx-3' whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 1024 1024"><path fill="currentColor" d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5C64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9c26.4 39.1 77.9 32.5 104 26c5.7-23.5 17.9-44.5 34.7-60.8c-140.6-25.2-199.2-111-199.2-213c0-49.5 16.3-95 48.3-131.7c-20.4-60.5 1.9-112.3 4.9-120c58.1-5.2 118.5 41.6 123.2 45.3c33-8.9 70.7-13.6 112.9-13.6c42.4 0 80.2 4.9 113.5 13.9c11.3-8.6 67.3-48.8 121.3-43.9c2.9 7.7 24.7 58.3 5.5 118c32.4 36.8 48.9 82.7 48.9 132.3c0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9c177.1-59.7 304.6-227 304.6-424.1c0-247.2-200.4-447.3-447.5-447.3z" /></svg>

                    </motion.a>

                    <motion.a href="https://linkedin.com/" target={'_blank'} className='w-6 mx-3' whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                        <svg width="25" height="25" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M218.123 218.127H180.192V158.724C180.192 144.559 179.939 126.324 160.464 126.324C140.708 126.324 137.685 141.758 137.685 157.693V218.123H99.755V95.967H136.168V112.661H136.678C140.322 106.43 145.588 101.304 151.915 97.8292C158.242 94.3542 165.393 92.6604 172.606 92.928C211.051 92.928 218.139 118.216 218.139 151.114L218.123 218.127ZM56.955 79.27C44.798 79.272 34.941 69.418 34.939 57.261C34.937 45.104 44.79 35.247 56.947 35.245C69.104 35.242 78.961 45.096 78.963 57.253C78.9641 63.091 76.646 68.6904 72.5187 72.8194C68.3915 76.9483 62.7931 79.2687 56.955 79.27ZM75.921 218.128H37.95V95.967H75.92V218.127L75.921 218.128ZM237.033 0.0180063H18.89C8.58002 -0.0979937 0.125023 8.16101 -0.000976562 18.471V237.524C0.121023 247.839 8.57502 256.106 18.889 255.998H237.033C247.369 256.126 255.856 247.859 255.999 237.524V18.454C255.852 8.12401 247.364 -0.133994 237.033 0.00100628" fill="#0A66C2" />
                        </svg>
                    </motion.a>

                    <motion.a href="https://pinterest.com/" target={'_blank'} className='w-6 mx-3' whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                        <svg width="25" height="25" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 128.002C0 180.416 31.518 225.444 76.619 245.241C76.259 236.303 76.555 225.573 78.847 215.848C81.308 205.457 95.317 146.1 95.317 146.1C95.317 146.1 91.228 137.927 91.228 125.848C91.228 106.879 102.222 92.712 115.914 92.712C127.557 92.712 133.182 101.457 133.182 111.929C133.182 123.633 125.717 141.14 121.878 157.355C118.671 170.933 128.686 182.008 142.081 182.008C166.333 182.008 182.667 150.859 182.667 113.953C182.667 85.899 163.772 64.901 129.405 64.901C90.577 64.901 66.388 93.857 66.388 126.201C66.388 137.353 69.676 145.217 74.826 151.307C77.194 154.104 77.523 155.229 76.666 158.441C76.052 160.796 74.642 166.466 74.058 168.713C73.206 171.955 70.579 173.114 67.649 171.917C49.765 164.616 41.436 145.031 41.436 123.015C41.436 86.654 72.102 43.054 132.918 43.054C181.788 43.054 213.953 78.418 213.953 116.379C213.953 166.592 186.037 204.105 144.887 204.105C131.068 204.105 118.069 196.635 113.616 188.15C113.616 188.15 106.185 217.642 104.611 223.337C101.897 233.206 96.585 243.07 91.728 250.758C103.506 254.24 115.723 256.008 128.005 256.007C198.689 256.007 256.001 198.698 256.001 128.002C256.001 57.309 198.689 0 128.005 0C57.314 0 0 57.309 0 128.002Z" fill="#CB1F27" />
                        </svg>
                    </motion.a>

                    <motion.a href="https://dribbler.com/" target={'_blank'} className='w-6 ml-3' whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                        <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M44 24C44 29.5386 41.7486 34.5513 38.1112 38.173C34.4943 41.7742 29.5071 44 24 44C12.9543 44 4 35.0457 4 24C4 18.6615 6.09159 13.8116 9.5 10.225C13.1439 6.39055 18.2928 4 24 4C29.5071 4 34.4943 6.22583 38.1112 9.82695C41.7486 13.4487 44 18.4614 44 24Z" fill="#2F88FF" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M44.0003 24C41.0819 24 33.0315 22.8993 25.8268 26.0632C18.0003 29.5002 12.3327 34.8315 9.86328 38.1472" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.5 5.4538C19.6304 8.34269 26.4603 15.6985 29 23C31.5397 30.3015 32.4809 39.2791 33.0606 41.8347" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.1543 21.5C7.93207 21.7277 17.9329 21.9332 24.3329 19.1999C30.7329 16.4666 36.2402 11.4396 38.1291 9.84521" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.5 31.613C7.26166 35.8893 10.4628 39.4207 14.5 41.604" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4 24.0001C4 18.6617 6.09159 13.8117 9.5 10.2251" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M24 4C18.2928 4 13.1439 6.39055 9.5 10.225" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M32 5.66406C34.2933 6.66606 36.3624 8.0857 38.1112 9.82684C41.7486 13.4485 44 18.4613 44 23.9999C44 26.4625 43.5549 28.8212 42.7408 30.9999" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M24 44C29.5071 44 34.4943 41.7742 38.1112 38.1731" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </motion.a>

                    <button onClick={handleModeToggle}
                        className={`ml-3 flex items-center justify-center rounded-full p-1
                    ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}>
                        {mode === 'dark' ? <MoonIcon /> : <SunIcon />}
                    </button>

                </nav>
            </div>

            {isOpen ?
                <motion.div
                    className='min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2 z-30 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md
            py-32'
                    initial={{ scale: 0, x: "-50%", y: "-50%" }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <nav className='flex items-center flex-col justify-center'>
                        <CustomMobileLink href={"/"} title="Home" toggle={handleClick} />
                        <CustomMobileLink href={"/about"} title="About" toggle={handleClick} />
                        <CustomMobileLink href={"/projects"} title="Projects" toggle={handleClick} />
                        <CustomMobileLink href={"/articles"} title="Articles" toggle={handleClick} />
                    </nav>
                    <nav className='flex items-center justify-center flex-wrap mt-2'>
                        <motion.a href="https://twitter.com/"
                            target={'_blank'} whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className='w-6 mr-3 sm:mx-1'>
                            <svg width="25" height="25" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 30.7622C3.92886 31.8286 17.8914 39.8773 27.8199 33.674C37.7483 27.4707 37.2006 16.7833 37.2006 11.886C38.1 10.0018 40 9.0439 40 3.9438C38.1337 5.6678 36.2787 6.2544 34.435 5.7036C32.6287 2.94957 30.1435 1.73147 26.9794 2.04934C22.2333 2.52614 20.4969 7.1825 21.0079 13.2067C13.6899 16.9074 7.9515 10.524 4.99418 5.7036C4.00607 9.4999 3.0533 14.0576 4.99418 19.0995C6.2881 22.4607 9.3985 25.3024 14.3254 27.6246C9.3323 30.3308 5.22382 31.3766 2 30.7622Z" fill="#2F88FF" stroke="black" stroke-width="4" stroke-linejoin="round" />
                            </svg>
                        </motion.a>

                        <motion.a href="https://github.com/"
                            target={'_blank'}
                            className='w-6 mx-3 bg-light dark:bg-dark rounded-full sm:mx-1'
                            whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 1024 1024"><path fill="currentColor" d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5C64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9c26.4 39.1 77.9 32.5 104 26c5.7-23.5 17.9-44.5 34.7-60.8c-140.6-25.2-199.2-111-199.2-213c0-49.5 16.3-95 48.3-131.7c-20.4-60.5 1.9-112.3 4.9-120c58.1-5.2 118.5 41.6 123.2 45.3c33-8.9 70.7-13.6 112.9-13.6c42.4 0 80.2 4.9 113.5 13.9c11.3-8.6 67.3-48.8 121.3-43.9c2.9 7.7 24.7 58.3 5.5 118c32.4 36.8 48.9 82.7 48.9 132.3c0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9c177.1-59.7 304.6-227 304.6-424.1c0-247.2-200.4-447.3-447.5-447.3z" /></svg>

                        </motion.a>

                        <motion.a href="https://linkedin.com/"
                            target={'_blank'}
                            className='w-6 mx-3 sm:mx-1'
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.9 }}>
                            <svg width="25" height="25" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M218.123 218.127H180.192V158.724C180.192 144.559 179.939 126.324 160.464 126.324C140.708 126.324 137.685 141.758 137.685 157.693V218.123H99.755V95.967H136.168V112.661H136.678C140.322 106.43 145.588 101.304 151.915 97.8292C158.242 94.3542 165.393 92.6604 172.606 92.928C211.051 92.928 218.139 118.216 218.139 151.114L218.123 218.127ZM56.955 79.27C44.798 79.272 34.941 69.418 34.939 57.261C34.937 45.104 44.79 35.247 56.947 35.245C69.104 35.242 78.961 45.096 78.963 57.253C78.9641 63.091 76.646 68.6904 72.5187 72.8194C68.3915 76.9483 62.7931 79.2687 56.955 79.27ZM75.921 218.128H37.95V95.967H75.92V218.127L75.921 218.128ZM237.033 0.0180063H18.89C8.58002 -0.0979937 0.125023 8.16101 -0.000976562 18.471V237.524C0.121023 247.839 8.57502 256.106 18.889 255.998H237.033C247.369 256.126 255.856 247.859 255.999 237.524V18.454C255.852 8.12401 247.364 -0.133994 237.033 0.00100628" fill="#0A66C2" />
                            </svg>
                        </motion.a>

                        <motion.a href="https://pinterest.com/"
                            target={'_blank'}
                            className='w-6 mx-3 bg-light rounded-full sm:mx-1'
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.9 }}>
                            <svg width="25" height="25" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 128.002C0 180.416 31.518 225.444 76.619 245.241C76.259 236.303 76.555 225.573 78.847 215.848C81.308 205.457 95.317 146.1 95.317 146.1C95.317 146.1 91.228 137.927 91.228 125.848C91.228 106.879 102.222 92.712 115.914 92.712C127.557 92.712 133.182 101.457 133.182 111.929C133.182 123.633 125.717 141.14 121.878 157.355C118.671 170.933 128.686 182.008 142.081 182.008C166.333 182.008 182.667 150.859 182.667 113.953C182.667 85.899 163.772 64.901 129.405 64.901C90.577 64.901 66.388 93.857 66.388 126.201C66.388 137.353 69.676 145.217 74.826 151.307C77.194 154.104 77.523 155.229 76.666 158.441C76.052 160.796 74.642 166.466 74.058 168.713C73.206 171.955 70.579 173.114 67.649 171.917C49.765 164.616 41.436 145.031 41.436 123.015C41.436 86.654 72.102 43.054 132.918 43.054C181.788 43.054 213.953 78.418 213.953 116.379C213.953 166.592 186.037 204.105 144.887 204.105C131.068 204.105 118.069 196.635 113.616 188.15C113.616 188.15 106.185 217.642 104.611 223.337C101.897 233.206 96.585 243.07 91.728 250.758C103.506 254.24 115.723 256.008 128.005 256.007C198.689 256.007 256.001 198.698 256.001 128.002C256.001 57.309 198.689 0 128.005 0C57.314 0 0 57.309 0 128.002Z" fill="#CB1F27" />
                            </svg>
                        </motion.a>

                        <motion.a href="https://dribbler.com/" target={'_blank'} className='w-6 ml-3'
                            whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
                            <svg width="25" height="25" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 24C44 29.5386 41.7486 34.5513 38.1112 38.173C34.4943 41.7742 29.5071 44 24 44C12.9543 44 4 35.0457 4 24C4 18.6615 6.09159 13.8116 9.5 10.225C13.1439 6.39055 18.2928 4 24 4C29.5071 4 34.4943 6.22583 38.1112 9.82695C41.7486 13.4487 44 18.4614 44 24Z" fill="#2F88FF" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M44.0003 24C41.0819 24 33.0315 22.8993 25.8268 26.0632C18.0003 29.5002 12.3327 34.8315 9.86328 38.1472" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.5 5.4538C19.6304 8.34269 26.4603 15.6985 29 23C31.5397 30.3015 32.4809 39.2791 33.0606 41.8347" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4.1543 21.5C7.93207 21.7277 17.9329 21.9332 24.3329 19.1999C30.7329 16.4666 36.2402 11.4396 38.1291 9.84521" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5.5 31.613C7.26166 35.8893 10.4628 39.4207 14.5 41.604" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4 24.0001C4 18.6617 6.09159 13.8117 9.5 10.2251" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M24 4C18.2928 4 13.1439 6.39055 9.5 10.225" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M32 5.66406C34.2933 6.66606 36.3624 8.0857 38.1112 9.82684C41.7486 13.4485 44 18.4613 44 23.9999C44 26.4625 43.5549 28.8212 42.7408 30.9999" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M24 44C29.5071 44 34.4943 41.7742 38.1112 38.1731" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </motion.a>

                        <button onClick={handleModeToggle}
                            className={`ml-3 flex items-center justify-center rounded-full p-1
                    ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}`}>
                            {mode === 'dark' ? <MoonIcon /> : <SunIcon />}
                        </button>

                    </nav>
                </motion.div>
                : null
            }

            <div className=' absolute left-[50%] top-2 translate-x-[-50%]'>
                <Logo />
            </div>
        </header>
    )
}
