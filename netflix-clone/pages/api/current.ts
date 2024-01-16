/*
This is a TypeScript function that handles a GET request, authenticates the user
using serverAuth, and returns the currentUser object as a JSON response.

@returns The code is returning a JSON response with the currentUser object if
the request method is GET and the serverAuth function is successful. If there is
an error, it logs the error and returns a 500 status code.
 */
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //the code first check if the request method is GET
        if (req.method !== 'GET') {
            //if not, then 405 is returned
            return res.status(405).end();
        }

        /*if the request method is GET, the code proceeds to call the serverAuth
        function, which is responsible for authenticating the user and 
        retrieving information about the currently signed-in user*/

        const { currentUser } = await serverAuth(req, res);/*The result is 
        destructured to extract the currentUser object */

        return res.status(200).json(currentUser);

    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}