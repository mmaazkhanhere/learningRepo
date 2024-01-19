/*An API route that handles 'POST' requests to add a movie to user's 
favorites and 'DELETE' requests to remove a movie from a user's favorites.
The route is protected with server-side authentication and uses Prisma
to interact with the database
*/

import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        //check if the the current request method is POST
        if (req.method === 'POST') {
            //if POST method, then confirm the user authentication
            const { currentUser } = await serverAuth(req, res);

            const { movieId } = req.body; //get the movie id from the request

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });
            //find the movie in the database using prisma query

            if (!existingMovie) {
                //if no such movie exists, then give error
                throw new Error('Invalid ID');
            }

            const user = await prismadb.user.update({
                /*If the movie exists, it updates the users favoriteIds array
                by pushing the new movie Id */
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId //adding the new movie id for that user to database
                    }
                }
            });

            return res.status(200).json(user); /*If everything goes well, status 200
        is returned */
        }

        if (req.method === 'DELETE') {
            /*checks if the request method is DELETE. If so, delete the movie from
            user favorite */
            const { currentUser } = await serverAuth(req, res); /*Confirm user
        authentication */

            const { movieId } = req.body; //get the movie id from the request

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            }); //find the movie in the database using the movie id

            if (!existingMovie) {
                //if the movie is not in the database, return invalid error
                throw new Error('Invalid ID');
            }

            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
            /*The favorite for the user is updated without the current movie */

            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updatedFavoriteIds,
                }
            }); /*The user detail is updated */

            return res.status(200).json(updatedUser);/*If the movie is successfully
        removed, return 200 status */
        }

        return res.status(405).end(); //return 405 if none of condition is satisfied
    } catch (error) {
        console.log(error);

        return res.status(500).end();
    }
}