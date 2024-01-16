/* This code is configuring and exporting the authentication options for NextAuth,
a library for handling authentication in Next.js applications. */

import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import prismadb from '@/lib/prismadb'

export const authOptions: AuthOptions = {
    /*An object that contains configuration options for the NextAuth*/
    providers: [
        /*An array that includes configuration for Github, Google, and custom
        credentials authentication. For each provider, the respective client ID
        and client secret are obtained from environment variables to authenticate
        external services*/
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        /*Credentials provider allows custom email/password authentication. It define
        credentials required for authentication (email and password) with their respective
        labels and types */
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'passord'
                }
            },
            /*
            The function `authorize` takes in user credentials, checks if the
            email and password are provided, finds the user in the database
            based on the email, verifies the password, and returns the user if
            the authorization is successful.
            @param credentials - The `credentials` parameter is an object that
            contains the user's email and password. It is used to authenticate
            and authorize the user.
            @returns the user object if the email and password provided in the
            credentials parameter are valid.
             */
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    //check whether credentials are available
                    throw new Error('Email and password required');
                }

                /* The code is querying the database to find a user with the 
                specified email address. */
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user.hashedPassword) {
                    //check if user actually exists
                    throw new Error('Email does not exist');
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
                //check if the user password is correct

                if (!isCorrectPassword) {
                    //if password is not correct, throw error
                    throw new Error('Incorrect password');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth'
    }, /*pages object specifies the custom sign-in page */

    debug: process.env.NODE_ENV === 'development',
    /*debug option is set based on the environment. When the application is in development,
    debugging mode is enabled*/

    adapter: PrismaAdapter(prismadb),
    /*adapter configured using PrismaAdapter to connect NextAuth with a prisma database.
    It allows NextAuth to store authentication sessions and data in the database */

    session: { strategy: 'jwt' },
    /*session option configure the session strategy, indicating JWT are used for session
    management*/

    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },

    /*jwt option specifies the secret used for signing JWTS, obtained from the env */

    secret: process.env.NEXTAUTH_SECRET
    /*Specifies the secret used for various internal Nextauth operations, such as 
    sigining cookies */
};

export default NextAuth(authOptions);
