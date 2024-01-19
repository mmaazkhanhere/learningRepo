/*A basic API endpoint for retrieving movie details by their unique identifier.
It ensures proper authentication, handles errors related to invalid or missing
IDs and interacts with the database to fetch the requested movie's information */

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //check if the request method is GET 
        if (req.method !== 'GET') {
            //if not, return 405 status
            return res.status(405).end();
        }

        await serverAuth(req, res); /*Check user authentication */

        const { movieId } = req.query; /*extract movieId from the request */

        if (typeof movieId !== 'string') {
            /*If movieId is not of type string, return Invalid ID error */
            throw new Error('Invalid Id');
        }

        if (!movieId) {
            /*If no movie id exists, return missing id error */
            throw new Error('Missing Id');
        }

        const movies = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        }); /*find the movie in the database */

        return res.status(200).json(movies); /*return 200 status and movies
        in the json */

    } catch (error) {
        console.log(error); //console the error message if any
        return res.status(500).end();
    }
}
