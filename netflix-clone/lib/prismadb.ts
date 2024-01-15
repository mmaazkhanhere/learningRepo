/* This code is importing the `PrismaClient` class from the `@prisma/client`
package. It is creating a new instance of the `PrismaClient` class and assigning it
to the `client` constant*/
import { PrismaClient } from '@prisma/client'

const client = global.prismadb || new PrismaClient()

if (process.env.NODE_ENV === 'production') global.prismadb = client
/* 
Done because of Nextjs hot preloading. Hot preloading means that on code change,
our code updates and reruns. In such case, Prisma creates a bunch of new Prisma 
client instances and then it will get an error saying 'there are too many
Prisma instances'. To get over this, we save Prisma client in a global file
(global files are not affected by hot preloading) and in production we don't
do that
*/

//create a new file called global.d.ts

export default client 