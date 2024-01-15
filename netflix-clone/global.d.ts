import { PrismaClient } from '@prisma/client'
//import type { MongoClient } from 'mongodb';

/* The code `declare global { namespace globalThis { var prismadb: PrismaClient }
}` is declaring a global variable `prismadb` of type `PrismaClient`. */
declare global {
    namespace globalThis {
        var prismadb: PrismaClient
    }
}