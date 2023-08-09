import { jwtVerify } from "jose"

export const getJWTSecretKey = () => {
    const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

    if (!secret) {
        throw new Error("Wrong secret key")
    }

    return new TextEncoder().encode(secret)
}

export const verifyJwtToken = async (token: string) => {
    try {
        const { payload } = await jwtVerify(token, getJWTSecretKey());

        return payload;
    } catch (error) {
        return null;
    }
}