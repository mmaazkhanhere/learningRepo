import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

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