
import React from 'react'
import { DataTable } from './_components/DataTable'
import { columns } from './_components/Columns'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

type Props = {}


const Courses = async (props: Props) => {

    const { userId } = auth();

    if (!userId) {
        return redirect('/')
    }

    const courses = await db.course.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div
            className='p-6'
        >
            <DataTable columns={columns} data={courses} />
        </div>
    )
}

export default Courses