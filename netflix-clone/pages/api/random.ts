/*This API route is going to fetch a random movie from a database and return
it as a JSON response */

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        /*Checks if the request is a GET method. */
        if (req.method !== 'GET') {
            //If not a GET request, return 405 status code
            return res.status(405).end();
        }

        await serverAuth(req, res); /*function called with the request and response
        object to perform server side authentication */

        const moviesCount = await prismadb.movie.count(); /*queries the database
        to get the total count of movies */
        const randomIndex = Math.floor(Math.random() * moviesCount); /*generates
        a random index within the total number of movies */

        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        }); /*Uses Prisma 'findMany' method to fetch a single movie from the
        database based on the random index */

        return res.status(200).json(randomMovies[0]); /*The randomly selected
        movie is sent as a JSON response to the client */
    } catch (error) {
        console.log(error);

        return res.status(500).end();
    }
}

//create new hook useBillboar.ts in hook folder