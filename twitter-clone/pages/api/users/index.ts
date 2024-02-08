/*This API route allows clients to fetch a list of users from the database
by sending a GET request to the specified endpoint. The route orders the users
by their creation date and returns them in descending order */

import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //checks if the HTTP request method is GET. If not, it returns 405 status code
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });/*queries the database to retrieve a list of users using Prisma
        query. The retrieved users are ordered in descending order to
        get the most recently created users first */

        return res.status(200).json(users);/*If retrieval is successful, the
        function sends a JSON response with status code 200 containing the
        array of users */

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}