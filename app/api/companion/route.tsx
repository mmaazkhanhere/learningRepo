/* this code defines a server-side API route that handles POST requests. It requires authentication, 
checks for required request fields, verifies the user's subscription status, and creates a companion 
object in a database. */

import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
    try {
        const body = await req.json(); //parse the request body as json
        const user = await currentUser(); //get the user detail
        //extracts the relevant data from the request body
        const { src, name, description, instructions, seed, categoryId } = body;

        if (!user || !user.id || !user.firstName) {
            //if user is not authenticated, 401 unauthorised status reponse is turned
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            //if missing data, then 400 misisng field status response in return
            return new NextResponse("Missing required fields", { status: 400 });
        };

        const isPro = await checkSubscription(); //Checks if user is in pro mode

        if (!isPro) {
            //If user have not subscribed for the pro mode, it return 403 status with message
            return new NextResponse("Pro subscription required", { status: 403 });
        }

        //if user subscribed for the pro, it can create an companion
        const companion = await prismadb.companion.create({
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed,
            }
        });

        return NextResponse.json(companion); //returns a json response containing the created companion object
    } catch (error) {
        console.log("[COMPANION_POST]", error); //if any error, display in console
        return new NextResponse("Internal Error", { status: 500 });
    }
};