/*A shared react component that represents the sidebar containing the logo
and different route to navigate within the application. */

import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './Sidebar-Routes'

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div
            className='h-full border-r flex flex-col overflow-y-auto bg-white 
        shadow-sm'
        >
            {/*Logo */}
            <div className='p-6'>
                <Logo />
            </div>

            {/*Sidebar Routes */}
            <div className='flex flex-col w-full'>
                <SidebarRoutes />
            </div>
        </div>
    )
}

export default Sidebar