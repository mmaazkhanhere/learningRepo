import { isTeacher } from '@/lib/teacher'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const TeacherLayout = ({ children }: Props) => {

    const { userId } = auth();

    if (!isTeacher(userId)) {
        return redirect('/')
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default TeacherLayout