/*Global component that handles the rendering of navigation elements within a 
navbar based on the current page and user authentication status */

"use client"

import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

import { Button } from './ui/button'
import SearchInput from './SearchInput'

import { isTeacher } from '@/lib/teacher'

import { LogOut } from 'lucide-react'

type Props = {}

const NavbarRoutes = (props: Props) => {

    const pathname = usePathname(); /*uses the hook to get the curren pathname 
    of the url */

    const isTeacherPage = pathname?.startsWith('/teacher'); /*check if the current
    user is on teacher page by checking the string in the url pathname.*/

    const isCoursePage = pathname?.includes('/courses'); /*check if the current
    user is on cource page by checking the string in the url pathname */

    const isSearchPage = pathname === "/search" /*user is on search page if the
    url pathname is similar to /search */

    const { userId } = useAuth(); //uses the clerk hook to get the current user id


    return (
        <>
            {
                /*Search input component is rendered if the user is on the search
                page which is hidden on small screen but visible on large screens*/
                isSearchPage && (
                    <div className='hidden md:block'>
                        <SearchInput
                        />
                    </div>
                )
            }
            <div className='flex gap-x-2 ml-auto'>

                {/*Displayed if the user is on teacher page or on the course
                page.It displays an exit button to exit from teacher mode */}
                {
                    isTeacherPage || isCoursePage ? (
                        <Link
                            href='/'
                        >
                            <Button
                                size='sm'
                                variant='ghost'
                            >
                                <LogOut
                                    className='h-4 w-4 mr-2'
                                />
                                Exit
                            </Button>
                        </Link>
                    ) : isTeacher(userId) ? (
                        /*If the current is user is teacher, a teacher mode button
                        is displayed otherwise nothing is displayed */
                        <Link
                            href='/teacher/courses'
                        >
                            <Button
                                size='sm'
                                variant='ghost'
                            >
                                Teacher Mode
                            </Button>
                        </Link>
                    ) : null
                }

                {/*A sign out button */}
                <UserButton
                    afterSignOutUrl='/sign-in'
                />

            </div>
        </>

    )
}

export default NavbarRoutes