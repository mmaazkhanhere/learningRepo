/*This code sets up authentication using NextAuth. It enables authentication
with email and password credentials, handles authentication logic using Prisma
for database interaction and configures session management and JWT settings */

import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prismadb"

export const authOptions: AuthOptions = {

    adapter: PrismaAdapter(prisma), /*Specifies the Prisma adapter for NextAuth,
    allowing NextAuth to use Prisma to manage sessions and users */

    providers: [ /*configures authentication providers which in this case enables
    authentication using email and password*/
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                /*Defines the authentication logic for the CredentialsProvider.
                It checks if the provided credentials are valid by querying
                the database using Prisma*/

                if (!credentials?.email || !credentials?.password) {
                    /*If the provided email or password is missing, it throws an
                    error */
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                }); /*Get the user from the database using the email */

                if (!user || !user?.hashedPassword) {
                    /*If the user details doesnt exist or encrypted password
                    doesn't exist */
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                ); /*Compares the entered password and encrypted password. */

                if (!isCorrectPassword) {
                    /*if the password doesn't match, error will be returned */
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development', /*enables the debugging mode
    in the environment */
    session: {
        strategy: 'jwt',
    },/*specifies the session strategy, which in this case JWT is used */
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET, /*Configures the JWT settings,
        including the secret used for signing JWT tokens */
    },
    secret: process.env.NEXTAUTH_SECRET, /*Specifies the secret used for various
    authentication-related operations */
};

export default NextAuth(authOptions);