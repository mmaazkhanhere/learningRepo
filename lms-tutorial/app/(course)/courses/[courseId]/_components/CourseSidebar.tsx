/*React component responsible for rendering a sidebar for a specific course in
sidebar format, taking into account the user's authentication status and purchase
history */

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { Chapter, Course, UserProgress } from '@prisma/client'
import { redirect } from 'next/navigation';
import React from 'react'
import CourseSidebarItem from './CourseSidebarItem';
import CourseProgress from '@/components/CourseProgress';

type Props = {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    };
    progressCount: number
}

const CourseSidebar = async ({ course, progressCount }: Props) => {

    const { userId } = auth();//extract the id of current signed in user

    if (!userId) {
        //if no signed in user, redirect to homepage
        return redirect("/")
    }

    /*queries the database to check if the user has purchase the course */
    const purchase = await db.purchase.findUnique({

        /*userId_courseId is a compound identifier user in database queries to
        uniquely identify a specific relationship between a specific user and
        a specific course. */

        where: {
            userId_courseId: {
                userId,
                courseId: course.id
            }
        }
    })

    return (
        <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
            <div className='p-8 flex flex-col border-b'>

                {/*Title */}
                <h1 className='font-semibold'>
                    {course.title}
                </h1>

                {/*If user has purchase the course, display the course progress 
                sidebar */}
                {
                    purchase && (
                        <div className='mt-10'>
                            <CourseProgress
                                variant="success"
                                value={progressCount}
                            />
                        </div>
                    )
                }
            </div>
            <div className='flex flex-col w-full'>

                {/*Display the sidebar items */}
                {
                    course.chapters.map((chapter) => (
                        <CourseSidebarItem
                            key={chapter.id}
                            id={chapter.id}
                            label={chapter.title}
                            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                            courseId={course.id}
                            isLocked={!chapter.isFree && !purchase}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default CourseSidebar