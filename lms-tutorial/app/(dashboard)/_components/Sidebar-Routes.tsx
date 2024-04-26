/*A react component that dynamically renders sidebar items based on whether the 
user is identified as a teacher or student*/

"use client"

import { BarChart, Compass, Layout, List } from 'lucide-react'
import React from 'react'
import SidebarItems from './SidebarItems'
import { usePathname } from 'next/navigation'

type Props = {}

const guestRoutes = [
    {
        icon: Layout,
        label: 'Dashboard',
        href: '/'
    },
    {
        icon: Compass,
        label: 'Browse',
        href: '/search'
    },
]

const teacherRoutes = [
    {
        icon: List,
        label: 'Courses',
        href: '/teacher/courses'
    },
    {
        icon: BarChart,
        label: 'Analytics',
        href: '/teacher/analytics'
    },
]

const SidebarRoutes = (props: Props) => {

    const pathname = usePathname();
    const isTeacherPage = pathname?.includes('/teacher');
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div
            className='flex flex-col w-full'
        >
            {
                routes.map((route) => (
                    <SidebarItems
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
        </div>
    )
}

export default SidebarRoutes