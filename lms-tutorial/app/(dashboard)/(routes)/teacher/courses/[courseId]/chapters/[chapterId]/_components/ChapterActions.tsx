/*A react component that provides a user friendly interface for managing chapter
actions, including publish/unpublished and delete functionalities, while handling
loading states and displaying toast messages to provide feedback to the user */

"use client"

import ConfirmModal from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
    disabled: boolean
    courseId: string
    chapterId: string
    isPublished: boolean
}

const ChapterActions = ({ disabled, courseId, chapterId, isPublished }: Props) => {

    const router = useRouter(); //router object for navigation
    const [isLoading, setIsLoading] = useState(false) //loading state 


    /*An async function that is called when the user confirm deletion. It sends
    a DELETE http request to the specified endpoint to delete the chapter. If the
    request is successful, it display a success notification and redirects the
    user to the course page */
    const onDelete = async () => {

        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success("Chapter deleted");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`)
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    /*An async function that is called when the user clicks the publish/unpublish
    button. After sending the request, it display a success notification and
    refresh the page */
    const onClick = async () => {
        try {
            setIsLoading(true);

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
                toast.success("Chapter Unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
                toast.success("Chapter published");
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

            {/*Button that display a publish/unpublish message */}
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
                {/*Button to delete the course */}
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

export default ChapterActions