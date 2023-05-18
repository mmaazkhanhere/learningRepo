
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HireMe() {
    return (
        <div className='fixed left-4 bottom-4 flex items-center justify-center overflow-hidden md:right-8
        md:left-auto md:top-0 md:bottom-auto md:absolute'>
            <div className='w-48 h-auto items-center justify-center relative'>
                <Image src="/rounded-text.svg" alt="Title" width={400} height={400} className='fill-dark 
                animate-spin-slow' />
                <Link href="mailto:mmaazkhan@outlook.com" className='flex items-center justify-center 
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark text-light shadow-md 
                border border-solid border-dark w-20 h-20 rounded-full font-semibold hover:bg-light 
                hover:text-dark dark:bg-light dark:text-dark hover:dark:text-light
                hover:dark:border-light hover:dark:bg-dark md:w-15 md:h-15 md:text-[12px]'>Hire Me</Link>
            </div>
        </div>
    )
}
