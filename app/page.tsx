import Link from 'next/link'
import React from 'react'
import { useAuth } from './hooks/useAuth'

type Props = {}

const HomePage = async (props: Props) => {

  const auth = await useAuth.fromServer()

  return (
    <main className='flex flex-col items-center justify-center'>
      <h1 className='text-4xl text-center mt-20'>
        Public Homepage
      </h1>
      {
        auth ? (
          <Link href='/login' className='text-xl mt-20 underline decoration-blue-500'>
            Login
          </Link>
        ) : (
          <Link href='/panel' className='text-xl mt-20 underline decoration-blue-500'>
            Panel
          </Link>
        )
      }

    </main>

  )
}

export default HomePage