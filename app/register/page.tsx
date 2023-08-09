import Link from 'next/link'
import React from 'react'

type Props = {}

const Register = (props: Props) => {
    return (
        <section className='w-full h-screen flex items-center justify-center'>
            <div className=' max-w-md bg-slate-300 border-2 border-gray-500 rounded-lg'>
                <h1 className='text-center text-4xl font-bold mt-6'>
                    Logo
                </h1>
                <div>
                    <form className='flex flex-col p-6'>
                        <label htmlFor="username" className='text-lg'>Username</label>
                        <input
                            type='text'
                            placeholder='Enter a username'
                            className='border-none px-2 py-2 rounded-md mt-2'
                        />
                        <label htmlFor="email" className='text-lg mt-6'>Email Address</label>
                        <input
                            type='email'
                            placeholder='example@mail.com'
                            className='border-none px-2 py-2 rounded-md mt-2'
                        />
                        <label htmlFor="" className='text-lg mt-6'>Password</label>
                        <input
                            type='password'
                            placeholder='password'
                            className='border-none px-2 py-2 rounded-md mt-2'
                        />
                        <button
                            type='submit'
                            className='px-6 py-2 bg-blue-400 rounded-md mt-6'>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <Link
                href={'/login'}
                className='underline text-sm decoration-blue-500 mt-2 ml-20 mb-2'
            >
                Already a user?
            </Link>
        </section>
    )
}

export default Register