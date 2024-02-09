/*This api route allows for creating new posts associated with users and fetching
post, optionally filtered by user id */

import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    /*First checks if the request made is POST or GET. If not, return 405
    status code */
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end();
    }

    try {

        if (req.method === 'POST') {
            /*WHen the method is POST, the route ensures authentication by using
            the severAuth function */

            const { currentUser } = await serverAuth(req, res); /* Extracts the
            current user from the authenticated session */

            const { body } = req.body; /* retrieves the post body from the request
            body */

            const post = await prisma.post.create({
                data: {
                    body,
                    userId: currentUser.id
                }
            }); /*Creates a new post in the database using Prisma create method
            associating it with the current user */

            return res.status(200).json(post);
        }

        if (req.method === 'GET') {

            /*If the method is GET, the route checks if there is a userId 
            parameter in the request qery */
            const { userId } = req.query;

            console.log({ userId })

            let posts;

            if (userId && typeof userId === 'string') {
                /*If userId is provided, it retrieves posts specific to that 
                user in descending order */
                posts = await prisma.post.findMany({
                    where: {
                        userId
                    },
                    include: {
                        user: true,
                        comments: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                });
            } else {
                /*If userId is not provided, it retrieves all the post in
                descending order */
                posts = await prisma.post.findMany({
                    include: {
                        user: true,
                        comments: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
            }

            return res.status(200).json(posts);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}