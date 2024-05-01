/*A react component for editing the description of a chapter and seamlessly 
integrate rich text editing functionality while handling form submission and
validation */

"use client"

import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'
import { Editor } from '@/components/Editor'
import { Preview } from '@/components/Preview'


type Props = {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    description: z.string().min(1)
}) //schema for form which specifies that the description is required

const ChapterDescriptionForm = ({ initialData, courseId, chapterId }: Props) => {

    const [isEditing, setIsEditing] = useState(false);/*state variable for handling
    the user editing status */

    const router = useRouter();//router object for navigation

    const toggleEdit = () => setIsEditing((current) => !current) /*function that
    toggles the user editing status */

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ''
        }
    });/*initialize the form with default value of description as that initially
    declared or an empty string */

    const { isSubmitting, isValid } = form.formState; //state of the forms

    /*Function that is called when user submits the form. It makes a PATCH
    HTTP request to the specified endpoint. If the request is successful, a 
    success notification is displayed and the page is refreshed */
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
                Chapter Description

                <Button
                    onClick={toggleEdit}
                    variant='ghost'
                >
                    {/*If user is editing, display a cancel text or else
                    display edit description button */}
                    {
                        isEditing ? (
                            <>Cancel</>
                        ) : (
                            <>
                                <Pencil className='h-4 w-4 mr-2' />
                                Edit Description
                            </>
                        )
                    }
                </Button>
            </div>

            {/*If user is not editing, display the initial specified data or
            no description message */}
            {
                !isEditing && (
                    <div
                        className={cn(
                            "text-sm mt-2",
                            !initialData.description && "text-slate-500 italic"
                        )}
                    >
                        {!initialData.description && "No description"}
                        {
                            initialData.description && (
                                <Preview
                                    value={initialData.description}
                                />
                            )
                        }
                    </div>
                )
            }

            {/*If user is in editing state, display a form that have text editor
            to specify the description of the chapter */}
            {
                isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 mt-4'
                        >
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Editor
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/*Button to submit the form */}
                            <div
                                className='flex items-center gap-x-2'
                            >
                                <Button
                                    disabled={!isValid || isSubmitting}
                                    type='submit'
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )
            }
        </div>
    )
}

export default ChapterDescriptionForm