"use client"

import { UserButton, useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import SearchInput from './SearchInput'
import { isTeacher } from '@/lib/teacher'

type Props = {}

const NavbarRoutes = (props: Props) => {

    const pathname = usePathname();

    const isTeacherPage = pathname?.startsWith('/teacher');
    const isCoursePage = pathname?.includes('/courses');

    const isSearchPage = pathname === "/search"

    const { userId } = useAuth();


    return (
        <>
            {
                isSearchPage && (
                    <div className='hidden md:block'>
                        <SearchInput

                        />
                    </div>
                )
            }
            <div className='flex gap-x-2 ml-auto'>
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
                <UserButton
                    afterSignOutUrl='/sign-in'
                />
            </div>
        </>

    )
}

export default NavbarRoutes