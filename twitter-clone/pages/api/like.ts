/*This api route handles the logic for liking and unliking a post. It ensures
that the user is authenticated, validates the request data, performs the 
necessary database operations to update the post's liked status, and returns 
the updated post data */

import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    /*checks if the request method is a POST request or DELETE request. If none,
    return a 405 status code */
    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    try {
        const { postId } = req.body; //get the post id from the request body

        const { currentUser } = await serverAuth(req, res); /*get the details
        of currently logged-in user */

        if (!postId || typeof postId !== 'string') {
            //If no post id exists, an error message is returned
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        }); /*query the database using Prisma to get the post with specific id */

        if (!post) {
            /*If no post exists, an error message will be displayed */
            throw new Error('Invalid ID');
        }

        let updatedLikedIds = [...(post.likedIds || [])]; /*shallow copying */

        if (req.method === 'POST') {

            /*If request method is of type POST, update the logged-in user
            likes */

            updatedLikedIds.push(currentUser.id);

            // NOTIFICATION PART START
            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId,
                    }
                }); //find the post using post id

                if (post?.userId) {
                    /*create  notification if post has no activity related to 
                    that user */
                    await prisma.notification.create({
                        data: {
                            body: 'Someone liked your tweet!',
                            userId: post.userId
                        }
                    });

                    await prisma.user.update({ /*update the user details and mark
                    the hasNotification to true indicating that the user has
                    a new unread notification  */
                        where: {
                            id: post.userId
                        },
                        data: {
                            hasNotification: true
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
            // NOTIFICATION PART END
        }

        if (req.method === 'DELETE') {
            /*If request method is delete, it removes the current user id from
            the likedIds array */
            updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser?.id);
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });
        //update the like count for that specific post

        return res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}