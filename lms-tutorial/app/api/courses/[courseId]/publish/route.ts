/*API endpoint that handles the publication of a course */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {

    try {
        const { userId } = auth(); //get the user id of current signed in user

        if (!userId) {
            //if no signed in user, return an unauthenticated error message and 401 status
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        /*find the course with the courseId passed in the params */
        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            },
            include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                }
            }
        })

        //if no course found, return not found error message and 404 status
        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }

        /*check if the course have chapters that are published */
        const hasPublishedChapter = course.chapters.some((chapter) => chapter.isPublished);

        if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
            return new NextResponse("Missing required fields", { status: 401 });
        }

        //update the course and marked it as published
        const publishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId
            },
            data: {
                isPublished: true,
            }
        });

        return NextResponse.json(publishedCourse);

    } catch (error) {
        console.error("[COURSE_ID_PUBLISH]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }

}