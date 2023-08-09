"use client"

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Props = {}
type Process = 'Sign In' | 'Sign Up'

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });

        const { success } = await res.json();

        if (success) {
            const nextUrl = searchParams.get("next");
            router.push(nextUrl ?? '/');
            router.refresh();
        } else {
            const nextUrl = searchParams.get("next");
            router.push(nextUrl ?? '/register');
            router.refresh();
        }
    };


    return (
        <main className='w-full h-screen flex items-center justify-center'>
            <div className=' max-w-md bg-slate-300 border-2 border-gray-500 rounded-lg'>
                <h1 className='text-center text-4xl font-bold mt-6'>
                    Logo
                </h1>
                <div>
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
                            className='px-6 py-2 bg-blue-400 rounded-md mt-6'
                        >
                            Sign In
                        </button>
                    </form>

                </div>
                <Link
                    href={'/register'}
                    className='underline text-sm decoration-blue-500 mt-2 ml-20 mb-2'
                >
                    New user?
                </Link>
            </div>
        </main>
    )
}

export default Home