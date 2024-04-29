/*This component dynamically renders individual sidebar items, handle their active
state, and provides navigation functionality when clicked */

"use client"

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    href: string
    icon: LucideIcon
    label: string
}

const SidebarItems = ({ href, icon: Icon, label }: Props) => {

    const pathname = usePathname(); /*uses the usePathname hook to get the current
    pathname of the url*/
    const router = useRouter(); /*access the router object for navigation */

    /*This code determines whether a sidebar item is considered active based on
    the current pathname and href prop passed to the component*/
    const isActive =
        (pathname === '/' && href === '/') || /*first we check if we are on a / page (homepage) */
        pathname === href || /*then check if we are on exact same page. It means the sidebar 
        item corresponding to this href is currently active*/
        pathname?.startsWith(`${href}/`); /*check if we are in specific sub-route in a route.
        It checks if the current page is sub-route of the href prop*/



    const onClick = () => {
        /*This function is triggered when the sidebar item is clicked. It uses
        the router object to navigate to the URL specified by the href prop */
        router.push(href);
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
            )}
        >

            {/*Route Icon and Label */}
            <div className='flex items-center gap-x-2 py-4'>
                <Icon
                    size={22}
                    className={cn(
                        'text-slate-500',
                        isActive && 'text-sky-700'
                    )}
                />
                {label}
            </div>

            {/*UI */}
            <div
                className={cn(
                    'ml-auto opacity-0 border-2 border-sky-700 h-full transition-all',
                    isActive && 'opacity-100'
                )}
            />
        </button>
    )
}

export default SidebarItems