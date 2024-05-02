/*The following code snippet/function is responsible for calculating the progress
of a user in completing chapters of a course */

import { db } from "@/lib/db";

export const getProgress = async (userId: string, courseId: string): Promise<number> => {

    try {

        /*queries the function to fetch all published chapters of the specified
        courseId with only their ids selected */
        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true
            },
            select: {
                id: true
            }
        });

        //all publish chapter ids are extracted
        const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

        /*queries the database to count the number of completed chapters for the
        specified user*/
        const validCompletedChapters = await db.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChapterIds,
                },
                isCompleted: true
            }
        });

        /*calculates the progress percentage by dividing the number of completed
        chapters by the total number of published chapters and multiplying by
        100 thus calculating the progress */
        const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100

        return progressPercentage; //returns the percentage progress

    } catch (error) {
        console.log("[GET_PROGRESS]", error);
        return 0;
    }

};