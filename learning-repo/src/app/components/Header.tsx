import React from 'react'

export default function Header() {
    return (
        <nav className='flex h-12 justify-between shadow-md items-center px-4'>
            <a href="" className='text-lg font-bold'>Amazona</a>
            <div className=''>
                <a href="/cart" className='p-2'>Cart</a>
                <a href="/login" className='p-2'>Login</a>
            </div>
        </nav>
    )
}
