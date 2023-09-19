import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";


export async function PATCH(req: Request,
    { params }: { params: { companionId: string } }) {
    try {
        const body = await req.json();//extract request body from request
        const user = await currentUser();//checks the current user
        const { src, name, description, instructions, seed, categoryId } = body;
        //extracts relevant fields from the body

        if (!params.companionId) {
            //checks if companion id exists in the route parameter, if not, returns 401
            return new NextResponse("Unauthorised", { status: 401 });
        }

        if (!user || !user.id || !user.firstName) {
            //checks if user is authenticated, if not returns 401
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            //if any required field is missing, return 400
            return new NextResponse("Missing required fields", { status: 400 });
        };

        const isPro = await checkSubscription();

        const companion = await prismadb.companion.update({
            //updates companion object in the database
            where: {
                id: params.companionId,
                userId: user.id
            },
            data: {
                //update the fields
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

        return NextResponse.json(companion);

    } catch (error) {
        console.log("[COMPANION_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export async function DELETE(request: Request, { params }: { params: { companionId: string } }) {
    try {
        const { userId } = auth();//gets user info
        if (!userId) {
            //if no authenticated user present, then 401 error
            return new NextResponse("Unauthorised", { status: 401 });
        }

        //delete a companion object in the database based on the "userId" and companionId from the route parameters
        const companion = await prismadb.companion.delete({
            where: {
                userId,
                id: params.companionId,
            }
        });

        return NextResponse.json(companion);//retunrs a JSON response with the deleted companion object

    } catch (error) {
        console.log("[COMPANION_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}