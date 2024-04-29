/*An api endpoint that handles HTTP DELETE and PATCH requests for a course identified
by its course id */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { isTeacher } from "@/lib/teacher";

const { video } = new Mux({
    tokenId: process.env['MUX_TOKEN_ID'],
    tokenSecret: process.env['MUX_TOKEN_SECRET'],
});

export async function DELETE(req: Request, { params }: { params: { courseId: string } }) {

    try {

        const { userId } = auth(); //get the current authenticated user id

        if (!userId || !isTeacher(userId)) {
            /*If no authenticated user or if the current user is not a teacher,
            return an unauthorized error */
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        /*Find the course with the id as that passed in params and the author
        is the current user */
        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            },
            include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                }
            }
        });

        //if no such course is found, return a not found message and status 404
        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }


        /*It iterates over all the courses chapter and delete all the multimedia
        asset linked to its chapters are also deleted */
        for (const chapter of course.chapters) {
            if (chapter.muxData?.assetId) {
                await video.assets.delete(chapter.muxData.assetId);
            }
        }

        /*The course is deleted using prisma query */
        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId
            }
        });

        /*The response includes the deleted course */
        return NextResponse.json(deletedCourse)

    } catch (error) {
        console.error("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }

}

export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {

    try {
        const { userId } = auth(); //retrieves the current authenticated user id
        const { courseId } = params; //get the course id from the request

        const values = await req.json(); //get form values from the request

        if (!userId || !isTeacher(userId)) {
            /*If no authenticated user and the current user is not the teacher,
            return an unauthorized error message and status */
            return new NextResponse("Unauthorized", { status: 401 });
        }

        /*Update the course content using the prisma query */
        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values,
            }
        })

        return NextResponse.json(course); //return the updated course in response

    } catch (error) {
        console.error('[COURSE_ID]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}