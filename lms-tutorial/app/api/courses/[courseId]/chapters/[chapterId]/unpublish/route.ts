/*An API endpoint for handling PATCH request to unpublish a chapter within a course */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {
    try {

        const { userId } = auth();//get the user of current signed in user

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

        //update the course with courseId and mark it as unpublished
        const unPublishedChapters = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                isPublished: false,
            }
        });

        //find all the chapters that are published
        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            }
        })

        //if there are no chapters published (if the current chapter that was unpublished
        //    was the only unpublished chapter), mark the course unpublished
        //)
        if (!publishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false,
                }
            })
        }

        //return the unpublished chapter in response
        return NextResponse.json(unPublishedChapters);

    } catch (error) {
        console.error("[CHAPTER_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}