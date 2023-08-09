
import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from 'jose'
import { getJwtSecretKey } from "@/app/libs/auth";
import { generateWalletAddress } from "@/app/libs/walletAddress";


export const POST = async (request: NextRequest) => {

    const body = await request.json()
    const userId = body.userId;
    const password = body.password;

    try {
        const address = generateWalletAddress(userId);

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

        response.cookies.set({
            name: "username", value: userId, path: "/"
        });

        response.cookies.set({
            name: "address", value: address, path: "/"
        });

        response.cookies.set({
            name: "password", value: password, path: "/"
        });

        return response;
    } catch (error) {
        console.error("Error creating token:", error);
        return NextResponse.json({ success: false });
    }

}