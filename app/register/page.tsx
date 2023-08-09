"use client"

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {}

const Register = (props: Props) => {

    const [userId, setUserId] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("");

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        console.log("UserId", userId)
        console.log("Password", password)

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ userId, password }),
        });
        const { success } = await res.json();

        if (success) {
            const nextUrl = searchParams.get("next");
            router.push(nextUrl ?? '/')
            router.refresh();
        } else {
            alert("Register Failed")
        }
    }


    return (
        <section className='w-full h-screen flex items-center justify-center'>
            <div className=' max-w-md bg-slate-300 border-2 border-gray-500 rounded-lg'>
                <h1 className='text-center text-4xl font-bold mt-6'>
                    Logo
                </h1>
                <div>
                    <form className='flex flex-col p-6' onSubmit={handleSubmit}>
                        <label htmlFor="username" className='text-lg'>Username</label>
                        <input
                            type='text'
                            placeholder='Enter a username'
                            className='border-none px-2 py-2 rounded-md mt-2'
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type='submit'
                            className='px-6 py-2 bg-blue-400 rounded-md mt-6'>
                            Sign Up
                        </button>
                    </form>
                </div>
                <Link
                    href={'/login'}
                    className='underline text-sm decoration-blue-500 mt-2 ml-20 mb-2'
                >
                    Already a user?
                </Link>
            </div>
        </section>
    )
}

export default Register