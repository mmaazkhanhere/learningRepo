/*This API route allows client to fetch details about a specific user and the
count of their followers from the database by sending a GET request with the
'userId' as a query parameter. If successful, the route responds with a JSON
object containing the user details and followers count. */

import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    /*Check if the request method is GET. If not, returns 405 status code */

    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { userId } = req.query; /*extracts the 'userId' from the query
        parameters of the request. */

        if (!userId || typeof userId !== 'string') {
            /*Checks if userId exists and is a string. If not, throws an error */
            throw new Error('Invalid ID');
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        }); /*Queries the database to retrieve details about the user with the
        specified userId */

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        }) /*It also counts the number of users who are following the specified
        user by querying the database using Prisma count method */

        return res.status(200).json({ ...existingUser, followersCount });/*If
        retrieval is successful, the function sends a JSON response with the
        status code 200 containing the details of the user and the count of
        their followers. */

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
};