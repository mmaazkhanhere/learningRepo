/*An api endpoint that handles the creation of a new chapter for a specific course.
It ensures that only authenticated users and teacher can create chapters for courses
they own, calculate the position of new chapter based on existing chapter, and
handles error. */

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    try {

        const { userId } = auth(); //userId of the currently signed in user
        const { title } = await req.json(); //title of the chapter extracted from the request

        if (!userId || !isTeacher(userId)) {
            /*If no authenticated user and the user is not a teacher, display
            an unauthorized error. */
            return new NextResponse("Unauthorized access", { status: 401 });
        }

        //check if the current user is the creator of the course
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })

        //if the current user is not the creator of the course, return unauthenticated error
        if (!courseOwner) {
            return new NextResponse("Unauthorized access", { status: 401 });
        }

        /*Find the last chapter added in the database using the find first query
        of the database */
        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId: params.courseId,
            },
            orderBy: {
                position: 'desc'
            }
        });

        /*If no new chapter exists, it is assigned 1 position else its position is
        added with 1 */
        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        /*Create a new chapter for the course */
        const chapter = await db.chapter.create({
            data: {
                title,
                courseId: params.courseId,
                position: newPosition
            }
        });

        return NextResponse.json(chapter); //return the chapter in json response


    } catch (error) {
        console.error("[CHAPTERS]", error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}