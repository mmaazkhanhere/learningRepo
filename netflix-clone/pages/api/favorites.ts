import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        /*checks if the request method is a GET method */
        if (req.method !== 'GET') {
            //if not a request method, return 405 status
            return res.status(405).end();
        }

        const { currentUser } = await serverAuth(req, res); /*check the user
        authentication */

        const favoritedMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        }); /*fetch the current user favorite movies */

        return res.status(200).json(favoritedMovies); /*If fetched successfully,
        200 response status is returned along with the favoritedMovie in the 
        json */
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}