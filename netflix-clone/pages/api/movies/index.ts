/*An API route that fetches all movies from a database using Prisma when a GET
request is recieved. It checks the HTTP method, performs server-side 
authentication, and handles error appropriately */

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //first checks if the HTTP method of the incoming request is a GET request
        if (req.method !== 'GET') {
            /*If not a GET request, return a 405 status */
            return res.status(405).end();
        }

        await serverAuth(req, res); // perform server side authentication

        const movies = await prismadb.movie.findMany(); /*Uses Prisma to query
        the database and retrieve all records from the movie table. It awaits
        the result of the database operation */

        return res.status(200).json(movies);/*The code responds with a status
        code of 200 and sends a JSON response containing the retrieved movies */

    } catch (error) {

        console.log({ error }) /*Console any error if present */
        return res.status(500).end();
    }
}