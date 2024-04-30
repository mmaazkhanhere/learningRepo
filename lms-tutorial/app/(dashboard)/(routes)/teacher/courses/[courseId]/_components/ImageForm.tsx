/*React component that is responsible for managing the course image with editing
and non-editing modes */

"use client"

import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Course } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/FileUpload'


type Props = {
    initialData: Course,
    courseId: string
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: 'Image is required'
    })
})/*Schema for the form that specifies that image character should be greater than
one(Image must be added for a course) */

const ImageForm = ({ initialData, courseId }: Props) => {

    const [isEditing, setIsEditing] = useState(false);/*state variable for user
    editing status */

    const router = useRouter(); //router object for navigation

    const toggleEdit = () => setIsEditing((current) => !current) /*function that
    toggle the user editing status */

    /*An async function that is called when the form is submitted. It makes an 
    HTTP PATCH request to the specified endpoint. If the status is successful, 
    a success toast notification is displayed and the page is refreshed */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success('Description Updated')
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
                Course Image


                <Button
                    onClick={toggleEdit}
                    variant='ghost'
                >
                    {/*Button that displays cancel if user is editing */}
                    {
                        isEditing && (
                            <>Cancel</>
                        )
                    }

                    {/*If user is not editing and if no image was uploaded before,
                    display an add image button */}
                    {
                        (!isEditing && !initialData.imageUrl) && (
                            <>
                                <PlusCircle className='h-4 w-4 mr-2' />
                                Add Image
                            </>
                        )
                    }

                    {/*If user is not editing and an image was already uploaded,
                    display an edit image button */}
                    {
                        !isEditing && initialData.imageUrl && (
                            <>
                                <Pencil className='h-4 w-4 mr-2' />
                                Edit Image
                            </>
                        )
                    }
                </Button>
            </div>

            {/*If user is not editing */}
            {
                !isEditing && (
                    /*If no image was present, display an image icon for upload */
                    !initialData.imageUrl ? (
                        <div
                            className='flex items-center justify-center h-60 bg-slate-200
                        rounded-md'
                        >
                            <ImageIcon className='h-10 w-10 text-slate-500' />
                        </div>
                    ) : (
                        /*If an image is present, display the image */
                        <div className='relative aspect-video mt-2'>
                            <Image
                                alt='Upload'
                                fill
                                className='object-cover rounded-md'
                                src={initialData.imageUrl}
                            />
                        </div>
                    )
                )
            }

            {/*If user is editing, display the file upload component */}
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint='courseImage'
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({ imageUrl: url });
                                }
                            }}
                        />

                        <div className='text-xs text-muted-foreground mt-4'>
                            16:9 aspect ratio recommended
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ImageForm