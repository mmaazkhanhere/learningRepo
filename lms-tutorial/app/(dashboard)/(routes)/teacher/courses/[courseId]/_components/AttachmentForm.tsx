"use client"

import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { File, Loader2, PlusCircle, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Attachment, Course } from '@prisma/client'

import { FileUpload } from '@/components/FileUpload'


type Props = {
    initialData: Course & { attachments: Attachment[] },
    courseId: string
}

const formSchema = z.object({
    url: z.string().min(1)
}) //form schema that specifies a url required with length greater than 1

const AttachmentForm = ({ initialData, courseId }: Props) => {

    const [isEditing, setIsEditing] = useState(false);/*state variable for 
    user editing status */

    const [deletingId, setDeletingId] = useState<string | null>(null); /*Tracks the
    id of the attachment being deleted */

    const router = useRouter(); //router object for navigation

    const toggleEdit = () => setIsEditing((current) => !current)/*function to
    toggle the user editing status */

    /*An async function that is called when user submits the form. It makes
    a POST request to the specified endpoint. If the status is successful, a
    success notification is displayed, the user editing status is toggled and
    the page is refresh */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success('Description Updated')
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong')
        }
    }


    /*An async function that is called when user deletes an attachment. It sends
    a delete HTTP request to the server to remove the attachment with the specified
    ID. It also updates the UI by removing the attachment from the list by refreshing
    the page */
    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success('Attachment Deleted');
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div
            className='mt-6 border bg-slate-100 rounded-md p-4'
        >
            <div className='font-medium flex items-center justify-between'>
                Course Attachments

                <Button
                    onClick={toggleEdit}
                    variant='ghost'
                >

                    {/*When user is editing display a cancel button */}
                    {
                        isEditing && (
                            <>Cancel</>
                        )
                    }

                    {/*If user is not editing, display add a file button */}
                    {
                        !isEditing && (
                            <>
                                <PlusCircle className='h-4 w-4 mr-2' />
                                Add a File
                            </>
                        )
                    }


                </Button>
            </div>

            {/*If user is not editing, no attachments are added, it display
            a text specifying that no attachments are added yet. Else a file
            icon along with file name is being displayed */}
            {
                !isEditing && (
                    <>
                        {
                            initialData.attachments.length === 0 && (
                                <p
                                    className='text-sm mt-2 text-slate-500 italic'
                                >
                                    No attachments yet
                                </p>
                            )
                        }

                        {/*If files are there, the files are displayed */}
                        {
                            initialData.attachments.length > 0 && (
                                <div className='space-y-2'>
                                    {
                                        initialData.attachments.map((attachment) => (
                                            <div
                                                key={attachment.id}
                                                className='flex items-center p-3 w-full bg-sky-100
                                            border-sky-200 text-sky-700 rounded-md'
                                            >
                                                <File
                                                    className='h-4 w-4 mr-2 flex-shrink-0'
                                                />

                                                <p className='text-xs line-clamp-1'>
                                                    {attachment.name}
                                                </p>

                                                {/*When user is deleting an attachment
                                                a loader is displayed */}
                                                {
                                                    deletingId === attachment.id && (
                                                        <div>
                                                            <Loader2 className='h-4 w-4 animate-spin' />
                                                        </div>
                                                    )
                                                }

                                                {/*If the id of the file requested id
                                                is not same as the attachment id, a x
                                                icon is displayed, clicking on which deletes
                                                the attachment */}
                                                {
                                                    deletingId !== attachment.id && (
                                                        <button
                                                            onClick={() => onDelete(attachment.id)}
                                                            className='ml-auto hover:opacity-75 transition'
                                                        >
                                                            <X className='h-4 w-4 ' />
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </>
                )
            }

            {/*When user is editing, file upload component is displayed that 
            is used to call the endpoint courseAttachment to upload
            attachment */}
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint='courseAttachment'
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({ url: url });
                                }
                            }}
                        />

                        <div className='text-xs text-muted-foreground mt-4'>
                            Add anything you students might need to complete the course
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AttachmentForm