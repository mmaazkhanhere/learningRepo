/*A react component that handles action related to courses, such as publishing or
unpublishing a course and deleting a course */

"use client"

import ConfirmModal from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { useConfettiStore } from '@/hooks/use-confetti-store'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    disabled: boolean
    courseId: string
    isPublished: boolean
}

const Actions = ({ disabled, courseId, isPublished }: Props) => {

    const router = useRouter();//router object for navigation
    const [isLoading, setIsLoading] = useState(false); //loading state
    const confetti = useConfettiStore(); //hook to access confetti functionality

    /*a function that is called when user deletes a course. It sends a DELETE HTTP
    request to the server to delete the course with specified courseId. It
    displays a success if the deletion is successful and refresh the page */
    const onDelete = async () => {

        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}/chapters`)
            toast.success("Course deleted");
            router.refresh();
            router.push(`/teacher/courses`)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    /*An async function that is called when user clicks on publish or unpublish
    button. It sends a PATCH HTTP request to the api endpoint and display
    a success notification if request is successful */
    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`)
                toast.success("Course Unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("Course published");
                confetti.onOpen();
            }

            router.refresh();
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex items-center gap-x-2'>
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublished" : "Published"}
            </Button>

            <ConfirmModal
                onConfirm={onDelete}
            >
                <Button
                    size='sm'
                    disabled={isLoading}
                >
                    <Trash className='h-4 w-4' />
                </Button>
            </ConfirmModal>

        </div>
    )
}

export default Actions