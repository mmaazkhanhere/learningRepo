/*An API endpoint for handling PATCH request to publish a chapter within a course */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {
    try {

        const { userId } = auth(); //get the user of current signed in user

        if (!userId) {

            //if no signed in user, return unauthenticated error and 401 status
            return new NextResponse("Unauthorized", { status: 401 });
        }

        /*Check if the current sign in user is the owner of the course he want
        to publish */
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        //if not the owner of the course, return unauthorized error message
        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //find the chapter with the courseId (chapter to publish)
        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        });

        //find the mux data of that course id
        const muxData = await db.muxData.findUnique({
            where: {
                chapterId: params.chapterId,
            }
        })

        if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        //update the course with courseId and mark it as published
        const publishedChapters = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                isPublished: true,
            }
        })

        return NextResponse.json(publishedChapters)

    } catch (error) {
        console.error("[CHAPTER_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}