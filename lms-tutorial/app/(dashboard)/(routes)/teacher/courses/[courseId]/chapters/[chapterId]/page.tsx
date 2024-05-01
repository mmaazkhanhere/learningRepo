import { IconBadge } from '@/components/IconBadge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import ChapterTitleForm from './_components/ChapterTitleForm'
import ChapterDescriptionForm from './_components/ChapterDescriptionForm'
import ChapterAccessForm from './_components/ChapterAccessForm'
import ChapterVideoForm from './_components/ChapterVideoForm'
import { Banner } from '@/components/Banner'
import ChapterActions from './_components/ChapterActions'

type Props = {
    params: {
        courseId: string,
        chapterId: string
    }
}

const ChapterId = async ({ params }: Props) => {

    const { userId } = auth(); // get the id of the current signed in user

    if (!userId) {
        //if no signed in user, redirect to homepage
        return redirect('/')
    }

    /*query the database to get the chapters of specified courseId passed in the
    params. The returned data will also include mux data */
    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
        include: {
            muxData: true
        }
    });

    // if no such chapter exits, redirect to the homepage
    if (!chapter) {
        return redirect("/")
    }

    /*An array of fields required to publish a chapter. It includes title of the
    chapter, description of chapter, and video url of the chapter */
    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ];

    const totalFields = requiredFields.length //total fields required
    const completedFields = requiredFields.filter(Boolean).length; /*Filter
    out all completed fields from the required fields */

    const completionText = `(${completedFields}/${totalFields})`; /*Display
    fields that are fulfilled out of total fields */

    const isComplete = requiredFields.every(Boolean); /*The chapter is ready to be
    published if all the fields required are filled */

    return (
        <>
            {/*If chapter is not published, display a banner that the chapter is not
        published */}
            {
                !chapter.isPublished && (
                    <Banner
                        variant="warning"
                        label="This chapter is unpublished. It will not be visible in the
                        course"
                    />
                )
            }
            <div
                className='p-6'
            >
                <div className='flex items-center justify-between'>
                    <div className='w-full'>

                        {/*A back button */}
                        <Link
                            href={`/teacher/courses/${params.courseId}`}
                            className='flex items-center text-sm hover:opacity-75
                        transition mb-6'
                        >
                            <ArrowLeft className='h-4 w-4 mr-2' />
                            Back to course setup
                        </Link>

                        <div className='flex items-center justify-between w-full'>

                            {/*Fields completed */}
                            <div className='flex flex-col gap-y-2'>
                                <h1 className='text-2xl font-medium'>
                                    Chapter Creation
                                </h1>
                                <span className='text-sm text-slate-700'>
                                    Complete all fields {completionText}
                                </span>
                            </div>

                            <ChapterActions
                                disabled={!isComplete}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                                isPublished={chapter.isPublished}
                            />
                        </div>
                    </div>
                </div>

                {/*Chapter Fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
                    <div className='space-y-4'>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge
                                    icon={LayoutDashboard}
                                />
                                <h2 className='text-xl'>
                                    Customize your chapters
                                </h2>
                            </div>

                            {/*Chapter Title */}
                            <ChapterTitleForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />

                            {/*Chapter Description */}
                            <ChapterDescriptionForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>

                        {/*Chapter Access (paid or free) Form */}
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={Eye} />
                                <h2 className='text-xl'>
                                    Access Settings
                                </h2>
                            </div>
                            <ChapterAccessForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                    </div>

                    {/*Chapter Video */}
                    <div>
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={Video} />
                            <h2 className='text-xl'>
                                Add a video
                            </h2>
                        </div>
                        <ChapterVideoForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                    </div>
                </div>
            </div>
        </>

    )
}

export default ChapterId