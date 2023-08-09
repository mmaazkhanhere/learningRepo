import Cookies from "universal-cookie"
import { verifyJwtToken } from "@/app/libs/auth"
import React, { useEffect, useState } from "react";
import { JWTPayload } from "jose";

const fromServer = async () => {
    const cookies = require("next/headers").cookies;
    const cookieList = cookies();
    const { value: token } = cookieList.get("token") ?? { value: null };

    const verifiedToken = await verifyJwtToken(token);
}

export function useAuth() {
    const [auth, setAuth] = useState<JWTPayload | null>(null);

    const getVerifiedToken = async () => {
        const cookies = new Cookies();
        const token = cookies.get("token") ?? null;
        const verifiedToken = await verifyJwtToken(token);
        setAuth(verifiedToken);
    };

    useEffect(() => {
        getVerifiedToken();
    }, [])

    return auth;
}

useAuth.fromServer = fromServer;