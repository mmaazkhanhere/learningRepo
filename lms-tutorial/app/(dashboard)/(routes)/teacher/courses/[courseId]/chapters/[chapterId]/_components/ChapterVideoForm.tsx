/*a react component that handles the editing of chapter video settings, including
uploading and displaying videos*/

"use client"

import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { Pencil, PlusCircle, Video } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Chapter, MuxData } from '@prisma/client'
import MuxPlayer from "@mux/mux-player-react"
import { FileUpload } from '@/components/FileUpload'


type Props = {
    initialData: Chapter & { muxData: MuxData | null };
    chapterId: string
    courseId: string
}

const formSchema = z.object({
    videoUrl: z.string().min(1)
})//schema for the form that specifies that the video url is required

const ChapterVideoForm = ({ initialData, courseId, chapterId }: Props) => {

    const [isEditing, setIsEditing] = useState(false); /*editing status of the
    user */
    const router = useRouter(); //router object for navigation

    const toggleEdit = () => setIsEditing((current) => !current)/*function to
    toggle the editing status of the user */

    /*an async function that is called when user submits the form. It makes
    a PATCH request to the specified endpoint. If the request is successful,
    it display a success notification and refresh the page */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success('Chapter Updated')
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <div
            className='mt-6 border bg-slate-100 rounded-md p-4'
        >
            <div className='font-medium flex items-center justify-between'>
                Chapter Video

                <Button
                    onClick={toggleEdit}
                    variant='ghost'
                >
                    {/*If user is editing display, cancel text */}
                    {
                        isEditing && (
                            <>Cancel</>
                        )
                    }

                    {/*If user is not editing, and there is no video uploaded before,
                    display add a video text */}
                    {
                        (!isEditing && !initialData.videoUrl) && (
                            <>
                                <PlusCircle className='h-4 w-4 mr-2' />
                                Add a video
                            </>
                        )
                    }

                    {/*If user is not editing and have a video already uploaded,
                    display edit video text */}
                    {
                        !isEditing && initialData.videoUrl && (
                            <>
                                <Pencil className='h-4 w-4 mr-2' />
                                Edit video
                            </>
                        )
                    }
                </Button>
            </div>

            {/*If user is not editing and there is no video url, display a video icon
            or else display the video uploaded  */}
            {
                !isEditing && (
                    !initialData.videoUrl ? (
                        <div
                            className='flex items-center justify-center h-60 bg-slate-200
                        rounded-md'
                        >
                            <Video className='h-10 w-10 text-slate-500' />
                        </div>
                    ) : (
                        <div className='relative aspect-video mt-2'>
                            <MuxPlayer
                                playbackId={initialData?.muxData?.playbackId || ""}
                            />
                        </div>
                    )
                )
            }

            {/*If user is editing, display the file upload button with the endpoint
            that of chapter video to specify that we are uploading a chapter video */}
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint='chapterVideo'
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({ videoUrl: url });
                                }
                            }}
                        />

                        <div className='text-xs text-muted-foreground mt-4'>
                            Upload chapter&apos;s video
                        </div>
                    </div>
                )
            }

            {/*If user is not editing and there exists a video url, display the text */}
            {
                initialData.videoUrl && !isEditing && (
                    <div className='text-xs text-muted-foreground mt-2'>
                        Videos can take a few minutes to process. Refresh the page if
                        video does not appear
                    </div>
                )
            }
        </div>
    )
}

export default ChapterVideoForm