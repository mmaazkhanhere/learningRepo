/*React component that is used for editing the title of course along with form
validation and submission handling using zod and react hook form. */

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
    }, //title of the course
    courseId: string //course id of which title is being edit
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    })
})/*a schema for form that specifies that title field must be a string of 
minimum length of 1 */

const TitleForm = ({ initialData, courseId }: Props) => {

    const [isEditing, setIsEditing] = useState(false); /*a state variable
    that represents if user is editing the course title */

    const router = useRouter();//router object for navigation

    const toggleEdit = () => setIsEditing((current) => !current) /*toggle
    the current status of is editing (if current status of editing is true, it is
        turned to false) */

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    }); /*Initialize a form that takes form schema and initial title value
    as default value */

    const { isSubmitting, isValid } = form.formState; /*states of the form
    for disabling the form */


    /*An async function that makes a PATCH request to the API endpoint to
    update the course title with the new value */
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);/*patch request 
            to api endpoint*/

            toast.success('Title Updated')//success notification
            toggleEdit(); //call the toggle edit functions to change the edit value
            router.refresh(); //refresh the router
        } catch (error) {
            toast.error('Something went wrong') //display error notification if something went wrong
        }
    }

    return (
        <div
            className='mt-6 border bg-slate-100 rounded-md p-4'
        >
            <div className='font-medium flex items-center justify-between'>
                Course Title

                {/*A button that display is edit if user is not editing otherwise a 
                cancel if user is editing */}
                <Button
                    onClick={toggleEdit}
                    variant='ghost'
                >
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

            {/*If user is editing, display a form to edit the title of the course */}
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
                                                placeholder="e.g Advanced Web Development"
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

export default TitleForm