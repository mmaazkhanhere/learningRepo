/*This react component represents a form for creating a new course and include
form validation and submission functionality */

"use client"


import React from 'react'
import * as z from 'zod'
import axios from 'axios'

import { zodResolver } from '@hookform/resolvers/zod'/*The resolver is used with
react hook form to manage form state and handle form submission */

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import toast from 'react-hot-toast'

const CreateCourse = () => {

    const router = useRouter(); //access the router object for navigation

    const formSchema = z.object({
        title: z.string().min(1, {
            message: 'Title is required'
        })
    }); /*Defines a zod schema form for form validation and specifies that the form
    must have a title field which must be a string with minimum character length
    of 1 */


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ''
        }
    })/*Initializes the form using the useForm hook and specifies the form schema
    using the resolver option and provide default values for form fields */

    const { isSubmitting, isValid } = form.formState /*Extracts the isSubmitting
    and isValid properties from the form state object which are used to disable
    form submission and provide visual feedback to the user */


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        /*An async function that will be called when the form is submitted. It 
        makes a POST request to the server to create a new course using the form
        data. If the request is successful, it redirects the user to the newly
        created course page */

        try {
            const response = await axios.post('/api/courses', values); /*post request
            made at the endpoint*/
            router.push(`/teacher/courses/${response.data.id}`) /*If request is
            successful, user is redirect to the course page */
            toast.success('Course created') /*a success toast is displayed */
        } catch (error) {
            toast.error('Something went wrong') /*If any error occurs, an error
            toast is displayed */
        }
    }

    return (
        <div
            className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'
        >
            <div>

                {/*Heading of form */}
                <h1 className='text-2xl'>
                    Name your course
                </h1>

                {/*Course description */}
                <p className='text-sm text-slate-600'>
                    What would you like to name your course? Don&apos;t worry, you can
                    change this later
                </p>

                {/*Form */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8 mt-8'
                    >

                        {/*Form course title field */}
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Course Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder='e.g Advance Web Development'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course?
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        {/*Form buttons */}
                        <div className='flex items-center gap-x-2'>

                            {/*Cancel Button */}
                            <Link
                                href='/'
                            >
                                <Button
                                    type='button'
                                    variant='ghost'
                                >
                                    Cancel
                                </Button>
                            </Link>

                            {/*Submit Button */}
                            <Button
                                type='submit'
                                disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreateCourse