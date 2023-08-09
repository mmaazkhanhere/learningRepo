import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from 'jose'
import { getJwtSecretKey, verifyJwtToken } from "@/app/libs/auth";

export const POST = async (request: NextRequest) => {

    const body = await request.json();
    const signInUsername = body.username;
    const singInPassword = body.password;

    console.log(singInPassword, signInUsername)

    try {

        const { value: username } = request.cookies.get("username") ?? { value: null };
        const { value: password } = request.cookies.get("password") ?? { value: null };
        const { value: token } = request.cookies.get("token") ?? { value: null };
        const { value: address } = request.cookies.get("token") ?? { value: null };

        const tokenVerified = token && verifyJwtToken(token);

        console.log(username, password, token);

        if (username === signInUsername && password === singInPassword) {

            if (tokenVerified) {
                // Token verified, user is already authenticated
                const response = NextResponse.json(
                    { success: true },
                    { status: 200, headers: { "content-type": "application/json" } }
                );
                return response;
            }

            // Token not verified, generate and set a new token
            const token = await new SignJWT({
                address: address,
                role: 'admin'
            })
                .setProtectedHeader({ alg: "HS256", typ: 'JWT' })
                .setIssuedAt()
                .setExpirationTime("300s")
                .sign(getJwtSecretKey());

            const response = NextResponse.json(
                { success: true },
                { status: 200, headers: { "content-type": "application/json" } }
            );

            response.cookies.set({
                name: "token", value: token, path: "/"
            });

            return response;
        }


    } catch (error) {
        console.error("Error creating token:", error);
        return NextResponse.json({ success: false });
    }
}