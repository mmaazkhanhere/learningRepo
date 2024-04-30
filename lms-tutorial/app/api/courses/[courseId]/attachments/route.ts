/*An api endpoint that handles the creation of attachments for a course. It ensures
that only authenticated users who are teachers are the owners of the specified
course can create attachments for the course.  */

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {

    try {

        const { userId } = auth(); //get the id of the currently signed in user
        const { url } = await req.json() //get the url of the attachment

        if (!userId || !isTeacher(userId)) {
            //if no authenticated user or the user is not a teacher, return unauthenticated error
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //query the database to find the course whose owner is the current user
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })

        //if no course owner, return unauthorized error
        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //creates an attachment for the course
        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                courseId: params.courseId
            }
        });

        return NextResponse.json(attachment); //return the attachment in json response

    } catch (error) {
        console.error("[COURSE_ID_ATTACHMENTS]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }

}