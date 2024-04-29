/*An api route that handles POST requests to create a new course */

import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const { userId } = auth(); /*retrieves the user id from the auth function
        provided by Clerk */

        const { title } = await req.json(); //extract the title from the request

        if (!userId || !isTeacher(userId)) {

            /*If there is no userId or if the current user is not a teacher, an
            unauthorized message will be returned */

            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.create({
            data: {
                userId,
                title
            }
        }) /*Uses the prisma query to create a course and passes the user id
        and title extracted from the request body */

        return NextResponse.json(course); //return a json response containing the newly created course

    } catch (error) {
        console.log('[COURSES]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}