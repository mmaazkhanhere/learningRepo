/*The following code snipped seeds the database with categories using Prisma. 
This automate the process of populating the database with initial categories.

Seeding the database refers to the process of populating the database with initial
data. In the provided script, seeding the database specifically involves creating
records for categories*/

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient(); //initializes a new instance of the Prisma client

/*an async function that contains the logic for seeding the database. */
async function main() {

    try {
        /*Create multiple category records in the database. Each category is 
        represented as an object with a name field */
        await database.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography" },
                { name: "Accounting" },
                { name: "Engineering" },
                { name: "Filming" },
            ]
        })

        console.log('Success')
    } catch (error) {
        console.error('Error seeding the database categories', error);
    } finally {
        /*disconnect the database regardless whether seeding is successful. It 
        ensures that the Prisma client disconnects from the database after the
        seeding process is complete */
        await database.$disconnect();
    }
}

main();