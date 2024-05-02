/*React component responsible for rendering an item in the course sidebar */

"use client"

import { cn } from '@/lib/utils';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    label: string; //title of the sidebar item
    id: string; //id of the sidebar item
    isCompleted: boolean; //a boolean indicating whether the course is completed
    courseId: string; //id of the course 
    isLocked: boolean; //boolean indicating whether the course is locked
}

const CourseSidebarItem = ({ label, id, isCompleted, courseId, isLocked }: Props) => {

    const pathname = usePathname(); //hook to get the url pathname
    const router = useRouter(); //router object for navigation

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle); /*Depending
    on whether the chapter is locked or completed, different icons are displayed */

    const isActive = pathname?.includes(id);/*check if the sidebar item is selected */

    /*a function that is called when user clicks on the sidebar item and navigates
    the user to the chapter  */
    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`);
    }

    return (
        <button
            onClick={onClick}
            type='button'
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
                isCompleted && "text-emerald-700 hover:text-emerald-700",
                isCompleted && isActive && "bg-emerald-200/20"
            )}
        >
            <div
                className='flex items-center gap-x-2 py-4'
            >
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-slate-700",
                        isCompleted && "text-emerald-700"
                    )}
                />
                {label}
            </div>

            <div className={cn(
                'ml-auto opacity-0 border-2 border-slate-700 h-full transition-all',
                isActive && "opacity-100",
                isCompleted && "border-emerald-700"
            )}
            />
        </button>
    )
}

export default CourseSidebarItem