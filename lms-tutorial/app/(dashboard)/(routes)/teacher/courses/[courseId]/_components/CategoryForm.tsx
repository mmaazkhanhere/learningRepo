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

import { Combobox } from '@/components/ui/combobox' /*Tweak the combobox accordingly */


type Props = {
    initialData: Course; //initial data of the course
    courseId: string; //the id of the course being edited
    options: {
        label: string;
        value: string;
    }[];
}

const formSchema = z.object({
    categoryId: z.string().min(1)
}) /*form schema which specifies the category id must be specified */

const CategoryForm = ({ initialData, courseId, options }: Props) => {

    const [isEditing, setIsEditing] = useState(false); /*state variable for the
    user form editing status */

    const router = useRouter(); //router object for navigation

    const toggleEdit = () => setIsEditing((current) => !current) /*function that 
    toggles the user editing status */

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || ''
        }
    }); /*Initializes a form with default value as initial value, if present, or
    an empty string */

    const { isSubmitting, isValid } = form.formState;/*states of the form */


    /*An async function that makes a PATCH HTTP request ot the specified endpoint.
    If the request is successful, display a success notification and refresh the
    page. If an error occurs, display an error notification */
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

    const selectedOption = options.find((option) => option.value === initialData.categoryId)
    //find the selected category 

    return (
        <div
            className='mt-6 border bg-slate-100 rounded-md p-4'
        >
            <div className='font-medium flex items-center justify-between'>
                Course Category

                {/*Display a cancel button if user is still editing or else display
                edit category button */}
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
                                Edit Category
                            </>
                        )
                    }
                </Button>
            </div>

            {/*If user is not editing, display the selected option or display
            no category if no category is selected */}
            {
                !isEditing && (
                    <p
                        className={cn(
                            "text-sm mt-2",
                            !initialData.categoryId && "text-slate-500 italic"
                        )}
                    >
                        {selectedOption?.label || "No category"}
                    </p>
                )
            }

            {/*If user is editing, display a form with a selection box along
            with search   */}
            {
                isEditing && (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-4 mt-4'
                        >
                            <FormField
                                control={form.control}
                                name='categoryId'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>

                                            {/*Tweak the combobox accordingly in the ui folder */}
                                            <Combobox
                                                options={options}
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

export default CategoryForm