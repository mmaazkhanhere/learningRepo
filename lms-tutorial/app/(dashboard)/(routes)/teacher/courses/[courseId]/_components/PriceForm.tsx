/*React component that provides functionality to view and edit the price of a 
course. It handles form submission, display the current price, and allow users to
input and save a new price for course */

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
import { Course } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/format'


type Props = {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    price: z.coerce.number(),
}) //form schema the specifies to provide price for the course

const PriceForm = ({ initialData, courseId }: Props) => {

    const [isEditing, setIsEditing] = useState(false);/*state variable for
    the user editing status */

    const router = useRouter();//router object for navigation

    const toggleEdit = () => setIsEditing((current) => !current) /*function to
    toggle the user editing status */

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
        }
    }); /*Initialize form with default value as that already set price or undefined */

    const { isSubmitting, isValid } = form.formState; //state of the form

    /*An async function that is called when the user submits the form. It makes
    a PATCH HTTP request to the specified endpoint. If the status is successful,
    a toast is displayed and the page is refreshed */
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
                Course Price

                <Button
                    onClick={toggleEdit}
                    variant='ghost'
                >
                    {/*If user is editing, display a cancel button or else
                    display an edit price button */}
                    {
                        isEditing ? (
                            <>Cancel</>
                        ) : (
                            <>
                                <Pencil className='h-4 w-4 mr-2' />
                                Edit Price
                            </>
                        )
                    }
                </Button>
            </div>

            {/*If user is not editing, display the already provide course price
            or if no price is provided, display no price text */}
            {
                !isEditing && (
                    <p
                        className={cn(
                            "text-sm mt-2",
                            !initialData.price && "text-slate-500 italic"
                        )}
                    >
                        {
                            initialData.price ? formatPrice(initialData.price) : "No price"
                        }
                    </p>
                )
            }

            {/*If user is editing, display a form tho provide a price for the course */}
            {
                isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 mt-4'
                        >
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                step="0.01"
                                                disabled={isSubmitting}
                                                placeholder="Set a price for your course"
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

export default PriceForm