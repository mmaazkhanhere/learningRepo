import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from 'jose'
import { getJwtSecretKey, verifyJwtToken } from "@/app/libs/auth";

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const signInUsername = body.username;
    const singInPassword = body.password;

    console.log(singInPassword, signInUsername)

    try {

        const username = request.cookies.get("username") ?? null;
        const password = request.cookies.get("password") ?? null;
        const token = request.cookies.get("token") ?? null;

        // const tokenVerified=token && verifyJwtToken(token);

        console.log(username, password, token);

        // if(username===signInUsername && password===singInPassword)

    } catch (error) {
        console.error("Error creating token:", error);
        return NextResponse.json({ success: false });
    }
}