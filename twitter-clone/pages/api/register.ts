/*An api route to register the user with the application. It first checks
if the request made is POST; if not, 405 status is returned. If it is a POST
request, email, username, name, and password is extracted from the request
body. The password entered is encrypted and the inserted into the database
using Prisma query */

import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //checks if the request is POST request
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, username, name, password } = req.body; /*Extract details
        from the request body */

        const hashedPassword = await bcrypt.hash(password, 12); /*Encrypts 
        the user password */

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword,
            }
        }); /*insert the details in the database */

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}