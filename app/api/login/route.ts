import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from 'jose'
import { getJwtSecretKey } from "@/app/libs/auth";

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const username = body.username;
    const password = body.password;

    console.log(password, username)

    try {
        if (username === 'maaz' && password === "maaz") {
            const token = await new SignJWT({
                username: username,
                role: 'admin'
            })
                .setProtectedHeader({ alg: "HS256", typ: 'JWT' })
                .setIssuedAt()
                .setExpirationTime("30s")
                .sign(getJwtSecretKey());

            const response = NextResponse.json(
                { success: true },
                { status: 200, headers: { "content-type": "application/json" } }
            );

            response.cookies.set({
                name: "token",
                value: token,
                path: "/",
            });

            return response;
        }
    } catch (error) {
        console.error("Error creating token:", error);
        return NextResponse.json({ success: false });
    }
}