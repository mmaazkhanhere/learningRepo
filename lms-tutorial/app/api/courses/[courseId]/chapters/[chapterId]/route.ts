/*An API endpoint that handles two request, a DELETE HTTP request and PATCH
request */

import Mux from "@mux/mux-node"
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const { video } = new Mux({
    tokenId: process.env['MUX_TOKEN_ID'],
    tokenSecret: process.env['MUX_TOKEN_SECRET'],
});


/*This function handles the deletion of a chapter from a course */
export async function DELETE(req: Request, { params }: { params: { courseId: string, chapterId: string } }) {

    try {
        const { userId } = auth(); //id of authenticated user is extracted

        if (!userId) {
            //if no authenticated user, return an unauthorized response and error message
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //check if the current user is the owner of the course
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        //if the current is not the owner of the course, return an unauthorized error
        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //find the chapter 
        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            }
        })

        //if no chapter is found, return not found error message
        if (!chapter) {
            return new NextResponse("Not found", { status: 404 });
        }


        /*check if the chapter has a video url. If it does, it deletes the video
        asset from both the mux database and the user database */
        if (chapter.videoUrl) {

            /*checks for the existing video asset data in the user datavase */
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId,
                }
            });

            /*if there is an existing video, delete the video from both the 
            mux database and user database */
            if (existingMuxData) {
                try {
                    await video.assets.delete(existingMuxData.assetId);
                } catch (error) {
                    console.error('Cannot delete from the mux', error)
                }

                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
            }
        }

        //delete the chapter from the user database
        const deletedChapter = await db.chapter.delete({
            where: {
                id: params.chapterId
            }
        });

        /*Queries the database to check if there are any existing published
        chapters in the database */
        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true
            }
        });

        /*If there is no existing published chapters in the database, the course
        is marked unPublished  */
        if (!publishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId
                },
                data: {
                    isPublished: false
                }
            })
        }

        //return the deleted chapter in the response
        return NextResponse.json(deletedChapter);

    } catch (error) {
        console.error("[CHAPTER_ID_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}


/*This function handles the updating of a chapter information, such as title,
description, video URL, and publication status */
export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string } }) {
    try {

        const { userId } = auth(); //get the id of authenticated user 
        const { isPublished, ...values } = await req.json(); /*get the data
        from the request */

        if (!userId) {
            //if no authenticated user, return an unauthorized error response
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        /*Check if the current user is the owner of the course */
        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        //if the current user is not the owner of the course, return an unauthorized error
        if (!ownCourse) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        /*Update the chapter data in the database using the Prisma update query */
        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                ...values
            }
        });


        /*Checks if a video url is provided in the updated value. If a video
        url exists, it proceeds with the video asset management process */
        if (values.videoUrl) {

            /*It queries the database to find any existing Mux data associated with
            the chapter associated with the chapter.  */
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId: params.chapterId
                }
            });

            /*If there is an existing video associated with the chapter, it first
            delete the video asset from the Mux database and then from our 
            database */
            if (existingMuxData) {
                await video.assets.delete(existingMuxData.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                });
            }

            /*After deleting the data, it creates a new video asset using the
            Mux api by calling video.assets.create with the provided video url
            to create a new video asset on Mux */
            const asset = await video.assets.create({
                input: values.videoUrl,
                playback_policy: ['public'],
                test: false
            })

            /*The video data is also included in our database */
            await db.muxData.create({
                data: {
                    chapterId: params.chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id
                }
            })
        }


        return NextResponse.json(chapter); //the update chapter is returned in response

    } catch (error) {
        console.log("COURSES_CHAPTER_ID", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }

}