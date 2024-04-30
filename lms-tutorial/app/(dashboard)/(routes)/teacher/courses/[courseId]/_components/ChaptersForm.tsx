/*This react component is responsible for managing chapters within a course */

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
import { Loader2, PlusCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Chapter, Course } from '@prisma/client'
import { Input } from '@/components/ui/input'
import ChapterList from './ChapterList'


type Props = {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1)
});
//form schema that specifies that the length of title of chapter should be greater than 1

const ChaptersForm = ({ initialData, courseId }: Props) => {

    const [isCreating, setIsCreating] = useState(false);/*state variable that
    manages whether the user is currently creating a new chapter */

    const [isUpdating, setIsUpdating] = useState(false);/*state variable that 
    manages whether the component is currently performing an update operation,
    such as reordering chapter */

    const router = useRouter(); //router object for navigation

    const toggleCreating = () => setIsUpdating((current) => !current) /*
    function to toggle the user creating status */

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ''
        }
    });
    //initialize a form with default value of title as an empty string

    const { isSubmitting, isValid } = form.formState; //states of the form


    /*An async function that is called when the user submits the form. It makes
    a POST HTTP request to the specified endpoint. If the request is successful,
    a success notification is displayed, the user creating status is changed,
    and the page is refreshed */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success('Chapter Updated')
            toggleCreating();
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    /*The function is responsible for handling the reordering of chapters within
    a course. It receives an array of object containing an id and position of
    each chapter */
    const onReorder = async (updateData: { id: string, position: number }[]) => {
        try {

            setIsUpdating(true); //set the update status to true

            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData
            }) /*Make an PUT HTTP request to the specified endpoint with the 
            payload containing the object passed as a parameter */

            toast.success('Chapter Reordered'); /*If status successful, a success
            notification is displayed */
            router.refresh(); //refresh the page

        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsUpdating(false);
        }
    }


    /*function that navigates the user to the page for editing a specific chapter */
    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    };

    return (
        <div
            className='relative mt-6 border bg-slate-100 rounded-md p-4'
        >

            {/*If the updating status is true, display a loading spinner */}
            {
                isUpdating && (
                    <div
                        className='absolute h-full w-full bg-slate-500/20 top-0 right-0 
                        rounded-md flex items-center justify-center'
                    >
                        <Loader2 className='animate-spin h-6 w-6 text-sky-700' />
                    </div>
                )
            }


            <div className='font-medium flex items-center justify-between'>
                Course Chapters

                {/*Display cancel button if user is creating else display
                add a chapter button */}
                <Button
                    onClick={toggleCreating}
                    variant='ghost'
                >
                    {
                        isCreating ? (
                            <>Cancel</>
                        ) : (
                            <>
                                <PlusCircle className='h-4 w-4 mr-2' />
                                Add a chapter
                            </>
                        )
                    }
                </Button>
            </div>

            {
                /*If user is creating a chapter, a form is displayed */
                isCreating && (
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
                                                placeholder="e.g 'Introduction to the course'"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*Button to submit the form */}
                            <Button
                                disabled={!isValid || isSubmitting}
                                type='submit'
                            >
                                Create
                            </Button>

                        </form>
                    </Form>
                )
            }

            {/*If user is not creating, display the length of chapter and list of
            chapters */}
            {
                !isCreating && (
                    <div className={cn(
                        'text-sm mt-2',
                        !initialData.chapters.length && 'text-slate-500 italic'
                    )}>
                        {
                            !initialData.chapters.length && 'No chapters'
                        }
                        <ChapterList
                            onEdit={onEdit}
                            onReorder={onReorder}
                            items={initialData.chapters || []}
                        />
                    </div>
                )
            }

            {
                !isCreating && (
                    <p className='text-xs text-muted-foreground mt-4'>
                        Drag and drop to reorder the chapters
                    </p>
                )
            }
        </div>
    )
}

export default ChaptersForm