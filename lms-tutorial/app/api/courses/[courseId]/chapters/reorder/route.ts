/*An api endpoint that is responsible for updating the positions of chapters
within a course. It ensures that authenticated users who own the course can update
the positions of chapters within course. */

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { courseId: string } }) {
    try {

        const { userId } = auth(); //get the current signed in user id

        if (!userId) {
            //if no signed in user, return unauthorized error message
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        const { list } = await req.json(); //get the list of chapters from the request

        /*check if the current user is the owner of the course */
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })

        /*If current is not the owner of course, return an unauthorized error */
        if (!ownCourse) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        /*Iterates over each item of the list and update their positions in the database  */
        for (let item of list) {
            await db.chapter.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                }
            })
        }

        return new NextResponse("Success", { status: 200 }) /*return a success message */

    } catch (error) {
        console.error('REORDER', error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}