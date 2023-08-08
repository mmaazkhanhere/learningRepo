"use client"

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {}
type Process = 'Sign In' | 'Sign Up'

const Home = (props: Props) => {

    const [process, setProcess] = useState<Process>("Sign In")
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const router = useRouter();
    const searchParams = useSearchParams();

    const toggleProcess = () => {
        if (process === 'Sign In') {
            setProcess('Sign Up')
        }
        if (process === 'Sign Up') {
            setProcess('Sign In')
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        console.log("Username: ", username)
        console.log("Password: -", password)

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        });
        const success = await res.json();

        if (success) {
            const nextUrl = searchParams.get("next");
            router.push(nextUrl ?? '/')
            router.refresh();
        } else {
            alert("Login Failed")
        }
    }

    return (
        <main className='w-full h-screen flex items-center justify-center'>
            <div className=' max-w-md bg-slate-300 border-2 border-gray-500 rounded-lg'>
                <h1 className='text-center text-4xl font-bold mt-6'>
                    Logo
                </h1>
                <div>
                    {
                        process === 'Sign In' &&
                        <form className='flex flex-col p-6' onSubmit={handleSubmit}>
                            <label htmlFor="username" className='text-lg'>Username</label>
                            <input
                                type='text'
                                placeholder='Enter your username'
                                className='border-none px-2 py-2 rounded-md mt-2'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="password" className='text-lg mt-6'>Password</label>
                            <input
                                type='password'
                                placeholder='password'
                                className='border-none px-2 py-2 rounded-md mt-2'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type='submit'
                                className='px-6 py-2 bg-blue-400 rounded-md mt-6'>
                                Sign In
                            </button>
                        </form>
                    }
                    {
                        process === 'Sign Up' &&
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
                    }
                </div>
                <button
                    onClick={toggleProcess}
                    className='underline text-sm decoration-blue-500 mt-2 ml-20 mb-2'>
                    {
                        process === 'Sign In' ? "New user?" : 'Already a user?'
                    }
                </button>
            </div>
        </main>
    )
}

export default Home