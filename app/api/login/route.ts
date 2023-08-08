import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from 'jose'
import { getJwtSecretKey } from "@/app/lib/auth";

export const POST = async (request: NextRequest) => {

    const req = await request.json();

    if (req.username === 'admin' && req.password === 'admin') {

        const token = await new SignJWT({
            username: req.username,
            role: 'admin'
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime('60s')
            .sign(getJwtSecretKey());

        console.log(token);

        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );

        response.cookies.set({
            name: 'token',
            value: token,
            path: '/'
        });

        console.log(response.cookies)

        return response;
    }
    return NextResponse.json({ success: false })
}