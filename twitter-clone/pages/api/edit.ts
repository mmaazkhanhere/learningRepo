/*This API route handler is responsible for updating user information in the
database based on the authenticated user's request. */

import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    /*Checks if the HTTP method of the request is PATCH. If not, returns a 405
    status code */
    if (req.method !== 'PATCH') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res); /*Extracts the
        current user from the result of serverAuth which represents the
        currently authenticated user */

        const { name, username, bio, profileImage, coverImage } = req.body; /*
        Extracts the user detail from the request body */

        if (!name || !username) {
            /*If user name or username is missing, throws an error */
            throw new Error('Missing fields');
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });/*uses Prisma query to update the user information based on the 
        authenticated user id */

        return res.status(200).json(updatedUser);/*Returns a JSON response with
        the updated user object if the update is successful */

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}