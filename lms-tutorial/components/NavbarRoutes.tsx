import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const NavbarRoutes = (props: Props) => {
    return (
        <div className='flex gap-x-2 ml-auto'>
            <UserButton
                afterSignOutUrl='/sign-in'
            />
        </div>
    )
}

export default NavbarRoutes