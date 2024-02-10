/*This API route handler creates a new comment on a post, updates the 
corresponding post author with a notification about the comment, and returns
the created comment object as the response */

import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    /*Checks if the request method is POST. If not, 405 status is returned */

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {

        const { currentUser } = await serverAuth(req, res); /*ensures that
        logged-in user made the request. Gets the current user that is logged
        in*/
        const { body } = req.body; /*Extract the body of the request*/

        const { postId } = req.query; /*Get the post id from the request query */

        if (!postId || typeof postId !== 'string') {
            /*If post id doesn't exist, return an error message */
            throw new Error('Invalid ID');
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            }
        }); //creates a comment and insert in the database

        // NOTIFICATION PART START
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                }
            }); /* Find the specific post to which the comment */

            if (post?.userId) {
                /*If the post doesn't have user id, create a notification */
                await prisma.notification.create({
                    data: {
                        body: 'Someone replied on your tweet!',
                        userId: post.userId
                    }
                });

                await prisma.user.update({
                    /*update the user detail using the Prisma Query */
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
        // NOTIFICATION PART END

        return res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}