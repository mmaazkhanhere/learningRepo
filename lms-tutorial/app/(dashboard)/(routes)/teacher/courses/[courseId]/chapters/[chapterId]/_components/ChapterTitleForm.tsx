/*A react component that is responsible for rendering and handling the
editing of a chapter's title */

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

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


type Props = {
    initialData: {
        title: string
    },
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    title: z.string().min(1)
})//specifies the schema for the form which specifies that the title must be provided

const ChapterTitleForm = ({ initialData, courseId, chapterId }: Props) => {

    const [isEditing, setIsEditing] = useState(false);/*state variable for handling
    the editing status of the user */

    const router = useRouter();//router object for navigation

    const toggleEdit = () => setIsEditing((current) => !current)/*function that
    toggles the editing status of the user */

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    }); //initialize the form with default values set as initial data provided

    const { isSubmitting, isValid } = form.formState;//state of the form

    /*An async function that is called when the form is submitted. It makes a
    PATCH HTTP request to the specified api endpoint along with payload containing
    the value of the form. It display a success notification if the request is 
    successful. */
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
                Chapter Title

                <Button
                    onClick={toggleEdit}
                    variant='ghost'
                >
                    {/*If user is editing, display a cancel button or else display
                    an edit title button */}
                    {
                        isEditing ? (
                            <>Cancel</>
                        ) : (
                            <>
                                <Pencil className='h-4 w-4 mr-2' />
                                Edit Title
                            </>
                        )
                    }
                </Button>
            </div>
            {/*If user is not editing, display the initial title */}
            {
                !isEditing && (
                    <p
                        className='text-sm mt-2'
                    >
                        {initialData.title}
                    </p>
                )
            }

            {/*If user is editing, display a form that takes the title */}
            {
                isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 mt-4'
                        >
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                disabled={isSubmitting}
                                                placeholder="e.g Introduction to the course"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*Button that submits the form */}
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

export default ChapterTitleForm