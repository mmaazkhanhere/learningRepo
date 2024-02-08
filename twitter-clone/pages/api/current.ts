/*This API route ensures that only authenticated users can access it by
authenticating the user using the 'serverAuth' middleware. If authentication
is successful, it retrieves the current user's information and returns it
as a JSON response */

import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    /*Checks if the request is a GET request */
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res); /*Calls the function,
        passing the request and response and get the current user */

        return res.status(200).json(currentUser);/*the current user is returned
        in JSON */
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}