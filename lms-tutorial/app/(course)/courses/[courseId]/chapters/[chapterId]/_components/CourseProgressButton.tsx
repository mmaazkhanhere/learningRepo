/*This component manages chapter completion status within a course. Users can
easily toggle the completion state, and the interface responds with feedback
messages and visual cues */

"use client"
import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    chapterId: string;
    courseId: string;
    nextChapterId?: string;
    isCompleted?: boolean;
}

const CourseProgressButton = ({ chapterId, courseId, isCompleted, nextChapterId }: Props) => {

    const router = useRouter();//router object for navigation
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false); //loading state


    /*An async function that is called when user clicks on the button. It updates
    the progress of chapter by making a PUT request to the server, toggling the 
    completion status of the chapter. If there is no new chapter, a confetti
    is displayed. If there is nextChapter, user is directed to the new chapter*/
    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted
            });

            if (!isCompleted && !nextChapterId) {
                confetti.onOpen();
            }

            if (!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            toast.success("Progress updated");
            router.refresh();

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }
    }

    const Icon = isCompleted ? XCircle : CheckCircle;

    return (
        <Button
            type='button'
            variant={isCompleted ? 'outline' : 'success'}
            className='w-full md:w-auto'
            onClick={onClick}
            disabled={isLoading}
        >
            {
                isCompleted ? "Not Completed" : "Mark as completed"
            }
            <Icon className='w-4 h-4 ml-2' />
        </Button>
    )
}

export default CourseProgressButton