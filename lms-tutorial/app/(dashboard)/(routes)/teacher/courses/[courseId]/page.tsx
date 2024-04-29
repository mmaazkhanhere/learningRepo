import { IconBadge } from '@/components/IconBadge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TitleForm from './_components/TitleForm'
import DescriptionForm from './_components/DescriptionForm'
import ImageForm from './_components/ImageForm'
import CategoryForm from './_components/CategoryForm'
import PriceForm from './_components/PriceForm'
import AttachmentForm from './_components/AttachmentForm'
import ChaptersForm from './_components/ChaptersForm'
import { Banner } from '@/components/Banner'
import Actions from './_components/Actions'

type Props = {
    params: string
}

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

    const { userId } = auth(); /*retrieves the id of the current authenticated
    user using auth function of Clerk */

    if (!userId) {
        //If there is no authenticated user, the user is redirected to the homepage
        return redirect('/')
    }

    /*Fetch the course data from the database that includes chapter that are 
    ordered in ascending order (The first created chapter is placed on the top)
    and the attachments that are ordered in descending order (the latest on top) */
    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: 'asc'
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })


    /*Fetches the categories that are ordered in ascending order (alphabetically) */
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })


    if (!course) {
        /*If there is no course, the user is redirected to homepage */
        return redirect('/')
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished)
    ];
    /*An array of the required fields that are needed for a course to be
    published */

    const totalFields = requiredFields.length; //total number of required fields

    const completedFields = requiredFields.filter(Boolean).length;/*Filter
    all the fields are filled (true) */

    const completionText = `(${completedFields}/${totalFields})`/*Display
    fields that are completed */

    const isComplete = requiredFields.every(Boolean); /*A variable that is 
    true if all the required fields are true */

    return (

        <>

            {/*If a course is not published, a banner is displayed displaying a message */}
            {
                !course.isPublished && (
                    <Banner
                        label='This course is unpublished. It will not be visible to the
                        students'
                    />
                )
            }

            <div
                className='p-6'
            >
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-2'>

                        {/*Heading */}
                        <h1 className='text-2xl font-medium'>
                            Course Setup
                        </h1>

                        {/*Fields completed */}
                        <span className='text-sm text-slate-700'>
                            Complete all fields {completionText}
                        </span>
                    </div>


                    <Actions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        isPublished={course.isPublished}
                    />
                </div>


                {/*Details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>

                    {/*Left Grid */}
                    <div>

                        {/*Customize Course */}
                        <div className='flex items-center gap-x-2'>
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className='text-xl'>
                                Customize your course
                            </h2>
                        </div>

                        {/*Course Title */}
                        <TitleForm
                            initialData={course}
                            courseId={course.id}
                        />

                        {/*Course Description */}
                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />

                        {/*Course Image */}
                        <ImageForm
                            initialData={course}
                            courseId={course.id}
                        />

                        {/*Course Category */}
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id
                            }))}
                        />
                    </div>

                    <div className='space-y-6'>

                        {/*Course Chapters */}
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={ListChecks} />
                            </div>
                            <h2 className='text-xl'>
                                Course Chapters
                            </h2>
                            <ChaptersForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>

                        {/*Course Price */}
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={CircleDollarSign} />
                                <h2 className='text-xl'>
                                    Sell your course
                                </h2>
                            </div>
                            <PriceForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>

                        {/*Course Attachments */}
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <IconBadge icon={File} />
                                <h2 className='text-xl'>
                                    Resource & Attachments
                                </h2>
                            </div>
                            <AttachmentForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CourseIdPage