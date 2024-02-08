/*This function serves as middleware for Next.js API routes to ensure that only
authenticated user can access protected resources. It verifies the user's
session and retrieves the current user's information from the database based
on their email address. If authentication fails, it throws an error otherwise it 
returns the current user's information */

import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getServerSession(req, res, authOptions); /*Get the 
    user session using getServerSession by passing the request, response, and
    the authentication options */

    if (!session?.user?.email) { //check if user is signed in
        throw new Error('Not signed in');
    }

    const currentUser = await prisma.user.findUnique({
        /*get the current user by passing the signed in user email to database  */
        where: {
            email: session.user.email,
        }
    });

    if (!currentUser) {
        /*If no user has been found, return error */
        throw new Error('Not signed in');
    }

    return { currentUser };
};

export default serverAuth;