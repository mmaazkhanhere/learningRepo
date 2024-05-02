/*serves as a page to display details about a specific chapter within a course.
It effectively presents chapter details, handles user authentication, and purchase
state, and provides necessary actions for course progression and enrollment */

import { getChapter } from '@/actions/get-chapter';
import { Banner } from '@/components/Banner';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import VideoPlayer from './_components/VideoPlayer';
import CourseEnrollButton from './_components/CourseEnrollButton';
import { Separator } from '@/components/ui/separator';
import { Preview } from '@/components/Preview';
import { Files } from 'lucide-react';
import CourseProgressButton from './_components/CourseProgressButton';

type Props = {
    params: {
        courseId: string;
        chapterId: string;
    }
}

const ChapterIdPage = async ({ params }: Props) => {

    const { userId } = auth(); // get the id of the currently signed in user

    if (!userId) {
        //if no signed in user, redirect to homepage
        return redirect("/")
    }

    /*fetch the chapter and course detail and related data using the getChapter
    function */
    const {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase
    } = await getChapter({ userId, chapterId: params.chapterId, courseId: params.courseId });


    //if no course or chapter, redirect to homepage
    if (!chapter || !course) {
        return redirect('/')
    }

    const isLocked = !chapter.isFree && !purchase; /*a course is locked if it
    is not free and if it is not purchased */

    const completeOnEnd = !!purchase && !userProgress?.isCompleted/*a boolean value
    that indicates whether the chapter should be marked as completed when the video
    playback ends */


    return (
        <div>

            {/*If user has completed the course, display completion banner */}
            {
                userProgress?.isCompleted && (
                    <Banner
                        variant="success"
                        label='You already completed this chapter'
                    />
                )
            }

            {/*If the course is locked, display course locked banner */}
            {
                isLocked && (
                    <Banner
                        variant="warning"
                        label='You need to purchase this course to watch this chapter'
                    />
                )
            }

            <div
                className='flex flex-col max-w-4xl mx-auto pb-20'
            >
                {/*Video Player */}
                <div className='p-4'>
                    <VideoPlayer
                        chapterId={params.chapterId}
                        title={chapter.title}
                        courseId={params.courseId}
                        nextChapterId={nextChapter?.id}
                        playbackId={muxData?.playbackId!}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>


                <div>
                    <div className='p-4 flex flex-col md:flex-row items-center justify-between'>

                        {/*Chapter details */}
                        <h2 className='text-2xl font-semibold mb-2'>
                            {chapter.title}
                        </h2>

                        {/*If a course is purchase, display course progress button
                        or else display enroll button */}
                        {
                            purchase ? (
                                <CourseProgressButton
                                    chapterId={params.chapterId}
                                    courseId={params.courseId}
                                    nextChapterId={nextChapter?.id}
                                    isCompleted={!!userProgress?.isCompleted}
                                />
                            ) : (
                                <CourseEnrollButton
                                    courseId={params.courseId}
                                    price={course.price!}
                                />
                            )
                        }
                    </div>

                    <Separator />

                    {/*Course description */}
                    <div>
                        <Preview
                            value={chapter.description!}
                        />
                    </div>

                    {/*Display course attachment if exist */}
                    {
                        !!attachments.length && (
                            <>
                                <Separator />

                                <div className='p-4'>
                                    {
                                        !!attachments.map((attachment) => (
                                            <a
                                                href={attachment.url}
                                                target="_blank"
                                                key={attachment.id}
                                                className='flex items-center p-3 w-full bg-sky-200
                                                border text-sky-700 rounded-md hover:underline'
                                            >
                                                <Files />
                                                <p className='line-clamp-1'>
                                                    {
                                                        attachment.name
                                                    }
                                                </p>
                                            </a>
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ChapterIdPage