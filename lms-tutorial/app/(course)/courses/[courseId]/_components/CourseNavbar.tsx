/*React component responsible for rendering the navigation bar specific to course page,
providing users with access to course-specific information and navigation options */

import NavbarRoutes from '@/components/NavbarRoutes';
import { Chapter, Course, UserProgress } from '@prisma/client';
import React from 'react'
import CourseMobileSidebar from './CoureseMobileSidebar';

type Props = {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    };
    progressCount: number
}

const CourseNavbar = ({ course, progressCount }: Props) => {
    return (
        <div
            className='p-4 border-b h-full flex items-center bg-white shadow-sm'
        >
            <CourseMobileSidebar
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes />
        </div>
    )
}

export default CourseNavbar