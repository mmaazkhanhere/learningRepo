/*
This is a TypeScript function that handles server-side authentication using
Next.js and NextAuth.js.
@param {NextApiRequest} req - The `req` parameter is an object that represents
the HTTP request made to the server. It contains information such as the request
headers, query parameters, and body of the request.
@param {NextApiResponse} res - The `res` parameter is an instance of the
`NextApiResponse` class, which represents the HTTP response that will be sent
back to the client. It is used to send the response data, set headers, and
handle errors.
@returns The function `serverAuth` is returning an object with a property
`currentUser`.
 */
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
/*A utility function for retrieving the user session on the server */

import prismadb from '@/lib/prismadb'
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {

    /*The request parameter will hold JWT token which session can use to get
    our login user */

    const session = await getServerSession(req, res, authOptions);
    /*Called to retrieve the user session on the server. It takes the incoming
    request, the outgoing response, and authentication options */

    if (!session?.user?.email) {
        /*Checks if user is authenticated by verifying if the session object
        exits. If user is not authenticated, an error is thrown */
        throw new Error('Not signed in');
    }

    /* if user exists, the code proceed to retrieve additional information 
    about the user */

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
        /*Find a user with a unique email matching the sign in user email */
    });

    if (!currentUser) {
        /*After retrieving user information from the database, the code checks
        if a user with specified email exists. If not, it throws an error */
        throw new Error('Not signed in');
    }

    return { currentUser }; /*If a user is found both in session and database,
    the function returns an object containing information about the currently
    signed-in user */
}

export default serverAuth;