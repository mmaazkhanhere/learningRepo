import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from 'jose'
import { getJWTSecretKey } from "@/app/libs/auth";

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const username = body.username;
    const password = body.password;

    if (username === 'maaz' && password === "maaz") {
        const token = await new SignJWT({
            username: username,
            role: 'admin'
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime("60s")
            .sign(getJWTSecretKey())

        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { 'content-type': 'application/json' } }
        );

        response.cookies.set({
            name: 'token',
            value: token,
            path: "/"
        })

        return response;
    }
}