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
] /*This is an array of routes accessible to students only. It has an icon, a label
displayed along with the icon and route where user will be navigated when clicked
on */

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
] /*This is an array of routes accessible to teachers only. It has an icon, a label
displayed along with the icon and route where user will be navigated when clicked
on */

const SidebarRoutes = (props: Props) => {

    const pathname = usePathname(); /*uses the usePathname hook to get the current
    pathname of the url*/

    const isTeacherPage = pathname?.includes('/teacher'); /*checks if the route
    pathname includes the string checking if the user is on teacher route  */

    const routes = isTeacherPage ? teacherRoutes : guestRoutes; /*If user is on
    teacher route, it display the teacher routes otherwise display student route */

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