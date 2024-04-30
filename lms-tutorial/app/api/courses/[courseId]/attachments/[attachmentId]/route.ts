/* This api endpoint handles the deletion of attachments associated with a specific
course. This function ensures that only authenticated users who are teachers
and owner of the specified course can delete the attachments associated with
that course. */

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE(req: Request,
    { params }: { params: { courseId: string, attachmentId: string } }) {
    try {

        const { userId } = auth(); //get the id of the current signed in user 

        /*If no authenticated user or the current user is not the teacher, return
        unauthorized error */
        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //queries the database to check if the current user is owner of the course
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })

        //return unauthorized error if the current user is not owner of the course
        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //delete the attachment from the course using prisma
        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId
            }
        })

        //return the deleted attachment in json response
        return NextResponse.json(attachment);

    } catch (error) {
        console.error('ATTACHMENT_ID_ERROR', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}