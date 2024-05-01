/*A react component that allows user to edit the access settings for a chapter in
 a course (is the course free or required rpo subscription to view) */

"use client"

import React, { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
    Form,
    FormControl,
    FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox"



type Props = {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    isFree: z.boolean().default(false)
}) //form schema that specifies that by default value of isFree is false

const ChapterAccessForm = ({ initialData, courseId, chapterId }: Props) => {

    const [isEditing, setIsEditing] = useState(false);/*state variable for the
    user editing status */

    const router = useRouter();// router object for navigation

    const toggleEdit = () => setIsEditing((current) => !current) /*function to toggle
    user editing status */

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: !!initialData.isFree
        }
    }); //initialize the form with default value 

    const { isSubmitting, isValid } = form.formState; //states of form

    /*an async function that is called when user submits the form. It makes a
    PATCH HTTP request to the specified endpoint. If the request status is successful,
    a success notification is displayed and page is refreshed */
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
                Chapter access

                <Button
                    onClick={toggleEdit}
                    variant='ghost'
                >
                    {/*Display cancel button if user is editing or edit access 
                    button if user is not editing */}
                    {
                        isEditing ? (
                            <>Cancel</>
                        ) : (
                            <>
                                <Pencil className='h-4 w-4 mr-2' />
                                Edit access
                            </>
                        )
                    }
                </Button>
            </div>

            {/*If user is not editing, display the chapter access, with different
            text displayed depending if the course is free or not */}
            {
                !isEditing && (
                    <div
                        className={cn(
                            "text-sm mt-2",
                            !initialData.isFree && "text-slate-500 italic"
                        )}
                    >
                        {
                            initialData.isFree ? (
                                <>This chapter is free for preview</>
                            ) : (
                                <>This chapter is not free</>
                            )
                        }
                    </div>
                )
            }

            {/*If user is editing, display a form with a checkbox for marking
            the chapter free  */}
            {
                isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 mt-4'
                        >
                            <FormField
                                control={form.control}
                                name='isFree'
                                render={({ field }) => (
                                    <FormItem className='flex flex-row items-start space-x-3
                                    space-y-0 rounded-md border p-4'>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className='space-y-1 leading-none'>
                                            <FormDescription>
                                                Check this box if you want to make this chapter
                                                free for preview
                                            </FormDescription>
                                        </div>
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

export default ChapterAccessForm