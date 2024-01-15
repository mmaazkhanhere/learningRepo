/*
This is a TypeScript function that handles a POST request to create a new user
with email, name, and password, and stores the user in a database after hashing
the password.
 */
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end();
        } /*if the request is not a POST call, it will return an error 
        (only allow post calls) */

        const { email, name, password } = req.body;
        //extract data from the request body

        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        })/* The code is querying the database to check if there is already a user 
        with the given email address. */

        if (existingUser) {
            return res.status(422).json({ error: 'Email taken' });
        }
        /* The code block is checking if there is already a user with the given email
        address in the database. If there is an existing user with the same email, it
        will return a response with a status code of 422 (Unprocessable Entity) and a
        JSON object containing an error message "Email taken". This is to prevent
        creating multiple user accounts with the same email address.
        */

        const hashedPassword = await bcrypt.hash(password, 12);
        /* the bcrypt library to hash the user's password before storing it in the
        database. */

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        })
        /* The code is creating a new user in the database using 
        the `prismadb` library. */

        /* sending a response with a status code of 200 (OK) and a JSON object 
        containing the user data. The `json()` method is used to convert the 
        user object into a JSON string before sending it as the response body. */
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
}