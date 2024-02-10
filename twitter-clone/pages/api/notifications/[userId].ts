/*This API route retrieves notifications for a specific user, orders them by
creation date, marks them as read by setting the hasNotification field to false
and then returns the notifications as JSON data in the response */

import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    /*Checks if the request method is a GET. If not, return 405 status error */

    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {

        const { userId } = req.query; /*Get the userId from the query string of
        the request */

        if (!userId || typeof userId !== 'string') {
            /*If user id doesn't exists, invalid id error message is returned */
            throw new Error('Invalid ID');
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc'
            }
        }); /*Query the database to find all notifications associated with the 
        specified userId which are ordered by their creation date in descending
        order*/

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: false,
            }
        }); /*After fetching notifications, it updates the user's hasNotification
        field to false, indicating that the user has read their notifications.
        It is updated for the userId provided in the query */

        return res.status(200).json(notifications);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}