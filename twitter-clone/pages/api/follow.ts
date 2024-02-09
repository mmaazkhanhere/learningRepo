/*This API route provides functionality for users to manage their following
relationship with other users and handles notifications for follow actions */

import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    /*Checks if the request method is POST request or DELETE request. If neither,
    return 405 error */

    if (req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }


    try {
        const { userId } = req.body; //extract the user id from the request body

        const { currentUser } = await serverAuth(req, res); /*get the current
        logged in user  */

        if (!userId || typeof userId !== 'string') {
            //if userId doesn't exist, return an error message
            throw new Error('Invalid ID');
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        }); /*get the user detail using the userId */

        if (!user) {
            //if user does not exist, return an error message
            throw new Error('Invalid ID');
        }

        let updatedFollowingIds = [...(user.followingIds || [])]; /*Initializes
        the variable by creating a shallow copy of the followingIds array of
        a user */

        if (req.method === 'POST') {
            updatedFollowingIds.push(userId);

            // NOTIFICATION PART START
            try {
                await prisma.notification.create({
                    data: {
                        body: 'Someone followed you!',
                        userId,
                    },
                });

                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        hasNotification: true,
                    }
                });
            } catch (error) {
                console.log(error);
            }
            // NOTIFICATION PART END

        }

        if (req.method === 'DELETE') {
            /*If the request method is Delete, it removes the userId from the
            followingIds array of the current user, indicating that the
            user has unfollow specified user */
            updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        }); /*The user following list is updated */

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}