/*This function is responsible for fetching courses from the database based
on certain criteria. It fetches the courses, calculate progress for each course
based on user interaction, and return an array of course object with
additional progress and category information */

import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
}

type GetCourses = {
    userId: string;
    title?: string;
    categoryId?: string;
}

export const getCourses = async ({ userId, title, categoryId }: GetCourses): Promise<CourseWithProgressWithCategory[]> => {

    try {

        /*Attempts to fetch courses from the database and filter courses by
        isPublished status, title if provided and categoryId. */
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true
                    },
                    select: {
                        id: true
                    }
                },
                purchases: {
                    where: {
                        userId
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        /*Promise.all method takes an array of promises and returns a single promise
        that resolves when all of the input promises have resolved or when any of the
        input promises are rejected */
        const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(

            //iterates over each element in the courses array
            courses.map(async course => {

                /*check if the course has any purchases. If it doesnt, it means the user
                hasnt purchased the course, so the progress is set to null*/
                if (course.purchases.length === 0) {
                    return {
                        ...course,
                        progress: null
                    }
                }

                /*Calls the getProgress function to calculate the progress
                percentage for the current course. It awaits the result of this
                async operation */
                const progressPercentage = await getProgress(userId, course.id);
                return {
                    ...course,
                    progress: progressPercentage,
                }
            })
        );

        /*If the course has no purchase, it returns a copy of the course object 
        with progress set to null and if there is a purchase, it returns a copy 
        of the course with progress set to progressPercentage */
        return coursesWithProgress;

    } catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }

}