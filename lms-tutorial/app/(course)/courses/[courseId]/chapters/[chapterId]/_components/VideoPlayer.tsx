/*A react component responsible for displaying a video player using the MuxPlayer
library. */

"use client"
import { useConfettiStore } from '@/hooks/use-confetti-store';
import { cn } from '@/lib/utils';
import MuxPlayer from '@mux/mux-player-react';
import axios from 'axios';
import { Loader2, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


type Props = {
    chapterId: string;//id of the current chapter
    courseId: string; //id of the current course
    playbackId: string; //id used for playback of the video
    nextChapterId?: string; //id of the next chapter to be played after this chapter completes
    isLocked: boolean; //boolean indicating whether the chapter is locked or not
    completeOnEnd: boolean; //a boolean indicating whether the chapter should be marked as completed
    title: string //title of the video

}

const VideoPlayer = ({ chapterId, courseId, playbackId, nextChapterId, isLocked, completeOnEnd, title }: Props) => {

    const [isReady, setIsReady] = useState(false); /*state variable to track whether
    the video player is ready for playback */

    const router = useRouter(); //router object for navigation

    const confetti = useConfettiStore();


    /*An async function that is called when the video playback ends. It updates
    the progress of the chapter, displays a success and navigates to the next 
    chapter if available  */
    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true
                });
            }

            /*If there is no next chapter to complete, a confetti is displayed
            indicating that the course has ended */
            if (!nextChapterId) {
                confetti.onOpen()
            }

            toast.success("Progress updated");
            router.refresh();

            //if there is next chapter, navigate to the next chapter
            if (nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

        } catch (error) {
            toast.error("Something went wrong")
        }
    }
    return (
        <div
            className="relative aspect-video"
        >
            {/*If the video is not ready to play and if the chapter is not locked
            display a loader */}
            {
                !isReady && !isLocked && (
                    <div
                        className='absolute inset-0 flex items-center justify-center
                    bg-slate-800'
                    >
                        <Loader2
                            className='w-8 h-8 animate-spin text-secondary'
                        />
                    </div>
                )
            }

            {/*If a chapter is locked, display locked message */}

            {
                isLocked && (
                    <div
                        className='absolute inset-0 flex items-center justify-center
                        bg-slate-800 flex-col gap-y-2 text-secondary'
                    >
                        <Lock className='h-8 w-8' />
                        \
                        <p className='text-sm'>
                            This chapter is locked
                        </p>
                    </div>
                )
            }

            {/*If a chapter is not locked */}
            {
                !isLocked && (
                    <MuxPlayer
                        title={title}
                        className={cn(
                            !isReady && "hidden"
                        )}
                        onCanPlay={() => setIsReady(true)}
                        onEnded={onEnd}
                        autoPlay
                        playbackId={playbackId}
                    />
                )
            }
        </div>
    )
}

export default VideoPlayer