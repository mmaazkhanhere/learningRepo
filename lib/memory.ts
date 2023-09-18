import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

export type CompanionKey = {
    /*defines a TypeScript type with three properties which is used to represent 
    a key for identifying companions memory*/
    companionName: string;
    modelName: string;
    userId: string;
};

export class MemoryManager {
    //a class MemoryManager created with three private claases
    private static instance: MemoryManager; //A private static variable used for singleton pattern implementation.
    /*Singleton design pattern ensures that a class has only one instance and provides a global point of access
    to that instance */
    private history: Redis; //An instance of Redis, used for storing chat history.
    private vectorDBClient: PineconeClient; //An instance of PineconeClient, used for vector similarity searches.

    public constructor() {
        //initialises the Redis and Pinecone clients using environment variable
        this.history = Redis.fromEnv();
        this.vectorDBClient = new PineconeClient();
    }

    public async init() {
        //initialise the Pinecone client with necessary API keys and environment information
        if (this.vectorDBClient instanceof PineconeClient) {
            await this.vectorDBClient.init({
                apiKey: process.env.PINECONE_API_KEY!,
                environment: process.env.PINECONE_ENVIRONMENT!,
            });
        }
    }

    public async vectorSearch(
        /*this method uses pinecone to perform a similarity search based on a provided chat hostory
        (recentChatHistory) and a companion file name. It retrieves simialar documents and returns 
        them as result */
        recentChatHistory: string,
        companionFileName: string
    ) {
        const pineconeClient = <PineconeClient>this.vectorDBClient;
        /*cast this.vectorDBClient to the type Pinecone Client */

        const pineconeIndex = pineconeClient.Index(
            process.env.PINECONE_INDEX! || ""
        ); //obtainst the pinecone index by calling the .Index emthod on the pinecone client

        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
            { pineconeIndex }
        ); /*creates a vectorStore using PineconeStore.fromExistingIndex and takes two arguments
        1- an instance of OpenAIEmbedding which is used for obtaining vector embeddings
        2- an object containing the pinecone index
        */

        const similarDocs = await vectorStore
            //performs a similarty search using the vectorStore and use three arguments
            /*
            1- recentChatHistory which is the text for which similarity is being searched
            2 The number of similar documents to retrieve
            3- Additional options, which include specifying the filename to search for similarity
             */
            .similaritySearch(recentChatHistory, 3, { fileName: companionFileName })
            .catch((err) => {
                console.log("WARNING: failed to get vector search results.", err);
            });
        return similarDocs;
    }

    public static async getInstance(): Promise<MemoryManager> {

        if (!MemoryManager.instance) {
            //checks if the MemoryManager class has already created an instance, if not then create new one
            MemoryManager.instance = new MemoryManager();
            await MemoryManager.instance.init();
            /*after creating the instance, the code awaits the initialisation of the MemoryManager instance 
            by calling its init mehtod*/
        }
        return MemoryManager.instance;
    }

    private generateRedisCompanionKey(companionKey: CompanionKey): string {
        return `${companionKey.companionName}-${companionKey.modelName}-${companionKey.userId}`;
    }

    public async writeToHistory(text: string, companionKey: CompanionKey) {
        /*this function is responsible for adding a piece of text with a timestamp to a Redis sorted 
        set, with the sorted set's key generated based on the companionKey provided.  */

        /* Takes two parameter
        1- a string representing the text that you want to write to the history
        2- companionKey objext that is used as some form of identifier or key for storing 
        the text in redix databas
         */
        if (!companionKey || typeof companionKey.userId == "undefined") {
            //checks if companion is available or if the userId is defined returning "" if true
            console.log("Companion key set incorrectly");
            return "";
        }

        const key = this.generateRedisCompanionKey(companionKey);
        /*generates a redis key for the user's chat history for calling the private
        generateRedisCompanionKey method*/
        const result = await this.history.zadd(key, {
            //uses the zadd method to add an element to a Redis sorted set with the key
            score: Date.now(),
            //score is set to current time stamp
            member: text,
            //member set is to the text parameter passed to the function

        });

        return result;
        /*returns the result of the zadd operation which typically indicates the number of elements added or updated
         */
    }

    public async readLatestHistory(companionKey: CompanionKey): Promise<string> {
        //responsible for reading and returning the latest chat history for specific user and take CompanionKey as input parameter
        if (!companionKey || typeof companionKey.userId == "undefined") {
            //checks if companion is available or if the userId is defined returning "" if true
            console.log("Companion key set incorrectly");
            return "";
        }

        const key = this.generateRedisCompanionKey(companionKey);
        /*generates a redis key for the user's chat history for calling the private 
        generateRedisCompanionKey method*/
        let result = await this.history.zrange(key, 0, Date.now(), {
            /*asynchronously retrieves chat hostroy from the Redis database using the zrange method
            key is the redis key for the user's chat hisotry
            0 is the starting index for the range of elements to retrieve 
            Date.noew() is the ending score (timestamp) for the range */
            byScore: true,
        });

        result = result.slice(-30).reverse();
        /*Slices the result array to keep only the latest 30 items */
        const recentChats = result.reverse().join("\n");
        /*further reverses the order of the sliced and revered result array to display the most recent message first */
        return recentChats;
    }

    public async seedChatHistory(
        /*, the seedChatHistory method allows you to seed the chat history for a specific companion with initial content. 
        It checks if the history already exists, splits the provided content into individual messages, assigns timestamps 
        to each message, and adds them to the Redis database as a sorted set.  */
        seedContent: String,
        delimiter: string = "\n",
        companionKey: CompanionKey
    ) {
        const key = this.generateRedisCompanionKey(companionKey);
        //generate a redis key based on the companion key that is used to identify the companions chat history
        if (await this.history.exists(key)) {
            //checks if the chat history for the companion already exist. If so it logs a message
            console.log("User already has chat history");
            return;
        }

        const content = seedContent.split(delimiter);
        /*splits the seed content string into array of individual lines using the specified 
        limiter which by default is a new line character (\n)*/
        let counter = 0;

        for (const line of content) {
            //iterates over each line message in the content array
            await this.history.zadd(key, { score: counter, member: line });
            //uses the zadd method to add each chat message to the sorted set identified by key
            counter += 1;
        }
    }
}