/*This API route handles GET requests for retrieving a specific post and its
associated data from the database */

import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    /*Checks if the HTTP request made is a GET request. If not, returns a 405
    status error */
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { postId } = req.query; /*get the postId from the query */

        if (!postId || typeof postId !== 'string') {
            //If post id is missing, return an error message
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                user: true,
                comments: { //we also want to populate comments
                    include: {
                        user: true //also include users who made comments
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
            },
        }); /*uses the Prisma to query the database for a post with the specified
        postId and retrieves a single post based on its unique identifier and
        is sorted in descending order, fetching the latest post on top */

        return res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}